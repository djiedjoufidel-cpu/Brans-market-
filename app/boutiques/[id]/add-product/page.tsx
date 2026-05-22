"use client"
import { useState } from "react"

export default function AddProductPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [uploading, setUploading] = useState(false)

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const data = await res.json()

    if (res.ok) {
      setImageUrl(data.url)
    } else {
      alert('Erreur upload image')
    }
    setUploading(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!imageUrl) {
      alert('Prends une photo d\'abord')
      return
    }

    setLoading(true)
    const form = e.currentTarget
    const data = {
      shopId: params.id,
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      price: (form.elements.namedItem('price') as HTMLInputElement).value,
      image: imageUrl,
    }

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      alert('Produit ajouté!')
      window.location.href = `/boutiques/${params.id}`
    } else {
      alert('Erreur lors de l\'ajout')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Ajouter un produit</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Nom du produit" required className="w-full border p-2 rounded" />
        <input name="price" type="number" placeholder="Prix FCFA" required className="w-full border p-2 rounded" />

        {/* Bouton photo qui ouvre direct la caméra */}
        <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="text-gray-600">
              {uploading? "Upload en cours..." : "📷 Prendre une photo"}
            </div>
          </label>

          {imageUrl && (
            <img src={imageUrl} alt="preview" className="w-full h-48 object-cover rounded mt-3" />
          )}
        </div>

        <button
          disabled={loading ||!imageUrl}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading? 'Ajout...' : 'Ajouter le produit'}
        </button>
      </form>
    </div>
  )
}
