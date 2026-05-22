'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useStore } from '@/store/useStore'
import { Package, Clock, CheckCircle, XCircle, Truck, Eye } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

// Mock commandes - En prod: vient de Firebase
const MOCK_COMMANDES = [
  {
    id: 'CMD-2026-001',
    date: '2026-05-07T10:30:00',
    status: 'Livrée',
    total: 45500,
    items: [
      { name: 'iPhone 15 Pro Max', qty: 1, price: 42000, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200' },
      { name: 'Sac à dos', qty: 1, price: 2500, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200' }
    ],
    livraison: { ville: 'Yaoundé', quartier: 'Bastos', frais: 1000 }
  },
  {
    id: 'CMD-2026-002',
    date: '2026-05-08T08:15:00',
    status: 'En cours',
    total: 14000,
    items: [
      { name: 'Écouteurs Bluetooth', qty: 2, price: 7000, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' }
    ],
    livraison: { ville: 'Douala', quartier: 'Akwa', frais: 1500 }
  },
  {
    id: 'CMD-2026-003',
    date: '2026-05-08T09:45:00',
    status: 'Annulée',
    total: 18000,
    items: [
      { name: 'Chaussures Nike', qty: 1, price: 18000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200' }
    ],
    livraison: { ville: 'Yaoundé', quartier: 'Mvan', frais: 1000 }
  }
]

export default function Commandes() {
  const { userType } = useStore()
  const [selectedCommande, setSelectedCommande] = useState(null)
  const [filter, setFilter] = useState('toutes')

  const getStatusColor = (status) => {
    switch(status) {
      case 'Livrée': return 'bg-green-100 text-green-700'
      case 'En cours': return 'bg-blue-100 text-blue-700'
      case 'Annulée': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Livrée': return <CheckCircle size={20} />
      case 'En cours': return <Truck size={20} />
      case 'Annulée': return <XCircle size={20} />
      default: return <Clock size={20} />
    }
  }

  const filteredCommandes = filter === 'toutes'
  ? MOCK_COMMANDES
    : MOCK_COMMANDES.filter(c => c.status === filter)

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Package className="text-[#FF9900]" /> Mes Commandes
        </h1>

        <div className="flex gap-3 mb-6 overflow-x-auto">
          {['toutes', 'En cours', 'Livrée', 'Annulée'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === f
               ? 'bg-[#FF9900] text-black'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {f === 'toutes'? 'Toutes' : f}
            </button>
          ))}
        </div>

        {filteredCommandes.length === 0? (
          <div className="bg-white p-12 rounded-md text-center">
            <Package size={64} className="mx-auto mb-4 text-gray-300" />
            <p className="text-xl text-gray-600 mb-4">Aucune commande</p>
            <Link href="/shop" className="btn-amazon inline-block">
              Commencer vos achats
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCommandes.map(commande => (
              <div key={commande.id} className="bg-white rounded-md shadow hover:shadow-lg transition">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg">{commande.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 ${getStatusColor(commande.status)}`}>
                          {getStatusIcon(commande.status)}
                          {commande.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Clock size={16} /> {formatDate(commande.date)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Livraison: {commande.livraison.ville} - {commande.livraison.quartier}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-600">
                        {commande.total.toLocaleString()} FCFA
                      </p>
                      <button
                        onClick={() => setSelectedCommande(commande)}
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-2"
                      >
                        <Eye size={16} /> Détails
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {commande.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded min-w-[250px]">
                        <img src={item.image} className="w-16 h-16 object-contain" />
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                          <p className="text-xs text-gray-600">
                            Qté: {item.qty} x {item.price.toLocaleString()} FCFA
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {commande.status === 'En cours' && (
                    <div className="mt-4 bg-blue-50 border border-blue-200 p-4 rounded">
                      <p className="text-sm font-bold text-blue-700 mb-2">Suivi de livraison</p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-1">✓</div>
                          <p>Confirmée</p>
                        </div>
                        <div className="flex-1 h-1 bg-blue-600 mx-2"></div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-1">✓</div>
                          <p>Préparée</p>
                        </div>
                        <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center mx-auto mb-1">3</div>
                          <p>En route</p>
                        </div>
                        <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center mx-auto mb-1">4</div>
                          <p>Livrée</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedCommande && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCommande(null)}>
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-2xl font-bold">Détails {selectedCommande.id}</h2>
                <button onClick={() => setSelectedCommande(null)} className="text-gray-500 hover:text-black">✕</button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="font-bold mb-3">Produits</h3>
                  {selectedCommande.items.map((item, i) => (
                    <div key={i} className="flex gap-4 mb-3 border-b pb-3">
                      <img src={item.image} className="w-20 h-20 object-contain" />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantité: {item.qty}</p>
                        <p className="text-sm font-bold">{(item.price * item.qty).toLocaleString()} FCFA</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sous-total</span>
                    <span>{(selectedCommande.total - selectedCommande.livraison.frais).toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Livraison</span>
                    <span>{selectedCommande.livraison.frais.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-red-600">{selectedCommande.total.toLocaleString()} FCFA</span>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 p-4 rounded">
                  <h3 className="font-bold mb-2">Adresse de livraison</h3>
                  <p className="text-sm">{selectedCommande.livraison.ville} - {selectedCommande.livraison.quartier}</p>
                </div>

                {selectedCommande.status === 'En cours' && (
                  <a
                    href={`https://wa.me/237699999999?text=Bonjour, je veux suivre ma commande ${selectedCommande.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-amazon w-full mt-6 flex items-center justify-center gap-2"
                  >
                    <Phone size={18} /> Contacter sur WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
