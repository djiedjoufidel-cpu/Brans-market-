'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { Plus, Trash2, Edit, Eye, Package, Users, DollarSign } from 'lucide-react'
import toast from 'react-hot-toast'

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
    if(!newProduct.name ||!newProduct.price) {
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
    setProducts(products.filter(p => p.id!== id))
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
          <button onClick={() => setShowAdd(!showAdd)} className="btn-amazon flex items-center gap-2">
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
              <Package className="text-[#FF9900]" size={40}/>
            </div>
          </div>
          <div className="bg-white p-6 rounded-md shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Revenus</p>
                <p className="text-3xl font-bold">{stats.revenue.toLocaleString()} FCFA</p>
              </div>
              <DollarSign className="text-green-600" size={40}/>
            </div>
          </div>
          <div className="bg-white p-6 rounded-md shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Produits</p>
                <p className="text-3xl font-bold">{stats.totalProduits}</p>
              </div>
              <Users className="text-blue-600" size={40}/>
            </div>
          </div>
        </div>

        {showAdd && (
          <div className="bg-white p-6 rounded-md shadow mb-8">
            <h2 className="text-xl font-bold mb-4">Nouveau Produit</h2>
            <form onSubmit={handleAdd} className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nom du produit"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="border px-4 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Prix FCFA"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                className="border px-4 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                className="border px-4 py-2 rounded"
              />
              <input
                type="url"
                placeholder="URL Image"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                className="border px-4 py-2 rounded"
              />
              <textarea
                placeholder="Description"
                value={newProduct.desc}
                onChange={(e) => setNewProduct({...newProduct, desc: e.target.value})}
                className="border px-4 py-2 rounded md:col-span-2"
                rows="3"
              />
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" className="btn-amazon">Enregistrer</button>
                <button type="button" onClick={() => setShowAdd(false)} className="border px-6 py-2 rounded">
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-md shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4">Produit</th>
                <th className="text-left p-4">Prix</th>
                <th className="text-left p-4">Stock</th>
                <th className="text-left p-4">Ventes</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4">{parseInt(p.price).toLocaleString()} FCFA</td>
                  <td className="p-4">
                    <span className={p.stock < 10? 'text-red-600 font-bold' : ''}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="p-4">{p.ventes}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:bg-blue-50 p-2 rounded">
                        <Eye size={18}/>
                      </button>
                      <button className="text-green-600 hover:bg-green-50 p-2 rounded">
                        <Edit size={18}/>
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded"
                      >
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  )
}
