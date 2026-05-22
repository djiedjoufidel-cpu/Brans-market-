'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { MessageCircle, Check, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function WhatsappConnect() {
  const [numero, setNumero] = useState('')
  const [connected, setConnected] = useState(false)

  const handleConnect = (e) => {
    e.preventDefault()
    if (!numero || numero.length < 9) {
      toast.error('Numéro WhatsApp invalide')
      return
    }
    // Ici tu sauves en DB: /api/grossiste/whatsapp
    setConnected(true)
    toast.success('WhatsApp connecté!')
  }

  const handleDisconnect = () => {
    setConnected(false)
    setNumero('')
    toast.success('WhatsApp déconnecté')
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-3 text-green-600">
            <MessageCircle/> Connexion WhatsApp
          </h1>

          {!connected? (
            <>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <div className="flex gap-3">
                  <AlertCircle className="text-blue-500"/>
                  <div>
                    <p className="font-bold">Pourquoi connecter WhatsApp?</p>
                    <p className="text-sm">Les clients pourront te contacter en 1 clic depuis tes produits. Tu reçois les messages direct sur ton WhatsApp Business.</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleConnect} className="space-y-4">
                <div>
                  <label className="block font-bold mb-2">Numéro WhatsApp Business *</label>
                  <div className="flex gap-2">
                    <span className="border p-3 rounded-md bg-gray-100">+237</span>
                    <input
                      type="tel"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      placeholder="6 99 99 99 99"
                      className="flex-1 border p-3 rounded-md focus:outline-[#FF9900]"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Format: 6XXXXXXXX sans le +237</p>
                </div>

                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-md">
                  Connecter WhatsApp
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <Check size={40} className="text-green-600"/>
              </div>
              <h2 className="text-2xl font-bold mb-2">WhatsApp Connecté!</h2>
              <p className="text-gray-600 mb-6">Numéro: +237 {numero}</p>
              <p className="text-sm text-gray-500 mb-6">
                Les clients voient maintenant un bouton "Discuter sur WhatsApp" sur tous tes produits.
              </p>
              <button onClick={handleDisconnect} className="text-red-600 hover:underline">
                Déconnecter
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
