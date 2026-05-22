import {useTranslations} from 'next-intl'

export default async function ProductPage({ 
  params 
}: { 
  params: { slug: string, productId: string, locale: string } 
}) {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
  
  // D’abord récupère le shopId à partir du slug
  const slugRes = await fetch(`${baseUrl}/api/shop-by-slug?slug=${params.slug}`, { cache: 'no-store' })
  const { id: shopId } = await slugRes.json()
  
  if (!shopId) return <div className="p-4 text-center">Produit introuvable</div>
  
  const productRes = await fetch(`${baseUrl}/api/products/${params.productId}?shopId=${shopId}`, { cache: 'no-store' })
  const product = await productRes.json()
  
  if (!product) return <div className="p-4 text-center">Produit introuvable</div>
  
  return <ProductClient product={product} locale={params.locale} slug={params.slug} />
}

'use client'
function ProductClient({ product, locale, slug }: any) {
  const t = useTranslations('Product')
  const tCommon = useTranslations('Common')

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <a href={`/${locale}/shop/${slug}`} className="text-brand-600 hover:underline">← Retour</a>
      
      <div className="grid md:grid-cols-2 gap-8 mt-4">
        {product.imageUrl && (
          <img src={product.imageUrl} className="w-full rounded-xl shadow-lg" alt={product.name} />
        )}
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-4xl font-bold text-brand-600">{product.price} FCFA</p>
          
          <div className="card">
            <p className="text-muted mb-2">{t('quantity')}</p>
            <input type="number" defaultValue="1" min="1" className="border p-2 w-full rounded-lg" />
            <button className="btn-primary w-full mt-4">
              {tCommon('order')}
            </button>
          </div>
          
          <button className="border border-brand-500 text-brand-600 w-full py-3 rounded-lg hover:bg-brand-50">
            {tCommon('contactSeller')}
          </button>
        </div>
      </div>
    </div>
  )
}
