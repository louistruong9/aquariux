import { useSearchStore } from '@/store/searchStore'
import { describe, it, expect, beforeEach } from 'vitest'
describe('searchStore', () => {
  beforeEach(() => {
    useSearchStore.setState({
      searchHistory: [],
    })
  })

  it('should add city to history', () => {
    const city = 'Test City, TC'
    useSearchStore.getState().addToHistory(city)
    expect(useSearchStore.getState().searchHistory).toContain(city)
  })

  it('should remove city from history', () => {
    const city = 'Test City, TC'
    useSearchStore.getState().addToHistory(city)
    useSearchStore.getState().removeFromHistory(city)
    expect(useSearchStore.getState().searchHistory).not.toContain(city)
  })

  it('should clear history', () => {
    useSearchStore.getState().addToHistory('City 1')
    useSearchStore.getState().addToHistory('City 2')
    useSearchStore.getState().clearHistory()
    expect(useSearchStore.getState().searchHistory).toHaveLength(0)
  })

  it('should keep only last 6 searches', () => {
    const cities = ['City 1', 'City 2', 'City 3', 'City 4', 'City 5', 'City 6', 'City 7']
    cities.forEach((city) => useSearchStore.getState().addToHistory(city))
    expect(useSearchStore.getState().searchHistory).toHaveLength(6)
    expect(useSearchStore.getState().searchHistory[0]).toBe('City 7')
  })

  it('should move existing city to top when added again', () => {
    const city = 'Test City, TC'
    useSearchStore.getState().addToHistory('City 1')
    useSearchStore.getState().addToHistory(city)
    useSearchStore.getState().addToHistory('City 2')
    useSearchStore.getState().addToHistory(city)
    expect(useSearchStore.getState().searchHistory[0]).toBe(city)
  })

  it('should persist state', () => {
    useSearchStore.getState().addToHistory('Test City, TC')
    const persistedState = JSON.parse(localStorage.getItem('search-history') || '{}')
    expect(persistedState.state.searchHistory).toContain('Test City, TC')
  })
})
