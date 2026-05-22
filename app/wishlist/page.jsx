'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { useStore } from '@/store/useStore'
import { Heart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useStore()

  const moveAllToCart = () => {
    wishlist.forEach(p => addToCart(p, 1))
    toast.success('Tous les favoris ajoutés au panier')
  }

  const clearWishlist = () => {
    wishlist.forEach(p => toggleWishlist(p))
    toast.success('Favoris vidés')
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Heart className="text-red-500" fill="#FF0000"/> Mes Favoris ({wishlist.length})
          </h1>
          {wishlist.length > 0 && (
            <div className="flex gap-3">
              <button onClick={moveAllToCart} className="btn-amazon">
                Tout ajouter au panier
              </button>
              <button onClick={clearWishlist} className="border px-4 py-2 rounded flex items-center gap-2 hover:bg-red-50 text-red-600">
                <Trash2 size={18}/> Vider
              </button>
            </div>
          )}
        </div>

        {wishlist.length === 0? (
          <div className="bg-white p-12 rounded-md text-center">
            <Heart size={64} className="mx-auto mb-4 text-gray-300"/>
            <p className="text-gray-600 mb-4 text-lg">Aucun favori pour l'instant</p>
            <p className="text-sm text-gray-500 mb-6">Clique sur ❤️ sur un produit pour l'ajouter ici</p>
            <Link href="/shop" className="btn-amazon inline-block">
              Découvrir des produits
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
