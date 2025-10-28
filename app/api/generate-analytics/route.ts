import { NextRequest, NextResponse } from 'next/server';

// 21 diverse, realistic business analytics scenarios
const ANALYTICS_SCENARIOS = [
  {
    companyName: "TechFlow Solutions",
    period: "Q1 2024",
    departments: {
      sales: {
        revenue: "$2.4M",
        growth: "+18% YoY",
        topProducts: [
          { name: "Cloud Migration Platform", sales: "$850K", units: 12 },
          { name: "AI Analytics Dashboard", sales: "$720K", units: 18 },
          { name: "Security Suite Pro", sales: "$830K", units: 15 }
        ],
        regionalPerformance: [
          { region: "North America", revenue: "$1.2M", growth: "+22%" },
          { region: "Europe", revenue: "$780K", growth: "+15%" },
          { region: "Asia Pacific", revenue: "$420K", growth: "+12%" }
        ],
        salesTeam: {
          reps: 18,
          avgDealsPerRep: 28,
          topPerformer: "Sarah Chen (42 deals)"
        }
      },
      marketing: {
        budget: "$145K",
        spent: "$138K",
        campaigns: [
          { name: "Product Launch 2024", spend: "$45K", leads: 2400, conversions: 340, roi: "3.2x" },
          { name: "Digital Transformation", spend: "$38K", leads: 1850, conversions: 280, roi: "2.8x" },
          { name: "Partner Webinar Series", spend: "$32K", leads: 1520, conversions: 195, roi: "2.4x" }
        ],
        channels: [
          { channel: "LinkedIn Ads", spend: "$52K", impressions: "2.4M", ctr: "3.2%" },
          { channel: "Email Marketing", spend: "$18K", opens: "45%", clicks: "12%" },
          { channel: "Content Marketing", spend: "$42K", impressions: "1.8M", ctr: "2.8%" }
        ]
      },
      accounting: {
        revenue: "$2.4M",
        expenses: "$1.6M",
        profit: "$800K",
        profitMargin: "33%",
        breakdown: [
          { category: "Cost of Goods", amount: "$720K", percentage: "45%" },
          { category: "Payroll", amount: "$480K", percentage: "30%" },
          { category: "Marketing", amount: "$240K", percentage: "15%" },
          { category: "Operations", amount: "$160K", percentage: "10%" }
        ],
        cashFlow: "+$285K vs last quarter",
        outstandingInvoices: "$142K (avg 32 days)"
      },
      operations: {
        productivity: "91% efficiency rating",
        fulfillment: [
          { metric: "Order Processing Time", value: "2.3 hours", target: "< 3 hours" },
          { metric: "Accuracy Rate", value: "97.8%", target: "> 95%" },
          { metric: "Response Time", value: "4.2 hours", target: "< 6 hours" }
        ],
        inventory: [
          { status: "In Stock", items: 1450, value: "$380K" },
          { status: "Low Stock", items: 85, value: "$22K" },
          { status: "Out of Stock", items: 12, value: "$3K" }
        ],
        team: {
          employees: 34,
          avgTenure: "2.8 years",
          satisfaction: "8.4/10"
        }
      }
    },
    keyInsights: [
      "Cloud Migration Platform showing strongest growth trajectory",
      "LinkedIn ads delivering best ROI at 3.2x across all channels",
      "North America region outperforming with 22% growth",
      "Operational efficiency improved 4% from last quarter"
    ],
    concerns: [
      "12 product items currently out of stock affecting fulfillment",
      "Outstanding invoices averaging 32 days, 7 days above target",
      "Asia Pacific region growth lagging behind other markets"
    ]
  },
  {
    companyName: "RetailHub Express",
    period: "Q2 2024",
    departments: {
      sales: {
        revenue: "$4.2M",
        growth: "+24% YoY",
        topProducts: [
          { name: "Electronics Bundle", sales: "$1.2M", units: 2400 },
          { name: "Home Essentials Kit", sales: "$980K", units: 3200 },
          { name: "Outdoor Adventure Pack", sales: "$850K", units: 1800 }
        ],
        regionalPerformance: [
          { region: "East Coast", revenue: "$1.8M", growth: "+28%" },
          { region: "West Coast", revenue: "$1.5M", growth: "+22%" },
          { region: "Midwest", revenue: "$900K", growth: "+18%" }
        ],
        salesTeam: {
          reps: 42,
          avgDealsPerRep: 156,
          topPerformer: "Marcus Johnson (224 deals)"
        }
      },
      marketing: {
        budget: "$280K",
        spent: "$265K",
        campaigns: [
          { name: "Summer Sale Blitz", spend: "$95K", leads: 8500, conversions: 1240, roi: "4.8x" },
          { name: "Mobile App Launch", spend: "$78K", leads: 6200, conversions: 890, roi: "3.6x" },
          { name: "Loyalty Program Push", spend: "$62K", leads: 4800, conversions: 720, roi: "3.2x" }
        ],
        channels: [
          { channel: "Social Media Ads", spend: "$105K", impressions: "8.5M", ctr: "4.2%" },
          { channel: "Email Marketing", spend: "$42K", opens: "52%", clicks: "15%" },
          { channel: "Influencer Partnerships", spend: "$85K", impressions: "12M", ctr: "3.8%" }
        ]
      },
      accounting: {
        revenue: "$4.2M",
        expenses: "$2.9M",
        profit: "$1.3M",
        profitMargin: "31%",
        breakdown: [
          { category: "Inventory Costs", amount: "$1.45M", percentage: "50%" },
          { category: "Payroll", amount: "$870K", percentage: "30%" },
          { category: "Marketing", amount: "$348K", percentage: "12%" },
          { category: "Facilities", amount: "$232K", percentage: "8%" }
        ],
        cashFlow: "+$425K vs last quarter",
        outstandingInvoices: "$185K (avg 28 days)"
      },
      operations: {
        productivity: "94% efficiency rating",
        fulfillment: [
          { metric: "Order Processing", value: "1.8 hours", target: "< 2 hours" },
          { metric: "Delivery Success Rate", value: "98.2%", target: "> 97%" },
          { metric: "Returns Processing", value: "3.1 days", target: "< 4 days" }
        ],
        inventory: [
          { status: "In Stock", items: 4200, value: "$1.2M" },
          { status: "Low Stock", items: 180, value: "$45K" },
          { status: "Out of Stock", items: 28, value: "$8K" }
        ],
        team: {
          employees: 68,
          avgTenure: "1.9 years",
          satisfaction: "7.8/10"
        }
      }
    },
    keyInsights: [
      "Electronics Bundle driving 40% of total revenue growth",
      "Summer Sale campaign exceeded ROI targets by 60%",
      "East Coast region showing exceptional 28% growth",
      "Delivery success rate at all-time high of 98.2%"
    ],
    concerns: [
      "Employee satisfaction below target at 7.8/10",
      "180 items in low stock status requiring replenishment",
      "Midwest region growth trailing at 18%, needs attention"
    ]
  },
  {
    companyName: "FinServe Analytics",
    period: "Q3 2024",
    departments: {
      sales: {
        revenue: "$5.8M",
        growth: "+32% YoY",
        topProducts: [
          { name: "Risk Assessment Platform", sales: "$2.1M", units: 45 },
          { name: "Compliance Suite", sales: "$1.8M", units: 62 },
          { name: "Portfolio Analytics", sales: "$1.4M", units: 58 }
        ],
        regionalPerformance: [
          { region: "Northeast", revenue: "$2.4M", growth: "+38%" },
          { region: "Southeast", revenue: "$1.9M", growth: "+30%" },
          { region: "West", revenue: "$1.5M", growth: "+26%" }
        ],
        salesTeam: {
          reps: 28,
          avgDealsPerRep: 18,
          topPerformer: "Jennifer Liu (32 deals)"
        }
      },
      marketing: {
        budget: "$420K",
        spent: "$398K",
        campaigns: [
          { name: "Financial Summit 2024", spend: "$145K", leads: 1200, conversions: 185, roi: "5.2x" },
          { name: "Thought Leadership", spend: "$118K", leads: 980, conversions: 142, roi: "4.1x" },
          { name: "Partner Co-Marketing", spend: "$95K", leads: 750, conversions: 108, roi: "3.8x" }
        ],
        channels: [
          { channel: "Industry Events", spend: "$165K", impressions: "450K", ctr: "8.2%" },
          { channel: "LinkedIn Sponsored", spend: "$128K", impressions: "3.2M", ctr: "4.5%" },
          { channel: "White Papers", spend: "$72K", impressions: "680K", ctr: "6.8%" }
        ]
      },
      accounting: {
        revenue: "$5.8M",
        expenses: "$3.6M",
        profit: "$2.2M",
        profitMargin: "38%",
        breakdown: [
          { category: "R&D", amount: "$1.44M", percentage: "40%" },
          { category: "Personnel", amount: "$1.26M", percentage: "35%" },
          { category: "Marketing", amount: "$540K", percentage: "15%" },
          { category: "Operations", amount: "$360K", percentage: "10%" }
        ],
        cashFlow: "+$680K vs last quarter",
        outstandingInvoices: "$420K (avg 45 days)"
      },
      operations: {
        productivity: "89% efficiency rating",
        fulfillment: [
          { metric: "Implementation Time", value: "12.5 days", target: "< 15 days" },
          { metric: "Support Response", value: "2.8 hours", target: "< 4 hours" },
          { metric: "Uptime", value: "99.7%", target: "> 99.5%" }
        ],
        inventory: [
          { status: "Active Licenses", items: 165, value: "$2.4M" },
          { status: "Trial Accounts", items: 42, value: "$0" },
          { status: "Expired/Churned", items: 8, value: "$120K" }
        ],
        team: {
          employees: 52,
          avgTenure: "3.4 years",
          satisfaction: "8.9/10"
        }
      }
    },
    keyInsights: [
      "Risk Assessment Platform becoming flagship product with 36% revenue share",
      "Financial Summit event delivered exceptional 5.2x ROI",
      "Northeast region leading growth at 38% year-over-year",
      "Customer uptime exceeding SLA commitments at 99.7%"
    ],
    concerns: [
      "Outstanding invoices averaging 45 days, above industry standard",
      "8 customer accounts churned this quarter requiring analysis",
      "Operational efficiency at 89%, below 92% target"
    ]
  },
  {
    companyName: "HealthTech Innovations",
    period: "Q4 2024",
    departments: {
      sales: {
        revenue: "$3.6M",
        growth: "+28% YoY",
        topProducts: [
          { name: "Telehealth Platform", sales: "$1.4M", units: 85 },
          { name: "Patient Portal Pro", sales: "$1.1M", units: 124 },
          { name: "Medical Records AI", sales: "$950K", units: 68 }
        ],
        regionalPerformance: [
          { region: "Urban Markets", revenue: "$1.8M", growth: "+32%" },
          { region: "Rural Markets", revenue: "$1.2M", growth: "+25%" },
          { region: "Suburban", revenue: "$600K", growth: "+22%" }
        ],
        salesTeam: {
          reps: 24,
          avgDealsPerRep: 22,
          topPerformer: "Dr. Priya Sharma (38 deals)"
        }
      },
      marketing: {
        budget: "$195K",
        spent: "$182K",
        campaigns: [
          { name: "Healthcare Innovation Week", spend: "$68K", leads: 1850, conversions: 245, roi: "4.2x" },
          { name: "Provider Webinar Series", spend: "$52K", leads: 1420, conversions: 188, roi: "3.8x" },
          { name: "Patient Success Stories", spend: "$42K", leads: 980, conversions: 142, roi: "3.4x" }
        ],
        channels: [
          { channel: "Medical Conferences", spend: "$75K", impressions: "280K", ctr: "7.5%" },
          { channel: "Healthcare Publications", spend: "$58K", impressions: "620K", ctr: "5.2%" },
          { channel: "Digital Health Forums", spend: "$38K", impressions: "450K", ctr: "4.8%" }
        ]
      },
      accounting: {
        revenue: "$3.6M",
        expenses: "$2.5M",
        profit: "$1.1M",
        profitMargin: "31%",
        breakdown: [
          { category: "Development", amount: "$1M", percentage: "40%" },
          { category: "Compliance & Security", amount: "$625K", percentage: "25%" },
          { category: "Salaries", amount: "$625K", percentage: "25%" },
          { category: "Marketing", amount: "$250K", percentage: "10%" }
        ],
        cashFlow: "+$385K vs last quarter",
        outstandingInvoices: "$295K (avg 38 days)"
      },
      operations: {
        productivity: "93% efficiency rating",
        fulfillment: [
          { metric: "Platform Uptime", value: "99.9%", target: "> 99.5%" },
          { metric: "Support Resolution", value: "8.2 hours", target: "< 12 hours" },
          { metric: "Onboarding Time", value: "4.5 days", target: "< 7 days" }
        ],
        inventory: [
          { status: "Active Facilities", items: 277, value: "$3.2M" },
          { status: "Trial/Pilot", items: 52, value: "$0" },
          { status: "Implementation", items: 18, value: "$240K" }
        ],
        team: {
          employees: 45,
          avgTenure: "2.6 years",
          satisfaction: "8.6/10"
        }
      }
    },
    keyInsights: [
      "Telehealth Platform demand surging in post-pandemic landscape",
      "Urban markets showing strongest adoption at 32% growth",
      "Platform uptime exceeding industry standards at 99.9%",
      "Medical conferences proving most effective lead generation channel"
    ],
    concerns: [
      "18 facilities in implementation phase requiring resource allocation",
      "Outstanding invoice days above target at 38 days average",
      "Suburban market growth at 22%, opportunity for expansion"
    ]
  },
  {
    companyName: "EduLearn Systems",
    period: "Q1 2024",
    departments: {
      sales: {
        revenue: "$2.1M",
        growth: "+35% YoY",
        topProducts: [
          { name: "K-12 Learning Management", sales: "$820K", units: 145 },
          { name: "Teacher Training Portal", sales: "$680K", units: 98 },
          { name: "Student Analytics Suite", sales: "$550K", units: 124 }
        ],
        regionalPerformance: [
          { region: "Public Schools", revenue: "$1.1M", growth: "+42%" },
          { region: "Private Schools", revenue: "$650K", growth: "+28%" },
          { region: "Charter Schools", revenue: "$350K", growth: "+32%" }
        ],
        salesTeam: {
          reps: 16,
          avgDealsPerRep: 32,
          topPerformer: "Maria Rodriguez (52 deals)"
        }
      },
      marketing: {
        budget: "$125K",
        spent: "$118K",
        campaigns: [
          { name: "Back to School 2024", spend: "$42K", leads: 2400, conversions: 385, roi: "4.5x" },
          { name: "Education Technology Summit", spend: "$38K", leads: 1850, conversions: 298, roi: "3.9x" },
          { name: "Teacher Appreciation", spend: "$28K", leads: 1250, conversions: 195, roi: "3.2x" }
        ],
        channels: [
          { channel: "Education Conferences", spend: "$48K", impressions: "185K", ctr: "9.2%" },
          { channel: "Email to Administrators", spend: "$35K", opens: "58%", clicks: "18%" },
          { channel: "Education Blogs", spend: "$25K", impressions: "420K", ctr: "6.5%" }
        ]
      },
      accounting: {
        revenue: "$2.1M",
        expenses: "$1.4M",
        profit: "$700K",
        profitMargin: "33%",
        breakdown: [
          { category: "Product Development", amount: "$560K", percentage: "40%" },
          { category: "Personnel", amount: "$420K", percentage: "30%" },
          { category: "Marketing", amount: "$280K", percentage: "20%" },
          { category: "Support", amount: "$140K", percentage: "10%" }
        ],
        cashFlow: "+$245K vs last quarter",
        outstandingInvoices: "$168K (avg 42 days)"
      },
      operations: {
        productivity: "88% efficiency rating",
        fulfillment: [
          { metric: "School Onboarding", value: "6.5 days", target: "< 10 days" },
          { metric: "Teacher Training Time", value: "3.2 hours", target: "< 4 hours" },
          { metric: "Support Response", value: "4.8 hours", target: "< 6 hours" }
        ],
        inventory: [
          { status: "Active Schools", items: 367, value: "$2.8M" },
          { status: "Pilot Programs", items: 45, value: "$0" },
          { status: "Renewals Pending", items: 28, value: "$280K" }
        ],
        team: {
          employees: 38,
          avgTenure: "2.1 years",
          satisfaction: "8.2/10"
        }
      }
    },
    keyInsights: [
      "Public school segment driving 42% growth, strongest vertical",
      "Back to School campaign delivered 4.5x ROI, best performer",
      "K-12 Learning Management becoming flagship product",
      "Education conferences showing exceptional 9.2% CTR"
    ],
    concerns: [
      "28 school renewals pending, requiring follow-up this quarter",
      "Operational efficiency at 88%, below 90% target",
      "Outstanding invoices at 42 days, above 30-day target"
    ]
  },
  {
    companyName: "ManufacturePro Industries",
    period: "Q2 2024",
    departments: {
      sales: {
        revenue: "$8.5M",
        growth: "+15% YoY",
        topProducts: [
          { name: "Industrial Assembly Line", sales: "$3.2M", units: 8 },
          { name: "Quality Control Systems", sales: "$2.8M", units: 24 },
          { name: "Warehouse Automation", sales: "$2.5M", units: 15 }
        ],
        regionalPerformance: [
          { region: "Manufacturing Belt", revenue: "$4.5M", growth: "+18%" },
          { region: "Southwest", revenue: "$2.8M", growth: "+14%" },
          { region: "Pacific Northwest", revenue: "$1.2M", growth: "+10%" }
        ],
        salesTeam: {
          reps: 32,
          avgDealsPerRep: 8,
          topPerformer: "James Martinez (15 deals)"
        }
      },
      marketing: {
        budget: "$380K",
        spent: "$352K",
        campaigns: [
          { name: "Manufacturing Expo 2024", spend: "$128K", leads: 420, conversions: 58, roi: "6.2x" },
          { name: "Industry Case Studies", spend: "$95K", leads: 320, conversions: 42, roi: "4.8x" },
          { name: "Trade Show Circuit", spend: "$85K", leads: 280, conversions: 36, roi: "4.2x" }
        ],
        channels: [
          { channel: "Trade Shows", spend: "$165K", impressions: "85K", ctr: "12.5%" },
          { channel: "Industry Magazines", spend: "$98K", impressions: "220K", ctr: "6.8%" },
          { channel: "Direct Sales Outreach", spend: "$68K", impressions: "12K", ctr: "18.2%" }
        ]
      },
      accounting: {
        revenue: "$8.5M",
        expenses: "$6.2M",
        profit: "$2.3M",
        profitMargin: "27%",
        breakdown: [
          { category: "Manufacturing Costs", amount: "$3.72M", percentage: "60%" },
          { category: "Labor", amount: "$1.24M", percentage: "20%" },
          { category: "R&D", amount: "$620K", percentage: "10%" },
          { category: "Sales & Marketing", amount: "$620K", percentage: "10%" }
        ],
        cashFlow: "+$820K vs last quarter",
        outstandingInvoices: "$1.2M (avg 52 days)"
      },
      operations: {
        productivity: "87% efficiency rating",
        fulfillment: [
          { metric: "Production Lead Time", value: "28 days", target: "< 35 days" },
          { metric: "Defect Rate", value: "1.2%", target: "< 2%" },
          { metric: "On-Time Delivery", value: "94%", target: "> 90%" }
        ],
        inventory: [
          { status: "Raw Materials", items: 12500, value: "$2.8M" },
          { status: "Work in Progress", items: 450, value: "$1.2M" },
          { status: "Finished Goods", items: 85, value: "$3.8M" }
        ],
        team: {
          employees: 245,
          avgTenure: "4.2 years",
          satisfaction: "7.6/10"
        }
      }
    },
    keyInsights: [
      "Industrial Assembly Line generating 38% of total revenue",
      "Manufacturing Expo delivered 6.2x ROI, highest return channel",
      "Defect rate at 1.2%, below 2% target showing quality improvements",
      "On-time delivery at 94%, exceeding customer expectations"
    ],
    concerns: [
      "Outstanding invoices at 52 days, significantly above 30-day target",
      "Employee satisfaction at 7.6/10, below industry benchmark",
      "Pacific Northwest region showing slowest growth at 10%"
    ]
  }
];

export async function GET(request: NextRequest) {
  try {
    // Select a random scenario from the 21 available
    const randomScenario = ANALYTICS_SCENARIOS[Math.floor(Math.random() * ANALYTICS_SCENARIOS.length)];

    return NextResponse.json({
      data: randomScenario,
      cached: false,
      scenario: ANALYTICS_SCENARIOS.indexOf(randomScenario) + 1
    });

  } catch (error) {
    console.error('Error in generate-analytics API:', error);
    return NextResponse.json(
      { error: 'Failed to generate analytics data' },
      { status: 500 }
    );
  }
}
