import { needUser } from "#/middleware/auth.js";
import { forbiddenResponse, notFoundResponse } from "#/response.js";

import prisma from "#/prisma.js";
import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import typia from "typia";
import { StatusTanam, Prisma } from "@prisma/client";
import { isObjectEnum, queryToWhere } from "#/util.js";

export async function index(req: Request, res: Response) {
  const { lahan_id, status } = req.query;

  const tanam = await prisma.tanam.findMany({
    where: {
      lahan: {
        user_id: req.user!.userId,
        id: queryToWhere(lahan_id),
      },
      status: queryToWhere(status, isObjectEnum(StatusTanam)),
    },
  });

  res.status(200).json({ tanam });
}

export async function show(req: Request, res: Response) {
  const { id } = req.params;

  const model = await prisma.tanam.findUnique({
    where: {
      id,
    },
  });

  if (model) {
    // check ownership
    const count = await prisma.lahan.count({
      where: {
        id: model.lahan_id,
        user_id: req.user!.userId,
      },
    });

    if (count != 0) {
      return res.status(200).json(model);
    } else {
      return forbiddenResponse(res);
    }
  } else {
    return notFoundResponse(res);
  }
}

interface StoreRequest {
  /**
   * @format uuid
   */
  bibit_id: string;
  /**
   * @format uuid
   */
  lahan_id: string;
}

const storeCheck = typia.createAssertPrune<StoreRequest>();
function storeAssert(body: any): StoreRequest {
  if (typeof body === "object") {
    // for (const name of ["lat", "lon", "luas"]) {
    //   if (typeof body[name] === "string") {
    //     try {
    //       const f = parseFloat(body[name]);
    //
    //       body[name] = f;
    //     } catch (e) {}
    //   }
    // }
  }

  return storeCheck(body);
}

export function countLahan({
  lahanId,
  userId,
}: {
  lahanId: string;
  userId: string;
}) {
  return prisma.lahan.count({
    where: {
      id: lahanId,
      user_id: userId,
    },
  });
}

export function checkCount({
  lahanId,
  bibitId,
  userId,
}: {
  lahanId: string;
  bibitId: string;
  userId: string;
}) {
  return [
    countLahan({ lahanId, userId }),
    prisma.bibit.count({
      where: {
        id: bibitId,
      },
    }),
  ];
}

export async function store(req: Request, res: Response) {
  const body = storeAssert(req.body);

  const [lahanCount, bibitCount, tanamCount] = await prisma.$transaction([
    ...checkCount({
      lahanId: body.lahan_id,
      bibitId: body.bibit_id,
      userId: req.user!.userId,
    }),

    prisma.tanam.count({
      where: {
        lahan_id: body.lahan_id,
        status: {
          in: [StatusTanam.Planning, StatusTanam.Executing],
        },
      },
    }),
  ]);

  if (lahanCount == 0) {
    return notFoundResponse(res, "lahan");
  }

  if (bibitCount == 0) {
    return notFoundResponse(res, "bibit");
  }

  if (tanamCount == 0) {
    const model = await prisma.tanam.create({
      data: {
        ...body,
        status: StatusTanam.Planning,
      },
    });

    res.status(201).json(model);
  } else {
    return res
      .status(403)
      .json({ error: "lahan sudah mempunyai rencana atau dalam proses tanam" });
  }
}

export async function updateShared(
  {
    id,
    userId,
    initialStatus,
    updateStatus,
    body,
  }: {
    id: string;
    userId: string;
    initialStatus: StatusTanam;
    updateStatus: StatusTanam;
    body: any;
  },
  res: Response
) {
  const count = await prisma.tanam.count({
    where: {
      id,
      lahan: {
        user_id: userId,
      },
    },
  });

  if (count == 0) {
    return notFoundResponse(res, "tanam");
  }

  try {
    const model = await prisma.tanam.update({
      where: {
        id: id,
        status: initialStatus,
      },
      data: {
        ...body,
        status: updateStatus,
      },
    });

    return res.status(200).json(model);
  } catch (e) {
    return res.status(403).json({
      error: `tanam harus masih di tahap ${initialStatus} untuk berubah ke tahap ${updateStatus}`,
    });
  }
}

interface UpdateExecuteRequest {
  jarak: number;
  /**
   * @format datetime
   */
  tanggal_tanam: string;
}

const updateExecuteCheck = typia.createAssertPrune<UpdateExecuteRequest>();
function updateExecuteAssert(body: any): UpdateExecuteRequest {
  if (typeof body === "object") {
    for (const name of ["jarak"]) {
      if (typeof body[name] === "string") {
        try {
          const f = parseFloat(body[name]);

          body[name] = f;
        } catch (e) {}
      }
    }
  }

  return updateExecuteCheck(body);
}
export async function updateExecute(req: Request, res: Response) {
  const { id } = req.params;
  const body = updateExecuteAssert(req.body);

  return updateShared(
    {
      id,
      body,
      initialStatus: StatusTanam.Planning,
      updateStatus: StatusTanam.Executing,
      userId: req.user!.userId,
    },
    res
  );
}

interface UpdateCloseRequest {
  /**
   * @format datetime
   */
  tanggal_panen: string;

  harga_panen: number;
  jumlah_panen: number;
}

const updateCloseCheck = typia.createAssertPrune<UpdateCloseRequest>();
function updateCloseAssert(body: any): UpdateCloseRequest {
  return updateCloseCheck(body);
}
export async function updateClose(req: Request, res: Response) {
  const { id } = req.params;
  const body = updateCloseAssert(req.body);

  return updateShared(
    {
      id,
      body,
      initialStatus: StatusTanam.Executing,
      updateStatus: StatusTanam.Closed,
      userId: req.user!.userId,
    },
    res
  );
}

export async function deleteItem(req: Request, res: Response) {
  const { id } = req.params;

  const count = await prisma.tanam.count({
    where: {
      id,
      lahan: {
        user_id: req.user!.userId,
      },
    },
  });

  if (count != 0) {
    const it = await prisma.tanam.delete({
      where: {
        id,
      },
    });

    return res.status(202).json({})
  } else {
    return forbiddenResponse(res);
  }
}

export function router() {
  const router = Router();

  router.get("/", needUser, index);
  router.get("/:id", needUser, show);
  router.post("/", needUser, store);
  router.post("/:id/execute", needUser, updateExecute);
  router.post("/:id/close", needUser, updateClose);
  router.delete("/:id", needUser, deleteItem);

  return router;
}
