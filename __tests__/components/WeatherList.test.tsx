import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { WeatherList } from '@/components/WeatherList'
import { DailyForecast } from '@/types/weather'

describe('WeatherList', () => {
  const mockForecasts: DailyForecast[] = [
    {
      date: '2024-03-23',
      items: [
        {
          date: '2024-03-23',
          time: '12:00',
          minTemp: 20,
          maxTemp: 25,
          description: 'Clear sky',
          icon: '01d'
        }
      ]
    }
  ]

  it('renders forecast title', () => {
    render(<WeatherList forecasts={mockForecasts} />)
    expect(screen.getByText('5-day Forecast (3 hours)')).toBeInTheDocument()
  })

  it('renders forecast items', () => {
    render(<WeatherList forecasts={mockForecasts} />)
    expect(screen.getByText('2024-03-23')).toBeInTheDocument()
    expect(screen.getByText('12:00')).toBeInTheDocument()
    expect(screen.getByText('Clear sky')).toBeInTheDocument()
  })

  it('renders "Today" for current date', () => {
    const today = new Date().toISOString().split('T')[0]
    const todayForecast: DailyForecast[] = [{
      date: today,
      items: [{
        date: today,
        time: '12:00',
        minTemp: 20,
        maxTemp: 25,
        description: 'Clear sky',
        icon: '01d'
      }]
    }]
    render(<WeatherList forecasts={todayForecast} />)
    expect(screen.getByText('Today')).toBeInTheDocument()
  })
})
