import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
const redis = Redis.fromEnv()

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { status } = await req.json()
  const order = await redis.get(`order:${params.id}`)
  if (!order) return NextResponse.json({ error: 'Commande introuvable' }, { status: 404 })

  const updated = {...JSON.parse(order as string), status }
  await redis.set(`order:${params.id}`, JSON.stringify(updated))
  return NextResponse.json({ success: true })
}
