'use client'
 
import * as React from 'react'
import { useEffect } from 'react'
 
export function Registry({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add('antialiased')
  }, [])
 
  return children
}