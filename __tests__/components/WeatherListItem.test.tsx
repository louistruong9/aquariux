import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { WeatherListItem } from '@/components/WeatherListItem'

describe('WeatherListItem', () => {
  const mockProps = {
    date: '2024-03-23',
    time: '12:00',
    minTemp: 20,
    maxTemp: 25,
    description: 'Clear sky',
    icon: '01d'
  }

  it('renders time correctly', () => {
    render(<WeatherListItem {...mockProps} />)
    expect(screen.getByText('12:00')).toBeInTheDocument()
  })

  it('renders weather icon with correct source', () => {
    render(<WeatherListItem {...mockProps} />)
    const icon = screen.getByAltText('Clear sky')
    expect(icon).toHaveAttribute('src', 'https://openweathermap.org/img/wn/01d.png')
    expect(icon).toHaveClass('w-10', 'h-10')
  })

  it('renders temperature range correctly', () => {
    render(<WeatherListItem {...mockProps} />)
    expect(screen.getByText('20°C')).toBeInTheDocument()
    expect(screen.getByText('25°C')).toBeInTheDocument()
  })

  it('renders weather description correctly', () => {
    render(<WeatherListItem {...mockProps} />)
    expect(screen.getByText('Clear sky')).toBeInTheDocument()
  })
}) 