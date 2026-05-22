'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function AddProduct() {
  const router = useRouter();
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: 'Whisky',
    stock: '',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Protection : redirige si pas connecté
  useEffect(() => {
    const sellerData = localStorage.getItem('seller');
    if (!sellerData) {
      router.push('/seller/login');
      return;
    }
    setSeller(JSON.parse(sellerData));
    setLoading(false);
  }, [router]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error('Prends une photo');
    setSubmitting(true);

    const formData = new FormData();
    Object.keys(form).forEach(k => formData.append(k, form[k]));
    formData.append('image', image);
    formData.append('shopId', seller.id); // Auto-rempli depuis le compte connecté

    const res = await fetch('/api/products', {method: 'POST', body: formData});

    if (res.ok) {
      toast.success('Produit ajouté!');
      setTimeout(() => router.push('/'), 1000);
    } else {
      toast.error('Erreur lors de l\'ajout');
    }
    setSubmitting(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('seller');
    router.push('/');
  };

  if (loading) return <div className="p-6 text-center">Vérification...</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <Toaster />

      <nav className="flex gap-4 mb-6 border-b pb-2 text-sm">
        <a href="/admin/add-product" className="font-bold">Ajouter produit</a>
        <a href="/admin/orders">Commandes</a>
        <button onClick={handleLogout} className="ml-auto text-red-500">Déconnexion</button>
      </nav>

      <h1 className="text-2xl font-bold mb-4">Ajouter un produit</h1>
      <p className="text-sm text-gray-500 mb-4">Connecté en tant que {seller?.name}</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
          required
        />
        {preview && <img src={preview} alt="preview" className="w-full h-48 object-cover rounded" />}

        <input
          type="text"
          placeholder="Nom du produit"
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Prix FCFA"
          value={form.price}
          onChange={e => setForm({...form, price: e.target.value})}
          className="w-full border p-2 rounded"
          required
        />

        <select
          value={form.category}
          onChange={e => setForm({...form, category: e.target.value})}
          className="w-full border p-2 rounded"
        >
          <option>Whisky</option>
          <option>Vodka</option>
          <option>Rhum</option>
          <option>Vin</option>
          <option>Cognac</option>
          <option>Bière</option>
        </select>

        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={e => setForm({...form, stock: e.target.value})}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({...form, description: e.target.value})}
          className="w-full border p-2 rounded"
          rows="3"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-black text-white py-2 rounded disabled:bg-gray-400"
        >
          {submitting? 'Ajout en cours...' : 'Ajouter le produit'}
        </button>
      </form>
    </div>
  );
}
