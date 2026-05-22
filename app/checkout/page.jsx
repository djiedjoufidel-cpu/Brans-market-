'use client'
import { useCart } from '../../context/CartContext'
import { useAffiliate } from '../../context/AffiliateContext'
import { calculateCommission } from '../../lib/affiliates'
import Price from '../../components/Price'
import Link from 'next/link'
import { useState } from 'react'

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const { refCode, affiliate } = useAffiliate()
  const [nom, setNom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [adresse, setAdresse] = useState('')
  const [isSending, setIsSending] = useState(false)

  const totalProduits = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const livraison = cart.length > 0 ? 1000 : 0
  const total = totalProduits + livraison
  const commission = calculateCommission(totalProduits, refCode)

  const sendWhatsApp = () => {
    if (!nom || !telephone || !adresse) {
      alert('Remplis tous les champs stp')
      return
    }

    setIsSending(true)

    let message = `*NOUVELLE COMMANDE BRANSMARKET*%0A%0A`
    message += `*CLIENT:*%0A`
    message += `Nom: ${nom}%0A`
    message += `Téléphone: ${telephone}%0A`
    message += `Adresse: ${adresse}%0A%0A`
    
    message += `*PRODUITS:*%0A`
    message += cart.map(item => 
      `- ${item.name} x${item.qty} = ${(item.price * item.qty).toLocaleString('fr-FR')} FCFA`
    ).join('%0A')
    
    message += `%0A%0A*DÉTAIL:*%0A`
    message += `Sous-total: ${totalProduits.toLocaleString('fr-FR')} FCFA%0A`
    message += `Livraison: ${livraison.toLocaleString('fr-FR')} FCFA%0A`
    message += `*TOTAL À PAYER: ${total.toLocaleString('fr-FR')} FCFA*`

    // AJOUTE INFO AFFILIÉ SI EXISTE
    if (affiliate) {
      message += `%0A%0A🎯 *PARRAINÉ PAR:*%0A`
      message += `${affiliate.name} (${affiliate.code})%0A`
      message += `💰 Commission: ${commission.toLocaleString('fr-FR')} FCFA (${affiliate.commission}%)`
    }

    // NUMÉRO WHATSAPP DU VENDEUR/ADMIN
    const whatsappNumber = '237690000000' // Remplace par ton numéro
    
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')

    // LOG COMMISSION - À sauver en Firebase plus tard
    if (affiliate) {
      console.log('Commission enregistrée:', {
        affiliate: refCode,
        affiliateName: affiliate.name,
        amount: commission,
        orderTotal: total,
        customerName: nom,
        customerPhone: telephone
      })
    }

    // Vide le panier après 2s
    setTimeout(() => {
      clearCart()
      setIsSending(false)
      alert('Commande envoyée! Le vendeur va te contacter sur WhatsApp')
    }, 2000)
  }

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center max-w-2xl mx-auto">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold mb-2">Panier vide</h1>
        <p className="text-gray-500 mb-6">Ajoute des produits pour passer commande</p>
        <Link 
          href="/" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Continuer mes achats
        </Link>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Finaliser la commande</h1>

      {/* BANNIÈRE AFFILIÉ */}
      {affiliate && (
        <div className="bg-green-50 border border-green-300 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="text-sm font-semibold text-green-900">
                Commande parrainée par {affiliate.name}
              </p>
              <p className="text-xs text-green-700">
                Tu soutiens un {affiliate.type} camerounais
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FORMULAIRE CLIENT */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="font-bold text-lg mb-4">Informations de livraison</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom complet *</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Ex: Jean Dupont"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Téléphone WhatsApp *</label>
            <input
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="Ex: 690 00 00 00"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Adresse de livraison *</label>
            <textarea
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              placeholder="Ex: Quartier Bastos, Yaoundé"
              rows={3}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* RÉCAP COMMANDE */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="font-bold text-lg mb-4">Récapitulatif</h2>
        
        <div className="space-y-3 mb-4">
          {cart.map(item => (
            <div key={`${item.vendorId}-${item.id}`} className="flex justify-between items-start pb-3 border-b">
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">
                  Qty: {item.qty} x <Price value={item.price} />
                </p>
                {item.vendorName && (
                  <p className="text-xs text-gray-400">Vendeur: {item.vendorName}</p>
                )}
              </div>
              <p className="font-semibold">
                <Price value={item.price * item.qty} />
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-3 border-t">
          <div className="flex justify-between text-sm">
            <span>Sous-total</span>
            <span><Price value={totalProduits} /></span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Livraison</span>
            <span><Price value={livraison} /></span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span className="text-blue-600"><Price value={total} /></span>
          </div>

          {commission > 0 && (
            <div className="text-xs text-gray-500 pt-2 border-t">
              <p>Commission affilié: <Price value={commission} /> ({affiliate.commission}%)</p>
              <p className="text-green-600">✓ {affiliate.name} sera rémunéré</p>
            </div>
          )}
        </div>
      </div>

      {/* BOUTON COMMANDER */}
      <button
        onClick={sendWhatsApp}
        disabled={isSending || !nom || !telephone || !adresse}
        className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSending ? (
          <>⏳ Envoi en cours...</>
        ) : (
          <>📱 Commander via WhatsApp - <Price value={total} /></>
        )}
      </button>

      <p className="text-xs text-center text-gray-500 mt-4">
        En commandant, tu acceptes d'être contacté sur WhatsApp pour la livraison
      </p>
    </div>
  )
}
