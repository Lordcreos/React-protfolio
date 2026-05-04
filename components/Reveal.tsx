'use client'

import React, { useEffect, useRef, ElementType, HTMLAttributes } from 'react'

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  delay?: number
  children: React.ReactNode
}

export function Reveal({ as: As = 'div', delay = 0, children, className, style, ...props }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('in')
            io.unobserve(el)
          }
        })
      },
      { rootMargin: '-80px 0px -40px 0px', threshold: 0.05 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const Tag = As as React.ElementType
  return (
    <Tag
      ref={ref}
      {...props}
      className={`rv ${className ?? ''}`}
      style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  )
}
