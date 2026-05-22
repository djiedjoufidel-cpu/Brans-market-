import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { writeFile } from 'fs/promises';

const dataPath = path.join(process.cwd(), 'data/products.json');
const uploadDir = path.join(process.cwd(), 'public/uploads');

export async function POST(req) {
  const formData = await req.formData();

  const image = formData.get('image');
  const name = formData.get('name');
  const price = formData.get('price');
  const category = formData.get('category');
  const stock = formData.get('stock');
  const description = formData.get('description');

  // Sauvegarde l'image
  await fs.mkdir(uploadDir, { recursive: true });
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${image.name.replace(/\s/g, '_')}`;
  const filepath = path.join(uploadDir, filename);
  await writeFile(filepath, buffer);

  // Lis l'ancien JSON
  let products = [];
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    products = JSON.parse(data);
  } catch {
    products = [];
  }

  // Ajoute le nouveau produit
  const newProduct = {
    id: Date.now(),
    name,
    price: parseInt(price),
    category,
    stock: parseInt(stock),
    description,
    image: `/uploads/${filename}`,
    promo: 0,
    reviews: 0
  };
  products.push(newProduct);

  // Sauvegarde
  await fs.writeFile(dataPath, JSON.stringify(products, null, 2));

  return NextResponse.json({ success: true, product: newProduct });
}
