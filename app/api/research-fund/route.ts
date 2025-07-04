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

const openaiSearch = process.env.OPENAI_API_KEY 
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
    // Return placeholder instead of throwing - let the calling function handle the failure
    return `[Perplexity search unavailable for: ${query}]`
  }
}

async function searchWithOpenAI(query: string): Promise<string> {
  try {
    if (!openaiSearch) {
      throw new Error('OpenAI not configured')
    }

    const completion = await openaiSearch.chat.completions.create({
      model: "gpt-4o-search-preview",
      web_search_options: {},
      messages: [
        {
          role: "system",
          content: "You are a specialized financial research assistant with expertise in private credit funds, direct lending, and institutional investing. Provide comprehensive, accurate, and detailed information about private credit firms, their investment strategies, team members, fund portfolios, recent transactions, and market positioning. Include specific details like contact information, fund sizes, dates, amounts, and competitive analysis when available."
        },
        {
          role: "user",
          content: query
        }
      ],
      max_tokens: 4000,
      temperature: 0.1
    })

    const content = completion.choices[0].message.content
    if (!content) {
      throw new Error('No content returned from OpenAI search')
    }

    return content
  } catch (error) {
    console.error('OpenAI search error:', error)
    // Return placeholder instead of throwing
    return `[OpenAI search unavailable for: ${query}]`
  }
}

async function performComprehensiveSearch(query: string): Promise<string> {
  try {
    console.log(`Performing comprehensive search for: ${query}`)
    
    // Run both Perplexity and OpenAI searches in parallel
    const [perplexityResult, openaiResult] = await Promise.all([
      searchWithPerplexity(query),
      searchWithOpenAI(query)
    ])

    // Combine results
    const combinedResult = `
=== PERPLEXITY RESEARCH ===
${perplexityResult}

=== OPENAI WEB SEARCH ===
${openaiResult}
`

    return combinedResult
  } catch (error) {
    console.error('Comprehensive search error:', error)
    // Fallback to individual searches if parallel fails
    try {
      const perplexityResult = await searchWithPerplexity(query)
      const openaiResult = await searchWithOpenAI(query)
      
      return `
=== PERPLEXITY RESEARCH ===
${perplexityResult}

=== OPENAI WEB SEARCH ===
${openaiResult}
`
    } catch (fallbackError) {
      console.error('Fallback search also failed:', fallbackError)
      return `[Search unavailable for: ${query}]`
    }
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
- Extract EVERY piece of contact information found (emails, phones, LinkedIn, social media)
- Identify patterns and connections between different pieces of information
- Cross-reference team members with their transaction involvement
- Extract precise financial metrics and performance data with exact amounts and dates
- Identify and analyze competitive landscape mentions with market share data
- Find and organize all fund-specific information chronologically with exact dates
- Extract detailed transaction mechanics and structures with all parties involved
- Organize office locations and contact details systematically with full addresses
- PRIORITIZE finding missing contact information for all team members
- Extract educational backgrounds with specific schools and degrees
- Find previous company affiliations and career progression details
- Identify exact fund closing dates, target vs. actual fund sizes
- Extract specific transaction amounts, currencies, and use of proceeds
- Find regulatory filings with specific filing dates and details
- Identify strategic partnerships and key relationships
- Extract performance metrics with specific IRR, returns, and deployment data

CRITICAL GAPS TO FILL:
- If team member emails are missing, provide reasoning or indicate "Not publicly disclosed"
- If fund sizes are vague, extract exact amounts in millions USD from ANY mention
- If transaction dates are unclear, provide specific month/year when possible from ANY source
- If contact information is partial, complete with available details from ANY search result
- If competitive analysis is thin, enhance with market positioning insights from ALL data
- If office locations lack details, provide full addresses when available from ANY source
- If investment thesis is generic, create comprehensive strategy based on ALL information found
- If private credit team is unclear, identify ALL team members and categorize their roles
- If deal categorization is missing, classify ALL transactions by type and relevance to credit

COMPREHENSIVE ANALYSIS REQUIREMENTS:
- EXTRACT every single piece of information from ALL search results
- CROSS-REFERENCE information between different search sources
- IDENTIFY patterns and connections across all data points
- CATEGORIZE everything clearly (credit vs. other activities)
- PROVIDE context for why certain information might be missing
- CREATE comprehensive profiles for all team members found
- ORGANIZE all deals chronologically with clear categorization
- SYNTHESIZE an overall investment thesis from all available information
- MAP the firm's complete organizational structure and capabilities

Provide a comprehensive, enhanced analysis that maximizes the insights from ALL the raw data. Include all contact details, precise dates, financial metrics, and strategic insights you can extract. Be thorough and leave no information unused from any source.

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
- ANALYZE ALL INFORMATION provided, then CATEGORIZE and FOCUS on private credit activities 
- Extract MAXIMUM detail from ALL research data provided (funds, deals, team, everything)
- CATEGORIZE team members: (1) Main management team (2) Private credit/debt specialists
- Include 10-20+ team members with ALL available contact details, highlighting credit professionals
- PRIORITIZE finding email addresses, phone numbers, LinkedIn profiles for ALL team members
- CATEGORIZE ALL transactions: (1) Private credit deals (2) Other investment activities
- Include 15-25+ transactions from 2019-2024, clearly marking which are credit-related
- Include ALL funds managed by the firm, categorizing credit vs. other strategies
- Find specific fund closing dates, target sizes, vintage years, fund numbers for ALL funds
- Extract detailed transaction information: lead arrangers, co-investors, use of proceeds for ALL deals
- Include competitive analysis and performance metrics from ALL available data
- Use precise dates, amounts, and contact details when available from ANY source
- If email/phone not found, state "Not publicly available" but include all other details
- CATEGORIZE deals: direct lending, unitranche, senior debt, mezzanine, distressed, equity, etc.
- Include educational backgrounds and career histories for ALL team members found
- Extract office locations, founding year, total AUM, website, main contacts from ALL data
- Analyze competitive positioning and market differentiators based on ALL information
- Include sector focus, geographic focus, average deal sizes, deployment metrics for ALL activities
- CREATE a comprehensive investment thesis that covers the firm's overall strategy
- IDENTIFY which team members are responsible for private credit activities specifically

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
    if (!process.env.OPENAI_API_KEY) {
      console.log('OpenAI API key not configured, using demo mode...')
      
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
        `${fundName} headquarters address phone website contact information CEO managing partner executives leadership`,
        `${fundName} firm founded year history background AUM assets under management total capital raised`,
        `${fundName} office locations global presence regional offices contact details international offices`,
        `${fundName} investment strategy focus sectors geographic focus approach investment thesis philosophy`,
        `${fundName} SEC filings regulatory registrations form ADV investment advisor compliance history`,
        `${fundName} corporate structure parent company subsidiaries affiliates ownership about company`
      ]

      console.log('Stage 1: Gathering company foundation & corporate intelligence...')
      const basicInfoResults = await Promise.all(basicInfoQueries.map(query => performComprehensiveSearch(query)))

      // Stage 2: Fund Portfolio & Capital Structure Analysis
      const fundQueries = [
        `${fundName} funds list all funds raised fund sizes target sizes vintage years complete fund portfolio`,
        `${fundName} fund closing dates final closing first closing fund raising timeline fundraising history`,
        `${fundName} fund strategies investment approach debt equity credit mezzanine distressed growth buyout`,
        `${fundName} fund performance metrics IRR returns deployment rate portfolio statistics track record`,
        `${fundName} investor base limited partners LP institutional investors pension funds endowments`,
        `${fundName} fund economics management fees carried interest fee structure terms conditions`
      ]

      console.log('Stage 2: Gathering fund portfolio & capital structure analysis...')
      const fundResults = await Promise.all(fundQueries.map(query => performComprehensiveSearch(query)))

      // Stage 3: Leadership & Team Intelligence
      const teamQueries = [
        `${fundName} team members leadership partners managing directors senior professionals executives complete roster`,
        `${fundName} team contact information email addresses direct contact LinkedIn profiles phone numbers`,
        `${fundName} professionals education background experience previous companies career history biographies`,
        `${fundName} credit team private credit debt lending professionals investment committee members`,
        `${fundName} senior leadership years at firm tenure experience management team key personnel`,
        `${fundName} advisory board members industry experts external advisors board composition directors`
      ]

      console.log('Stage 3: Researching leadership & team intelligence...')
      const teamResults = await Promise.all(teamQueries.map(query => performComprehensiveSearch(query)))

      // Stage 4: Transaction Analysis & Deal Flow Intelligence
      const dealQueries = [
        `${fundName} recent transactions 2023 2024 deals investments portfolio companies detailed transaction list`,
        `${fundName} investments 2022 2021 deals transactions financing leveraged buyouts portfolio companies`,
        `${fundName} transaction details deal sizes amounts currency lead arrangers co-investors syndication partners`,
        `${fundName} deals investments use of proceeds refinancing growth capital acquisition financing`,
        `${fundName} notable transactions landmark deals large transactions significant investments case studies news`,
        `${fundName} deal sourcing origination capabilities relationships sponsor partnerships investment banking`
      ]

      console.log('Stage 4: Analyzing transactions & deal flow intelligence...')
      const dealResults = await Promise.all(dealQueries.map(query => performComprehensiveSearch(query)))

      // Stage 5: Competitive Intelligence & Market Position
      const competitiveQueries = [
        `${fundName} competitors market peers firms comparison competitive landscape alternative investment`,
        `${fundName} market position ranking market share competitive advantages differentiators unique value proposition`,
        `investment industry landscape ${fundName} competitive positioning market trends industry leadership`,
        `${fundName} competitive analysis strengths weaknesses market reputation client feedback investor perception`,
        `${fundName} market share position industry rankings league tables deal volume performance`,
        `${fundName} differentiation factors competitive advantages unique capabilities strategic positioning`
      ]

      console.log('Stage 5: Competitive intelligence & market position...')
      const competitiveResults = await Promise.all(competitiveQueries.map(query => performComprehensiveSearch(query)))

      // Stage 6: Performance Metrics & Risk Analysis
      const performanceQueries = [
        `${fundName} portfolio performance metrics total capital deployed number of investments average deal size statistics`,
        `${fundName} sector focus industry allocation geographic distribution investment patterns expertise`,
        `${fundName} portfolio performance returns IRR multiples realized performance statistics track record`,
        `${fundName} fund raising success investor base LP relationships institutional investors fundraising`,
        `${fundName} risk management framework analysis underwriting standards portfolio monitoring controls`,
        `${fundName} ESG environmental social governance sustainable investing responsible investing integration`
      ]

      console.log('Stage 6: Performance metrics & risk analysis...')
      const performanceResults = await Promise.all(performanceQueries.map(query => performComprehensiveSearch(query)))

      // Stage 7: Strategic Relationships & Market Intelligence
      const relationshipQueries = [
        `${fundName} strategic partnerships key relationships banking partnerships origination sources alliances`,
        `${fundName} sponsor relationships partnerships strategic alliances co-investment relationships`,
        `${fundName} technology platform digital capabilities systems infrastructure operations`,
        `${fundName} thought leadership industry publications research reports white papers insights`,
        `${fundName} industry involvement associations speaking engagements conference participation leadership`,
        `${fundName} recent news press releases announcements strategic initiatives hires promotions awards`
      ]

      console.log('Stage 7: Strategic relationships & market intelligence...')
      const relationshipResults = await Promise.all(relationshipQueries.map(query => performComprehensiveSearch(query)))

      // Stage 8: Regulatory & Compliance Intelligence
      const regulatoryQueries = [
        `${fundName} regulatory filings form ADV SEC registrations compliance history regulatory status`,
        `${fundName} regulatory issues compliance violations enforcement actions regulatory scrutiny`,
        `${fundName} licensing international regulations global compliance cross-border regulations`,
        `${fundName} industry regulations AIFMD MiFID II regulatory impact compliance costs regulatory changes`
      ]

      console.log('Stage 8: Regulatory & compliance intelligence...')
      const regulatoryResults = await Promise.all(regulatoryQueries.map(query => performComprehensiveSearch(query)))

      // Stage 9: Deep Contact & Detail Intelligence
      const contactQueries = [
        `${fundName} executives contact details email addresses phone numbers LinkedIn profiles social media`,
        `${fundName} team member emails contact information business cards professional profiles directory`,
        `${fundName} detailed fund information exact closing dates fund sizes USD millions vintage years`,
        `${fundName} comprehensive deal database announcements press releases specific amounts dates details`,
        `${fundName} team educational background MBA schools universities professional certifications degrees`,
        `${fundName} office addresses zip codes phone numbers reception contact information locations`
      ]

      console.log('Stage 9: Deep contact & detail intelligence...')
      const contactResults = await Promise.all(contactQueries.map(query => performComprehensiveSearch(query)))

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
      ...regulatoryResults,
      '\n=== DEEP CONTACT & DETAIL INTELLIGENCE ===',
      ...contactResults
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