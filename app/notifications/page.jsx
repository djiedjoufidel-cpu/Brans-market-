'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useStore } from '@/store/useStore'
import { Bell, CheckCheck } from 'lucide-react'

export default function Notifications() {
  const { notifications, markAsRead } = useStore()

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-3"><Bell/> Notifications</h1>
            <button onClick={markAsRead} className="text-blue-600 hover:underline flex items-center gap-2">
              <CheckCheck size={18}/> Tout marquer comme lu
            </button>
          </div>
          {notifications.length === 0? (
            <p className="text-gray-500 text-center py-16">Aucune notification pour le moment.</p>
          ) : (
            <div className="space-y-3">
              {notifications.map(n => (
                <div key={n.id} className={`p-4 rounded-md border-l-4 ${n.read? 'border-gray-300 bg-gray-50' : 'border-[#FF9900] bg-orange-50'}`}>
                  <p className={n.read? 'text-gray-600' : 'font-bold'}>{n.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(n.id).toLocaleString('fr-FR')}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
