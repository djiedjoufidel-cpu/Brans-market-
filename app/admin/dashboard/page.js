'use client';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(res => res.json()),
      fetch('/api/orders').then(res => res.json()).catch(() => [])
    ]).then(([prod, ord]) => {
      setProducts(prod);
      setOrders(ord);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-6">Chargement...</div>;

  const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const lowStock = products.filter(p => p.stock !== undefined && p.stock < 5);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard Vendeur</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <p className="text-sm text-blue-600">Chiffre d'affaires</p>
          <p className="text-3xl font-bold text-blue-900">{totalSales.toLocaleString()} FCFA</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <p className="text-sm text-green-600">Commandes</p>
          <p className="text-3xl font-bold text-green-900">{orders.length}</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <p className="text-sm text-yellow-600">Produits</p>
          <p className="text-3xl font-bold text-yellow-900">{products.length}</p>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">⚠️ Alerte Stock Faible</h2>
        {lowStock.length === 0 ? (
          <p className="text-gray-500">Tous les stocks sont ok.</p>
        ) : (
          <div className="space-y-2">
            {lowStock.map(p => (
              <div key={p.id} className="bg-red-50 p-3 rounded flex justify-between">
                <span>{p.name}</span>
                <span className="font-bold text-red-600">Stock : {p.stock}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
