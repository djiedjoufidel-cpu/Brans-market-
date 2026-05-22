import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
const redis = Redis.fromEnv()

export async function GET() {
  const shops = await redis.lrange('shops', 0, -1)
  return NextResponse.json(shops.map(s => JSON.parse(s as string)))
}

export async function POST(req: Request) {
  const { name, ownerId, ownerEmail } = await req.json()
  if (!name || !ownerId) return NextResponse.json({ error: 'Manquant' }, { status: 400 })

  // Vérifie que l'user est owner
  const owner = await redis.get(`user:${ownerId}`)
  if (!owner) return NextResponse.json({ error: 'Compte non trouvé' }, { status: 403 })
  
  const ownerData = JSON.parse(owner as string)
  if (ownerData.role !== 'owner') {
    return NextResponse.json({ error: 'Seuls les propriétaires peuvent créer une boutique' }, { status: 403 })
  }

  // Génère slug propre
  const slug = name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .slice(0, 50)
  
  // Vérifie si slug existe déjà
  const existing = await redis.get(`shopslug:${slug}`)
  if (existing) return NextResponse.json({ error: 'Nom déjà pris' }, { status: 409 })

  const shopId = `shop_${Date.now()}`
  const shop = { id: shopId, slug, name, ownerId, ownerEmail, createdAt: Date.now() }
  
  await redis.set(`shop:${shopId}`, JSON.stringify(shop))
  await redis.set(`shopslug:${slug}`, shopId)
  await redis.lpush('shops', JSON.stringify(shop))

  return NextResponse.json({ shopId, slug, url: `/shop/${slug}` })
}
