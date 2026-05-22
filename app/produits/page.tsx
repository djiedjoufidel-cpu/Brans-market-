"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function ProduitsPage() {
  const [produits, setProduits] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(setProduits)
      .catch(() => setProduits([]));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tous les produits</h1>
      
      {produits.length === 0 ? (
        <p className="text-gray-500">Aucun produit disponible. Va dans /admin/produits pour en ajouter.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {produits.map((p) => (
            <ProductCard key={p.id} produit={p} />
          ))}
        </div>
      )}
    </div>
  );
}
