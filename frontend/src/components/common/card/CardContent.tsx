'use client'
import React, { PropsWithChildren, forwardRef, HTMLAttributes } from 'react'

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

export default React.memo(CardContent)
