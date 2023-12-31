import { DataLahanDetail } from "@/types";
import { createContext } from "react"

export interface LahanData {

}
export interface LatLot {
    lat : number,
    lon : number
}

export interface RecomendationParams {
    nitrogen :number;
    phosphorous : number
    potash : number
    temperature : number
    humidity :number
    ph : number
    rainfall : number
  }

export interface LahanContextProps {
    add : (params : LahanData) => Promise<void>
    del : (params : LahanData) => Promise<void>
    edit : (params : LahanData) => Promise<void>
    update: (params : LahanData) => Promise<void>
    show: () => Promise<void>
    pin : (params : any) => Promise<void>
    allLahan : any
    recomen : any
    recomendation : (params:RecomendationParams ) => Promise<void>
    detailLahan : DataLahanDetail
    setDetailLahan : (params: DataLahanDetail) => Promise<void>
}



export const LahanContext = createContext<LahanContextProps>({
    add: async () => {},
    del : async () => {},
    edit : async () => {},
    update : async () => {},
    show : async () => {},
    pin : async() => {},
    recomendation: async() => {},
    allLahan : Array,
    recomen : "",
    detailLahan : {
        user_id : "",
        nama: "",
        luas : "",
        alamat : "",
        lat : 0,
        lon : 0,
        created_at : "",
        update_at : "",
    },
    setDetailLahan : async() => {} 
})