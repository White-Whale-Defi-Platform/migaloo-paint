'use client'
import React, { forwardRef, type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, className, ...rest }, ref) => {
    let variantClasses = ''

    switch (variant) {
      case 'primary':
        variantClasses = 'text-green-400 bg-green-500 bg-opacity-30 hover:bg-green-400 hover:bg-opacity-40'
        break
      case 'secondary':
        variantClasses = 'text-neutral-300 bg-neutral-800 border border-solid border-neutral-600 hover:bg-neutral-700 hover:border-neutral-400 hover:text-neutral-200'
        break
      default:
        variantClasses = 'bg-gray-200 hover:bg-gray-400 text-black'
    }

    return (
      <button
        ref={ref}
        className={`rounded-xl p-2 font-medium transition-all duration-300 ease-in-out ${variantClasses} ${className}`}
        {...rest}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default React.memo(Button)
