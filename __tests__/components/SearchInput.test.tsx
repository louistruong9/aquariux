import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SearchInput } from '@/components/SearchInput'
import { useSearchStore } from '@/store/searchStore'
import { useNavigate } from 'react-router-dom'

vi.mock('@/store/searchStore', () => ({
  useSearchStore: vi.fn()
}))

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}))

describe('SearchInput', () => {
  const mockAddToHistory = vi.fn()
  const mockNavigate = vi.fn()

  beforeEach(() => {
    vi.mocked(useSearchStore).mockImplementation((selector) => {
      const state = {
        searchHistory: [],
        addToHistory: mockAddToHistory,
        removeFromHistory: vi.fn(),
        clearHistory: vi.fn()
      }
      if (selector) {
        return selector(state)
      }
      return state
    })
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
  })

  it('renders input field and search button', () => {
    render(<SearchInput />)
    
    expect(screen.getByPlaceholderText('Search country or city here...')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls addToHistory and navigate when button is clicked', () => {
    render(<SearchInput />)
    
    const input = screen.getByPlaceholderText('Search country or city here...')
    fireEvent.change(input, { target: { value: 'London' } })
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(mockAddToHistory).toHaveBeenCalledWith('London')
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('calls addToHistory and navigate when Enter key is pressed', () => {
    render(<SearchInput />)
    
    const input = screen.getByPlaceholderText('Search country or city here...')
    fireEvent.change(input, { target: { value: 'London' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    
    expect(mockAddToHistory).toHaveBeenCalledWith('London')
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('shows error when input is too short', () => {
    const onError = vi.fn()
    render(<SearchInput onError={onError} />)
    
    const input = screen.getByPlaceholderText('Search country or city here...')
    fireEvent.change(input, { target: { value: 'L' } })
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(onError).toHaveBeenCalledWith('Invalid country or city')
  })
})
