import { describe, it, expect, beforeEach } from 'vitest'
import { useWeatherStore } from '@/store/weatherStore'
import { WeatherData, ForecastData } from '@/types/weather'

describe('weatherStore', () => {
  const mockWeather: WeatherData = {
    name: 'Test City',
    sys: { country: 'TC' },
    main: {
      temp: 25,
      feels_like: 26,
      temp_min: 20,
      temp_max: 30,
      pressure: 1015,
      humidity: 60,
    },
    weather: [{
      id: 800,
      main: 'Clear',
      description: 'test weather',
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

  const mockForecast: ForecastData = {
    list: [{
      dt: Date.now(),
      main: {
        temp: 25,
        feels_like: 26,
        temp_min: 20,
        temp_max: 30,
        pressure: 1015,
        humidity: 60,
      },
      weather: [{
        id: 800,
        main: 'Clear',
        description: 'test forecast',
        icon: '01d'
      }],
      wind: {
        speed: 5,
        deg: 180,
        gust: 7
      },
      visibility: 10000
    }],
    city: {
      name: 'Test City',
      country: 'TC'
    }
  }

  beforeEach(() => {
    useWeatherStore.setState({
      currentWeather: null,
      forecast: null
    })
  })

  it('should set current weather', () => {
    useWeatherStore.getState().setCurrentWeather(mockWeather)
    expect(useWeatherStore.getState().currentWeather).toEqual(mockWeather)
  })

  it('should set forecast', () => {
    useWeatherStore.getState().setForecast(mockForecast)
    expect(useWeatherStore.getState().forecast).toEqual(mockForecast)
  })

  it('should persist state', () => {
    useWeatherStore.getState().setCurrentWeather(mockWeather)
    useWeatherStore.getState().setForecast(mockForecast)

    const persistedState = JSON.parse(localStorage.getItem('weather-storage') || '{}')
    expect(persistedState.state.currentWeather).toEqual(mockWeather)
    expect(persistedState.state.forecast).toEqual(mockForecast)
  })
}) 