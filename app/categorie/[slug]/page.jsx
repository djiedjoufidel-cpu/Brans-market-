'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { useParams } from 'next/navigation'

const allProducts = [
  { id: 1, name: "Samsung Galaxy A55 5G 256Go", price: "185000", image: "https://picsum.photos/seed/phone1/300", reviews: 142, promo: 20, stock: 5, cat: "electronique" },
  { id: 2, name: "iPhone 13 128Go Reconditionné Grade A+", price: "320000", image: "https://picsum.photos/seed/phone2/300", reviews: 89, stock: 15, cat: "electronique" },
  { id: 3, name: "T-shirt Coton Bio Lot de 3 Pièces", price: "12000", image: "https://picsum.photos/seed/shirt/300", reviews: 234, promo: 15, stock: 3, cat: "mode" },
  { id: 4, name: "Mixeur Blender Pro 1000W Inox", price: "25000", image: "https://picsum.photos/seed/mixeur/300", reviews: 67, stock: 20, cat: "maison" },
  { id: 5, name: "Ordinateur Portable HP 15.6\" i5 8Go", price: "285000", image: "https://picsum.photos/seed/laptop/300", reviews: 201, promo: 10, stock: 8, cat: "electronique" },
  { id: 6, name: "Chaussures Nike Air Max Running", price: "45000", image: "https://picsum.photos/seed/shoes/300", reviews: 312, stock: 12, cat: "mode" },
  { id: 7, name: "Télévision Smart TV 43\" 4K Android", price: "175000", image: "https://picsum.photos/seed/tv/300", reviews: 98, promo: 25, stock: 4, cat: "electronique" },
  { id: 8, name: "Parfum Homme Eau de Toilette 100ml", price: "18000", image: "https://picsum.photos/seed/parfum/300", reviews: 156, stock: 25, cat: "maison" },
]

const catNames = {
  electronique: "Électronique",
  mode: "Mode & Vêtements",
  maison: "Maison & Cuisine"
}

export default function Categorie() {
  const params = useParams()
  const products = allProducts.filter(p => p.cat === params.slug)

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h1 className="text-3xl font-bold mb-6 capitalize">{catNames[params.slug] || params.slug}</h1>
          {products.length === 0? (
            <p className="text-gray-500 py-16 text-center">Aucun produit dans cette catégorie.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
