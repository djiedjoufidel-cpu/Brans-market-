"use client";
import { vendors } from "@/lib/vendors";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { useParams } from "next/navigation";

export default function BoutiquePage() {
  const params = useParams();
  const id = Number(params.id);

  const boutique = vendors.find(v => v.id === id);
  const produitsBoutique = products.filter(p => p.boutiqueId === id);

  if (!boutique) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Boutique introuvable</h1>
        <p className="text-gray-600 mt-2">Cette boutique n'existe pas.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* En-tête boutique */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {boutique.nom.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{boutique.nom}</h1>
            <p className="text-gray-600">{boutique.description}</p>
            <p className="text-sm mt-1">⭐ {boutique.note}/5</p>
          </div>
        </div>
      </div>

      {/* Produits */}
      <h2 className="text-2xl font-semibold mb-4">
        Produits de la boutique ({produitsBoutique.length})
      </h2>

      {produitsBoutique.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Aucun produit pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {produitsBoutique.map(p => (
            <ProductCard key={p.id} produit={p} />
          ))}
        </div>
      )}
    </div>
  );
}
