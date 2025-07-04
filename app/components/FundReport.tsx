'use client'

import { Building2, Mail, MapPin, TrendingUp, Users, Calendar, DollarSign, Phone, Globe, LinkedinIcon, GraduationCap, Briefcase, Target, BarChart3, Download, FileText, Printer, ExternalLink, Star } from 'lucide-react'
import { useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

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

interface FundReportProps {
  data: FundData
}

export default function FundReport({ data }: FundReportProps) {
  const reportRef = useRef<HTMLDivElement>(null)
  
  const generatePDF = async () => {
    if (!reportRef.current) return

    try {
      const element = reportRef.current
      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        height: element.scrollHeight,
        width: element.scrollWidth
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`${data.fundName.replace(/[^a-zA-Z0-9]/g, '_')}_Private_Credit_Research_Report.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Clean Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.fundName}</h1>
              <p className="text-xl text-gray-600">Private Credit Research Report</p>
              <p className="text-sm text-gray-500 mt-1">Generated on {currentDate}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={generatePDF}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Export PDF
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Printer size={18} />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div ref={reportRef} className="space-y-8">
          {/* Company Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Company Overview</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-gray-400 mt-1" size={18} />
                    <div>
                      <p className="font-medium text-gray-900">Headquarters</p>
                      <p className="text-gray-600">{data.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="text-gray-400 mt-1" size={18} />
                    <div>
                      <p className="font-medium text-gray-900">Contact Email</p>
                      <a href={`mailto:${data.contactEmail}`} className="text-blue-600 hover:underline">
                        {data.contactEmail}
                      </a>
                    </div>
                  </div>
                  
                  {data.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="text-gray-400 mt-1" size={18} />
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <p className="text-gray-600">{data.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {data.website && (
                    <div className="flex items-start gap-3">
                      <Globe className="text-gray-400 mt-1" size={18} />
                      <div>
                        <p className="font-medium text-gray-900">Website</p>
                        <a href={data.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                          {data.website}
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  {data.foundedYear && (
                    <div className="flex items-start gap-3">
                      <Calendar className="text-gray-400 mt-1" size={18} />
                      <div>
                        <p className="font-medium text-gray-900">Founded</p>
                        <p className="text-gray-600">{data.foundedYear}</p>
                      </div>
                    </div>
                  )}
                  
                  {data.aum && (
                    <div className="flex items-start gap-3">
                      <DollarSign className="text-gray-400 mt-1" size={18} />
                      <div>
                        <p className="font-medium text-gray-900">Assets Under Management</p>
                        <p className="text-gray-600 font-semibold">{data.aum}</p>
                      </div>
                    </div>
                  )}
                  
                  {data.officeLocations && data.officeLocations.length > 0 && (
                    <div className="flex items-start gap-3">
                      <MapPin className="text-gray-400 mt-1" size={18} />
                      <div>
                        <p className="font-medium text-gray-900">Office Locations</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {data.officeLocations.map((location, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                              {location}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Investment Thesis */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Investment Thesis</h2>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-800 leading-relaxed text-lg">{data.investmentThesis}</p>
              </div>
            </div>
          </div>

          {/* Fund Portfolio */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="text-green-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Fund Portfolio</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.funds.map((fund, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg text-gray-900">{fund.name}</h3>
                      {fund.status && (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          fund.status.toLowerCase().includes('closed') 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {fund.status}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Strategy</span>
                        <span className="text-gray-900 font-medium">{fund.strategy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fund Size</span>
                        <span className="text-gray-900 font-bold">{fund.size}</span>
                      </div>
                      {fund.targetSize && fund.targetSize !== fund.size && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Target Size</span>
                          <span className="text-gray-900">{fund.targetSize}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vintage Year</span>
                        <span className="text-gray-900">{fund.vintageYear || fund.raisedDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="text-purple-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Leadership Team</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {data.teamMembers.map((member, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-5">
                    <div className="mb-4">
                      <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                      <p className="text-purple-600 font-medium">{member.position}</p>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {member.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={14} className="text-gray-400" />
                          <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                            {member.email}
                          </a>
                        </div>
                      )}
                      {member.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={14} className="text-gray-400" />
                          <span className="text-gray-600">{member.phone}</span>
                        </div>
                      )}
                      {member.linkedin && (
                        <div className="flex items-center gap-2 text-sm">
                          <LinkedinIcon size={14} className="text-gray-400" />
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            LinkedIn Profile
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="text-sm text-gray-600 space-y-2">
                      <p>{member.experience}</p>
                      
                      {member.education && (
                        <div className="flex items-start gap-2">
                          <GraduationCap size={14} className="text-gray-400 mt-0.5" />
                          <span><strong>Education:</strong> {member.education}</span>
                        </div>
                      )}
                      
                      {member.previousCompanies && member.previousCompanies.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Briefcase size={14} className="text-gray-400 mt-0.5" />
                          <span><strong>Previous:</strong> {member.previousCompanies.join(', ')}</span>
                        </div>
                      )}
                      
                      {member.yearsAtFirm && (
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-gray-400" />
                          <span><strong>Tenure:</strong> {member.yearsAtFirm}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="text-orange-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Recent Transactions</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Company</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Sector</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Deal Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentDeals.map((deal, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">{deal.company}</div>
                          {deal.description && (
                            <div className="text-sm text-gray-500 mt-1">{deal.description}</div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-gray-600">{deal.sector}</td>
                        <td className="py-3 px-4">
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                            {deal.dealType}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-gray-900">{deal.amount}</div>
                          {deal.use_of_proceeds && (
                            <div className="text-sm text-gray-500 mt-1">
                              <strong>Use:</strong> {deal.use_of_proceeds}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">{deal.date}</div>
                          {deal.leadArrangers && deal.leadArrangers.length > 0 && (
                            <div className="text-sm text-gray-500 mt-1">
                              <strong>Lead:</strong> {deal.leadArrangers.join(', ')}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Competitive Analysis */}
          {data.competitiveAnalysis && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="text-cyan-600" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">Competitive Analysis</h2>
                </div>
                <div className="space-y-6">
                  {data.competitiveAnalysis.mainCompetitors && data.competitiveAnalysis.mainCompetitors.length > 0 && (
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-3">Main Competitors</h3>
                      <div className="flex flex-wrap gap-2">
                        {data.competitiveAnalysis.mainCompetitors.map((competitor, index) => (
                          <span key={index} className="bg-cyan-100 text-cyan-800 px-3 py-2 rounded-lg text-sm font-medium">
                            {competitor}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {data.competitiveAnalysis.marketPosition && (
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-3">Market Position</h3>
                      <p className="text-gray-700 leading-relaxed">{data.competitiveAnalysis.marketPosition}</p>
                    </div>
                  )}
                  
                  {data.competitiveAnalysis.differentiators && data.competitiveAnalysis.differentiators.length > 0 && (
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-3">Key Differentiators</h3>
                      <div className="space-y-2">
                        {data.competitiveAnalysis.differentiators.map((diff, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Star className="text-cyan-600 mt-0.5" size={16} />
                            <span className="text-gray-700">{diff}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Performance Metrics */}
          {data.performanceMetrics && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="text-green-600" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">Performance Overview</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {data.performanceMetrics.totalDeployed && (
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{data.performanceMetrics.totalDeployed}</div>
                      <div className="text-gray-600 text-sm">Total Deployed</div>
                    </div>
                  )}
                  
                  {data.performanceMetrics.numberOfInvestments && (
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{data.performanceMetrics.numberOfInvestments}</div>
                      <div className="text-gray-600 text-sm">Portfolio Companies</div>
                    </div>
                  )}
                  
                  {data.performanceMetrics.averageDealSize && (
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{data.performanceMetrics.averageDealSize}</div>
                      <div className="text-gray-600 text-sm">Average Deal Size</div>
                    </div>
                  )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {data.performanceMetrics.geographicFocus && data.performanceMetrics.geographicFocus.length > 0 && (
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-3">Geographic Focus</h3>
                      <div className="flex flex-wrap gap-2">
                        {data.performanceMetrics.geographicFocus.map((region, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm">
                            {region}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {data.performanceMetrics.sectorFocus && data.performanceMetrics.sectorFocus.length > 0 && (
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-3">Sector Focus</h3>
                      <div className="flex flex-wrap gap-2">
                        {data.performanceMetrics.sectorFocus.map((sector, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm">
                            {sector}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Report Footer */}
          <div className="text-center py-6 text-gray-500 text-sm border-t border-gray-200">
            <p>Report generated on {currentDate}</p>
            <p>CreditIntel - Private Credit Intelligence Platform</p>
          </div>
        </div>
      </div>
    </div>
  )
} 