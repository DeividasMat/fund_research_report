// Demo data for testing when API keys are not configured
export const demoFundData = {
  "KKR": {
    fundName: "KKR & Co. Inc.",
    address: "9 West 57th Street, New York, NY 10019, United States",
    contactEmail: "info@kkr.com",
    website: "https://www.kkr.com/credit",
    phone: "+1 (212) 750-8300",
    investmentThesis: "KKR Credit focuses on direct lending and credit solutions across North America and Europe. The firm specializes in senior secured lending, unitranche financing, and opportunistic credit investments. KKR Credit targets middle-market companies with predictable cash flows and strong management teams, providing flexible capital solutions tailored to borrower needs.",
    aum: "$75 billion",
    foundedYear: "1976",
    headquarters: "New York, NY",
    officeLocations: ["New York", "London", "Hong Kong", "Tokyo", "Sydney", "Paris", "Mumbai"],
    funds: [
      {
        name: "KKR North America Credit Partners",
        strategy: "Direct lending and senior debt",
        raisedDate: "2023-06-15",
        size: "$6.5 billion",
        targetSize: "$6.0 billion",
        status: "Closed",
        vintageYear: "2023",
        closingDate: "2023-06-15",
        fundNumber: "VII"
      },
      {
        name: "KKR Credit Opportunities Fund",
        strategy: "Opportunistic credit investments",
        raisedDate: "2022-11-20",
        size: "$4.2 billion",
        targetSize: "$4.0 billion",
        status: "Closed",
        vintageYear: "2022",
        closingDate: "2022-11-20",
        fundNumber: "III"
      },
      {
        name: "KKR European Credit Fund",
        strategy: "European direct lending",
        raisedDate: "2021-09-30",
        size: "$3.8 billion",
        targetSize: "$3.5 billion",
        status: "Closed",
        vintageYear: "2021",
        closingDate: "2021-09-30",
        fundNumber: "IV"
      }
    ],
    teamMembers: [
      {
        name: "Chris Sheldon",
        position: "Global Head of Credit",
        email: "chris.sheldon@kkr.com",
        phone: "+1 (212) 750-8350",
        linkedin: "https://linkedin.com/in/chrissheldon",
        experience: "Leads KKR's global credit platform with over 20 years of credit investment experience. Previously worked at Goldman Sachs.",
        education: "MBA Harvard Business School, BS Finance NYU Stern",
        previousCompanies: ["Goldman Sachs", "Deutsche Bank"],
        yearsAtFirm: "15 years"
      },
      {
        name: "Avi Wiesel",
        position: "Head of North America Credit",
        email: "avi.wiesel@kkr.com",
        phone: "+1 (212) 750-8360",
        linkedin: "https://linkedin.com/in/aviwiesel",
        experience: "Oversees KKR's North American credit investments with extensive experience in direct lending and leveraged finance.",
        education: "MBA Wharton, BA Economics Princeton",
        previousCompanies: ["Blackstone", "Morgan Stanley"],
        yearsAtFirm: "12 years"
      },
      {
        name: "Nat Zilkha",
        position: "Managing Director, Credit",
        email: "nat.zilkha@kkr.com",
        phone: "+1 (212) 750-8370",
        linkedin: "https://linkedin.com/in/natzilkha",
        experience: "Focuses on middle-market direct lending transactions with over 15 years of credit investment experience.",
        education: "MBA Columbia Business School, BS Yale",
        previousCompanies: ["Apollo Global Management", "Credit Suisse"],
        yearsAtFirm: "8 years"
      },
      {
        name: "Alex Dibelius",
        position: "Head of European Credit",
        email: "alex.dibelius@kkr.com",
        phone: "+44 20 7659 6600",
        linkedin: "https://linkedin.com/in/alexdibelius",
        experience: "Leads KKR's European credit activities with deep expertise in European middle-market lending.",
        education: "MBA INSEAD, MS Finance London School of Economics",
        previousCompanies: ["Goldman Sachs", "Barclays"],
        yearsAtFirm: "10 years"
      },
      {
        name: "Derek Thompson",
        position: "Managing Director, Credit Opportunities",
        email: "derek.thompson@kkr.com",
        phone: "+1 (212) 750-8380",
        linkedin: "https://linkedin.com/in/derekthompson",
        experience: "Specializes in opportunistic credit investments and distressed credit situations with 18+ years of experience.",
        education: "MBA Stanford, BS Finance University of Chicago",
        previousCompanies: ["Oaktree Capital", "Centerbridge Partners"],
        yearsAtFirm: "7 years"
      }
    ],
    recentDeals: [
      {
        company: "MedTech Solutions",
        sector: "Healthcare Technology",
        date: "2024-02-15",
        dealType: "Senior secured term loan",
        amount: "$450 million",
        currency: "USD",
        description: "Acquisition financing for medical device platform",
        leadArrangers: ["KKR Credit"],
        coInvestors: ["Apollo Credit", "Blackstone Credit"],
        use_of_proceeds: "Acquisition and growth capital"
      },
      {
        company: "CloudFirst Software",
        sector: "Software",
        date: "2023-11-20",
        dealType: "Unitranche financing",
        amount: "$325 million",
        currency: "USD",
        description: "Growth capital for SaaS platform expansion",
        leadArrangers: ["KKR Credit"],
        coInvestors: ["Owl Rock", "Golub Capital"],
        use_of_proceeds: "Growth capital and working capital"
      },
      {
        company: "Industrial Services Group",
        sector: "Industrial Services",
        date: "2023-09-10",
        dealType: "Direct lending facility",
        amount: "$280 million",
        currency: "USD",
        description: "Refinancing and expansion capital",
        leadArrangers: ["KKR Credit"],
        coInvestors: ["Ares Management"],
        use_of_proceeds: "Refinancing existing debt and expansion"
      },
      {
        company: "Retail Analytics Corp",
        sector: "Technology",
        date: "2023-06-05",
        dealType: "Senior debt financing",
        amount: "$200 million",
        currency: "USD",
        description: "Technology platform acquisition financing",
        leadArrangers: ["KKR Credit"],
        coInvestors: ["TPG Credit"],
        use_of_proceeds: "Acquisition financing"
      },
      {
        company: "Healthcare Partners",
        sector: "Healthcare Services",
        date: "2023-03-22",
        dealType: "Leveraged loan",
        amount: "$380 million",
        currency: "USD",
        description: "Healthcare services consolidation financing",
        leadArrangers: ["KKR Credit"],
        coInvestors: ["Blue Owl Capital", "Antares Capital"],
        use_of_proceeds: "Acquisition and consolidation"
      }
    ],
    competitiveAnalysis: {
      mainCompetitors: ["Apollo Global Management", "Blackstone Credit", "Ares Management", "Owl Rock", "Golub Capital", "TPG Credit"],
      marketPosition: "Top 3 direct lending platform globally with strong brand recognition and extensive deal flow through private equity relationships",
      differentiators: ["Integrated private equity platform", "Global presence across multiple regions", "Deep operational expertise", "Technology-enabled origination platform"]
    },
    performanceMetrics: {
      totalDeployed: "$45 billion",
      numberOfInvestments: "450+",
      averageDealSize: "$150 million",
      geographicFocus: ["North America", "Europe", "Asia-Pacific"],
      sectorFocus: ["Technology", "Healthcare", "Business Services", "Manufacturing", "Consumer", "Industrial"]
    }
  },
  "BLACKSTONE": {
    fundName: "Blackstone Inc.",
    address: "345 Park Avenue, New York, NY 10154, United States",
    contactEmail: "info@blackstone.com",
    investmentThesis: "Blackstone Credit focuses on providing financing solutions to middle-market and large-cap companies through direct lending and opportunistic credit strategies. The firm leverages its global platform and deep sector expertise to structure flexible credit solutions across various industries with emphasis on asset-backed and cash flow-based lending.",
    funds: [
      {
        name: "Blackstone Strategic Credit Fund",
        strategy: "Direct lending and senior debt",
        raisedDate: "2023",
        size: "$8.5 billion"
      },
      {
        name: "Blackstone Opportunistic Credit Fund",
        strategy: "Opportunistic and distressed credit",
        raisedDate: "2022",
        size: "$5.2 billion"
      },
      {
        name: "Blackstone European Credit Fund",
        strategy: "European direct lending",
        raisedDate: "2021",
        size: "$3.8 billion"
      }
    ],
    teamMembers: [
      {
        name: "Bennett Goodman",
        position: "Global Head of Credit",
        experience: "Co-founded Blackstone's credit business and leads global credit investment activities with over 25 years of credit experience."
      },
      {
        name: "Steve Lasota",
        position: "Global Head of Direct Lending",
        experience: "Oversees Blackstone's direct lending platform with extensive experience in middle-market credit investments and structured finance."
      },
      {
        name: "Dwight Scott",
        position: "Head of Credit Origination",
        experience: "Leads credit deal sourcing and client relationships with deep expertise in leveraged finance and direct lending."
      },
      {
        name: "Michael Zawadzki",
        position: "Managing Director, Credit",
        experience: "Focuses on large-cap credit investments and opportunistic credit strategies with 20+ years of experience."
      },
      {
        name: "Craig Farr",
        position: "Head of European Credit",
        experience: "Leads Blackstone's European credit activities with extensive experience in European leveraged finance markets."
      }
    ],
    recentDeals: [
      {
        company: "Industrial Equipment Corp",
        sector: "Industrial Technology",
        date: "2024-01",
        dealType: "Senior secured facility",
        amount: "$675 million"
      },
      {
        company: "Restaurant Holdings LLC",
        sector: "Restaurants",
        date: "2023-10",
        dealType: "Unitranche financing",
        amount: "$425 million"
      },
      {
        company: "Authentication Services",
        sector: "Business Services",
        date: "2023-07",
        dealType: "Direct lending facility",
        amount: "$320 million"
      },
      {
        company: "Health Foods Co",
        sector: "Consumer Goods",
        date: "2023-04",
        dealType: "Term loan facility",
        amount: "$285 million"
      },
      {
        company: "Social Tech Platform",
        sector: "Technology",
        date: "2023-01",
        dealType: "Senior debt financing",
        amount: "$190 million"
      },
      {
        company: "Event Management Group",
        sector: "Entertainment",
        date: "2022-11",
        dealType: "Leveraged loan",
        amount: "$155 million"
      },
      {
        company: "Analytics Software Inc",
        sector: "Software",
        date: "2022-08",
        dealType: "Growth debt facility",
        amount: "$220 million"
      },
      {
        company: "HVAC Solutions",
        sector: "Industrial",
        date: "2022-04",
        dealType: "Senior secured credit",
        amount: "$340 million"
      }
    ]
  },
  "APOLLO": {
    fundName: "Apollo Global Management, Inc.",
    address: "9 West 57th Street, 43rd Floor, New York, NY 10019, United States",
    contactEmail: "info@apollo.com",
    investmentThesis: "Apollo employs a value-oriented approach across private equity, credit, and real assets. The firm focuses on complex situations and operational transformations, leveraging deep sector expertise and proprietary deal sourcing. Apollo emphasizes downside protection while seeking attractive risk-adjusted returns through active portfolio management.",
    funds: [
      {
        name: "Apollo Investment Fund X",
        strategy: "Large-cap buyouts",
        raisedDate: "2022",
        size: "$25.0 billion"
      },
      {
        name: "Apollo Strategic Fund IV",
        strategy: "Opportunistic credit",
        raisedDate: "2021",
        size: "$20.0 billion"
      },
      {
        name: "Apollo Hybrid Value Fund",
        strategy: "Multi-strategy",
        raisedDate: "2020",
        size: "$5.4 billion"
      }
    ],
    teamMembers: [
      {
        name: "Marc Rowan",
        position: "Chief Executive Officer",
        experience: "Co-founded Apollo in 1990 and became CEO in 2021. Previously worked at Drexel Burnham Lambert with extensive experience in credit and distressed investing."
      },
      {
        name: "Josh Harris",
        position: "Co-Founder & Senior Managing Director",
        experience: "Co-founded Apollo in 1990 and has over 30 years of private equity and credit experience. Previously worked at Drexel Burnham Lambert."
      },
      {
        name: "Leon Black",
        position: "Co-Founder",
        experience: "Co-founded Apollo in 1990 and served as CEO until 2021. Pioneer in distressed debt investing with extensive Wall Street experience."
      },
      {
        name: "Scott Kleinman",
        position: "Co-President",
        experience: "Joined Apollo in 1996 and leads the firm's private equity business with expertise in leveraged buyouts and growth investments."
      },
      {
        name: "Jim Zelter",
        position: "Co-President",
        experience: "Joined Apollo in 2006 and leads the firm's credit business, one of the largest alternative credit platforms globally."
      }
    ],
    recentDeals: [
      {
        company: "Lumen Technologies",
        sector: "Telecommunications",
        date: "2023-10",
        dealType: "Debt Investment",
        amount: "$5.0 billion"
      },
      {
        company: "Shutterfly",
        sector: "E-commerce",
        date: "2023-07",
        dealType: "Acquisition",
        amount: "$2.7 billion"
      },
      {
        company: "Intrado",
        sector: "Technology Services",
        date: "2023-04",
        dealType: "Acquisition",
        amount: "$2.4 billion"
      },
      {
        company: "Redbird Capital",
        sector: "Sports & Entertainment",
        date: "2022-11",
        dealType: "Strategic Partnership",
        amount: "$1.8 billion"
      },
      {
        company: "Yahoo",
        sector: "Internet & Media",
        date: "2022-08",
        dealType: "Strategic Investment",
        amount: "$1.7 billion"
      },
      {
        company: "Tegna Inc.",
        sector: "Media",
        date: "2022-02",
        dealType: "Acquisition",
        amount: "$8.6 billion"
      },
      {
        company: "Rackspace",
        sector: "Cloud Services",
        date: "2021-12",
        dealType: "Take-private",
        amount: "$4.3 billion"
      },
      {
        company: "Albertsons",
        sector: "Retail",
        date: "2021-09",
        dealType: "Strategic Investment",
        amount: "$1.7 billion"
      }
    ]
  }
}

export function getDemoData(fundName: string) {
  const normalizedName = fundName.toUpperCase().trim()
  return demoFundData[normalizedName as keyof typeof demoFundData] || null
} 