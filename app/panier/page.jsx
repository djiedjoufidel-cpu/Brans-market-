'use client'
import { useCart } from '../../context/CartContext'
import Price from '../../components/Price'
import Link from 'next/link'
import { useState } from 'react'

export default function PanierPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [confirmClear, setConfirmClear] = useState(false)
  
  const totalProduits = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const livraison = cart.length > 0 ? 1000 : 0
  const total = totalProduits + livraison

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center max-w-2xl mx-auto">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold mb-2">Votre panier est vide</h1>
        <p className="text-gray-500 mb-6">Ajoutez des produits pour commencer vos achats</p>
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
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mon Panier</h1>
        <button 
          onClick={() => setConfirmClear(true)}
          className="text-red-500 text-sm hover:underline"
        >
          Vider le panier
        </button>
      </div>

      {confirmClear && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
          <p className="text-sm mb-2">Supprimer tous les articles ?</p>
          <div className="flex gap-2">
            <button 
              onClick={() => {clearCart(); setConfirmClear(false)}}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Oui, vider
            </button>
            <button 
              onClick={() => setConfirmClear(false)}
              className="bg-gray-300 px-3 py-1 rounded text-sm"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
      
      {/* LISTE DES PRODUITS */}
      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border rounded-lg p-3 bg-white shadow-sm">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
              <p className="text-sm text-gray-600">
                <Price value={item.price} /> / unité
              </p>
              <p className="text-lg font-bold text-blue-600">
                <Price value={item.price * item.qty} />
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded">
                <button 
                  onClick={() => updateQuantity(item.id, item.qty - 1)}
                  className="px-2 py-1 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-3 py-1 border-x">{item.qty}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.qty + 1)}
                  className="px-2 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={() => removeFromCart(item.id)} 
                className="text-red-500 text-2xl hover:bg-red-50 rounded p-1"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* RÉCAP TOTAL */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span>Sous-total ({cart.length} article{cart.length > 1 ? 's' : ''}) :</span>
          <span><Price value={totalProduits} /></span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Livraison :</span>
          <span><Price value={livraison} /></span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total :</span>
          <span className="text-red-600"><Price value={total} /></span>
        </div>
      </div>
      
      {/* BOUTONS */}
      <div className="space-y-3">
        <Link 
          href="/checkout" 
          className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Passer la commande
        </Link>
        <Link 
          href="/" 
          className="block w-full border border-gray-300 text-center py-3 rounded-lg hover:bg-gray-50"
        >
          Continuer mes achats
        </Link>
      </div>
    </div>
  )
}
