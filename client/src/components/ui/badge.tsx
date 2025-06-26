import React from 'react'
import classNames from 'classnames'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'success' | 'danger'
  className?: string
}

export const Badge = ({
  children,
  variant = 'default',
  className = ''
}: BadgeProps) => {
  const baseStyle = 'inline-block px-2 py-1 text-xs font-semibold rounded-full'
  const variants: Record<typeof variant, string> = {
    default: 'bg-gray-200 text-gray-800',
    outline: 'border border-gray-400 text-gray-800',
    success: 'bg-green-200 text-green-800',
    danger: 'bg-red-200 text-red-800'
  }

  return (
    <span className={classNames(baseStyle, variants[variant], className)}>
      {children}
    </span>
  )
}
