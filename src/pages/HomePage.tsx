import { useLocation } from 'react-router-dom'
import { Header } from '../components/Header'
import { WeatherCard } from '../components/WeatherCard'
import { WeatherList } from '../components/WeatherList'
import { useWeatherData } from '../hooks/useWeatherData'
import { useSearchStore } from '@/store/searchStore'
import { ErrorCard } from '@/components/ErrorCard'

export const HomePage = () => {
  const location = useLocation()
  const { searchHistory } = useSearchStore()
  const selectedCity = searchHistory[0] || location.state?.city || 'Singapore'
  const { currentWeather, formattedForecasts, loading, error } = useWeatherData(selectedCity)

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4 flex justify-center items-center w-full h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl xs:w-full sm:w-md mx-auto p-4 space-y-4">
        <Header city={`City`} />
        <ErrorCard error={error} />
        {/* <div className="max-w-2xl mx-auto p-4 text-center text-red-500">{error}</div> */}
      </div>
    )
    return <div className="max-w-2xl mx-auto p-4 text-center text-red-500">{error}</div>
  }

  if (!currentWeather) {
    return <div className="max-w-2xl mx-auto p-4 text-center">No weather data available</div>
  }

  return (
    <div className="max-w-2xl xs:w-full sm:w-md mx-auto p-4 space-y-4">
      <Header city={`${currentWeather.name}, ${currentWeather.sys.country}`} />
      <WeatherCard currentWeather={currentWeather} />
      <WeatherList forecasts={formattedForecasts} />
    </div>
  )
}
