import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/products.json');

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const minPrice = parseInt(searchParams.get('minPrice')) || 0;
  const maxPrice = parseInt(searchParams.get('maxPrice')) || 9999999;
  const sort = searchParams.get('sort') || 'newest';

  const data = await fs.readFile(filePath, 'utf8');
  let products = JSON.parse(data);

  // Filtre texte
  if (query) {
    products = products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Filtre catégorie
  if (category) {
    products = products.filter(p => p.category === category);
  }

  // Filtre prix
  products = products.filter(p => p.price >= minPrice && p.price <= maxPrice);

  // Tri
  if (sort === 'price-asc') products.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') products.sort((a, b) => b.price - a.price);
  if (sort === 'newest') products.sort((a, b) => b.id - a.id);

  return NextResponse.json(products);
}
