import { WeatherData } from '../types/weather'
import { formatFullDate } from '../utils/dateUtils'
import { ArrowBigUp, Ban } from 'lucide-react'

interface WeatherCardProps {
  currentWeather: WeatherData
}

export const WeatherCard = ({ currentWeather }: WeatherCardProps) => {
  const weather = currentWeather.weather[0] || {
    icon: null,
    description: 'Unknown',
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="text-lg text-left text-gray-500">{formatFullDate(currentWeather.dt)}</div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center w-full">
          <div className="w-1/2 flex justify-center">
            {weather.icon ? (
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                className="w-32 h-32"
              />
            ) : (
              <Ban data-testid="ban-icon" className="w-32 h-32 text-gray-400" />
            )}
          </div>
          <div className="w-1/2">
            <div className="text-4xl font-semibold">{currentWeather.main.temp}°C</div>
            <div className="text-gray-500 capitalize">{weather.description}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div>
          <div className="text-sm text-gray-500">Humidity</div>
          <div className="mt-1 text-lg font-semibold">{currentWeather.main.humidity}%</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Wind</div>
          <div className="mt-1 text-lg flex items-center gap-1 font-semibold">
            <span
              className="inline-block transform"
              style={{ transform: `rotate(${currentWeather.wind.deg}deg)` }}
            >
              <ArrowBigUp />
            </span>
            {currentWeather.wind.speed} m/s
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Visibility</div>
          <div className="mt-1 text-lg font-semibold">{currentWeather.visibility} km</div>
        </div>
      </div>
    </div>
  )
}
