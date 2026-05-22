'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import Reviews from '@/components/Reviews'
import ChatBox from '@/components/ChatBox'
import OnlineStatus from '@/components/OnlineStatus'
import { useStore } from '@/store/useStore'
import { Star, ShoppingCart, Truck, Shield, Package, Heart } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { VENDORS } from '@/lib/products'

export default function Produit() {
  const { id } = useParams()
  const { products, addToCart, getRecommended, userType, toggleWishlist, wishlist } = useStore()
  const [qty, setQty] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const product = products.find(p => p.id === id)
  const vendor = VENDORS.find(v => v.id === product?.vendeurId)
  const recommended = getRecommended(id)
  const isFavorite = wishlist.some(p => p.id === id)

  if (!product) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-xl">Produit introuvable</p>
        </main>
        <Footer />
      </div>
    )
  }

  const isGrossiste = userType === 'grossiste' && qty >= product.minGrossiste
  const prixFinal = isGrossiste? product.prixGrossiste : product.price
  const economie = isGrossiste? (product.price - product.prixGrossiste) * qty : 0

  const handleAddToCart = () => {
    addToCart(product, qty)
    toast.success(`${product.name} ajouté au panier`)
  }

  const handleWishlist = () => {
    toggleWishlist(product)
    toast.success(isFavorite? 'Retiré des favoris' : 'Ajouté aux favoris')
  }

  const images = [product.image, product.image, product.image]

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="bg-white p-4 rounded-md mb-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`border-2 rounded p-2 ${selectedImage === i? 'border-[#FF9900]' : 'border-gray-200'}`}
                >
                  <img src={img} className="w-full h-16 object-contain" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-md">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating)? 'fill-[#FF9900] text-[#FF9900]' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-blue-600">{product.reviews} avis</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <p className="text-sm text-blue-600">Vendu par <b>{vendor.nom}</b> ⭐ {vendor.note}</p>
              <OnlineStatus userId={vendor.id} userType="vendor" />
            </div>

            <div className="border-t border-b py-4 mb-4">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-red-600">
                  {prixFinal.toLocaleString()} FCFA
                </span>
                {product.promo > 0 && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {(product.price * (1 + product.promo/100)).toLocaleString()} FCFA
                    </span>
                    <span className="bg-red-600 text-white px-2 py-1 text-sm font-bold rounded">
                      -{product.promo}%
                    </span>
                  </>
                )}
              </div>

              {isGrossiste && (
                <div className="bg-green-50 border border-green-500 p-3 rounded mb-3">
                  <p className="text-green-700 font-bold flex items-center gap-2">
                    <Package size={18}/> Prix Grossiste Activé!
                  </p>
                  <p className="text-sm text-green-600">
                    Vous économisez {economie.toLocaleString()} FCFA sur cette commande
                  </p>
                </div>
              )}

              {!isGrossiste && product.prixGrossiste && (
                <p className="text-sm text-gray-600 mb-3">
                  Prix grossiste: <b className="text-green-600">{product.prixGrossiste.toLocaleString()} FCFA</b> dès {product.minGrossiste} unités
                </p>
              )}

              <p className={`text-sm mb-4 ${product.stock > 0? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0? `En stock - ${product.stock} disponibles` : 'Rupture de stock'}
              </p>

              <div className="flex items-center gap-4 mb-4">
                <label className="text-sm font-medium">Quantité:</label>
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mb-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 btn-amazon flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20}/> Ajouter au panier
                </button>
                <button
                  onClick={handleWishlist}
                  className={`p-3 border rounded hover:bg-gray-50 ${isFavorite? 'text-red-500' : ''}`}
                >
                  <Heart size={20} fill={isFavorite? '#FF0000' : 'none'} />
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Truck size={18} className="text-gray-600"/>
                  <span>Livraison gratuite à Yaoundé dès 25,000 FCFA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-gray-600"/>
                  <span>Garantie 7 jours - Retour facile</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-2">Description</h3>
              <p className="text-sm text-gray-700">{product.desc}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {product.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 px-3 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Reviews productId={id} />

        {recommended.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommended.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      <ChatBox
        vendorName={vendor.nom}
        vendorWhatsapp={vendor.whatsapp}
        productName={product.name}
      />
      <Footer />
    </div>
  )
}
