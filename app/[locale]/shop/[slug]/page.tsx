import ShopPageClient from './ShopPageClient'

export default async function ShopPage({
  params
}: {
  params: { slug: string; locale: string }
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
