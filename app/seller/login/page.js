'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function SellerLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({email: '', password: '', name: '', phone: ''});
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('seller', JSON.stringify(data.seller));
      toast.success(isLogin ? 'Connecté!' : 'Compte créé!');
      router.push('/admin/add-shop');
    } else {
      toast.error(data.error || 'Erreur');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 mt-10">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">
        {isLogin ? 'Connexion Vendeur' : 'Créer un compte Vendeur'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        {!isLogin && (
          <>
            <input type="text" placeholder="Nom complet" required 
              value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              className="w-full border p-2 rounded" />
            <input type="tel" placeholder="Téléphone" required 
              value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
              className="w-full border p-2 rounded" />
          </>
        )}
        
        <input type="email" placeholder="Email" required 
          value={form.email} onChange={e => setForm({...form, email: e.target.value})}
          className="w-full border p-2 rounded" />
        <input type="password" placeholder="Mot de passe" required 
          value={form.password} onChange={e => setForm({...form, password: e.target.value})}
          className="w-full border p-2 rounded" />

        <button type="submit" className="w-full bg-black text-white py-2 rounded">
          {isLogin ? 'Se connecter' : 'S\'inscrire'}
        </button>
      </form>

      <button onClick={() => setIsLogin(!isLogin)} className="text-sm mt-3 text-blue-600">
        {isLogin ? 'Pas de compte? S\'inscrire' : 'Déjà un compte? Se connecter'}
      </button>

      <p className="text-xs text-gray-500 mt-6">
        Seuls les vendeurs ont besoin d'un compte. Les clients achètent sans s'inscrire.
      </p>
    </div>
  );
}
