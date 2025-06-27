import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const config = {
    openaiConfigured: !!process.env.OPENAI_API_KEY,
    perplexityConfigured: !!process.env.PERPLEXITY_API_KEY,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  }

  return NextResponse.json({
    status: 'API is working',
    config,
    message: config.openaiConfigured && config.perplexityConfigured 
      ? 'All API keys are configured. Ready to research funds!' 
      : 'Please configure your API keys in .env.local file'
  })
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    return NextResponse.json({
      echo: message,
      received: new Date().toISOString(),
      status: 'POST request working'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    )
  }
} 