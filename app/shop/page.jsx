'use client'
import { useCart } from '../../context/CartContext'
import Price from '../../components/Price'

const products = [
  {
    id: 1,
    name: 'Samsung Galaxy A55 5G 256Go',
    price: 185000,
    image: 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=400',
    stock: 5,
    discount: 20,
    rating: 142
  },
  {
    id: 2,
    name: 'iPhone 13 128Go Reconditionné Grade A+',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
    rating: 89
  },
  {
    id: 3,
    name: 'iPhone 13 128Go Grade 3',
    price: 280000,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400',
    discount: 15,
    rating: 234
  },
  {
    id: 4,
    name: 'Mixeur Blender Pro 1000W Inox',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
    rating: 67
  }
]

export default function ShopPage() {
  const { addToCart } = useCart()

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-t-lg">
        <h2 className="text-2xl font-bold text-center">Shopper</h2>
      </div>
      
      <div className="bg-white p-4 rounded-b-lg">
        <h3 className="text-xl font-bold mb-4">Offres du moment</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-3 shadow-sm relative">
              {product.discount && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  -{product.discount}%
                </span>
              )}
              
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              
              <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
              
              <div className="flex items-center gap-1 mb-1">
                <span className="text-yellow-500">★★★★☆</span>
                <span className="text-xs text-gray-500">{product.rating}</span>
              </div>
              
              <p className="text-lg font-bold mb-1">
                <Price value={product.price} />
              </p>
              
              {product.stock && (
                <p className="text-xs text-red-500 mb-2">Plus que {product.stock} en stock</p>
              )}
              
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-orange-500 text-white py-2 rounded mb-2 hover:bg-orange-600"
              >
                Ajouter au panier
              </button>
              
              <button className="w-full bg-green-600 text-white py-2 rounded flex items-center justify-center gap-2">
                <span>💬</span> WhatsApp
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
