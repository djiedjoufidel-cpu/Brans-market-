import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/sellers.json');

export async function POST(req) {
  const { email, password, name, phone } = await req.json();

  let sellers = [];
  try {
    sellers = JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch {}

  // Vérifie si email existe déjà
  if (sellers.find(s => s.email === email)) {
    return NextResponse.json({ error: 'Email déjà utilisé' }, { status: 400 });
  }

  const newSeller = {
    id: Date.now(),
    email,
    password, // en prod on hash avec bcrypt
    name,
    phone,
    createdAt: new Date().toISOString()
  };

  sellers.push(newSeller);
  await fs.writeFile(filePath, JSON.stringify(sellers, null, 2));

  return NextResponse.json({ success: true, seller: { id: newSeller.id, email, name } });
}
