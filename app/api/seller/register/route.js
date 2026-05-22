import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

let sellers = []; // Remplace ça par ta DB plus tard

export async function POST(req) {
  try {
    const { name, phone, email, password } = await req.json();

    if (!name || !phone || !email || !password) {
      return NextResponse.json({ error: 'Tous les champs sont obligatoires' }, { status: 400 });
    }

    const exists = sellers.find(s => s.email === email);
    if (exists) {
      return NextResponse.json({ error: 'Email déjà utilisé' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newSeller = {
      id: Date.now().toString(),
      name,
      phone,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    sellers.push(newSeller);

    return NextResponse.json({ success: true, seller: { id: newSeller.id, name, email } });
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
