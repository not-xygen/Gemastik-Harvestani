import { createContext } from "react"



export interface WeatherContextProps {
    get : () => Promise<void>
}


export const WeatherContext = createContext<WeatherContextProps>({
    get: async () => {}
})