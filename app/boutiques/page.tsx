"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BoutiquesPage() {
  const [boutiques, setBoutiques] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBoutiques() {
      try {
        const res = await fetch("/api/shops", { cache: "no-store" });
        const data = await res.json();
        setBoutiques(data.shops || []);
      } catch (err) {
        console.error("Erreur fetch boutiques:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBoutiques();
  }, []);

  if (loading) {
    return <div className="p-6">Chargement...</div>;
  }

  if (boutiques.length === 0) {
    return <div className="p-6 text-gray-500">Aucune boutique pour l'instant.</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Boutiques</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {boutiques.map((b) => (
          <Link 
            key={b.id} 
            href={`/boutiques/${b.id}`} 
            className="border p-4 rounded hover:shadow-lg transition block"
          >
            <h3 className="font-semibold text-lg">{b.name}</h3>
            <p className="text-sm text-gray-600">{b.city}</p>
            <p className="text-sm text-gray-600">{b.phone}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
