import React, { useContext, useState } from "react";
import { LahanContext, LahanData, LatLot } from './LahanContext';
import { useAuthContext } from "@/hooks/AuthHooks";


export const LahanProvider: React.FC<any> = ({children}) => {
    const [latLot ,setLatLot] = useState<LatLot>()
    const [loading,setLoading] =useState<Boolean>(false)
    const [allLahan,setAllLahan] = useState<any>()
    const {accessToken} = useAuthContext()
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
    return(
        <LahanContext.Provider value={{allLahan,add,del,edit,update,show,pin,}}>
            {children}
        </LahanContext.Provider>
    )
}