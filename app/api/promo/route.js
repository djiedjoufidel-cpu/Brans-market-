import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/promos.json');

export async function POST(req) {
  try {
    const { code } = await req.json();
    const data = await fs.readFile(filePath, 'utf8');
    const promos = JSON.parse(data);
    
    const promo = promos.find(p => p.code.toLowerCase() === code.toLowerCase() && p.active);
    
    if (!promo) return NextResponse.json({ valid: false, message: 'Code invalide' });
    if (new Date(promo.expires) < new Date()) return NextResponse.json({ valid: false, message: 'Code expiré' });
    
    return NextResponse.json({ 
      valid: true, 
      discount: promo.discount, 
      type: promo.type,
      message: 'Code appliqué'
    });
  } catch (error) {
    return NextResponse.json({ valid: false, message: 'Erreur serveur' });
  }
}
