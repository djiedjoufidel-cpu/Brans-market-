'use client'
import { vendors } from '../../lib/vendors'
import Link from 'next/link'
import Price from '../../components/Price'

export default function VendorsPage() {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Marketplace Multi-Vendeurs</h1>
        <p className="text-gray-600">Découvre {vendors.length} boutiques camerounaises</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <Link key={vendor.id} href={`/vendor/${vendor.id}`}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={vendor.logo} 
                  alt={vendor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{vendor.name}</h3>
                    {vendor.verified && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">✓</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>⭐ {vendor.rating}</span>
                    <span>{vendor.followers.toLocaleString('fr-FR')} abonnés</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{vendor.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">{vendor.products.length} produits</span>
                <span className="text-blue-600 text-sm font-semibold">Voir la boutique →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
