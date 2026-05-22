'use client';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, addNotification } = useStore();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    addNotification(`${product.name} ajouté au panier`);
    toast.success('Ajouté au panier!');
  };

  const reportProduct = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await fetch('/api/report', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        type: 'product',
        targetId: product.id,
        reason: 'Produit suspect'
      })
    });
    toast.success('Produit signalé. Merci!');
  };

  const whatsappNumber = "237699999";
  const whatsappMsg = `Bonjour, je suis intéressé par ${product.name}`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="bg-white p-4 rounded-md card-hover border h-full flex flex-col">
      <Link href={`/produit/${product.id}`}>
        <div className="relative cursor-pointer">
          <Image 
            src={product.image} 
            alt={product.name} 
            width={300}
            height={192}
            className="w-full h-48 object-cover rounded"
            loading="lazy"
          />
          {product.promo && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              -{product.promo}%
            </span>
          )}
        </div>
        
        <h3 className="text-sm line-clamp-2 h-10 mb-1 mt-2">{product.name}</h3>
        
        <div className="flex items-center gap-1 my-1">
          <span className="text-[#FF9900]">★★★★☆</span>
          <span className="text-xs text-blue-600 hover:underline">{product.reviews || 0} avis</span>
        </div>
        
        <div className="my-2 mt-auto">
          <span className="text-2xl font-bold">{parseInt(product.price).toLocaleString()}</span>
          <span className="text-sm"> FCFA</span>
        </div>
        
        {product.stock < 10 && product.stock > 0 && (
          <p className="text-xs text-red-600 mb-2">Plus que {product.stock} en stock</p>
        )}
        {product.stock === 0 && (
          <p className="text-xs text-gray-500 mb-2">Rupture de stock</p>
        )}
      </Link>

      <button 
        onClick={handleAdd} 
        disabled={product.stock === 0}
        className="btn-amazon w-full text-sm mb-2 disabled:bg-gray-400"
      >
        Ajouter au panier
      </button>

      <div className="flex gap-2">
        <a 
          href={whatsappLink} 
          target="_blank"
          className="flex-1 flex items-center justify-center gap-1 bg-green-500 text-white text-xs py-2 rounded hover:bg-green-600"
        >
          <MessageCircle size={14} />
          WhatsApp
        </a>
        
        <button 
          onClick={reportProduct}
          className="text-xs text-gray-500 hover:text-red-600 underline"
        >
          Signaler
        </button>
      </div>
    </div>
  );
}
