import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const redis = Redis.fromEnv()

export async function GET() {
  const keys = await redis.keys('shop:*')
  const shops = []
  
  for (const key of keys) {
    const shop = await redis.get(key)
    if (shop) {
      shops.push({
        id: key.replace('shop:', ''),  // <-- le plus important
        ...shop
      })
    }
  }
  
  return NextResponse.json({ shops })
}
