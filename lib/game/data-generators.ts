// Mock data generators for exercises

import { MockCompanyData, MockCampaignData, MockAnalyticsData } from './types';

/**
 * Generate random mock company data for document upload exercises
 */
export function generateMockCompany(): MockCompanyData {
  const companies: MockCompanyData[] = [
    {
      name: "TechFlow Solutions",
      industry: "Software Development",
      employees: 45,
      revenue: "$2.4M",
      quarterlyGrowth: "+18%",
      keyProjects: [
        "Cloud Migration Platform - Q1 2025, Budget: $180K, Status: In Progress",
        "Mobile App Redesign - Q4 2024, Budget: $95K, Status: Completed",
        "AI Analytics Dashboard - Q2 2025, Budget: $220K, Status: Planning"
      ],
      salesData: {
        q1: 580,
        q2: 620,
        q3: 710,
        q4: 490
      },
      marketing: {
        budget: "$45K/month",
        leads: 250,
        conversionRate: "12%"
      },
      challenges: [
        "High customer acquisition costs",
        "Scaling development team",
        "Competition from established players"
      ]
    },
    {
      name: "GreenLeaf Organics",
      industry: "Sustainable Food & Beverage",
      employees: 28,
      revenue: "$1.8M",
      quarterlyGrowth: "+24%",
      keyProjects: [
        "Product Line Expansion - Q2 2025, Budget: $120K, Status: In Progress",
        "Distribution Network - Q1 2025, Budget: $85K, Status: Completed",
        "Packaging Redesign - Q3 2025, Budget: $55K, Status: Planning"
      ],
      salesData: {
        q1: 380,
        q2: 450,
        q3: 520,
        q4: 450
      },
      marketing: {
        budget: "$28K/month",
        leads: 180,
        conversionRate: "18%"
      },
      challenges: [
        "Supply chain sustainability",
        "Seasonal demand fluctuations",
        "Brand awareness in new markets"
      ]
    },
    {
      name: "UrbanFit Wellness",
      industry: "Health & Fitness",
      employees: 32,
      revenue: "$1.2M",
      quarterlyGrowth: "+15%",
      keyProjects: [
        "Mobile App Development - Q1 2025, Budget: $145K, Status: In Progress",
        "New Studio Locations - Q4 2024, Budget: $200K, Status: Completed",
        "Virtual Training Platform - Q2 2025, Budget: $95K, Status: Planning"
      ],
      salesData: {
        q1: 280,
        q2: 310,
        q3: 340,
        q4: 270
      },
      marketing: {
        budget: "$22K/month",
        leads: 320,
        conversionRate: "22%"
      },
      challenges: [
        "Member retention rates",
        "Competition from online platforms",
        "Expanding to new locations"
      ]
    }
  ];

  return companies[Math.floor(Math.random() * companies.length)];
}

/**
 * Generate random marketing campaign data
 */
export function generateMarketingCampaign(): MockCampaignData {
  const campaigns: MockCampaignData[] = [
    {
      clientName: "Sarah Chen",
      clientRole: "Marketing Director",
      companyName: "EcoHome Solutions",
      productLaunch: "Smart Home Energy Monitor",
      targetAudience: {
        primary: "Environmentally conscious homeowners, ages 30-55",
        secondary: "Tech-savvy millennials interested in cost savings"
      },
      campaignGoals: [
        "Generate 500 pre-orders in 30 days",
        "Build email list of 5,000+ interested prospects",
        "Achieve 15% click-through rate on ads"
      ],
      budget: "$25,000",
      channels: ["Email", "Instagram", "LinkedIn", "Google Ads"],
      keyMessages: [
        "Save 30% on energy bills",
        "Real-time monitoring via mobile app",
        "Eco-friendly technology"
      ],
      competitorInsight: "Main competitor focuses on tech specs, but users care more about cost savings"
    },
    {
      clientName: "Marcus Johnson",
      clientRole: "Head of Growth",
      companyName: "FitLife Coaching",
      productLaunch: "Corporate Wellness Program",
      targetAudience: {
        primary: "HR managers and wellness coordinators at mid-size companies",
        secondary: "C-suite executives interested in employee retention"
      },
      campaignGoals: [
        "Book 20 demo calls with qualified leads",
        "Establish thought leadership in corporate wellness",
        "Generate 2,000 website visits"
      ],
      budget: "$18,000",
      channels: ["LinkedIn", "Email", "Webinars", "Industry Publications"],
      keyMessages: [
        "Reduce employee burnout by 40%",
        "Flexible programs that fit any schedule",
        "Proven ROI with measurable results"
      ],
      competitorInsight: "Competitors are corporate and boring - opportunity to be more human and relatable"
    },
    {
      clientName: "Emily Rodriguez",
      clientRole: "VP of Marketing",
      companyName: "CloudSync Pro",
      productLaunch: "Team Collaboration Platform for Remote Teams",
      targetAudience: {
        primary: "Project managers and team leads at distributed companies",
        secondary: "CTOs and IT decision-makers"
      },
      campaignGoals: [
        "Acquire 100 free trial signups",
        "Convert 20% to paid plans",
        "Build community of 1,000+ Slack/Discord members"
      ],
      budget: "$30,000",
      channels: ["Twitter", "Product Hunt", "Tech Podcasts", "Developer Communities"],
      keyMessages: [
        "Built by remote teams, for remote teams",
        "Integrates with tools you already use",
        "10x faster than switching between apps"
      ],
      competitorInsight: "Market is saturated, need to stand out with personality and community-first approach"
    }
  ];

  return campaigns[Math.floor(Math.random() * campaigns.length)];
}

/**
 * Generate random business analytics data
 */
export function generateBusinessAnalytics(): MockAnalyticsData {
  const scenarios: MockAnalyticsData[] = [
    {
      companyName: "Stellar Retail Co.",
      period: "Q3 2024",
      departments: {
        sales: {
          revenue: "$1.2M",
          growth: "+18% YoY",
          topProducts: [
            { name: "Premium Wireless Headphones", sales: "$340K" },
            { name: "Smart Fitness Tracker", sales: "$280K" },
            { name: "Portable Power Bank", sales: "$190K" }
          ]
        },
        marketing: {
          budget: "$95K",
          spent: "$89K",
          campaigns: [
            { name: "Summer Sale", roi: "2.8x" },
            { name: "Product Launch", roi: "3.1x" },
            { name: "Retargeting", roi: "2.4x" }
          ]
        },
        accounting: {
          revenue: "$1.2M",
          expenses: "$840K",
          profit: "$360K",
          profitMargin: "30%",
          outstandingInvoices: "$82K (avg 28 days)"
        },
        operations: {
          productivity: "92% efficiency rating",
          team: {
            employees: 28,
            satisfaction: "8.1/10"
          }
        }
      },
      keyInsights: [
        "Northeast region outperforming others - opportunity to replicate strategy",
        "Email marketing has best ROI but lowest budget allocation",
        "High inventory on slow-moving items - consider promotion"
      ],
      concerns: [
        "12 products out of stock causing lost sales",
        "$82K in outstanding invoices affecting cash flow",
        "Marketing budget underutilized by $6K"
      ]
    },
    {
      companyName: "Zenith B2B Services",
      period: "Q2 2024",
      departments: {
        sales: {
          revenue: "$2.8M",
          growth: "+22% YoY",
          topProducts: [
            { name: "Enterprise Software License", sales: "$1.2M" },
            { name: "Professional Services", sales: "$980K" },
            { name: "Training & Support", sales: "$620K" }
          ]
        },
        marketing: {
          budget: "$145K",
          spent: "$138K",
          campaigns: [
            { name: "Webinar Series", roi: "4.2x" },
            { name: "Content Marketing", roi: "3.8x" },
            { name: "Trade Shows", roi: "2.9x" }
          ]
        },
        accounting: {
          revenue: "$2.8M",
          expenses: "$1.9M",
          profit: "$900K",
          profitMargin: "32%",
          outstandingInvoices: { amount: "$420K", avgDays: "42 days" }
        },
        operations: {
          productivity: "89% efficiency rating",
          team: {
            employees: 45,
            satisfaction: "8.6/10"
          }
        }
      },
      keyInsights: [
        "East Coast sales team significantly outperforming - investigate best practices",
        "Webinar series has highest ROI - consider doubling investment",
        "Outstanding invoices at 42 days - implement stricter payment terms"
      ],
      concerns: [
        "$420K in outstanding invoices putting pressure on cash reserves",
        "Technology costs growing faster than revenue",
        "Pipeline strong but resource constraints may limit growth"
      ]
    }
  ];

  return scenarios[Math.floor(Math.random() * scenarios.length)];
}

/**
 * Easy mode document data for Exercise 5
 */
export const EASY_MODE_DOCUMENT = {
  type: "Meeting Notes",
  title: "Q4 Marketing Strategy Meeting",
  date: "October 15, 2024",
  attendees: ["Sarah (Marketing Lead)", "Mike (Sales Director)", "Alex (Product Manager)"],
  content: [
    "Discussed launching new product line in Q1 2025",
    "Target audience: Small business owners, ages 30-50",
    "Budget approved: $45,000 for initial campaign",
    "Main channels: LinkedIn, Email, Industry events",
    "Key message: 'Save 20 hours/week with automation'",
    "Sales goal: 200 demos booked in first 60 days"
  ],
  actionItems: [
    "Sarah to create campaign timeline by Oct 22",
    "Mike to prepare sales deck for demos",
    "Alex to finalize product messaging"
  ]
};
