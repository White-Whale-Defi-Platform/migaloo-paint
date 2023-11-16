'use client'
import React, { type PropsWithChildren, forwardRef, type HTMLAttributes } from 'react'

const CardContent = forwardRef<HTMLDivElement, PropsWithChildren<HTMLAttributes<HTMLDivElement>>>(
  ({ children, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={`w-full gap-2 ${className}`}
      {...rest}>
      {children}
    </div>
  )
)
CardContent.displayName = 'CardContent'
export default React.memo(CardContent)
