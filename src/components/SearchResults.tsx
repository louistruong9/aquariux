import { memo } from 'react'
import { CitySearchResult } from '@/types/search'

export interface SearchResultsProps {
  results: CitySearchResult[]
  onSelectCity: (city: CitySearchResult) => void
}

export const SearchResults = memo(({ results, onSelectCity }: SearchResultsProps) => {
  if (results.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-left">Search Results</h2>
      <div className="space-y-2 bg-white rounded-lg shadow-sm border border-gray-200">
        {results.map((city) => (
          <button
            key={`${city.lat}-${city.lon}`}
            onClick={() => onSelectCity(city)}
            className="w-full p-3 text-left"
          >
            <div className="font-medium text-gray-900">{city.name}</div>
            <div className="text-sm text-gray-600">
              {city.state ? `${city.state}, ` : ''}
              {city.country}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
})
