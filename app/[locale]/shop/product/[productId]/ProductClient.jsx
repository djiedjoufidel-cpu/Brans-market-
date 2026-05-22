'use client'

import { useTranslations } from 'next-intl'

export default function ProductClient({ product, locale, slug }) {
  const t = useTranslations('Product')
  const tCommon = useTranslations('Common')
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-2xl text-green-600">{product.price} FCFA</p>
      <p className="mt-4">{product.desc}</p>
    </div>
  )
}
