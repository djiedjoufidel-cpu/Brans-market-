import ProductClient from './ProductClient'

export default async function ProductPage({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/products/${params.productId}`, { cache: 'no-store' })
  const product = await res.json()

  return <ProductClient product={product} locale={params.locale} slug={params.slug} />
}
