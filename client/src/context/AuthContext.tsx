import { createContext } from "react";

export interface UserData {
    email : String,
    password : String
}

export interface UserContextProps {
    accessToken : String 
    userData : String
    login : (params : UserData) => Promise<void>
    logout : (params : any) => Promise<void>
    register : (params : UserData) => Promise<void> 
}

export const AuthContext = createContext<UserContextProps>({
    accessToken : "",
    login: async () => {},
    logout : async () => {},
    register : async () => {},
    userData : ""
})
