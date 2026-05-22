'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('newest');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category) params.set('category', category);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (sort) params.set('sort', sort);
    router.push(`/boutiques?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow mb-6 space-y-3">
      <input
        type="text"
        placeholder="Recher une bouteille..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full border p-2 rounded"
      />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 rounded">
          <option value="">Toutes catégories</option>
          <option value="Whisky">Whisky</option>
          <option value="Vodka">Vodka</option>
          <option value="Rhum">Rhum</option>
          <option value="Vin">Vin</option>
        </select>

        <input type="number" placeholder="Prix min" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="border p-2 rounded" />
        <input type="number" placeholder="Prix max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="border p-2 rounded" />
        
        <select value={sort} onChange={e => setSort(e.target.value)} className="border p-2 rounded">
          <option value="newest">Plus récent</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
        </select>
      </div>

      <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
        Rechercher
      </button>
    </form>
  );
}
