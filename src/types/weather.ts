export interface HeaderProps {
  city: string;
  isShowSearch?: boolean;
}

export interface WeatherCardProps {
  date: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  windDeg: number;
  visibility: number;
  icon: string;
}

export interface WeatherListItemProps {
  date: string;
  time: string;
  minTemp: number;
  maxTemp: number;
  description: string;
  icon: string;
}

export interface DailyForecast {
  date: string;
  items: WeatherListItemProps[];
}

export interface WeatherListProps {
  forecasts: DailyForecast[];
}

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  dt: number;
  name: string;
  sys: {
    country: string;
  };
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
}

export interface ForecastData {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
  };
}

export interface CitySearchResult {
  name: string;
  local_names: {
    [key: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state?: string;
} 