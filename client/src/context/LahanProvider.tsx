import React, { useState } from "react";
import { LahanContext, LahanData } from "./LahanContext";



export const LahanProvider: React.FC<any> = ({children}) => {
    const [lahanData,setLahanData] = useState<LahanData>()
    const [loading,setLoading] =useState<Boolean>(false)
    const add =async (params:LahanData) => {
        await fetch('https://gemastik-node-ygq37pugfa-et.a.run.app/api/v1/auth/login',{
            method : 'POST',
            body : JSON.stringify({
                "nama": lahanData?.nama,
                "luas": lahanData?.luas, //decimal
                "alamat": lahanData?.alamat,
                "lat": lahanData?.lat, // decimal latitude
                "lon": lahanData?.lot // decimal longitude
            }),
            headers : {
                "Content-Type" : "application/json",
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
        return 
    }
    const edit = async(params : LahanData) => {
        return 
    }
    const update = async(params : LahanData) => {
        return 
    }
    const show = async(params : LahanData) => {
        return 
    }
    return(
        <LahanContext.Provider value={{add,del,edit,update,show}}>
            {children}
        </LahanContext.Provider>
    )
}