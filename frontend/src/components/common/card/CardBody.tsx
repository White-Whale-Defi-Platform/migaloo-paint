'use client'
import React, { PropsWithChildren, forwardRef, HTMLAttributes } from 'react'

const CardBody = forwardRef<HTMLDivElement, PropsWithChildren<HTMLAttributes<HTMLDivElement>>>(
  ({ children, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
      {...rest}>
      {children}
    </div>
  )
)

export default React.memo(CardBody)
