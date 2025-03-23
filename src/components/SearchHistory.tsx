import { Search, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSearchStore } from '@/store/searchStore'

export const SearchHistory = () => {
  const navigate = useNavigate()
  const { searchHistory, removeFromHistory, addToHistory } = useSearchStore()

  const handleSearchClick = (city: string) => {
    addToHistory(city)
    navigate('/')
  }

  if (searchHistory.length === 0) {
    return null
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium mb-4 text-left">Search History</h2>
      <div className="space-y-2 bg-white rounded-lg shadow-sm border border-gray-200">
        {searchHistory.map((city) => (
          <div
            key={city}
            className="flex items-center justify-between p-4"
          >
            <div onClick={() => handleSearchClick(city)} className="text-sm cursor-pointer">{city}</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSearchClick(city)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => removeFromHistory(city)}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
