'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Send } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ChatPage() {
  const params = useParams()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, text: 'Bonjour, je suis intéressé par vos produits', from: 'client', time: '10:30' },
    { id: 2, text: 'Bonjour! Comment puis-je vous aider?', from: 'grossiste', time: '10:31' },
  ])

  const sendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    setMessages([...messages, { id: Date.now(), text: message, from: 'client', time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }])
    setMessage('')
    toast.success('Message envoyé')
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-md shadow-md h-[600px] flex flex-col">
          <div className="bg-[#131921] text-white p-4 rounded-t-md">
            <h1 className="text-xl font-bold">Chat avec Grossiste #{params.grossisteId}</h1>
            <p className="text-xs text-green-400">● En ligne</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.from === 'client'? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${msg.from === 'client'? 'bg-[#FF9900] text-black' : 'bg-gray-200'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="p-4 border-t flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écris ton message..."
              className="flex-1 border p-3 rounded-md focus:outline-[#FF9900]"
            />
            <button type="submit" className="btn-amazon px-6">
              <Send size={20}/>
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
