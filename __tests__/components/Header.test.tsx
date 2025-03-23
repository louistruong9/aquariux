import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Header } from '@/components/Header'
import { BrowserRouter } from 'react-router-dom'

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Header', () => {
  it('renders city name', () => {
    renderWithRouter(<Header city="London" />)
    expect(screen.getByText('London')).toBeInTheDocument()
  })

  it('renders with search icon when isShowSearch is true', () => {
    renderWithRouter(<Header city="London" isShowSearch={true} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('does not render search icon when isShowSearch is false', () => {
    renderWithRouter(<Header city="London" isShowSearch={false} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
