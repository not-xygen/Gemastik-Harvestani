import { useEffect, useState } from "react"
import { WeatherContext } from "./WeatherContext"
import * as Location from 'expo-location';

export const WeatherProvider : React.FC<any> = ({children}) => {
    const [currentLocation,setCurrentLocation] = useState<Location.LocationObject>()
    useEffect(() => {
      getLocation()	
    },[])
  
    const getLocation = async () => {
      try {
        let {status} = await Location.requestForegroundPermissionsAsync()
        if(status !== "granted"){
          return;
        }
        let location = await Location.getCurrentPositionAsync({})
        setCurrentLocation(location)
      } catch (error) {
        console.error("Error requesting location permission:", error);
      }
    }
    const get = async () => {
        try {
          const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?q=${currentLocation?.coords.latitude},${currentLocation?.coords.longitude}`,
            {
              method: 'GET',
              headers: {
                key: process.env.EXPO_PUBLIC_API_WEATHER_KEY || "",
              },
            }
          );
      
          if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            throw new Error('Error fetching data');
          }
        } catch (error) {
          console.error(error);
        }
      };
    return (
       <WeatherContext.Provider value={{get}}>
            {children}
       </WeatherContext.Provider>         
    )
}