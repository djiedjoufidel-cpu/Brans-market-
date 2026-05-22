'use client'
import { useState, useEffect, useRef } from 'react'
import { MessageCircle, Send, X, Phone } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ChatBox({ vendorName, vendorWhatsapp, productName }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Bonjour! Je suis ${vendorName}. Comment puis-je vous aider?`,
      fromVendor: true,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMsg = {
      id: crypto.randomUUID(),
      text: input,
      fromVendor: false,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([...messages, newMsg])
    setInput('')

    // Réponse auto du vendeur
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        text: 'Message reçu! Je vous réponds dans quelques minutes sur WhatsApp.',
        fromVendor: true,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      }])
    }, 1500)
  }

  const openWhatsApp = () => {
    const defaultText = productName
     ? `Bonjour ${vendorName}, je suis intéressé par ${productName}`
      : `Bonjour ${vendorName}, j'ai une question`
    window.open(`https://wa.me/${vendorWhatsapp}?text=${encodeURIComponent(defaultText)}`, '_blank')
    toast.success('Ouverture WhatsApp...')
  }

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 z-40 transition-transform hover:scale-110"
        aria-label="Chat avec le vendeur"
      >
        <MessageCircle size={24}/>
      </button>

      {/* Fenêtre chat */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-lg shadow-2xl z-50 animate-in slide-in-from-bottom">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-600 font-bold">
                {vendorName.charAt(0)}
              </div>
              <div>
                <p className="font-bold">{vendorName}</p>
                <p className="text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                  En ligne
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-green-700 p-1 rounded transition"
            >
              <X size={20}/>
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.fromVendor? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                  msg.fromVendor
                   ? 'bg-white text-gray-800'
                    : 'bg-green-500 text-white'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.fromVendor? 'text-gray-500' : 'text-green-100'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-3 border-t bg-white rounded-b-lg">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écris ton message..."
                className="flex-1 border px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
              >
                <Send size={18}/>
              </button>
            </div>
            <button
              type="button"
              onClick={openWhatsApp}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded text-sm flex items-center justify-center gap-2 transition"
            >
              <Phone size={16}/>
              Continuer sur WhatsApp
            </button>
          </form>
        </div>
      )}
    </>
  )
}
