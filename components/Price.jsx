'use client'
import { useEffect, useState } from 'react'

export default function Price({ value }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return <span>{value} FCFA</span>
  }
  
  return <span>{value.toLocaleString('fr-FR')} FCFA</span>
}
