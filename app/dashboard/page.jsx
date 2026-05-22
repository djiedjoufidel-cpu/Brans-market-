import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PackagePlus, Package, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#FF9900]">Espace Grossiste</h1>
            <Link href="/dashboard/ajouter-produit" className="btn-amazon flex items-center gap-2">
              <PackagePlus size={20}/> Ajouter un produit
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="border p-4 rounded-md">
              <h3 className="font-bold text-gray-600 mb-2 flex items-center gap-2"><TrendingUp size={18}/> Ventes du mois</h3>
              <p className="text-3xl text-green-600 font-bold">1 250 000 FCFA</p>
            </div>
            <div className="border p-4 rounded-md">
              <h3 className="font-bold text-gray-600 mb-2 flex items-center gap-2"><Package size={18}/> Commandes</h3>
              <p className="text-3xl text-blue-600 font-bold">47</p>
            </div>
            <div className="border p-4 rounded-md">
              <h3 className="font-bold text-gray-600 mb-2 flex items-center gap-2"><Package size={18}/> Stock total</h3>
              <p className="text-3xl text-orange-600 font-bold">1 204</p>
            </div>
            <div className="border p-4 rounded-md">
              <h3 className="font-bold text-gray-600 mb-2 flex items-center gap-2"><Users size={18}/> Clients</h3>
              <p className="text-3xl text-purple-600 font-bold">312</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold mb-4">Vos produits récents</h2>
            <p className="text-gray-500">Aucun produit ajouté. Clique sur "Ajouter un produit" pour commencer.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
