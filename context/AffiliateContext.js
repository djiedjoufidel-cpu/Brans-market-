'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getAffiliateByCode } from '../lib/affiliates'

const AffiliateContext = createContext()

export function AffiliateProvider({ children }) {
  const [refCode, setRefCode] = useState(null)
  const [affiliate, setAffiliate] = useState(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    // 1. Check URL?ref=fidel
    const urlRef = searchParams.get('ref')

    // 2. Check localStorage si déjà tracké
    const savedRef = localStorage.getItem('bransmarket-ref')

    const code = urlRef || savedRef

    if (code) {
      const affiliateData = getAffiliateByCode(code)
      if (affiliateData) {
        setRefCode(code)
        setAffiliate(affiliateData)
        localStorage.setItem('bransmarket-ref', code)

        // Track le clic - envoie à Firebase plus tard
        console.log('Affiliate click tracked:', code)
      }
    }
  }, [searchParams])

  const clearRef = () => {
    setRefCode(null)
    setAffiliate(null)
    localStorage.removeItem('bransmarket-ref')
  }

  return (
    <AffiliateContext.Provider value={{ refCode, affiliate, clearRef }}>
      {children}
    </AffiliateContext.Provider>
  )
}

export const useAffiliate = () => useContext(AffiliateContext)
