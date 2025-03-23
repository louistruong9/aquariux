import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SearchHistory } from '@/components/SearchHistory'
import { useSearchStore } from '@/store/searchStore'

vi.mock('@/store/searchStore', () => ({
  useSearchStore: vi.fn(),
}))

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

describe('SearchHistory', () => {
  const mockHistory = ['London, GB', 'Paris, FR', 'Tokyo, JP']
  const mockRemoveFromHistory = vi.fn()
  const mockAddToHistory = vi.fn()

  beforeEach(() => {
    vi.mocked(useSearchStore).mockReturnValue({
      searchHistory: mockHistory,
      removeFromHistory: mockRemoveFromHistory,
      addToHistory: mockAddToHistory,
    })
  })

  it('renders search history items', () => {
    render(<SearchHistory />)

    mockHistory.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument()
    })
  })

  it('calls addToHistory when history item is clicked', () => {
    render(<SearchHistory />)

    fireEvent.click(screen.getByText('London, GB'))
    expect(mockAddToHistory).toHaveBeenCalledWith('London, GB')
  })

  it('calls removeFromHistory when delete button is clicked', () => {
    render(<SearchHistory />)

    const deleteButtons = screen.getAllByRole('button')
    fireEvent.click(deleteButtons[1])

    expect(mockRemoveFromHistory).toHaveBeenCalledWith('London, GB')
  })
})
