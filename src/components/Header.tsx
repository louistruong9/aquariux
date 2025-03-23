import { memo } from 'react'
import { MapPin, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { HeaderProps } from '@/types/weather'

export const Header = memo(({ city, isShowSearch = true }: HeaderProps) => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-gray-500" />
        <span className="text-lg font-medium">{city}</span>
      </div>
      {isShowSearch && (
        <button
          onClick={() => navigate('/search')}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
      )}
    </div>
  )
})
