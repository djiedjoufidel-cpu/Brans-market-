import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
const redis = Redis.fromEnv()

export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'Slug manquant' }, { status: 400 })
  
  const shopId = await redis.get(`shopslug:${slug}`)
  if (!shopId) return NextResponse.json({ id: null })
  
  return NextResponse.json({ id: shopId })
}
