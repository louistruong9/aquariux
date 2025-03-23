import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WeatherData, ForecastData } from '@/types/weather';

interface WeatherStore {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  setCurrentWeather: (weather: WeatherData | null) => void;
  setForecast: (forecast: ForecastData | null) => void;
}

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set) => ({
      currentWeather: null,
      forecast: null,
      setCurrentWeather: (weather) => set({ currentWeather: weather }),
      setForecast: (forecast) => set({ forecast }),
    }),
    {
      name: 'weather-storage',
    }
  )
); 