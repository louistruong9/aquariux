import { memo } from 'react'
import { WeatherListItemProps } from '@/types/weather'

export const WeatherListItem = memo(
  ({ time, minTemp, maxTemp, description, icon }: WeatherListItemProps) => {
    return (
      <div className="xs:block sm:flex items-center justify-between p-4 bg-white rounded-lg ">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium w-12">{time}</div>
          <img
            src={`https://openweathermap.org/img/wn/${icon}.png`}
            alt={description}
            className="w-10 h-10"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{minTemp}°C</span>
            <span className="text-sm text-gray-300">/</span>
            <span className="text-sm text-gray-500">{maxTemp}°C</span>
          </div>
        </div>

        <div className="text-sm capitalize font-semibold">{description}</div>
      </div>
    )
  },
)
