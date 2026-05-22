'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import OnlineStatus from '@/components/OnlineStatus'
import { VENDORS } from '@/lib/products'
import { Store, Star, Package, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'

export default function Grossistes() {
  const [filterOnline, setFilterOnline] = useState(false)

  const vendors = VENDORS.filter(v => v.type.includes('Grossiste') || v.type.includes('Vendeur'))

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Store className="text-[#FF9900]" /> Nos Vendeurs & Grossistes
            </h1>
            <p className="text-gray-600 mt-1">Contacte directement les vendeurs vérifiés</p>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filterOnline}
              onChange={(e) => setFilterOnline(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">En ligne uniquement</span>
          </label>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map(vendor => (
            <div key={vendor.id} className="bg-white p-6 rounded-md border hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={vendor.logo} className="w-14 h-14 rounded-full border-2" />
                  <div>
                    <p className="font-bold text-lg">{vendor.nom}</p>
                    <OnlineStatus userId={vendor.id} userType="vendor" />
                  </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-[#FF9900] text-[#FF9900]" />
                    <span className="font-bold">{vendor.note}</span>
                  </div>
                  <p className="text-xs text-gray-500">{vendor.totalVentes} ventes</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Package size={16} />
                  <span>{vendor.type}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} />
                  <span>Yaoundé, Cameroun</span>
                </div>
              </div>

              <div className="border-t pt-4 flex gap-2">
                <a
                  href={`https://wa.me/${vendor.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-amazon flex items-center justify-center gap-2 text-sm"
                >
                  <Phone size={16} /> WhatsApp
                </a>
                <a
                  href={`/shop?vendeur=${vendor.id}`}
                  className="px-4 py-2 border rounded hover:bg-gray-50 text-sm font-medium"
                >
                  Voir produits
                </a>
              </div>
            </div>
          ))}
        </div>

        {vendors.length === 0 && (
          <div className="bg-white p-12 rounded-md text-center">
            <Store size={64} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600">Aucun vendeur trouvé</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
