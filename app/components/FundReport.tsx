'use client'

import { Building2, Mail, MapPin, TrendingUp, Users, Calendar, DollarSign } from 'lucide-react'

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

interface FundReportProps {
  data: FundData
}

export default function FundReport({ data }: FundReportProps) {
  return (
    <div className="max-w-7xl mx-auto mt-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-12 text-white">
          <div className="flex items-center gap-4 mb-4">
            <Building2 size={32} />
            <h1 className="text-3xl font-bold">{data.fundName}</h1>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-primary-100">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>{data.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} />
              <span>{data.contactEmail}</span>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-12">
          {/* Investment Thesis */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary-100 p-2 rounded-lg">
                <TrendingUp className="text-primary-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Investment Thesis</h2>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed text-lg">{data.investmentThesis}</p>
            </div>
          </section>

          {/* Funds Portfolio */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary-100 p-2 rounded-lg">
                <DollarSign className="text-primary-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Fund Portfolio</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.funds.map((fund, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">{fund.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Strategy:</span>
                      <span className="font-medium text-gray-900">{fund.strategy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium text-gray-900">{fund.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Raised:</span>
                      <span className="font-medium text-gray-900">{fund.raisedDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Team Members */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary-100 p-2 rounded-lg">
                <Users className="text-primary-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Key Team Members</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.teamMembers.map((member, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="text-center">
                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="text-primary-600" size={24} />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-primary-600 font-medium mb-3">{member.position}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.experience}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Deals */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary-100 p-2 rounded-lg">
                <Calendar className="text-primary-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Recent Deals (Last 3 Years)</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Company</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sector</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Deal Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.recentDeals.map((deal, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{deal.company}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{deal.sector}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                            {deal.dealType}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{deal.amount}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{deal.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 