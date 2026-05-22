'use client'
import { useState, useEffect } from 'react'
import { VENDORS } from '@/lib/products'

export default function OnlineStatus({ userId, userType = 'vendor' }) {
  const [onlineUsers, setOnlineUsers] = useState({})
  const [lastSeen, setLastSeen] = useState({})

  useEffect(() => {
    // Simuler statuts en ligne - En prod: utiliser Firebase/Socket.io
    const mockOnline = {
      'vendor1': true,
      'vendor2': false,
      'client1': true
    }

    const mockLastSeen = {
      'vendor2': new Date(Date.now() - 3600000), // 1h ago
      'client2': new Date(Date.now() - 1800000) // 30min ago
    }

    setOnlineUsers(mockOnline)
    setLastSeen(mockLastSeen)

    // Simuler changement statut
    const interval = setInterval(() => {
      setOnlineUsers(prev => ({
      ...prev,
        'vendor1': Math.random() > 0.3 // 70% chance online
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const isOnline = onlineUsers[userId] || false
  const lastSeenDate = lastSeen[userId]

  const formatLastSeen = (date) => {
    if (!date) return 'Hors ligne'
    const diff = Date.now() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'À l\'instant'
    if (minutes < 60) return `Il y a ${minutes} min`
    if (hours < 24) return `Il y a ${hours}h`
    return `Il y a ${days}j`
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${isOnline? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
      <span className="text-xs text-gray-600">
        {isOnline? 'En ligne' : formatLastSeen(lastSeenDate)}
      </span>
    </div>
  )
}

// Composant Badge pour vendeur avec statut
export function VendorCard({ vendor }) {
  return (
    <div className="bg-white p-4 rounded-md border hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img src={vendor.logo} className="w-12 h-12 rounded-full" />
          <div>
            <p className="font-bold">{vendor.nom}</p>
            <OnlineStatus userId={vendor.id} userType="vendor" />
          </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">⭐ {vendor.note}/5</p>
          <p className="text-xs text-gray-500">{vendor.totalVentes} ventes</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3">{vendor.type}</p>
      <a
        href={`https://wa.me/${vendor.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-amazon w-full text-sm"
      >
        Contacter sur WhatsApp
      </a>
    </div>
  )
}
