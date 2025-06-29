import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import axios from 'axios'
import { getDemoData } from '../../lib/demoData'
import { FundDatabase } from '../../lib/supabase'

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null

interface PerplexityResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

interface FundResearchData {
  fundName: string
  address: string
  contactEmail: string
  investmentThesis: string
  funds: Array<{
    name: string
    strategy: string
    raisedDate: string
    size: string
  }>
  teamMembers: Array<{
    name: string
    position: string
    experience: string
  }>
  recentDeals: Array<{
    company: string
    sector: string
    date: string
    dealType: string
    amount: string
  }>
}

async function searchWithPerplexity(query: string): Promise<string> {
  try {
    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a financial research assistant specializing in private equity funds. Provide detailed, accurate, and up-to-date information about private equity firms, their investment strategies, team members, and recent deals. Always cite sources when possible.'
          },
          {
            role: 'user',
            content: query
          }
        ],
        max_tokens: 4000,
        temperature: 0.1
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.choices[0].message.content
  } catch (error) {
    console.error('Perplexity API error:', error)
    throw new Error('Failed to search with Perplexity')
  }
}

async function generateStructuredReport(rawData: string, fundName: string): Promise<FundResearchData> {
  try {
    if (!openai) {
      throw new Error('OpenAI not configured')
    }

    const prompt = `
Based on the following research data about the private equity fund "${fundName}", create a comprehensive structured report in JSON format. 

Research Data:
${rawData}

Please create a JSON object with the following structure:
{
  "fundName": "Official fund name",
  "address": "Main office address",
  "contactEmail": "Contact email if available",
  "investmentThesis": "Detailed investment thesis and strategy (2-3 sentences)",
  "funds": [
    {
      "name": "Fund name",
      "strategy": "Investment strategy",
      "raisedDate": "Date raised",
      "size": "Fund size"
    }
  ],
  "teamMembers": [
    {
      "name": "Full name",
      "position": "Position/title",
      "experience": "Brief background (1-2 sentences)"
    }
  ],
  "recentDeals": [
    {
      "company": "Portfolio company name",
      "sector": "Industry sector",
      "date": "Deal date",
      "dealType": "Type of investment",
      "amount": "Deal amount if available"
    }
  ]
}

Requirements:
- Include at least 3-5 team members if available
- Include at least 5-10 recent deals from the last 3 years if available
- Include multiple funds if the firm manages several
- Use "Not available" if specific information is not found
- Ensure all data is accurate and based on the research provided
- Focus on deals from 2021-2024
- Make the investment thesis comprehensive and well-written

Return only the JSON object, no additional text.
`

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a financial analyst specializing in private equity research. You create structured, comprehensive reports based on research data. Always return valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 3000,
      temperature: 0.1
    })

    const jsonResponse = response.choices[0].message.content
    if (!jsonResponse) {
      throw new Error('No response from OpenAI')
    }

    // Clean up the response to ensure it's valid JSON
    const cleanedResponse = jsonResponse.replace(/```json\n?/, '').replace(/```\n?$/, '').trim()
    
    return JSON.parse(cleanedResponse)
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('Failed to generate structured report')
  }
}

export async function POST(request: NextRequest) {
  try {
    const { fundName } = await request.json()

    if (!fundName) {
      return NextResponse.json(
        { error: 'Fund name is required' },
        { status: 400 }
      )
    }

    // Step 1: Check database cache first (if Supabase is configured)
    const supabaseConfigured = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY
    
    if (supabaseConfigured) {
      console.log('Checking database cache for:', fundName)
      try {
        const cachedData = await FundDatabase.getFundData(fundName)
        
        if (cachedData) {
          console.log('Found cached data for:', fundName)
          // Convert database record back to API format
          const fundData = {
            fundName: cachedData.fund_name,
            address: cachedData.address,
            contactEmail: cachedData.contact_email,
            investmentThesis: cachedData.investment_thesis,
            funds: cachedData.funds,
            teamMembers: cachedData.team_members,
            recentDeals: cachedData.recent_deals,
            _fromCache: true,
            _cacheDate: cachedData.research_date
          }
          
          return NextResponse.json(fundData)
        }
      } catch (error) {
        console.error('Database check failed, continuing with API research:', error)
      }
    }

    // Step 2: Check for required API keys - if not available, use demo mode
    if (!process.env.PERPLEXITY_API_KEY || !process.env.OPENAI_API_KEY) {
      console.log('API keys not configured, using demo mode...')
      
      // Try to get demo data for the requested fund
      const demoData = getDemoData(fundName)
      
      if (demoData) {
        // Add a small delay to simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        return NextResponse.json({
          ...demoData,
          _demoMode: true,
          _message: 'Demo mode: Configure your API keys in .env.local to research any fund'
        })
      } else {
        return NextResponse.json(
          { 
            error: `Demo data not available for "${fundName}". Available demo funds: KKR, Blackstone, Apollo. Configure API keys for full functionality.`,
            availableDemoFunds: ['KKR', 'Blackstone', 'Apollo']
          },
          { status: 404 }
        )
      }
    }

    // Step 3: Perform live research using APIs
    console.log('Performing live research for:', fundName)
    
    const searchQueries = [
      `${fundName} private equity fund company information address contact email website`,
      `${fundName} private equity investment thesis strategy focus sectors`,
      `${fundName} private equity funds portfolio AUM assets under management fund sizes`,
      `${fundName} private equity team members leadership partners managing directors`,
      `${fundName} private equity recent deals investments acquisitions 2021 2022 2023 2024 portfolio companies`
    ]

    // Execute all searches in parallel for better performance
    const searchPromises = searchQueries.map(query => searchWithPerplexity(query))
    const searchResults = await Promise.all(searchPromises)

    // Combine all search results
    const combinedResearchData = searchResults.join('\n\n---\n\n')

    // Step 4: Generate structured report using OpenAI
    const structuredReport = await generateStructuredReport(combinedResearchData, fundName)

    // Step 5: Save to database cache (if Supabase is configured)
    if (supabaseConfigured) {
      try {
        await FundDatabase.saveFundData(structuredReport)
        console.log('Saved research data to database cache')
      } catch (error) {
        console.error('Failed to save to database cache:', error)
        // Don't fail the request if database save fails
      }
    }

    return NextResponse.json({
      ...structuredReport,
      _fromCache: false,
      _researchDate: new Date().toISOString()
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to research fund. Please try again.' },
      { status: 500 }
    )
  }
} 