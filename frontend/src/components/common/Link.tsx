'use client'
import React, { type PropsWithChildren, forwardRef, type AnchorHTMLAttributes } from 'react'

const Link = forwardRef<HTMLAnchorElement, PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>>(
  ({ children, className, ...rest }, ref) => (
    <a
      ref={ref}
      className={`text-neutral-300 hover:underline underline-offset-2 hover:text-neutral-100 ${className}`}
      {...rest}>
      {children}
    </a>
  )
)

Link.displayName = 'Link'

export default React.memo(Link)
