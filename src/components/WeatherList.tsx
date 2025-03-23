import { WeatherListProps } from '@/types/weather'
import { WeatherListItem } from './WeatherListItem'
import { isToday } from '@/utils/dateUtils'
import { memo } from 'react'

export const WeatherList = memo(({ forecasts }: WeatherListProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-left">5-day Forecast (3 hours)</h2>
      <div className="shadow-lg rounded-2xl border border-gray-200">
        {forecasts.map((dayForecast, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-gray-500 text-left px-4 pt-4">
              {isToday(new Date(dayForecast.date).getTime() / 1000) ? 'Today' : dayForecast.date}
            </h3>
            <div className="space-y-2 text-left">
              {dayForecast.items.map((item, itemIndex) => (
                <WeatherListItem
                  key={itemIndex}
                  date={dayForecast.date}
                  time={item.time}
                  minTemp={Math.round(item.minTemp)}
                  maxTemp={Math.round(item.maxTemp)}
                  description={item.description}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})
