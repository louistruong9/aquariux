import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchStore } from '@/store/searchStore'

interface SearchInputProps {
  onError?: (message: string) => void
}

export const SearchInput = ({ onError }: SearchInputProps) => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const addToHistory = useSearchStore((state) => state.addToHistory)

  const handleSearch = () => {
    const trimmedQuery = query.trim()
    if (!trimmedQuery) {
      onError?.('Please enter a city name')
      return
    }

    if (trimmedQuery.length < 2) {
      onError?.('Invalid country or city')
      return
    }

    addToHistory(trimmedQuery)
    navigate('/')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search country or city here..."
        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Search
      </button>
    </div>
  )
}
