import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchState {
  searchHistory: string[];
  addToHistory: (city: string) => void;
  removeFromHistory: (city: string) => void;
  clearHistory: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      searchHistory: [],
      addToHistory: (city) =>
        set((state) => ({
          searchHistory: [
            city,
            ...state.searchHistory.filter((item) => item !== city),
          ].slice(0, 6),
        })),
      removeFromHistory: (city) =>
        set((state) => ({
          searchHistory: state.searchHistory.filter((item) => item !== city),
        })),
      clearHistory: () => set({ searchHistory: [] }),
    }),
    {
      name: 'search-history',
    }
  )
); 