'use client'
import React, { PropsWithChildren, forwardRef, HTMLAttributes } from 'react'

const Box = forwardRef<HTMLDivElement, PropsWithChildren<HTMLAttributes<HTMLDivElement>>>(
  ({ children, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={`p-2 rounded-xl border border-solid border-neutral-600 ${className}`}
      {...rest}>
      {children}
    </div>
  )
)

export default React.memo(Box)
