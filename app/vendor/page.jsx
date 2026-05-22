'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HorairesOuverture from '@/components/HorairesOuverture'
import { useStore } from '@/store/useStore'
import { Package, TrendingUp, DollarSign, BarChart3, Edit, Trash2, Plus } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function VendorDashboard() {
  const { products, userType } = useStore()
  const [myProducts, setMyProducts] = useState(products.slice(0, 6))

  const stats = {
    produits: myProducts.length,
    totalVentes: 156,
    revenue: 2450000,
    note: 4.7
  }

  const handleDeleteProduct = (id) => {
    setMyProducts(myProducts.filter(p => p.id!== id))
    toast.success('Produit supprimé')
  }

  const handleToggleGrossiste = (id) => {
    setMyProducts(myProducts.map(p =>
      p.id === id? {...p, prixGrossiste: p.prixGrossiste? null : Math.floor(p.price * 0.8) } : p
    ))
    toast.success('Prix grossiste mis à jour')
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Vendeur</h1>
            <p className="text-gray-600 mt-1">Gérez vos produits et commandes</p>
          </div>
          <button
            onClick={() => toast('Fonction bientôt disponible')}
            className="btn-amazon flex items-center gap-2"
          >
            <Plus size={20}/> Ajouter Produit
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-md shadow">
              <Package className="text-[#FF9900] mb-2" size={32}/>
              <p className="text-gray-600 text-sm">Produits Actifs</p>
              <p className="text-3xl font-bold">{stats.produits}</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow">
              <TrendingUp className="text-green-600 mb-2" size={32}/>
              <p className="text-gray-600 text-sm">Ventes Totales</p>
              <p className="text-3xl font-bold">{stats.totalVentes}</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow">
              <DollarSign className="text-blue-600 mb-2" size={32}/>
              <p className="text-gray-600 text-sm">Chiffre d'Affaires</p>
              <p className="text-3xl font-bold">{(stats.revenue/1000000).toFixed(1)}M</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow">
              <BarChart3 className="text-purple-600 mb-2" size={32}/>
              <p className="text-gray-600 text-sm">Note Moyenne</p>
              <p className="text-3xl font-bold">{stats.note}/5</p>
            </div>
          </div>
          <HorairesOuverture />
        </div>

        <div className="bg-white rounded-md shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Mes Produits</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix Détail</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix Gros</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ventes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {myProducts.map(product => (
                  <tr key={product.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} className="w-12 h-12 object-contain" />
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.categorie}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">
                      {product.price.toLocaleString()} FCFA
                    </td>
                    <td className="px-6 py-4">
                      {product.prixGrossiste? (
                        <div>
                          <p className="text-sm font-bold text-green-600">
                            {product.prixGrossiste.toLocaleString()} FCFA
                          </p>
                          <p className="text-xs text-gray-500">Min: {product.minGrossiste}</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleToggleGrossiste(product.id)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Activer
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`${product.stock > 10? 'text-green-600' : 'text-orange-600'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{product.reviews}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toast('Édition bientôt disponible')}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 hover:bg-red-50 rounded text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
