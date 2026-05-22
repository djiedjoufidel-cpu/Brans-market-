import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/reports.json');

export async function POST(req) {
  const body = await req.json();
  
  let reports = [];
  try {
    const data = await fs.readFile(filePath, 'utf8');
    reports = JSON.parse(data);
  } catch {
    reports = [];
  }
  
  const newReport = {
    id: Date.now(),
    type: body.type, // 'product' ou 'seller'
    targetId: body.targetId,
    reason: body.reason,
    reporter: body.reporter || 'Anonyme',
    date: new Date().toISOString(),
    status: 'pending'
  };
  
  reports.push(newReport);
  await fs.writeFile(filePath, JSON.stringify(reports, null, 2));
  
  return NextResponse.json({ success: true, message: 'Signalement envoyé' });
}
