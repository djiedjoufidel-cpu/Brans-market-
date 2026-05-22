import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/sellers.json');

export async function POST(req) {
  const { email, password } = await req.json();

  let sellers = [];
  try {
    sellers = JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch {
    return NextResponse.json({ error: 'Aucun vendeur enregistré' }, { status: 400 });
  }

  const seller = sellers.find(s => s.email === email && s.password === password);

  if (!seller) {
    return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    seller: { id: seller.id, email: seller.email, name: seller.name }
  });
}
