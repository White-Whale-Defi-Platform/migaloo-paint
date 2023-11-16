'use client'
import React, { type PropsWithChildren, forwardRef, type HTMLAttributes } from 'react'

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
Container.displayName = 'Container'
export default React.memo(Container)
