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
  website: string
  phone: string
  investmentThesis: string
  aum: string
  foundedYear: string
  headquarters: string
  officeLocations: string[]
  funds: Array<{
    name: string
    strategy: string
    raisedDate: string
    size: string
    targetSize: string
    status: string
    vintageYear: string
    closingDate: string
    fundNumber: string
  }>
  teamMembers: Array<{
    name: string
    position: string
    email: string
    phone: string
    linkedin: string
    experience: string
    education: string
    previousCompanies: string[]
    yearsAtFirm: string
  }>
  recentDeals: Array<{
    company: string
    sector: string
    date: string
    dealType: string
    amount: string
    currency: string
    description: string
    leadArrangers: string[]
    coInvestors: string[]
    use_of_proceeds: string
  }>
  competitiveAnalysis: {
    mainCompetitors: string[]
    marketPosition: string
    differentiators: string[]
  }
  performanceMetrics: {
    totalDeployed: string
    numberOfInvestments: string
    averageDealSize: string
    geographicFocus: string[]
    sectorFocus: string[]
  }
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
            content: 'You are a financial research assistant specializing in private credit funds. Provide detailed, accurate, and up-to-date information about private credit firms, their direct lending strategies, credit investment teams, and recent credit transactions. Always cite sources when possible.'
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
    // Return empty string instead of throwing - let the calling function handle the failure
    return `Research data not available for query: ${query}`
  }
}

async function performEnhancedAnalysis(rawData: string, fundName: string): Promise<string> {
  try {
    if (!openai) {
      throw new Error('OpenAI not configured')
    }

    const analysisPrompt = `
You are an expert financial analyst specializing in private credit research. Analyze the following comprehensive research data about "${fundName}" and extract maximum insights, details, and connections.

RESEARCH DATA:
${rawData}

Your task is to:
1. IDENTIFY and EXTRACT all email addresses, phone numbers, LinkedIn profiles mentioned
2. CONNECT team member information with their specific roles and backgrounds
3. EXTRACT precise fund details: exact closing dates, fund sizes, target amounts, vintage years
4. ANALYZE transaction details: amounts, currencies, lead arrangers, co-investors, deal structures
5. IDENTIFY competitive positioning, market share, differentiators
6. EXTRACT performance metrics, AUM, deployment statistics, sector focus
7. FIND contact information, office locations, website, founding year
8. ANALYZE investment thesis and strategy patterns
9. IDENTIFY trends in recent transactions and investment patterns
10. EXTRACT educational backgrounds, previous companies, career progression

ENHANCEMENT INSTRUCTIONS:
- Extract EVERY piece of contact information found (emails, phones, LinkedIn)
- Identify patterns and connections between different pieces of information
- Cross-reference team members with their transaction involvement
- Extract precise financial metrics and performance data
- Identify and analyze competitive landscape mentions
- Find and organize all fund-specific information chronologically
- Extract detailed transaction mechanics and structures
- Organize office locations and contact details systematically

Provide a comprehensive, enhanced analysis that maximizes the insights from the raw data. Include all contact details, precise dates, financial metrics, and strategic insights you can extract.

Format as detailed analytical text with clear sections for different types of information.
`

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert financial analyst with deep expertise in private credit markets, fund analysis, and data extraction. You excel at finding patterns, extracting contact information, and providing comprehensive financial analysis.'
        },
        {
          role: 'user',
          content: analysisPrompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.1
    })

    const enhancedAnalysis = response.choices[0].message.content
    if (!enhancedAnalysis) {
      throw new Error('No enhanced analysis from OpenAI')
    }

    console.log('Enhanced analysis completed, length:', enhancedAnalysis.length)
    return enhancedAnalysis
  } catch (error) {
    console.error('Enhanced analysis error:', error)
    // Fallback to original data if analysis fails
    return rawData
  }
}

async function generateStructuredReport(rawData: string, fundName: string): Promise<FundResearchData> {
  try {
    if (!openai) {
      throw new Error('OpenAI not configured')
    }

    const prompt = `
Based on the following research data about the private credit fund "${fundName}", create a comprehensive structured report in JSON format focused on private credit activities. 

Research Data:
${rawData}

Please create a comprehensive JSON object with the following structure:
{
  "fundName": "Official fund name",
  "address": "Full headquarters address",
  "contactEmail": "Main contact email",
  "website": "Official website URL",
  "phone": "Main phone number",
  "investmentThesis": "Detailed private credit investment strategy and approach (3-4 sentences)",
  "aum": "Total assets under management",
  "foundedYear": "Year founded",
  "headquarters": "Primary headquarters location",
  "officeLocations": ["List of all office locations"],
  "funds": [
    {
      "name": "Complete fund name",
      "strategy": "Detailed investment strategy",
      "raisedDate": "Exact closing date",
      "size": "Final fund size",
      "targetSize": "Target size if different",
      "status": "Fund status (closed, raising, etc.)",
      "vintageYear": "Vintage year",
      "closingDate": "Final closing date",
      "fundNumber": "Fund sequence number"
    }
  ],
  "teamMembers": [
    {
      "name": "Full name",
      "position": "Complete title/position",
      "email": "Email address if found",
      "phone": "Direct phone if available",
      "linkedin": "LinkedIn profile URL",
      "experience": "Detailed background and experience",
      "education": "Educational background",
      "previousCompanies": ["List of previous companies"],
      "yearsAtFirm": "Years at current firm"
    }
  ],
  "recentDeals": [
    {
      "company": "Borrower company name",
      "sector": "Industry sector",
      "date": "Transaction date",
      "dealType": "Type of credit facility",
      "amount": "Credit amount",
      "currency": "Currency (USD, EUR, etc.)",
      "description": "Deal description",
      "leadArrangers": ["Lead arrangers"],
      "coInvestors": ["Co-investors if any"],
      "use_of_proceeds": "Use of proceeds"
    }
  ],
  "competitiveAnalysis": {
    "mainCompetitors": ["List of main competitors"],
    "marketPosition": "Market position description",
    "differentiators": ["Key differentiating factors"]
  },
  "performanceMetrics": {
    "totalDeployed": "Total capital deployed",
    "numberOfInvestments": "Number of investments",
    "averageDealSize": "Average deal size",
    "geographicFocus": ["Geographic regions"],
    "sectorFocus": ["Primary sectors"]
  }
}

CRITICAL REQUIREMENTS - ADVANCED ANALYSIS:
- Focus EXCLUSIVELY on PRIVATE CREDIT activities, ignore general private equity
- Extract MAXIMUM detail from the research data provided
- Include 5-10+ team members from credit division with ALL available contact details
- PRIORITIZE finding email addresses, phone numbers, LinkedIn profiles for team members
- Include 10-15+ recent private credit transactions from 2021-2024 with comprehensive details
- Include ALL private credit funds managed by the firm with exact dates and sizes
- Find specific fund closing dates, target sizes, vintage years, fund numbers
- Extract detailed transaction information: lead arrangers, co-investors, use of proceeds
- Include competitive analysis and performance metrics from the data
- Use precise dates, amounts, and contact details when available
- If email/phone not found, state "Not publicly available" but include all other details
- Focus on direct lending, unitranche, senior debt, mezzanine, distressed credit
- Include educational backgrounds and career histories for team members
- Extract office locations, founding year, total AUM, website, main contacts
- Analyze competitive positioning and market differentiators
- Include sector focus, geographic focus, average deal sizes, deployment metrics

Return only the JSON object, no additional text.
`

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a financial analyst specializing in private credit research. You create structured, comprehensive reports focused on private credit activities, direct lending, and credit investment strategies. Always return valid JSON only.'
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

    // Step 3: Perform advanced multi-stage research with enhanced methodology
    console.log('Performing advanced multi-stage research for:', fundName)
    
    try {
      // Stage 1: Company Foundation & Corporate Intelligence
      const basicInfoQueries = [
        `${fundName} private credit fund headquarters address phone website contact information CEO managing partner`,
        `${fundName} private credit firm founded year history background AUM assets under management total capital raised`,
        `${fundName} office locations global presence regional offices contact details international footprint`,
        `${fundName} private credit investment strategy focus sectors geographic focus direct lending approach investment thesis`,
        `${fundName} regulatory filings SEC registrations investment advisor registrations compliance history`,
        `${fundName} corporate structure parent company subsidiaries affiliates ownership management company`
      ]

      console.log('Stage 1: Gathering company foundation & corporate intelligence...')
      const basicInfoResults = await Promise.all(basicInfoQueries.map(query => searchWithPerplexity(query)))

      // Stage 2: Fund Portfolio & Capital Structure Analysis
      const fundQueries = [
        `${fundName} private credit funds list all credit funds raised fund sizes target sizes vintage years complete portfolio`,
        `${fundName} credit fund closing dates final closing first closing fund raising timeline fundraising history`,
        `${fundName} credit fund strategies senior debt unitranche mezzanine distressed opportunistic fund terms fee structure`,
        `${fundName} fund performance metrics IRR returns deployment rate portfolio statistics performance track record`,
        `${fundName} investor base limited partners institutional investors pension funds endowments insurance companies`,
        `${fundName} fund economics management fees carried interest fee structure investor terms conditions`
      ]

      console.log('Stage 2: Gathering fund portfolio & capital structure analysis...')
      const fundResults = await Promise.all(fundQueries.map(query => searchWithPerplexity(query)))

      // Stage 3: Leadership & Team Intelligence
      const teamQueries = [
        `${fundName} credit team members leadership partners managing directors senior professionals complete team roster`,
        `${fundName} credit team contact information email addresses direct contact LinkedIn profiles phone numbers`,
        `${fundName} credit professionals education background experience previous companies career history detailed biographies`,
        `${fundName} senior credit team years at firm tenure leadership experience credit markets investment committee`,
        `${fundName} team compensation structure carried interest allocations profit sharing partner promotions`,
        `${fundName} advisory board members industry experts external advisors strategic relationships board composition`
      ]

      console.log('Stage 3: Researching leadership & team intelligence...')
      const teamResults = await Promise.all(teamQueries.map(query => searchWithPerplexity(query)))

      // Stage 4: Transaction Analysis & Deal Flow Intelligence
      const dealQueries = [
        `${fundName} recent credit transactions 2023 2024 direct lending deals senior debt unitranche detailed transaction list`,
        `${fundName} credit investments 2022 2021 leveraged loans term loan B facilities borrower companies portfolio companies`,
        `${fundName} transaction details deal sizes currency lead arrangers co-investors syndication partners deal structures`,
        `${fundName} credit deals use of proceeds refinancing growth capital acquisition financing working capital bridge loans`,
        `${fundName} notable transactions landmark deals large transactions significant investments case studies`,
        `${fundName} deal sourcing origination capabilities relationship lending sponsor relationships investment banking partnerships`
      ]

      console.log('Stage 4: Analyzing transactions & deal flow intelligence...')
      const dealResults = await Promise.all(dealQueries.map(query => searchWithPerplexity(query)))

      // Stage 5: Competitive Intelligence & Market Position
      const competitiveQueries = [
        `${fundName} competitors private credit market peers direct lending firms comparison competitive landscape`,
        `${fundName} market position ranking credit market share competitive advantages differentiators unique value proposition`,
        `private credit industry landscape ${fundName} competitive positioning market trends industry leadership`,
        `${fundName} competitive analysis strengths weaknesses market reputation client feedback investor perception`,
        `${fundName} market share direct lending market position industry rankings league tables deal volume`,
        `${fundName} differentiation factors competitive moat barriers to entry unique capabilities strategic advantages`
      ]

      console.log('Stage 5: Competitive intelligence & market position...')
      const competitiveResults = await Promise.all(competitiveQueries.map(query => searchWithPerplexity(query)))

      // Stage 6: Performance Metrics & Risk Analysis
      const performanceQueries = [
        `${fundName} portfolio performance metrics total capital deployed number of investments average deal size deployment statistics`,
        `${fundName} sector focus industry allocation geographic distribution investment patterns sector expertise`,
        `${fundName} credit portfolio quality default rates write-offs performance statistics credit losses realized returns`,
        `${fundName} fund raising success investor base LP relationships institutional investors fundraising track record`,
        `${fundName} risk management framework credit analysis underwriting standards portfolio monitoring risk controls`,
        `${fundName} ESG environmental social governance sustainable investing responsible investing ESG integration`
      ]

      console.log('Stage 6: Performance metrics & risk analysis...')
      const performanceResults = await Promise.all(performanceQueries.map(query => searchWithPerplexity(query)))

      // Stage 7: Strategic Relationships & Market Intelligence
      const relationshipQueries = [
        `${fundName} strategic partnerships key relationships investment banking partnerships origination sources`,
        `${fundName} sponsor relationships private equity partnerships strategic alliances co-investment relationships`,
        `${fundName} technology platform digital capabilities systems infrastructure operational efficiency`,
        `${fundName} market intelligence thought leadership industry publications research reports white papers`,
        `${fundName} industry involvement trade associations speaking engagements conference participation leadership roles`,
        `${fundName} recent news press releases announcements strategic initiatives new hires promotions awards`
      ]

      console.log('Stage 7: Strategic relationships & market intelligence...')
      const relationshipResults = await Promise.all(relationshipQueries.map(query => searchWithPerplexity(query)))

      // Stage 8: Regulatory & Compliance Intelligence
      const regulatoryQueries = [
        `${fundName} regulatory filings form ADV SEC registrations compliance history regulatory status`,
        `${fundName} regulatory issues compliance violations enforcement actions regulatory scrutiny`,
        `${fundName} licensing international regulations global compliance cross-border regulations`,
        `${fundName} industry regulations AIFMD MiFID II regulatory impact compliance costs regulatory changes`
      ]

      console.log('Stage 8: Regulatory & compliance intelligence...')
      const regulatoryResults = await Promise.all(regulatoryQueries.map(query => searchWithPerplexity(query)))

    // Combine all research stages
    const allResults = [
      '=== COMPANY FOUNDATION & CORPORATE INTELLIGENCE ===',
      ...basicInfoResults,
      '\n=== FUND PORTFOLIO & CAPITAL STRUCTURE ANALYSIS ===',
      ...fundResults,
      '\n=== LEADERSHIP & TEAM INTELLIGENCE ===',
      ...teamResults,
      '\n=== TRANSACTION ANALYSIS & DEAL FLOW INTELLIGENCE ===',
      ...dealResults,
      '\n=== COMPETITIVE INTELLIGENCE & MARKET POSITION ===',
      ...competitiveResults,
      '\n=== PERFORMANCE METRICS & RISK ANALYSIS ===',
      ...performanceResults,
      '\n=== STRATEGIC RELATIONSHIPS & MARKET INTELLIGENCE ===',
      ...relationshipResults,
      '\n=== REGULATORY & COMPLIANCE INTELLIGENCE ===',
      ...regulatoryResults
    ]

    const combinedResearchData = allResults.join('\n\n---\n\n')
    console.log('Advanced research completed, total data length:', combinedResearchData.length)

    // Step 4: Enhanced AI Analysis and Data Extraction
    console.log('Step 4: Performing enhanced AI analysis...')
    const enhancedAnalysis = await performEnhancedAnalysis(combinedResearchData, fundName)

    // Step 5: Generate comprehensive structured report using OpenAI
    console.log('Step 5: Generating final structured report...')
    const structuredReport = await generateStructuredReport(enhancedAnalysis, fundName)

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

    } catch (apiError) {
      console.error('API research failed, falling back to demo data:', apiError)
      
      // Fallback to demo data if API research fails
      const demoData = getDemoData(fundName)
      
      if (demoData) {
        return NextResponse.json({
          ...demoData,
          _demoMode: true,
          _message: 'API services temporarily unavailable. Showing demo data.',
          _fallback: true
        })
      } else {
        return NextResponse.json(
          { 
            error: `API services temporarily unavailable. Demo data not available for "${fundName}". Available demo funds: KKR, Blackstone, Apollo.`,
            availableDemoFunds: ['KKR', 'Blackstone', 'Apollo'],
            _fallback: true
          },
          { status: 503 }
        )
      }
    }

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
} 