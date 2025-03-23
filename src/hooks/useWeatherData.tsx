import { useEffect, useState, useMemo } from 'react'
import { fetchCurrentWeather, fetchForecast } from '../services/weatherApi'
import { DailyForecast } from '../types/weather'
import { useWeatherStore } from '../store/weatherStore'
import { formatFullDate, formatShortDate, formatTime } from '../utils/dateUtils'

export const useWeatherData = (selectedCity: string) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { currentWeather, forecast, setCurrentWeather, setForecast } = useWeatherStore()

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true)
        setError(null)
        const [weatherData, forecastData] = await Promise.all([
          fetchCurrentWeather(selectedCity),
          fetchForecast(selectedCity),
        ])
        setCurrentWeather(weatherData)
        setForecast(forecastData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather data')
        setCurrentWeather(null)
        setForecast(null)
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [selectedCity, setCurrentWeather, setForecast])

  const formattedForecasts = useMemo(() => {
    if (!forecast) return []

    // Group forecasts by day
    const dailyForecasts: DailyForecast[] = []
    const uniqueDates = Array.from(
      new Set(forecast.list.map((item) => new Date(item.dt * 1000).toDateString())),
    ).slice(0, 5)

    // Create daily forecast objects
    uniqueDates.forEach((dateStr) => {
      const dayItems = forecast.list
        .filter((item) => new Date(item.dt * 1000).toDateString() === dateStr)
        .map((item) => ({
          date: formatShortDate(item.dt),
          time: formatTime(item.dt),
          minTemp: Math.round(item.main.temp_min),
          maxTemp: Math.round(item.main.temp_max),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        }))

      dailyForecasts.push({
        date: formatFullDate(
          forecast.list.find((item) => new Date(item.dt * 1000).toDateString() === dateStr)?.dt ||
            0,
        ),
        items: dayItems,
      })
    })

    return dailyForecasts
  }, [forecast])

  return {
    currentWeather,
    formattedForecasts,
    loading,
    error,
  }
}
