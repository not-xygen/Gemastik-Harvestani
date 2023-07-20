import React, { useContext, useEffect, useState } from "react";
import { LahanContext, LahanData, LatLot, RecomendationParams } from './LahanContext';
import { useAuthContext } from "@/hooks/AuthHooks";
import { DataLahanDetail } from "@/types";


export const LahanProvider: React.FC<any> = ({children}) => {
    const [latLot ,setLatLot] = useState<LatLot>()
    const [loading,setLoading] =useState<Boolean>(false)
    const [allLahan,setAllLahan] = useState<LahanData>()
    const {accessToken} = useAuthContext()
    const [detailLahan,setdetailLahan] = useState<DataLahanDetail>({
        user_id : "",
        nama: "",
        luas : "",
        alamat : "",
        lat : 0,
        lon : 0,
        created_at : "",
        update_at : "",
    },)
    const [recomen,setRecomen] = useState<any>()

    useEffect(() => {

    },[])

    const add =async (params : any) => {
        await fetch('https://gemastik-node-ygq37pugfa-et.a.run.app/api/v1/lahan',{
            method : 'POST',
            body : JSON.stringify({
                "nama": params?.nama,
                "luas": parseFloat(params?.luas), //decimal
                "alamat": params?.alamat,
                "lat": latLot?.lat, // decimal latitude
                "lon": latLot?.lon // decimal longitude
            }),
            headers : {
                "Content-Type" : "application/json",
                "authorization": `Bearer ${accessToken}`
            }
        }).then(response => {
            if(response.ok) {
                response.json().then((lahanData) => {
                    console.log(lahanData)
                })
            }else {
                response.json().then(err => console.error(err))
            }
        })
    }
    const del = async(params : LahanData) => {
        console.log("hehe")
        return 
    }
    const edit = async(params : LahanData) => {
        return 
    }
    const update = async(params : LahanData) => {
        return 
    }
    const show = async() => {
        await fetch('https://gemastik-node-ygq37pugfa-et.a.run.app/api/v1/lahan',{
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "authorization": `Bearer ${accessToken}`
            }
        }).then(response => {
            if(response.ok) {
                response.json().then((lahanData) => {
                    setAllLahan(lahanData)
                })
            }else {
                response.json().then(err => console.error(err))
            }
        }) 
    }

    const pin = async (params : LatLot) => {
        setLatLot({
            ...latLot,
            "lat" : params.lat,
            "lon" : params.lon
        })
    }

    const recomendation = async (params : RecomendationParams) => {
        await fetch('https://gemastik-node-ygq37pugfa-et.a.run.app/api/v1/bibit/recomendation',{
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body : JSON.stringify(params)
        }).then(response => {
            if(response.ok) {
                response.json().then((data) => {
                    setRecomen(data.rekomendasi_bibit)
                })
            }else {
                response.json().then(err => console.error(err))
            }
        }) 
    }
    
    const setDetailLahan = async(params: DataLahanDetail) =>{
        setdetailLahan(params)
    }

    return(
        <LahanContext.Provider value={{allLahan,add,del,edit,update,show,pin,recomendation,recomen,setDetailLahan,detailLahan}}>
            {children}
        </LahanContext.Provider>
    )
}