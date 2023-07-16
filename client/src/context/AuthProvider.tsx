import React, { useState } from "react";
import { AuthContext, UserData } from './AuthContext';

interface LoginResponse {
    accessToken : String,
    token : String,
}

export const AuthProvider: React.FC<any> = ({children}) => {
    const [accessToken , setAccessToken] = useState<String>("")
    const login = async (params : UserData) => {

        await fetch('https://gemastik-node-ygq37pugfa-et.a.run.app/api/v1/auth/login', {
            method : 'POST',
            body : JSON.stringify({
                email : params.email,
                password : params.password
            }),
            headers: {
                "Content-Type": "application/json",
              },
        }).then(response => {
            if(response.ok) {
                response.json().then(async (accessToken) => {
                    const accesstoken = await accessToken
                    setAccessToken(accesstoken.token)
                });
            } else {
                response.json().then((err) => console.error(err))

            }
        })
    }

    const logout =async (params:any) => {
        
    }

    const register = async (params : UserData ) => {
        await fetch('https://gemastik-node-ygq37pugfa-et.a.run.app/api/v1/auth/register',{
            method : 'POST',
            body : JSON.stringify({
                email : params.email,
                password : params.password
            }),
            headers : {
                "Content-Type" : "application/json",
            }
        }).then(response => {
            if(response.ok) {
                response.json().then((accessToken) => {
                    setAccessToken(accessToken.token)
                })
            } else {
                response.json().then((err) => console.error(err))
            }
        })
    }

    return(
        <AuthContext.Provider value={{accessToken ,login,logout,register}}>
            {children}
        </AuthContext.Provider>
    )
}