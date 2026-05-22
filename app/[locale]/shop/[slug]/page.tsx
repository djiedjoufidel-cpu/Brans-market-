import {useTranslations} from 'next-intl'

export default async function ShopPage({ 
  params 
}: { 
  params: { slug: string, locale: string } 
}) {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
  
  const slugRes = await fetch(`${baseUrl}/api/shop-by-slug?slug=${params.slug}`, { cache: 'no-store' })
  const data = await slugRes.json()
  
  if (!data?.id) return <div className="p-4 text-center text-lg">Boutique introuvable</div>
  
  const shopRes = await fetch(`${baseUrl}/api/shops/${data.id}`, { cache: 'no-store' })
  const shop = await shopRes.json()
  
  const productsRes = await fetch(`${baseUrl}/api/products?shopId=${data.id}`, { cache: 'no-store' })
  const products = await productsRes.json()

  return <ShopPageClient shop={shop} products={products} locale={params.locale} />
}

'use client'
function ShopPageClient({ shop, products, locale }: any) {
  const t = useTranslations('Shop')
  const tCommon = useTranslations('Common')

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header avec gradient */}
      <div className="gradient-bg rounded-2xl p-6 text-white mb-8 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold">{shop.name}</h1>
            <p className="mt-2 opacity-90">{t('products')}</p>
          </div>
          
          <select 
            value={locale} 
            onChange={e => window.location.href = `/${e.target.value}/shop/${shop.slug}`}
            className="bg-white/20 backdrop-blur-sm border-white/30 text-white px-4 py-2 rounded-lg focus:outline-none"
          >
            <option value="fr" className="text-gray-900">🇫🇷 Français</option>
            <option value="en" className="text-gray-900">🇬🇧 English</option>
          </select>
        </div>
      </div>
      
      {products.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-muted text-lg">{t('noProducts')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p: any) => (
            <a 
              key={p.id} 
              href={`/${locale}/shop/${shop.slug}/product/${p.id}`} 
              className="card hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {p.imageUrl && (
                <div className="overflow-hidden rounded-lg mb-3">
                  <img 
                    src={p.imageUrl} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" 
                    alt={p.name} 
                  />
                </div>
              )}
              <div className="space-y-3">
                <h3 className="font-bold text-lg line-clamp-2">{p.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-brand-600">{p.price} FCFA</span>
                  <span className="badge">{tCommon('price')}</span>
                </div>
                <button className="btn-primary w-full">
                  {tCommon('order')}
                </button>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
