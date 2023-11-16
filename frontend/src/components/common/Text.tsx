'use client'
import React, { type PropsWithChildren, forwardRef, type HTMLAttributes } from 'react'

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
Text.displayName = 'Text'
export default React.memo(Text)
