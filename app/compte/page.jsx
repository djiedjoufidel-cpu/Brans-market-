import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { User, Package, Heart, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function Compte() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h1 className="text-3xl font-bold mb-8 flex items-center gap-3"><User/> Votre Compte</h1>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/commandes" className="border p-6 rounded-md hover:shadow-lg card-hover">
              <Package size={40} className="text-[#FF9900] mb-3"/>
              <h3 className="font-bold text-xl">Vos Commandes</h3>
              <p className="text-sm text-gray-600 mt-1">Suivre, retourner ou acheter à nouveau</p>
            </Link>
            <Link href="/favoris" className="border p-6 rounded-md hover:shadow-lg card-hover">
              <Heart size={40} className="text-[#FF9900] mb-3"/>
              <h3 className="font-bold text-xl">Listes d'envies</h3>
              <p className="text-sm text-gray-600 mt-1">Vos articles sauvegardés</p>
            </Link>
            <Link href="/parametres" className="border p-6 rounded-md hover:shadow-lg card-hover">
              <Settings size={40} className="text-[#FF9900] mb-3"/>
              <h3 className="font-bold text-xl">Paramètres</h3>
              <p className="text-sm text-gray-600 mt-1">Adresses, paiement, sécurité</p>
            </Link>
          </div>
          <button className="mt-8 text-red-600 hover:underline flex items-center gap-2">
            <LogOut size={18}/> Se déconnecter
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
