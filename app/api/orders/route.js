import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/orders.json');

export async function POST(req) {
  const order = await req.json();

  let orders = [];
  try {
    orders = JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch {}

  const newOrder = {
   ...order,
    id: Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);
  await fs.writeFile(filePath, JSON.stringify(orders, null, 2));

  return NextResponse.json({ success: true, order: newOrder });
}
