'use client'
import React, { type PropsWithChildren, forwardRef, type HTMLAttributes } from 'react'

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
CardBody.displayName = 'CardBody'
export default React.memo(CardBody)
