'use client'

import { useState } from 'react'
import { Search, TrendingUp, Users, Building2, FileText, Calendar, Zap, Shield, BarChart3, Globe, ArrowRight, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import FundReport from './components/FundReport'

interface FundData {
  fundName: string
  address: string
  contactEmail: string
  website?: string
  phone?: string
  investmentThesis: string
  aum?: string
  foundedYear?: string
  headquarters?: string
  officeLocations?: string[]
  funds: Array<{
    name: string
    strategy: string
    raisedDate: string
    size: string
    targetSize?: string
    status?: string
    vintageYear?: string
    closingDate?: string
    fundNumber?: string
  }>
  teamMembers: Array<{
    name: string
    position: string
    email?: string
    phone?: string
    linkedin?: string
    experience: string
    education?: string
    previousCompanies?: string[]
    yearsAtFirm?: string
  }>
  recentDeals: Array<{
    company: string
    sector: string
    date: string
    dealType: string
    amount: string
    currency?: string
    description?: string
    leadArrangers?: string[]
    coInvestors?: string[]
    use_of_proceeds?: string
  }>
  competitiveAnalysis?: {
    mainCompetitors?: string[]
    marketPosition?: string
    differentiators?: string[]
  }
  performanceMetrics?: {
    totalDeployed?: string
    numberOfInvestments?: string
    averageDealSize?: string
    geographicFocus?: string[]
    sectorFocus?: string[]
  }
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                <BarChart3 className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CreditIntel</h1>
                <p className="text-xs text-gray-600">Private Credit Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <Shield size={16} />
                <span>Secure & Confidential</span>
              </div>
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Professional
              </div>
            </div>
          </div>
        </div>
      </nav>

      {!fundData ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} />
              AI-Powered Fund Intelligence
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-20 leading-tight">
              Private Credit
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                Intelligence Platform
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Access comprehensive insights on private credit funds, direct lending strategies, 
              credit teams, fund portfolios, and recent credit transactions with advanced AI analysis.
            </p>

            {/* Enhanced Search Section */}
                         <div className="max-w-3xl mx-auto mb-16">
               <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-500 hover:bg-white/80 group">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                     <Search className="text-white" size={20} />
                   </div>
                   <h3 className="text-2xl font-bold text-gray-900">Fund Research Center</h3>
                 </div>
                
                <form onSubmit={(e) => {
                  e.preventDefault()
                  handleSearch()
                }}>
                                     <div className="relative mb-6">
                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                       <Search className="h-6 w-6 text-gray-400" />
                     </div>
                     <input
                       type="text"
                       value={fundName}
                       onChange={(e) => setFundName(e.target.value)}
                       placeholder="Enter private credit fund name"
                       className="w-full pl-12 pr-40 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                       disabled={loading}
                     />
                    <button
                      type="submit"
                      disabled={loading || !fundName.trim()}
                      className="absolute right-2 top-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white px-8 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl disabled:shadow-none"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                          <span>Researching...</span>
                        </>
                      ) : (
                        <>
                          <Zap size={20} />
                          <span>Research Fund</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
                
                {/* Quick Test Buttons */}
                                 <div className="flex flex-wrap gap-3 justify-center items-center">
                   <span className="text-sm text-gray-600 mr-2">Quick demos:</span>
                   {['KKR', 'Blackstone', 'Apollo'].map((fund) => (
                     <button
                       key={fund}
                       onClick={() => {setFundName(fund); setTimeout(handleSearch, 100)}}
                       disabled={loading}
                       className="px-4 py-2 bg-white border border-gray-300 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-lg text-sm transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       {fund}
                     </button>
                   ))}
                 </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="bg-white/60 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600 text-sm">Funds Analyzed</div>
              </div>
              <div className="bg-white/60 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-indigo-600 mb-2">$2.5T</div>
                <div className="text-gray-600 text-sm">AUM Tracked</div>
              </div>
              <div className="bg-white/60 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
                <div className="text-gray-600 text-sm">Deals Analyzed</div>
              </div>
              <div className="bg-white/60 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-emerald-600 mb-2">Real-time</div>
                <div className="text-gray-600 text-sm">Data Updates</div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="group bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-blue-300">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fund Intelligence</h3>
              <p className="text-gray-600 leading-relaxed">Comprehensive fund details, contact information, AUM, and complete portfolio analysis</p>
              <div className="flex items-center text-blue-600 mt-4 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-sm font-medium">Learn more</span>
                <ArrowRight size={16} className="ml-2" />
              </div>
            </div>

            <div className="group bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-purple-300">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Investment Strategy</h3>
              <p className="text-gray-600 leading-relaxed">Deep dive into direct lending focus, sector preferences, and credit investment approaches</p>
              <div className="flex items-center text-purple-600 mt-4 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-sm font-medium">Explore</span>
                <ArrowRight size={16} className="ml-2" />
              </div>
            </div>

            <div className="group bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-emerald-300">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Team Analytics</h3>
              <p className="text-gray-600 leading-relaxed">Credit professionals, contact details, educational backgrounds, and career histories</p>
              <div className="flex items-center text-emerald-600 mt-4 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-sm font-medium">Discover</span>
                <ArrowRight size={16} className="ml-2" />
              </div>
            </div>

            <div className="group bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-orange-300">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileText className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fund Strategies</h3>
              <p className="text-gray-600 leading-relaxed">Direct lending strategies, fund sizes, vintage years, and detailed raising timelines</p>
              <div className="flex items-center text-orange-600 mt-4 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-sm font-medium">Analyze</span>
                <ArrowRight size={16} className="ml-2" />
              </div>
            </div>

            <div className="group bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-cyan-300">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transaction History</h3>
              <p className="text-gray-600 leading-relaxed">Recent credit transactions, deal structures, lead arrangers, and co-investor details</p>
              <div className="flex items-center text-cyan-600 mt-4 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-sm font-medium">Review</span>
                <ArrowRight size={16} className="ml-2" />
              </div>
            </div>

            <div className="group bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-violet-300">
              <div className="bg-gradient-to-r from-violet-600 to-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Insights</h3>
              <p className="text-gray-600 leading-relaxed">Advanced AI analysis with real-time data gathering and professional PDF reports</p>
              <div className="flex items-center text-violet-600 mt-4 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-sm font-medium">Experience</span>
                <ArrowRight size={16} className="ml-2" />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center border-t border-gray-200 pt-12">
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
              <Globe size={16} />
              <span className="text-sm">Trusted by leading institutional investors worldwide</span>
            </div>
            <p className="text-gray-500 text-sm">
              CreditIntel © 2024 • Professional Private Credit Intelligence Platform
            </p>
          </div>
        </div>
      ) : (
        /* Fund Report */
        <FundReport data={fundData} />
      )}
    </main>
  )
} 