import { WeatherContext } from "@/context/WeatherContext";
import { useContext } from "react";

export const useWeatherContext = () => useContext(WeatherContext)