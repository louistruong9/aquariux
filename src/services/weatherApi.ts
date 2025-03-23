import { CitySearchResult } from '@/types/search';
import { WeatherData, ForecastData } from '@/types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

interface OpenWeatherError {
  cod: string;
  message: string;
}

const handleApiError = async (response: Response): Promise<never> => {
  try {
    const errorData: OpenWeatherError = await response.json();
    throw new Error(errorData.message || 'An error occurred');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to process error response');
  }
};

export const searchCities = async (query: string): Promise<CitySearchResult[]> => {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to search cities: ${error.message}`);
    }
    throw new Error('Failed to search cities');
  }
};

export const fetchCurrentWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch current weather: ${error.message}`);
    }
    throw new Error('Failed to fetch current weather');
  }
};

export const fetchForecast = async (city: string): Promise<ForecastData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch forecast: ${error.message}`);
    }
    throw new Error('Failed to fetch forecast');
  }
}; 
