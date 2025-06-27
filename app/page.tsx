'use client'

import { useState } from 'react'
import { Search, TrendingUp, Users, Building2, FileText, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'
import FundReport from './components/FundReport'

interface FundData {
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

export default function Home() {
  const [fundName, setFundName] = useState('')
  const [loading, setLoading] = useState(false)
  const [fundData, setFundData] = useState<FundData | null>(null)

  const handleSearch = async () => {
    if (!fundName.trim()) {
      toast.error('Please enter a fund name')
      return
    }

    setLoading(true)
    console.log('Starting research for:', fundName)
    
    try {
      const response = await fetch('/api/research-fund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fundName: fundName.trim() }),
      })

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('API Error:', errorData)
        toast.error(errorData.error || `Failed to research fund (${response.status})`)
        return
      }

      const data = await response.json()
      console.log('Received data:', data)
      
      if (data._demoMode) {
        toast.success('Demo data loaded! Configure API keys for live research.')
      } else if (data._fromCache) {
        toast.success(`📋 Data loaded from cache! (Researched: ${new Date(data._cacheDate).toLocaleDateString()})`)
      } else {
        toast.success('🔍 Fresh research completed and saved to cache!')
      }
      
      setFundData(data)
    } catch (error) {
      console.error('Network/Parse error:', error)
      toast.error('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }



  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Private Equity
            <span className="text-primary-600 block">Fund Intelligence</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Get comprehensive insights on private equity funds including investment thesis, 
            team composition, fund strategies, and recent deal activity.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={(e) => {
              e.preventDefault()
              handleSearch()
            }}>
              <div className="relative">
                <input
                  type="text"
                  value={fundName}
                  onChange={(e) => setFundName(e.target.value)}
                  placeholder="Enter private equity fund name (e.g., KKR, Blackstone, Apollo)"
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all duration-200"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !fundName.trim()}
                  className="absolute right-2 top-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Search size={18} />
                      Research
                    </>
                  )}
                </button>
              </div>
            </form>
            
            {/* Quick Test Buttons */}
            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={() => {setFundName('KKR'); setTimeout(handleSearch, 100)}}
                disabled={loading}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm"
              >
                Test KKR
              </button>
              <button
                onClick={() => {setFundName('Blackstone'); setTimeout(handleSearch, 100)}}
                disabled={loading}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm"
              >
                Test Blackstone
              </button>
              <button
                onClick={() => {setFundName('Apollo'); setTimeout(handleSearch, 100)}}
                disabled={loading}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm"
              >
                Test Apollo
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          {!fundData && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Building2 className="text-primary-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fund Details</h3>
                <p className="text-gray-600">Name, address, contact information, and fund portfolio overview</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <TrendingUp className="text-primary-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Investment Thesis</h3>
                <p className="text-gray-600">Strategic focus, sector preferences, and investment philosophy</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Users className="text-primary-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Members</h3>
                <p className="text-gray-600">Key personnel, positions, and professional backgrounds</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <FileText className="text-primary-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fund Strategies</h3>
                <p className="text-gray-600">Portfolio strategies, fund sizes, and raising timeline</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Calendar className="text-primary-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Deals</h3>
                <p className="text-gray-600">Last 3 years of investment activity and portfolio companies</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Search className="text-primary-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Research</h3>
                <p className="text-gray-600">Comprehensive analysis using advanced AI and real-time data</p>
              </div>
            </div>
          )}
        </div>

        {/* Fund Report */}
        {fundData && <FundReport data={fundData} />}
      </div>
    </main>
  )
} 