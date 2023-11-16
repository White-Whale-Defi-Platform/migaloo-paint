'use client'
import React, { type PropsWithChildren, forwardRef, type HTMLAttributes } from 'react'

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

Card.displayName = 'Card'

export default React.memo(Card)
