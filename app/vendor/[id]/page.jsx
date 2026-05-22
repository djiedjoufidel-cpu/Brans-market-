'use client'
import { vendors } from '../../../../lib/vendors'
import { useCart } from '../../../../context/CartContext'
import Price from '../../../../components/Price'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function VendorShopPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const vendor = vendors.find(v => v.id === id)
  
  if (!vendor) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl mb-4">Boutique introuvable</h1>
        <Link href="/vendors" className="text-blue-600">Voir toutes les boutiques</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* BANNER VENDEUR */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <div className="max-w-4xl mx-auto flex items-center gap-6">
          <img 
            src={vendor.logo} 
            alt={vendor.name}
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{vendor.name}</h1>
              {vendor.verified && (
                <span className="bg-white text-blue-600 text-sm px-3 py-1 rounded-full font-semibold">
                  ✓ Vendeur Vérifié
                </span>
              )}
            </div>
            <p className="text-blue-100 mb-2">{vendor.description}</p>
            <div className="flex gap-4 text-sm">
              <span>⭐ {vendor.rating}/5</span>
              <span>{vendor.followers.toLocaleString('fr-FR')} abonnés</span>
              <span>{vendor.products.length} produits</span>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUITS DU VENDEUR */}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">Produits de {vendor.name}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {vendor.products.map((product) => (
            <div key={product.id} className="border rounded-lg p-3 shadow-sm relative bg-white">
              {product.discount && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  -{product.discount}%
                </span>
              )}
              
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              
              <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
              
              <p className="text-lg font-bold mb-2 text-blue-600">
                <Price value={product.price} />
              </p>
              
              {product.stock && (
                <p className="text-xs text-red-500 mb-2">Plus que {product.stock} en stock</p>
              )}
              
              <button
                onClick={() => addToCart({...product, vendorName: vendor.name})}
                className="w-full bg-orange-500 text-white py-2 rounded text-sm hover:bg-orange-600"
              >
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
