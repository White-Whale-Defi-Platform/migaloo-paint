'use client'
import React, { type PropsWithChildren, forwardRef, type HTMLAttributes } from 'react'

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

Box.displayName = 'Box'

export default React.memo(Box)
