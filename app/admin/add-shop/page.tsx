'use client'

import { useState } from 'react'

export default function AddShopPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      owner: (form.elements.namedItem('owner') as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value.trim(),
      city: (form.elements.namedItem('city') as HTMLInputElement).value.trim(),
      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value.trim(),
    }

    try {
      const res = await fetch('/api/shops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        alert('Boutique créée avec succès !')
        window.location.href = '/boutiques'
      } else {
        const err = await res.json()
        alert('Erreur : ' + (err.error || 'Impossible de créer la boutique'))
      }
    } catch (error) {
      alert('Erreur réseau : ' + error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Créer une boutique</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nom de la boutique</label>
          <input
            name="name"
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Ex: Brans Market"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Nom du propriétaire</label>
          <input
            name="owner"
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Ex: Brandon Njiehou"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Téléphone</label>
          <input
            name="phone"
            type="tel"
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Ex: 657715307"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Ville</label>
          <input
            name="city"
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Ex: Yaoundé"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            rows={4}
            className="w-full border rounded px-3 py-2"
            placeholder="Décris ta boutique"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded font-medium disabled:opacity-50"
        >
          {loading ? 'Création...' : 'Créer la boutique'}
        </button>
      </form>
    </div>
  )
}
