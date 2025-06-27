import { NextResponse } from 'next/server'
import { FundDatabase } from '../../lib/supabase'

export async function GET() {
  try {
    // Check if Supabase is configured
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return NextResponse.json({
        message: 'Database not configured',
        cachedFunds: [],
        supabaseConfigured: false
      })
    }

    const cachedFunds = await FundDatabase.getAllCachedFunds()
    
    return NextResponse.json({
      message: 'Database cache status',
      cachedFunds,
      supabaseConfigured: true,
      totalCached: cachedFunds.length
    })
  } catch (error) {
    console.error('Error fetching cached funds:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cached funds' },
      { status: 500 }
    )
  }
} 