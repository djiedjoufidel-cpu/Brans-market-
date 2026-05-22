'use client'
import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ImageUpload({ images = [], onChange }) {
  const [previews, setPreviews] = useState(images)

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    if (previews.length + files.length > 5) {
      toast.error('Max 5 images')
      return
    }

    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newPreviews = [...previews, reader.result]
        setPreviews(newPreviews)
        onChange(newPreviews)
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    const newPreviews = previews.filter((_, i) => i!== index)
    setPreviews(newPreviews)
    onChange(newPreviews)
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Images produit (max 5)</label>
      <div className="grid grid-cols-5 gap-3 mb-3">
        {previews.map((img, i) => (
          <div key={i} className="relative group">
            <img src={img} className="w-full h-24 object-cover rounded border"/>
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
            >
              <X size={16}/>
            </button>
          </div>
        ))}
        {previews.length < 5 && (
          <label className="border-2 border-dashed rounded flex items-center justify-center h-24 cursor-pointer hover:border-[#FF9900]">
            <Upload size={24} className="text-gray-400"/>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>
      <p className="text-xs text-gray-500">Formats: JPG, PNG. Max 5 images</p>
    </div>
  )
}
