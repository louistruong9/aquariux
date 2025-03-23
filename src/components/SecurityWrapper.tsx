import { ReactNode, useEffect } from 'react'

interface SecurityWrapperProps {
  children: ReactNode
}

export const SecurityWrapper = ({ children }: SecurityWrapperProps) => {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.setAttribute('http-equiv', 'Content-Security-Policy')
    meta.setAttribute(
      'content',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https://openweathermap.org data:; connect-src 'self' https://api.openweathermap.org https://*.openweathermap.org;"
    )
    document.head.appendChild(meta)

    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  return (
    <div className="security-wrapper" data-testid="security-wrapper">
      {children}
    </div>
  )
}
