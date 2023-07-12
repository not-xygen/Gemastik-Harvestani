import React, { useState } from "react";
import { UserContext } from "./AuthContext";

interface LoginResponse {
    accessToken : String,
    token : String,
}

export const AuthProvider: React.FC<any> = ({children}) => {
    const [accessToken , setAccessToken] = useState<String>("")

    const login = async (params : any) => {
        await fetch('', {
            method : 'POST',
            body : JSON.stringify({
                email : params.email,
                password : params.password
            })
        }).then(response => {
            if(response.ok) {
                response.json().then((accessToken) => {
                    setAccessToken(accessToken)
                });
            } else {
                response.json().then((err) => console.error(err))
            }
        })
    }

    const logout =async (params:any) => {
        
    }

    return(
        <UserContext.Provider value={{accessToken ,login,logout}}>
            {children}
        </UserContext.Provider>
    )
}