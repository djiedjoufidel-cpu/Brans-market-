"use client";
import { useState, useEffect } from "react";

export default function AdminProduits() {
  const [produits, setProduits] = useState<any[]>([]);
  const [form, setForm] = useState({
    nom: "",
    prix: "",
    image: "",
    boutique: "",
    boutiqueId: ""
  });

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(setProduits);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        prix: Number(form.prix),
        boutiqueId: Number(form.boutiqueId)
      })
    });
    
    if (res.ok) {
      const data = await fetch("/api/products").then(r => r.json());
      setProduits(data);
      setForm({ nom: "", prix: "", image: "", boutique: "", boutiqueId: "" });
      alert("Produit ajouté !");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce produit ?")) return;
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    setProduits(produits.filter(p => p.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Produits</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-3">
        <h2 className="text-xl font-semibold">Ajouter un produit</h2>
        
        <input
          type="text"
          placeholder="Nom du produit"
          value={form.nom}
          onChange={e => setForm({...form, nom: e.target.value})}
          className="w-full border p-2 rounded"
          required
        />
        
        <input
          type="number"
          placeholder="Prix"
          value={form.prix}
          onChange={e => setForm({...form, prix: e.target.value})}
          className="w-full border p-2 rounded"
          required
        />
        
        <input
          type="text"
          placeholder="URL Image"
          value={form.image}
          onChange={e => setForm({...form, image: e.target.value})}
          className="w-full border p-2 rounded"
          required
        />
        
        <input
          type="text"
          placeholder="Nom Boutique"
          value={form.boutique}
          onChange={e => setForm({...form, boutique: e.target.value})}
          className="w-full border p-2 rounded"
          required
        />
        
        <input
          type="number"
          placeholder="ID Boutique"
          value={form.boutiqueId}
          onChange={e => setForm({...form, boutiqueId: e.target.value})}
          className="w-full border p-2 rounded"
          required
        />
        
        <button className="bg-orange-500 text-white px-4 py-2 rounded font-semibold">
          Ajouter
        </button>
      </form>

      <div className="space-y-3">
        {produits.map(p => (
          <div key={p.id} className="flex items-center gap-4 bg-white p-3 rounded shadow">
            <img src={p.image} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold">{p.nom}</h3>
              <p>{p.prix} FCFA - {p.boutique}</p>
            </div>
            <button 
              onClick={() => handleDelete(p.id)}
              className="text-red-500 font-semibold"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
