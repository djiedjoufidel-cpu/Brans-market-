'use client'
import { useCart } from '../context/CartContext'
import Price from '../components/Price'
import { getAllProducts } from '../lib/vendors'
import Link from 'next/link'

export default function HomePage() {
  const { addToCart } = useCart()
  const products = getAllProducts()

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h2 className="text-2xl font-bold">Marketplace BransMarket</h2>
        <Link 
          href="/vendors" 
          className="bg-white text-orange-600 px-4 py-2 rounded font-semibold text-sm hover:bg-orange-50"
        >
          Voir les boutiques
        </Link>
      </div>
      
      <div className="bg-white p-4 rounded-b-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Tous les produits</h3>
          <span className="text-sm text-gray-500">{products.length} produits</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div 
              key={`${product.vendorId}-${product.id}`} 
              className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow relative bg-white"
            >
              {product.discount && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                  -{product.discount}%
                </span>
              )}
              
              <Link href={`/produit/${product.id}`}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-2 cursor-pointer"
                />
              </Link>
              
              <Link href={`/produit/${product.id}`}>
                <h4 className="font-semibold text-sm mb-1 hover:text-blue-600 cursor-pointer">
                  {product.name}
                </h4>
              </Link>
              
              <Link 
                href={`/vendor/${product.vendorId}`}
                className="flex items-center gap-1 mb-2 hover:opacity-80"
              >
                <img src={product.vendorLogo} className="w-4 h-4 rounded-full" alt={product.vendorName} />
                <span className="text-xs text-gray-500">{product.vendorName}</span>
                {product.vendorVerified && <span className="text-blue-500 text-xs">✓</span>}
              </Link>
              
              <div className="flex items-center gap-1 mb-2">
                <span className="text-yellow-500 text-xs">★★★★☆</span>
                <span className="text-xs text-gray-500">4.5</span>
              </div>
              
              <p className="text-lg font-bold mb-2 text-blue-600">
                <Price value={product.price} />
              </p>
              
              {product.stock && product.stock < 10 && (
                <p className="text-xs text-red-500 mb-2">Plus que {product.stock} en stock</p>
              )}
              
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-orange-500 text-white py-2 rounded text-sm hover:bg-orange-600 font-semibold"
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
