import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/reviews.json');

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');
  
  const data = await fs.readFile(filePath, 'utf8');
  const reviews = JSON.parse(data);
  
  if (productId) {
    return NextResponse.json(reviews.filter(r => r.productId == productId));
  }
  return NextResponse.json(reviews);
}

export async function POST(req) {
  const body = await req.json();
  const data = await fs.readFile(filePath, 'utf8');
  const reviews = JSON.parse(data);
  
  const newReview = {
    id: Date.now(),
    productId: body.productId,
    user: body.user || 'Client',
    rating: parseInt(body.rating),
    comment: body.comment,
    date: new Date().toISOString()
  };
  
  reviews.push(newReview);
  await fs.writeFile(filePath, JSON.stringify(reviews, null, 2));
  
  return NextResponse.json(newReview);
}
