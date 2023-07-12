import { needUser } from "#/middleware/auth.js";
import prisma from "#/prisma.js";
import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import axios, { Axios, AxiosResponse } from "axios";
import typia from "typia";

interface AIBibitResponse {
  plan_recomendation: String;
}

export async function index(req: Request, res: Response) {
  const bibit = await prisma.bibit.findMany({});

  res.status(200).json({ bibit });
}

interface BibitAiRequest {
  nitrogen: number;
  phosphorous: number;
  potash: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export async function bibitAi({
  nitrogen,
  phosphorous,
  potash,
  temperature,
  humidity,
  ph,
  rainfall,
}: BibitAiRequest) {
  const baseUrlMl = process.env.BASE_URL_ML;
  const requstData = {
    nitrogen,
    phosphorous,
    potash,
    temperature,
    humidity,
    ph,
    rainfall,
  };
  const bibit: AxiosResponse<AIBibitResponse> = await axios.post(
    `${baseUrlMl}/v1/plant-recomendation`,
    requstData
  );

  return bibit;
}

export async function rekomendasiBibit(req: Request, res: Response) {
  const body = typia.assertPrune<BibitAiRequest>(req.body);

  try {
    const bibit = await bibitAi(body);
    res.status(200).json({
      rekomendasi_bibit: bibit.data.plan_recomendation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export function router() {
  const router = Router();

  router.get("/", index);
  router.post("/recomendation", needUser, rekomendasiBibit);

  return router;
}
