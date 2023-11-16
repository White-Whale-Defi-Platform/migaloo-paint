'use client'
import React, { type PropsWithChildren, forwardRef, type HTMLAttributes } from 'react'

const CardHeading = forwardRef<HTMLDivElement, PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>>(
  ({ children, className, ...rest }, ref) => (
    <h2
      ref={ref}
      className={`text-xl font-medium text-center ${className}`}
      {...rest}>
      {children}
    </h2>
  )
)
CardHeading.displayName = 'CardHeading'
export default React.memo(CardHeading)
