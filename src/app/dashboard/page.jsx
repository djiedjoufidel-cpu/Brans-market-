'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading &&!user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
        setLoadingData(false);
      }
    };
    fetchUserData();
  }, );

  if (loading || loadingData) return <p>Chargement...</p>;
  if (!user) return null;

  const isPro = userData?.isPro || false;
  const trialEnd = userData?.trialEndsAt?.toDate();
  const isTrialActive = trialEnd && new Date() < trialEnd;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard de {user.email}</h1>
          <span className="bg-gray-200 px-3 py-1 rounded text-sm">
            {userData?.role === 'grossiste'? 'Grossiste' : 'Client'}
          </span>
        </div>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
          Déconnexion
        </button>
      </div>

      {userData?.role === 'grossiste'? (
        <>
          {isPro? (
            <div className="bg-green-100 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-green-800">Plan Pro Actif ✅</h2>
              <p>Ventes illimitées. Merci pour ta confiance!</p>
            </div>
          ) : isTrialActive? (
            <div className="bg-blue-100 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-blue-800">Essai gratuit actif</h2>
              <p>Expire le {trialEnd.toLocaleDateString('fr-FR')}</p>
              <p className="mt-2">Articles en vente : 0 / 10</p>
            </div>
          ) : (
            <div className="bg-yellow-100 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Ton essai est terminé 😢</h2>
              <p className="mb-4">Passe Pro pour 5000 FCFA/mois. Ventes illimitées.</p>
              <button
                onClick={async () => {
                  const phone = prompt('Entre ton numéro MTN MoMo : 2376XXXXXXXX');
                  if (!phone || phone.length < 12) return alert('Numéro invalide');
                  const res = await fetch('/api/momo/collect', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone, amount: 5000, userId: user.uid })
                  });
                  const data = await res.json();
                  if (data.success) {
                    alert('Check ton téléphone 📱 Valide dans l’app MoMo!');
                  } else {
                    alert('Erreur MoMo : ' + data.error);
                  }
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-bold w-full"
              >
                Payer 5000 FCFA avec MTN MoMo
              </button>
            </div>
          )}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Mes Produits</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">+ Ajouter un produit</button>
            <p className="text-gray-600">Aucun produit pour l'instant.</p>
          </div>
        </>
      ) : (
        <div className="bg-purple-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-purple-800">Espace Client 🛒</h2>
          <p className="mb-4">Parcoure les produits des grossistes et contacte-les directement.</p>
          <Link href="/marketplace" className="bg-purple-500 text-white px-6 py-3 rounded-lg font-bold inline-block">
            Voir la Marketplace
          </Link>
        </div>
      )}
    </div>
  );
}
