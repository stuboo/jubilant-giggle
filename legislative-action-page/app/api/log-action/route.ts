import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export async function POST(request: Request) {
  try {
    const { actionType, details } = await request.json()

    if (!actionType) {
      return NextResponse.json(
        { error: 'Missing action type' },
        { status: 400 }
      )
    }

    const timestamp = new Date().toISOString()
    const actionData = {
      timestamp,
      actionType,
      details: details || {}
    }

    // Increment action counter
    await redis.incr(`action:${actionType}:count`)
    
    // Store action details in a time-series list
    await redis.lpush(`action:${actionType}:log`, JSON.stringify(actionData))
    
    // Trim the list to keep only recent entries (last 1000)
    await redis.ltrim(`action:${actionType}:log`, 0, 999)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error logging action:', error)
    return NextResponse.json(
      { error: 'Failed to log action' },
      { status: 500 }
    )
  }
}
