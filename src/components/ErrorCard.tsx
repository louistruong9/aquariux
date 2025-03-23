import { memo } from 'react'

export const ErrorCard = memo(({ error }: { error: string }) => {
  return (
    <div
      className="max-w-2xl mx-auto p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm"
      role="alert"
    >
      <div className="flex items-center justify-center space-x-2">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    </div>
  )
})
