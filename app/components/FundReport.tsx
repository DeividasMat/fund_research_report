'use client'

import { Building2, Mail, MapPin, TrendingUp, Users, Calendar, DollarSign, Phone, Globe, LinkedinIcon, GraduationCap, Briefcase, Target, BarChart3, Download, FileText, Printer } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header with PDF Export */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
                <FileText className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Private Credit Research Report</h1>
                <p className="text-gray-600 mt-1">Comprehensive analysis and market intelligence</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={generatePDF}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Download size={20} />
                Export PDF
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                <Printer size={20} />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div ref={reportRef} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Professional Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>
            <div className="relative z-10 px-8 py-12">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                    <Building2 size={32} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{data.fundName}</h1>
                    <p className="text-slate-300 text-lg">Private Credit Research Analysis</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-300 text-sm">Report Date</p>
                  <p className="text-xl font-semibold">{currentDate}</p>
                </div>
              </div>
              
              {/* Key Metrics Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {data.foundedYear && (
                  <div className="text-center">
                    <p className="text-slate-300 text-sm">Founded</p>
                    <p className="text-2xl font-bold">{data.foundedYear}</p>
                  </div>
                )}
                {data.aum && (
                  <div className="text-center">
                    <p className="text-slate-300 text-sm">AUM</p>
                    <p className="text-2xl font-bold">{data.aum}</p>
                  </div>
                )}
                {data.performanceMetrics?.numberOfInvestments && (
                  <div className="text-center">
                    <p className="text-slate-300 text-sm">Investments</p>
                    <p className="text-2xl font-bold">{data.performanceMetrics.numberOfInvestments}</p>
                  </div>
                )}
                {data.performanceMetrics?.averageDealSize && (
                  <div className="text-center">
                    <p className="text-slate-300 text-sm">Avg Deal Size</p>
                    <p className="text-2xl font-bold">{data.performanceMetrics.averageDealSize}</p>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-slate-200">
                <div className="flex items-center gap-3">
                  <MapPin size={18} />
                  <span className="text-sm">{data.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} />
                  <span className="text-sm">{data.contactEmail}</span>
                </div>
                {data.phone && (
                  <div className="flex items-center gap-3">
                    <Phone size={18} />
                    <span className="text-sm">{data.phone}</span>
                  </div>
                )}
                {data.website && (
                  <div className="flex items-center gap-3">
                    <Globe size={18} />
                    <a href={data.website} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white underline">
                      {data.website}
                    </a>
                  </div>
                )}
              </div>

              {/* Office Locations */}
              {data.officeLocations && data.officeLocations.length > 0 && (
                <div className="mt-6">
                  <p className="text-slate-300 text-sm mb-3">Global Presence</p>
                  <div className="flex flex-wrap gap-2">
                    {data.officeLocations.map((location, index) => (
                      <span key={index} className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Report Body */}
          <div className="p-8 space-y-12">
            {/* Executive Summary */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Investment Thesis</h2>
                  <p className="text-gray-600 text-sm">Strategic approach and market positioning</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <p className="text-gray-800 leading-relaxed text-lg font-medium">{data.investmentThesis}</p>
              </div>
            </section>

            {/* Fund Portfolio */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-xl">
                  <DollarSign className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Fund Portfolio</h2>
                  <p className="text-gray-600 text-sm">Active investment vehicles and strategies</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.funds.map((fund, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-gray-900">{fund.name}</h3>
                      {fund.status && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          fund.status.toLowerCase().includes('closed') 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {fund.status}
                        </span>
                      )}
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Strategy:</span>
                        <span className="text-gray-900">{fund.strategy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Fund Size:</span>
                        <span className="text-gray-900 font-bold">{fund.size}</span>
                      </div>
                      {fund.targetSize && fund.targetSize !== fund.size && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">Target:</span>
                          <span className="text-gray-900">{fund.targetSize}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Vintage:</span>
                        <span className="text-gray-900">{fund.vintageYear || fund.raisedDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Team Members */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl">
                  <Users className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Leadership Team</h2>
                  <p className="text-gray-600 text-sm">Key professionals and contact information</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {data.teamMembers.map((member, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-purple-600 font-semibold mb-3">{member.position}</p>
                        
                        {/* Contact Grid */}
                        <div className="grid grid-cols-1 gap-2 mb-4">
                          {member.email && (
                            <div className="flex items-center gap-2 text-sm">
                              <Mail size={14} className="text-gray-500" />
                              <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                                {member.email}
                              </a>
                            </div>
                          )}
                          {member.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone size={14} className="text-gray-500" />
                              <span className="text-gray-700">{member.phone}</span>
                            </div>
                          )}
                          {member.linkedin && (
                            <div className="flex items-center gap-2 text-sm">
                              <LinkedinIcon size={14} className="text-gray-500" />
                              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                LinkedIn Profile
                              </a>
                            </div>
                          )}
                        </div>

                        <div className="space-y-3 text-sm">
                          <p className="text-gray-700 leading-relaxed">{member.experience}</p>
                          
                          {member.education && (
                            <div className="flex items-start gap-2">
                              <GraduationCap size={14} className="text-gray-500 mt-1" />
                              <div>
                                <span className="font-medium text-gray-700">Education: </span>
                                <span className="text-gray-600">{member.education}</span>
                              </div>
                            </div>
                          )}
                          
                          {member.previousCompanies && member.previousCompanies.length > 0 && (
                            <div className="flex items-start gap-2">
                              <Briefcase size={14} className="text-gray-500 mt-1" />
                              <div>
                                <span className="font-medium text-gray-700">Previous: </span>
                                <span className="text-gray-600">{member.previousCompanies.join(', ')}</span>
                              </div>
                            </div>
                          )}
                          
                          {member.yearsAtFirm && (
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-gray-500" />
                              <span className="text-gray-600">
                                <span className="font-medium">{member.yearsAtFirm}</span> tenure
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Deals */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 p-3 rounded-xl">
                  <Calendar className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Recent Transactions</h2>
                  <p className="text-gray-600 text-sm">Credit transactions and deal flow (2021-2024)</p>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Sector</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Deal Type</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.recentDeals.map((deal, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{deal.company}</div>
                              {deal.description && (
                                <div className="text-xs text-gray-500 mt-1">{deal.description}</div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{deal.sector}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                              {deal.dealType}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-bold text-gray-900">
                              {deal.amount}
                              {deal.currency && deal.currency !== 'USD' && (
                                <span className="text-xs text-gray-500 ml-1">({deal.currency})</span>
                              )}
                            </div>
                            {deal.use_of_proceeds && (
                              <div className="text-xs text-gray-500 mt-1">
                                <span className="font-medium">Use:</span> {deal.use_of_proceeds}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 font-medium">{deal.date}</div>
                            {deal.leadArrangers && deal.leadArrangers.length > 0 && (
                              <div className="text-xs text-gray-500 mt-1">
                                <span className="font-medium">Lead:</span> {deal.leadArrangers.join(', ')}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Competitive Analysis */}
            {data.competitiveAnalysis && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-3 rounded-xl">
                    <Target className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Competitive Landscape</h2>
                    <p className="text-gray-600 text-sm">Market positioning and differentiation</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {data.competitiveAnalysis.mainCompetitors && data.competitiveAnalysis.mainCompetitors.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="font-bold text-lg text-gray-900 mb-4">Main Competitors</h3>
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
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="font-bold text-lg text-gray-900 mb-4">Market Position</h3>
                      <p className="text-gray-700 leading-relaxed">{data.competitiveAnalysis.marketPosition}</p>
                    </div>
                  )}
                </div>
                
                {data.competitiveAnalysis.differentiators && data.competitiveAnalysis.differentiators.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6 mt-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Key Differentiators</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {data.competitiveAnalysis.differentiators.map((diff, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="bg-cyan-100 p-1 rounded-full mt-1">
                            <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                          </div>
                          <span className="text-gray-700">{diff}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Performance Metrics */}
            {data.performanceMetrics && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-xl">
                    <BarChart3 className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Performance Overview</h2>
                    <p className="text-gray-600 text-sm">Key metrics and focus areas</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.performanceMetrics.totalDeployed && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">{data.performanceMetrics.totalDeployed}</div>
                      <div className="text-gray-600 text-sm font-medium">Total Capital Deployed</div>
                    </div>
                  )}
                  
                  {data.performanceMetrics.numberOfInvestments && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{data.performanceMetrics.numberOfInvestments}</div>
                      <div className="text-gray-600 text-sm font-medium">Portfolio Companies</div>
                    </div>
                  )}
                  
                  {data.performanceMetrics.averageDealSize && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{data.performanceMetrics.averageDealSize}</div>
                      <div className="text-gray-600 text-sm font-medium">Average Deal Size</div>
                    </div>
                  )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  {data.performanceMetrics.geographicFocus && data.performanceMetrics.geographicFocus.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="font-bold text-lg text-gray-900 mb-4">Geographic Focus</h3>
                      <div className="flex flex-wrap gap-2">
                        {data.performanceMetrics.geographicFocus.map((region, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium">
                            {region}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {data.performanceMetrics.sectorFocus && data.performanceMetrics.sectorFocus.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="font-bold text-lg text-gray-900 mb-4">Sector Focus</h3>
                      <div className="flex flex-wrap gap-2">
                        {data.performanceMetrics.sectorFocus.map((sector, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium">
                            {sector}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Report Footer */}
            <section className="border-t border-gray-200 pt-8">
              <div className="text-center text-gray-500 text-sm">
                <p>This report was generated on {currentDate}</p>
                <p className="mt-1">Private Credit Research Platform - Confidential Analysis</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 