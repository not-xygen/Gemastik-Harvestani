import { needUser } from "#/middleware/auth";
import { forbiddenResponse,notFoundResponse } from "#/response";
import prisma from "#/prisma.js";
import { Router } from "express";
import { Request,Response } from "express-serve-static-core";
import axios, { Axios, AxiosResponse } from 'axios'

interface AIBibitResponse{
  plan_recomendation : String
}

export async function index(req : Request , res :Response) {
    const bibit = await prisma.bibit.findMany({})

    res.status(200).json({status: 'sucess', data : bibit})
}

export async function bibitAi({
  nitrogen ,
  phosphorous ,
  potash,
  temperature ,
  humidity ,
  ph,
  rainfall ,
}: {
    nitrogen : number,
    phosphorous : number,
    potash : number,
    temperature : number,
    humidity : number,
    ph: number,
    rainfall : number,
}) {
    const requstData = {
      nitrogen ,
      phosphorous ,
      potash,
      temperature ,
      humidity ,
      ph,
      rainfall ,
    }
    const bibit:AxiosResponse<AIBibitResponse> = await axios.post('http://127.0.0.1:8000/v1/plant-recomendation',requstData)

    return bibit
}


export async function rekomendasiBibit(req: Request, res: Response) {
    const { nitrogen, phosphorous, potash, temperature, humidity, ph, rainfall } = req.body;
    try {
      const bibit = await bibitAi({
        nitrogen ,
        phosphorous ,
        potash,
        temperature ,
        humidity ,
        ph,
        rainfall ,
      });
      res.status(200).json({status : "success", rekomendasi_bibit : bibit.data.plan_recomendation});
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


export function router(){
    const router = Router();

    router.get("/",index)
    router.post("/recomendation",rekomendasiBibit)

    return router
}