import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SearchResults } from '@/components/SearchResults'

describe('SearchResults', () => {
  const mockResults = [
    { name: 'London', country: 'GB', state: 'England', lat: 51.5074, lon: -0.1278, local_names: {} },
    { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522, local_names: {} }
  ]

  it('renders search results', () => {
    render(<SearchResults results={mockResults} onSelectCity={vi.fn()} />)
    
    expect(screen.getByText('London')).toBeInTheDocument()
    expect(screen.getByText('Paris')).toBeInTheDocument()
  })

  it('includes state name in result when available', () => {
    render(<SearchResults results={mockResults} onSelectCity={vi.fn()} />)
    expect(screen.getByText('London')).toBeInTheDocument()
    expect(screen.getByText('England, GB')).toBeInTheDocument()
  })

  it('calls onSelectCity with city data when clicked', () => {
    const handleSelectCity = vi.fn()
    render(<SearchResults results={mockResults} onSelectCity={handleSelectCity} />)
    
    fireEvent.click(screen.getByText('Paris'))
    expect(handleSelectCity).toHaveBeenCalledWith(mockResults[1])
  })

  it('renders no results when array is empty', () => {
    render(<SearchResults results={[]} onSelectCity={vi.fn()} />)
    expect(screen.queryByText('Search Results')).not.toBeInTheDocument()
  })
})
