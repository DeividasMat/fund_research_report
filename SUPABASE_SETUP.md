# Supabase Database Setup

## 1. Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project

## 2. Create Database Table

In your Supabase dashboard, go to the SQL Editor and run this SQL:

```sql
-- Create fund_research table
CREATE TABLE IF NOT EXISTS fund_research (
    id SERIAL PRIMARY KEY,
    fund_name VARCHAR(255) NOT NULL,
    fund_name_normalized VARCHAR(255) UNIQUE NOT NULL,
    address TEXT,
    contact_email VARCHAR(255),
    investment_thesis TEXT,
    funds JSONB,
    team_members JSONB,
    recent_deals JSONB,
    research_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_fund_name_normalized ON fund_research(fund_name_normalized);
CREATE INDEX IF NOT EXISTS idx_research_date ON fund_research(research_date DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_fund_research_updated_at
    BEFORE UPDATE ON fund_research
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 3. Get API Credentials

1. In your Supabase dashboard, go to Settings → API
2. Copy these values to your `.env.local` file:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Test Database Connection

1. Add the credentials to `.env.local`
2. Restart your Next.js server
3. Visit `http://localhost:3000/api/cached-funds` to check if database is connected

## 5. How Caching Works

- When you search for a fund, the system first checks the database
- If found, it returns cached data instantly (no API calls)
- If not found, it performs live research and saves to database
- Next time you search for the same fund, it loads from cache

## 6. Benefits

✅ **Faster Results**: Instant loading for previously researched funds  
✅ **Cost Savings**: Reduces API usage for repeated searches  
✅ **Reliability**: Data persists even if APIs are down  
✅ **History**: Keep track of all researched funds  

## 7. Database Schema

The `fund_research` table stores:
- `fund_name`: Original fund name
- `fund_name_normalized`: Lowercase version for searching
- `address`: Fund's address
- `contact_email`: Contact email
- `investment_thesis`: Investment strategy
- `funds`: JSON array of fund details
- `team_members`: JSON array of team information
- `recent_deals`: JSON array of recent deals
- `research_date`: When the research was performed
- `created_at` & `updated_at`: Timestamps

## 8. Viewing Cached Data

- **API Endpoint**: `GET /api/cached-funds` 
- **Response**: List of all cached funds with research dates
- Shows total count and Supabase connection status 