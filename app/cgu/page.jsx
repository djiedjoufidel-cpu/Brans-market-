import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FileText } from 'lucide-react'

export default function CGU() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-md shadow-md prose max-w-none">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <FileText/> Conditions Générales d'Utilisation
          </h1>

          <p className="text-sm text-gray-500 mb-8">Dernière mise à jour: 7 Mai 2026</p>

          <h2 className="text-xl font-bold mt-8 mb-3">1. Objet</h2>
          <p>BransMarket est une marketplace qui met en relation des acheteurs et des grossistes/vendeurs au Cameroun. La plateforme facilite les transactions mais n'est pas partie au contrat de vente.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">2. Compte Utilisateur</h2>
          <p>Pour vendre, vous devez créer un compte grossiste. Vous êtes responsable de la confidentialité de vos identifiants et de l'exactitude des informations fournies.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">3. Obligations du Grossiste</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Publier uniquement des produits légaux et dont vous détenez les droits</li>
            <li>Indiquer prix, stock et description exacts</li>
            <li>Honorer les commandes dans les délais annoncés</li>
            <li>Assurer le service après-vente</li>
            <li>Ne pas vendre de contrefaçons ou produits interdits</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">4. Commissions</h2>
          <p>BransMarket prélève une commission de 5% sur chaque vente réalisée. Les frais de paiement MTN MoMo/Orange Money sont à la charge du vendeur.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">5. Paiements</h2>
          <p>Les paiements sont sécurisés via MTN MoMo et Orange Money. Les fonds sont reversés au grossiste sous 48h après livraison confirmée, déduction faite des commissions.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">6. Litiges</h2>
          <p>En cas de litige, BransMarket agit comme médiateur. Le vendeur s'engage à rembourser ou remplacer les produits défectueux sous 7 jours.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">7. Données Personnelles</h2>
          <p>Nous collectons nom, téléphone, adresse pour traiter les commandes. WhatsApp est utilisé uniquement pour faciliter le contact client-vendeur avec consentement.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">8. Résiliation</h2>
          <p>BransMarket peut suspendre un compte en cas de violation des CGU, fraude, ou plaintes répétées de clients.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">9. Contact</h2>
          <p>Pour toute question: support@bransmarket.cm - Yaoundé, Centre Region, CM</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
