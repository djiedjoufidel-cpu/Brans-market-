'use client'
import { useState } from 'react'
import { Star, Upload, ThumbsUp } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: 'Marie K.',
      rating: 5,
      date: '2026-04-15',
      comment: 'Produit conforme! Livraison rapide à Yaoundé. Je recommande',
      photos: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200'],
      likes: 12,
      verified: true
    },
    {
      id: 2,
      user: 'Jean Paul',
      rating: 4,
      date: '2026-04-10',
      comment: 'Bon rapport qualité prix. Emballage soigné',
      photos: [],
      likes: 5,
      verified: true
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', photos: [] })

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newReview.comment.trim()) {
      toast.error('Écris un commentaire')
      return
    }
    setReviews([{
      id: crypto.randomUUID(),
      user: 'Vous',
     ...newReview,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      verified: true
    },...reviews])
    setNewReview({ rating: 5, comment: '', photos: [] })
    setShowForm(false)
    toast.success('Avis publié! Merci 🙏')
  }

  const handleLike = (id) => {
    setReviews(reviews.map(r => r.id === id? {...r, likes: r.likes + 1 } : r))
  }

  return (
    <div className="bg-white p-6 rounded-md mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Avis Clients</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex text-[#FF9900]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill={i < Math.floor(avgRating)? '#FF9900' : 'none'}/>
              ))}
            </div>
            <span className="text-lg font-bold">{avgRating.toFixed(1)}</span>
            <span className="text-gray-600">({reviews.length} avis)</span>
          </div>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-amazon">
          Écrire un avis
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Note</label>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({...newReview, rating: star})}
                  className="p-1"
                >
                  <Star size={32} fill={star <= newReview.rating? '#FF9900' : 'none'} className="text-[#FF9900]"/>
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Commentaire</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              className="w-full border px-3 py-2 rounded"
              rows="4"
              placeholder="Partage ton expérience..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Photos (optionnel)</label>
            <button type="button" onClick={() => toast('Upload bientôt dispo')} className="border px-4 py-2 rounded flex items-center gap-2">
              <Upload size={18}/> Ajouter photos
            </button>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-amazon">Publier l'avis</button>
            <button type="button" onClick={() => setShowForm(false)} className="border px-6 py-2 rounded">
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="border-b pb-6 last:border-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-bold">{review.user}
                  {review.verified && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">✓ Achat vérifié</span>}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-[#FF9900]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < review.rating? '#FF9900' : 'none'}/>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-3">{review.comment}</p>
            {review.photos.length > 0 && (
              <div className="flex gap-2 mb-3">
                {review.photos.map((photo, i) => (
                  <img key={i} src={photo} className="w-20 h-20 object-cover rounded"/>
                ))}
              </div>
            )}
            <button
              onClick={() => handleLike(review.id)}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
            >
              <ThumbsUp size={16}/> Utile ({review.likes})
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
