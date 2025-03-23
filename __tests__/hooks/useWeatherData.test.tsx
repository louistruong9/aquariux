import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useWeatherData } from '../../src/hooks/useWeatherData'
import * as weatherApi from '@/services/weatherApi'

vi.mock('@/services/weatherApi', () => ({
  fetchCurrentWeather: vi.fn(),
  fetchForecast: vi.fn()
}))

const mockedWeatherApi = vi.mocked(weatherApi)

describe('useWeatherData', () => {
  const mockWeatherData = {
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
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'test weather',
        icon: '01d',
      },
    ],
    wind: {
      speed: 5,
      deg: 180,
      gust: 7,
    },
    visibility: 10000,
    dt: Date.now(),
  }

  const mockForecastData = {
    list: [
      {
        dt: Date.now(),
        main: {
          temp: 25,
          feels_like: 26,
          temp_min: 20,
          temp_max: 30,
          pressure: 1015,
          humidity: 60,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'test forecast',
            icon: '01d',
          },
        ],
        wind: {
          speed: 5,
          deg: 180,
          gust: 7,
        },
        visibility: 10000,
      },
    ],
    city: {
      name: 'Test City',
      country: 'TC',
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch weather data successfully', async () => {
    mockedWeatherApi.fetchCurrentWeather.mockResolvedValueOnce(mockWeatherData)
    mockedWeatherApi.fetchForecast.mockResolvedValueOnce(mockForecastData)

    const { result } = renderHook(() => useWeatherData('Test City'))

    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBe(null)

    await act(async () => {
      await vi.waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
    })

    expect(result.current.error).toBe(null)
    expect(result.current.currentWeather).toEqual(mockWeatherData)
    expect(mockedWeatherApi.fetchCurrentWeather).toHaveBeenCalledWith('Test City')
    expect(mockedWeatherApi.fetchForecast).toHaveBeenCalledWith('Test City')
  })

  it('should handle error when fetching weather data', async () => {
    const errorMessage = 'Failed to fetch weather data'
    mockedWeatherApi.fetchCurrentWeather.mockRejectedValueOnce(new Error(errorMessage))

    const { result } = renderHook(() => useWeatherData('Test City'))

    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBe(null)

    await act(async () => {
      await vi.waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
    })

    expect(result.current.error).toBe(errorMessage)
    expect(result.current.currentWeather).toBe(null)
    expect(result.current.formattedForecasts).toEqual([])
  })

  it('should refetch data when city changes', async () => {
    mockedWeatherApi.fetchCurrentWeather.mockResolvedValueOnce(mockWeatherData)
    mockedWeatherApi.fetchForecast.mockResolvedValueOnce(mockForecastData)

    const { result, rerender } = renderHook(
      ({ city }) => useWeatherData(city),
      { initialProps: { city: 'City 1' } }
    )

    await act(async () => {
      await vi.waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
    })

    expect(mockedWeatherApi.fetchCurrentWeather).toHaveBeenCalledWith('City 1')
    expect(mockedWeatherApi.fetchForecast).toHaveBeenCalledWith('City 1')

    mockedWeatherApi.fetchCurrentWeather.mockResolvedValueOnce(mockWeatherData)
    mockedWeatherApi.fetchForecast.mockResolvedValueOnce(mockForecastData)

    await act(async () => {
      rerender({ city: 'City 2' })
    })

    await act(async () => {
      await vi.waitFor(() => {
        expect(mockedWeatherApi.fetchCurrentWeather).toHaveBeenCalledWith('City 2')
      })
    })

    expect(mockedWeatherApi.fetchForecast).toHaveBeenCalledWith('City 2')
  })
})
