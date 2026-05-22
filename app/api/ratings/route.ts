import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
const redis = Redis.fromEnv()

export async function POST(req: Request) {
  const { productId, rating, user } = await req.json()
  if (!productId ||!rating) return NextResponse.json({ error: 'Manquant' }, { status: 400 })

  await redis.lpush(`ratings:${productId}`, JSON.stringify({ rating: Number(rating), user, date: Date.now() }))
  return NextResponse.json({ success: true })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const productId = searchParams.get('productId')
  if (!productId) return NextResponse.json({ ratings: [], average: 0, count: 0 })

  const ratings = await redis.lrange(`ratings:${productId}`, 0, -1)
  const parsed = ratings.map(r => JSON.parse(r as string))
  const avg = parsed.length? parsed.reduce((a, b) => a + b.rating, 0) / parsed.length : 0

  return NextResponse.json({ ratings: parsed, average: avg.toFixed(1), count: parsed.length })
}
