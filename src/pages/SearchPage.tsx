import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchCities } from '@/services/weatherApi'
import { CitySearchResult } from '@/types/weather'
import { useSearchStore } from '@/store/searchStore'
import { useWeatherStore } from '@/store/weatherStore'
import { Header } from '@/components/Header'
import { SearchHistory } from '@/components/SearchHistory'
import { SearchResults } from '@/components/SearchResults'

export const SearchPage = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CitySearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { addToHistory } = useSearchStore()
  const { currentWeather } = useWeatherStore()

  const handleHeaderClick = () => {
    if (currentWeather) {
      navigate('/')
    }
  }

  const handleSearch = async () => {
    if (query.length < 2) {
      setResults([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      const cities = await searchCities(query)
      if (cities.length === 0) throw new Error('Invalid country or city')

      setResults(cities)
    } catch (err) {
      setResults([])
      setError(err instanceof Error ? err.message : 'Invalid country or city')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSelectCity = (city: CitySearchResult) => {
    const cityName = `${city.name}, ${city.country}`
    addToHistory(cityName)
    navigate('/', { state: { city: cityName } })
  }

  return (
    <div className="max-w-2xl xs:w-full sm:w-md  mx-auto p-4 space-y-4">
      <div onClick={handleHeaderClick} className="cursor-pointer">
        <Header
          city={
            currentWeather ? `${currentWeather.name}, ${currentWeather.sys.country}` : 'Search City'
          }
          isShowSearch={false}
        />
      </div>

      {/* Search Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter city name..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading || query.length < 2}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            'Search'
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-sm text-left">{error}</div>}

      {/* Search History */}
      <SearchHistory />

      {/* Search Results */}
      <SearchResults results={results} onSelectCity={handleSelectCity} />
    </div>
  )
}
