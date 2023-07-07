import { needUser } from "#/middleware/auth.js";
import { forbiddenResponse, notFoundResponse } from "#/response.js";

import prisma from "#/prisma.js";
import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import typia from "typia";
import multer, { diskStorage } from "multer";
import { randomBytes } from "crypto";

export async function index(req: Request, res: Response) {
  const lahan = await prisma.lahan.findMany({
    where: {
      user_id: req.user!.userId,
    },
  });

  res.status(200).json({ lahan });
}

export async function show(req: Request, res: Response) {
  const { id } = req.params;

  const model = await prisma.lahan.findUnique({
    where: {
      id,
    },
    include: {
      image: true,
    },
  });

  if (model && model.user_id == req.user?.userId) {
    res.status(200).json(model);
  } else if (model) {
    // model found but not from user
    return forbiddenResponse(res);
  } else {
    return notFoundResponse(res);
  }
}

interface StoreRequest {
  nama: string;
  luas: number;
  alamat: string;

  lat: number;
  lon: number;
}

const storeCheck = typia.createAssertPrune<StoreRequest>();
function storeAssert(body: any): StoreRequest {
  if (typeof body === "object") {
    for (const name of ["lat", "lon", "luas"]) {
      if (typeof body[name] === "string") {
        try {
          const f = parseFloat(body[name]);

          body[name] = f;
        } catch (e) {}
      }
    }
  }

  return storeCheck(body);
}

export async function store(req: Request, res: Response) {
  const body = storeAssert(req.body);

  let files: { path: string }[] | null = null;

  if (typeof req.files == "object" && !Array.isArray(req.files)) {
    files =
      req.files["photo"]?.map((it) => ({
        path: it.path.replace("public/", ""),
      })) ?? null;
  }

  const model = await prisma.lahan.create({
    data: {
      ...body,
      image: {
        create: files ?? undefined,
      },
      user_id: req.user!.userId,
    },
    include: {
      image: true,
    },
  });

  res.status(201).json(model);
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const { nama, luas, lon, lat, alamat } = storeCheck(req.body);

  // check if id is owned by user
  const count = await prisma.lahan.count({
    where: { id, user_id: req.user!.userId },
  });
  if (count == 0) {
    return forbiddenResponse(res);
  }

  const model = await prisma.lahan.update({
    where: {
      id: id,
    },
    data: {
      nama,
      luas,
      lon,
      lat,
      alamat,
    },
  });

  res.status(201).json(model);
}

export function router() {
  const router = Router();

  router.get("/", needUser, index);
  router.get("/:id", needUser, show);
  router.post(
    "/",
    multer({
      storage: diskStorage({
        destination: "public/image/lahan",
        filename(req, file, callback) {
          const filename = randomBytes(32).toString("hex");
          callback(null, `${filename}_${file.originalname}`);
        },
      }),
    }).fields([{ name: "photo", maxCount: 5 }]),
    needUser,
    store
  );
  router.put("/:id", needUser, update);

  return router;
}
