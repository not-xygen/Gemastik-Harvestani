import { createContext } from "react";

interface UserData {
    email : String,
    password : String
}

export interface UserContextProps {
    accessToken : String 
    login : (params : any) => Promise<void>
    logout : (params : any) => Promise<void>
    register : (params : UserData) => Promise<void> 
}

export const UserContext = createContext<UserContextProps>({
    accessToken : "",
    login: async () => {},
    logout : async () => {},
    register : async () => {}
})
