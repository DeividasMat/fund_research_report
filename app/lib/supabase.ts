import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database types for fund research data
export interface FundResearchRecord {
  id?: number
  fund_name: string
  fund_name_normalized: string // for searching
  address: string
  contact_email: string
  investment_thesis: string
  funds: any[] // JSON array
  team_members: any[] // JSON array
  recent_deals: any[] // JSON array
  created_at?: string
  updated_at?: string
  research_date?: string
}

export class FundDatabase {
  // Check if fund data exists in database
  static async getFundData(fundName: string): Promise<FundResearchRecord | null> {
    try {
      if (!supabase) {
        console.log('Supabase not configured')
        return null
      }

      const normalizedName = fundName.toLowerCase().trim()
      
      const { data, error } = await supabase
        .from('fund_research')
        .select('*')
        .eq('fund_name_normalized', normalizedName)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows found
          return null
        }
        console.error('Database query error:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Database error:', error)
      return null
    }
  }

  // Save fund research data to database
  static async saveFundData(fundData: any): Promise<boolean> {
    try {
      if (!supabase) {
        console.log('Supabase not configured, skipping database save')
        return false
      }

      const record: Omit<FundResearchRecord, 'id' | 'created_at' | 'updated_at'> = {
        fund_name: fundData.fundName,
        fund_name_normalized: fundData.fundName.toLowerCase().trim(),
        address: fundData.address,
        contact_email: fundData.contactEmail,
        investment_thesis: fundData.investmentThesis,
        funds: fundData.funds,
        team_members: fundData.teamMembers,
        recent_deals: fundData.recentDeals,
        research_date: new Date().toISOString()
      }

      const { error } = await supabase
        .from('fund_research')
        .upsert(record, {
          onConflict: 'fund_name_normalized'
        })

      if (error) {
        console.error('Database save error:', error)
        return false
      }

      console.log('Fund data saved to database:', fundData.fundName)
      return true
    } catch (error) {
      console.error('Database save error:', error)
      return false
    }
  }

  // Get all cached funds for reference
  static async getAllCachedFunds(): Promise<{ fund_name: string, research_date: string }[]> {
    try {
      if (!supabase) {
        console.log('Supabase not configured')
        return []
      }

      const { data, error } = await supabase
        .from('fund_research')
        .select('fund_name, research_date')
        .order('research_date', { ascending: false })

      if (error) {
        console.error('Database query error:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Database error:', error)
      return []
    }
  }
} 