'use client'
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">{isLogin? 'Connexion' : 'Inscription'}</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border rounded mb-4" required />
        <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border rounded mb-6" required />
        <button className="w-full bg-blue-600 text-white p-3 rounded font-bold">{isLogin? 'Se connecter' : 'Créer mon compte'}</button>
        <p className="mt-4 text-center text-sm">
          {isLogin? 'Pas de compte?' : 'Déjà inscrit?'}
          <span onClick={() => setIsLogin(!isLogin)} className="text-blue-600 cursor-pointer ml-1">{isLogin? 'Créer un compte' : 'Se connecter'}</span>
        </p>
      </form>
    </div>
  );
}
