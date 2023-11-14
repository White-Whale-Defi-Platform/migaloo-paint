'use client'
import React, { PropsWithChildren, forwardRef, HTMLAttributes } from 'react'

const Text = forwardRef<HTMLDivElement, PropsWithChildren<HTMLAttributes<HTMLSpanElement>>>(
  ({ children, className, ...rest }, ref) => (
    <span
      ref={ref}
      className={`text-neutral-300 ${className}`}
      {...rest}>
      {children}
    </span>
  )
)

export default React.memo(Text)
