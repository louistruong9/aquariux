import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { WeatherCard } from '@/components/WeatherCard'

describe('WeatherCard', () => {
  const mockWeather = {
    name: 'London',
    sys: { country: 'GB' },
    main: {
      temp: 20,
      feels_like: 22,
      temp_min: 18,
      temp_max: 23,
      pressure: 1015,
      humidity: 65
    },
    weather: [{
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }],
    wind: {
      speed: 5,
      deg: 180,
      gust: 7
    },
    visibility: 10000,
    dt: Date.now()
  }

  it('renders weather information', () => {
    render(<WeatherCard currentWeather={mockWeather} />)
    
    expect(screen.getByText('20°C')).toBeInTheDocument()
    expect(screen.getByText('clear sky')).toBeInTheDocument()
    expect(screen.getByText('65%')).toBeInTheDocument()
    expect(screen.getByText('5 m/s')).toBeInTheDocument()
  })

  it('renders weather icon', () => {
    render(<WeatherCard currentWeather={mockWeather} />)
    const icon = screen.getByRole('img')
    expect(icon).toHaveAttribute('src', 'https://openweathermap.org/img/wn/01d@2x.png')
    expect(icon).toHaveAttribute('alt', 'clear sky')
  })

  it('renders fallback icon when weather icon is not available', () => {
    const weatherWithoutIcon = {
      ...mockWeather,
      weather: [{ ...mockWeather.weather[0], icon: '' }]
    }
    render(<WeatherCard currentWeather={weatherWithoutIcon} />)
    expect(screen.getByTestId('ban-icon')).toBeInTheDocument()
  })
})
