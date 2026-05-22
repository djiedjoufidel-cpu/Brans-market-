'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { useStore } from '@/store/useStore'
import toast from 'react-hot-toast'
import { PackagePlus, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AjouterProduit() {
  const router = useRouter()
  const { addNotification } = useStore()
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
    cat: 'electronique',
    desc: '',
    image: '',
    promo: ''
  })
  const [preview, setPreview] = useState('')

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value })
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        setForm({...form, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name ||!form.price ||!form.stock ||!form.image) {
      toast.error('Remplis tous les champs obligatoires')
      return
    }

    // Ici tu feras un POST vers ton API /api/products
    toast.success('Produit ajouté avec succès!')
    addNotification(`Nouveau produit ajouté: ${form.name}`)

    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-3 text-[#FF9900]">
            <PackagePlus/> Ajouter un produit
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-bold mb-2">Nom du produit *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ex: Samsung Galaxy A55"
                  className="w-full border p-3 rounded-md focus:outline-[#FF9900]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Catégorie *</label>
                <select
                  name="cat"
                  value={form.cat}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-md focus:outline-[#FF9900]"
                >
                  <option value="electronique">Électronique</option>
                  <option value="mode">Mode & Vêtements</option>
                  <option value="maison">Maison & Cuisine</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-2">Prix FCFA *</label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Ex: 185000"
                  className="w-full border p-3 rounded-md focus:outline-[#FF9900]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Stock disponible *</label>
                <input
                  name="stock"
                  type="number"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="Ex: 50"
                  className="w-full border p-3 rounded-md focus:outline-[#FF9900]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Promo % (optionnel)</label>
                <input
                  name="promo"
                  type="number"
                  value={form.promo}
                  onChange={handleChange}
                  placeholder="Ex: 20"
                  className="w-full border p-3 rounded-md focus:outline-[#FF9900]"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Image du produit *</label>
                <label className="w-full border-2 border-dashed p-3 rounded-md flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50">
                  <Upload size={20}/>
                  <span>Choisir une image</span>
                  <input type="file" accept="image/*" onChange={handleImage} className="hidden" required/>
                </label>
              </div>
            </div>

            {preview && (
              <div>
                <p className="font-bold mb-2">Aperçu:</p>
                <img src={preview} alt="Preview" className="w-40 h-40 object-contain border rounded-md"/>
              </div>
            )}

            <div>
              <label className="block font-bold mb-2">Description *</label>
              <textarea
                name="desc"
                value={form.desc}
                onChange={handleChange}
                placeholder="Décris ton produit..."
                rows="4"
                className="w-full border p-3 rounded-md focus:outline-[#FF9900]"
                required
              />
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn-amazon text-lg px-8 py-3">
                Publier le produit
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold px-8 py-3 rounded-md"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
