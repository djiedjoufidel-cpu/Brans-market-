'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { Plus, Trash2, Edit, Eye, Package, Users, DollarSign } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

export default function Admin() {
  const [products, setProducts] = useState([
    { id: '1', name: 'Samsung Galaxy A15', price: '89900', stock: 15, ventes: 42 },
    { id: '2', name: 'Nike Air Max', price: '45000', stock: 8, ventes: 23 },
  ])

  const [showAdd, setShowAdd] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '', price: '', stock: '', image: '', desc: ''
  })

  const handleAdd = (e) => {
    e.preventDefault()
    if(!newProduct.name || !newProduct.price) {
      toast.error('Nom et prix obligatoires')
      return
    }
    setProducts([...products, {
      id: crypto.randomUUID(),
      ...newProduct,
      ventes: 0
    }])
    setNewProduct({ name: '', price: '', stock: '', image: '', desc: '' })
    setShowAdd(false)
    toast.success('Produit ajouté!')
  }

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id))
    toast.success('Produit supprimé')
  }

  const stats = {
    totalVentes: products.reduce((sum, p) => sum + p.ventes, 0),
    revenue: products.reduce((sum, p) => sum + parseInt(p.price) * p.ventes, 0),
    totalProduits: products.length
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Dashboard Admin</h1>
          <button 
            onClick={() => setShowAdd(!showAdd)} 
            className="btn-amazon flex items-center gap-2"
          >
            <Plus size={20}/> Ajouter Produit
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-md shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Ventes Totales</p>
                <p className="text-3xl font-bold">{stats.totalVentes}</p>
              </div>
              <Package className="text-blue-600" size={32} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Revenue</p>
                <p className="text-3xl font-bold">{stats.revenue} FCFA</p>
              </div>
              <DollarSign className="text-green-600" size={32} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Produits</p>
                <p className="text-3xl font-bold">{stats.totalProduits}</p>
              </div>
              <Users className="text-purple-600" size={32} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  )
}
