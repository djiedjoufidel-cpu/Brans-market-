import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Shield, Truck, Award, Users } from 'lucide-react'

export const metadata = {
  title: 'À Propos - BransMarket Cameroun',
  description: 'BransMarket, la marketplace 100% camerounaise. Prix moins chers, livraison rapide, vendeurs vérifiés.'
}

export default function APropos() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-md">
          <h1 className="text-4xl font-bold mb-6 text-center">À Propos de BransMarket</h1>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              <b>BransMarket</b> est la marketplace 100% camerounaise créée en 2026 pour rendre le commerce en ligne accessible à tous.
              Notre mission : <b>prix moins chers, livraison rapide, vendeurs de confiance</b>.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="border p-6 rounded-lg">
                <Shield className="text-[#FF9900] mb-3" size={40}/>
                <h3 className="font-bold text-xl mb-2">Vendeurs Vérifiés</h3>
                <p className="text-gray-600">Tous nos vendeurs sont contrôlés. Paiement sécurisé, produits garantis.</p>
              </div>
              <div className="border p-6 rounded-lg">
                <Truck className="text-[#FF9900] mb-3" size={40}/>
                <h3 className="font-bold text-xl mb-2">Livraison 24-48h</h3>
                <p className="text-gray-600">Yaoundé, Douala, Bafoussam. Suivi en temps réel de ta commande.</p>
              </div>
              <div className="border p-6 rounded-lg">
                <Award className="text-[#FF9900] mb-3" size={40}/>
                <h3 className="font-bold text-xl mb-2">Prix Grossiste</h3>
                <p className="text-gray-600">Achète en gros, économise jusqu'à -30%. Idéal revendeurs.</p>
              </div>
              <div className="border p-6 rounded-lg">
                <Users className="text-[#FF9900] mb-3" size={40}/>
                <h3 className="font-bold text-xl mb-2">Made in Cameroun</h3>
                <p className="text-gray-600">Entreprise camerounaise, emplois locaux, économie locale.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Pourquoi BransMarket ?</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><b>Prix imbattables</b> : Direct usine, pas d'intermédiaire</li>
              <li><b>Paiement Mobile Money</b> : MTN MoMo, Orange Money acceptés</li>
              <li><b>Retour facile</b> : 7 jours pour changer d'avis</li>
              <li><b>Support WhatsApp</b> : Réponse en 5 min, 7j/7</li>
              <li><b>Mode Grossiste</b> : Prix réduits dès 5 unités</li>
            </ul>

            <div className="bg-[#FF9900] text-black p-6 rounded-lg mt-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Rejoins 10,000+ clients satisfaits</h3>
              <p className="mb-4">Commande maintenant et reçois en 24h à Yaoundé</p>
              <a href="/shop" className="bg-black text-white px-8 py-3 rounded-full font-bold inline-block hover:bg-gray-800">
                Découvrir les produits
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
