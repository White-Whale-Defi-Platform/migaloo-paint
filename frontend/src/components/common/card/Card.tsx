'use client';
import React, { PropsWithChildren, forwardRef, HTMLAttributes } from 'react'

const Card = forwardRef<HTMLDivElement, PropsWithChildren<HTMLAttributes<HTMLDivElement>>>(
  ({ children, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col gap-8 bg-neutral-900 rounded-3xl p-8 ${className}`}
      {...rest}>
      {children}
    </div>
  )
)

export default React.memo(Card)
