'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const s = localStorage.getItem('seller');
    if (!s) {
      router.push('/seller/login');
      return;
    }
    const sellerData = JSON.parse(s);
    setSeller(sellerData);

    fetch(`/api/orders?shopId=${sellerData.id}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data.reverse());
        setLoading(false);
      });
  }, [router]);

  const updateStatus = async (orderId, newStatus) => {
    toast.success(`Commande marquée: ${newStatus}`);
    setOrders(orders.map(o => o.id === orderId ? {...o, status: newStatus} : o));
  };

  const openWhatsApp = (phone, name) => {
    let cleanPhone = phone.replace(/\s+/g, '').replace(/\+/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '225' + cleanPhone.substring(1); // 225 = Côte d'Ivoire
    }
    if (!cleanPhone.startsWith('225')) {
      cleanPhone = '225' + cleanPhone;
    }

    const message = encodeURIComponent(
      `Bonjour ${name}, c'est ${seller?.name} concernant votre commande sur Brans Market.`
    );
    const url = `https://wa.me/${cleanPhone}?text=${message}`;
    window.open(url, '_blank');
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (!seller) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Toaster />
      
      <nav className="flex gap-4 mb-6 border-b pb-2 text-sm">
        <a href="/admin/add-product">Ajouter produit</a>
        <a href="/admin/orders" className="font-bold">Commandes</a>
        <button onClick={() => {localStorage.removeItem('seller'); router.push('/')}} className="ml-auto text-red-500">
          Déconnexion
        </button>
      </nav>

      <h1 className="text-2xl font-bold mb-4">Commandes - {seller.name}</h1>

      {orders.length === 0 && (
        <p className="text-gray-500">Aucune commande pour l’instant.</p>
      )}

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold">Commande #{order.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString('fr-FR')}
                </p>
              </div>
              <span className={`px-2 py-1 text-xs rounded ${
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {order.status}
              </span>
            </div>

            <div className="bg-gray-50 p-3 rounded mb-3">
              <p className="font-medium">{order.guest.name}</p>
              <p className="text-sm">📞 {order.guest.phone}</p>
              <p className="text-sm">📍 {order.guest.city}, {order.guest.address}</p>
            </div>

            <div className="space-y-1 mb-3">
              {order.items.filter(i => i.shopId === seller.id).map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.qty}</span>
                  <span>{(item.price * item.qty).toLocaleString()} FCFA</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 justify-between items-center border-t pt-3">
              <p className="font-bold">
                Total: {order.items.filter(i => i.shopId === seller.id)
                  .reduce((s, i) => s + i.price * i.qty, 0).toLocaleString()} FCFA
              </p>
              
              <div className="flex gap-2 flex-wrap">
                {/* Bouton WhatsApp */}
                <button 
                  onClick={() => openWhatsApp(order.guest.phone, order.guest.name)}
                  className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                  💬 WhatsApp
                </button>

                {/* Bouton Appel */}
                <a 
                  href={`tel:${order.guest.phone}`}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                  📞 Appeler
                </a>

                {order.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => updateStatus(order.id, 'confirmed')}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded">
                      Confirmer
                    </button>
                    <button 
                      onClick={() => updateStatus(order.id, 'cancelled')}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded">
                      Annuler
                    </button>
                  </>
                )}
                {order.status === 'confirmed' && (
                  <button 
                    onClick={() => updateStatus(order.id, 'delivered')}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded">
                    Marquer livré
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
