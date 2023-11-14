'use client'
import React, { PropsWithChildren, forwardRef, HTMLAttributes } from 'react'

const Container = forwardRef<HTMLDivElement, PropsWithChildren<HTMLAttributes<HTMLDivElement>>>(
  ({ children, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={className}
      {...rest}>
      {children}
    </div>
  )
)

export default React.memo(Container)
