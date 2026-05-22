import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
const redis = Redis.fromEnv()

export async function POST(req: Request) {
  const { code, discount, expiresAt, shopId } = await req.json()
  if (!code ||!discount) return NextResponse.json({ error: 'Manquant' }, { status: 400 })

  await redis.set(`coupon:${code}`, JSON.stringify({ code, discount, expiresAt, shopId, active: true }))
  return NextResponse.json({ success: true })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  if (!code) return NextResponse.json({ valid: false })

  const coupon = await redis.get(`coupon:${code}`)
  if (!coupon) return NextResponse.json({ valid: false })

  const c = JSON.parse(coupon as string)
  const valid = c.active && (!c.expiresAt || Date.now() < c.expiresAt)
  return NextResponse.json({ valid, discount: c.discount })
}
