import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#131921] text-white mt-16">
      <div className="bg-[#232F3E] py-4 text-center">
        <a href="#" className="text-sm hover:underline">Retour en haut</a>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold mb-3">Pour mieux nous connaître</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/a-propos" className="hover:underline">À propos de BransMarket</Link></li>
            <li><Link href="/dashboard" className="hover:underline">Espace Grossiste</Link></li>
            <li><Link href="/cgu" className="hover:underline">Conditions d'utilisation</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Gagnez de l'argent</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/dashboard/ajouter-produit" className="hover:underline">Vendez sur BransMarket</Link></li>
            <li><Link href="/dashboard/whatsapp" className="hover:underline">Connecter WhatsApp</Link></li>
            <li><Link href="#" className="hover:underline">Devenez partenaire</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Moyens de paiement</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>MTN Mobile Money</li>
            <li>Orange Money</li>
            <li>Paiement à la livraison</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Besoin d'aide ?</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/commandes" className="hover:underline">Votre compte</Link></li>
            <li><Link href="/commandes" className="hover:underline">Vos commandes</Link></li>
            <li><Link href="#" className="hover:underline">Centre d'aide</Link></li>
          </ul>
        </div>
      </div>
      <div className="bg-[#131921] py-6 text-center text-sm border-t border-gray-700">
        <p className="text-gray-400">
          © 2026 BransMarket - Développé par{' '}
          <span className="text-[#FF9900] font-bold">Brandon Technologie</span> 🇨🇲
        </p>
        <p className="text-xs text-gray-500 mt-1">Yaoundé, Cameroun</p>
      </div>
    </footer>
  )
}
