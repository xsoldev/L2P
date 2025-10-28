'use client';

import React, { useState, useRef } from 'react';
import { CheckCircle, XCircle, ArrowRight, Star, Book, Zap, Target, Loader, AlertCircle, Download, Share2, Trophy, Sparkles, Upload, FileText, Mail, BarChart2, TrendingUp, DollarSign, Users } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const PromptEngineeringGame = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentLesson, setCurrentLesson] = useState(0);
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [exerciseAttempts, setExerciseAttempts] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [generatedChart, setGeneratedChart] = useState(null);
  const certificateRef = useRef(null);
  const [documentUploaded, setDocumentUploaded] = useState(false);
  const [uploadingDocument, setUploadingDocument] = useState(false);
  const [mockCompanyData, setMockCompanyData] = useState(null);
  const [campaignBriefLoaded, setCampaignBriefLoaded] = useState(false);
  const [loadingCampaignBrief, setLoadingCampaignBrief] = useState(false);
  const [mockCampaignData, setMockCampaignData] = useState(null);
  const [analyticsLoaded, setAnalyticsLoaded] = useState(false);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [mockAnalyticsData, setMockAnalyticsData] = useState(null);
  const [exerciseDifficulty, setExerciseDifficulty] = useState('easy'); // 'easy' or 'hard'
  const [showProgressCelebration, setShowProgressCelebration] = useState(false);
  const [showMilestone, setShowMilestone] = useState(false);
  const [milestoneData, setMilestoneData] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [userShape, setUserShape] = useState(null);
  const [easyModeEnabled, setEasyModeEnabled] = useState(false);
  const [usedSuggestion, setUsedSuggestion] = useState(false);

  // Dynamic Chart Component
  const DynamicChart = ({ config, data }: { config: any; data: any }) => {
    if (!config) return null;

    const colors = config.colors || ['#70BEFA', '#5AAFED', '#8CCFFD', '#4A9FE0'];

    const renderChart = () => {
      switch (config.chartType) {
        case 'bar':
          return (
            <BarChart data={data}>
              {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />}
              <XAxis dataKey="label" label={{ value: config.xAxisLabel, position: 'insideBottom', offset: -5 }} stroke="#9CA3AF" />
              <YAxis label={{ value: config.yAxisLabel, angle: -90, position: 'insideLeft' }} stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #70BEFA', borderRadius: '8px', color: '#F9FAFB' }} />
              {config.showLegend && <Legend />}
              <Bar dataKey="sales" fill={colors[0]} radius={[8, 8, 0, 0]} label={config.showValues ? { position: 'top', fill: '#E5E7EB' } : false} />
            </BarChart>
          );
        
        case 'line':
          return (
            <LineChart data={data}>
              {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />}
              <XAxis dataKey="label" label={{ value: config.xAxisLabel, position: 'insideBottom', offset: -5 }} stroke="#9CA3AF" />
              <YAxis label={{ value: config.yAxisLabel, angle: -90, position: 'insideLeft' }} stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #70BEFA', borderRadius: '8px', color: '#F9FAFB' }} />
              {config.showLegend && <Legend />}
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke={colors[0]} 
                strokeWidth={3}
                dot={{ fill: colors[0], r: 5, strokeWidth: 2, stroke: '#1A1A1A' }}
                activeDot={{ r: 7 }}
                label={config.showValues ? { position: 'top', fill: '#E5E7EB' } : false}
              />
            </LineChart>
          );
        
        case 'area':
          return (
            <AreaChart data={data}>
              {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />}
              <XAxis dataKey="label" label={{ value: config.xAxisLabel, position: 'insideBottom', offset: -5 }} stroke="#9CA3AF" />
              <YAxis label={{ value: config.yAxisLabel, angle: -90, position: 'insideLeft' }} stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #70BEFA', borderRadius: '8px', color: '#F9FAFB' }} />
              {config.showLegend && <Legend />}
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors[0]} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke={colors[0]} 
                fill="url(#colorSales)"
                strokeWidth={2}
                label={config.showValues ? { position: 'top', fill: '#E5E7EB' } : false}
              />
            </AreaChart>
          );
        
        case 'pie':
          return (
            <PieChart>
              <Pie
                data={data}
                dataKey="sales"
                nameKey="quarter"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={config.showValues}
                strokeWidth={2}
                stroke="#1A1A1A"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #70BEFA', borderRadius: '8px', color: '#F9FAFB' }} />
              {config.showLegend && <Legend />}
            </PieChart>
          );
        
        default:
          return <p className="text-gray-400">Unknown chart type</p>;
      }
    };

    return (
      <div className="bg-[#1A1A1A] border border-[#70BEFA]/30 rounded-2xl p-6 mb-6 shadow-lg shadow-[#70BEFA]/10">
        <h3 className="text-xl font-bold text-white mb-6 text-center">{config.title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          {renderChart()}
        </ResponsiveContainer>
        {config.interpretation && (
          <div className="mt-6 bg-[#0D0D0D] border border-[#70BEFA]/30 p-4 rounded-xl">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-[#70BEFA]">AI's interpretation: </span>
              {config.interpretation}
            </p>
          </div>
        )}
      </div>
    );
  };

  // Certificate Shape Library - Multiple geometric variations with different colors
  const SHAPE_LIBRARY = {
    circles: [
      {
        id: 'circle-blue',
        type: 'circle',
        name: 'Azure Orb',
        colors: {
          primary: '#70BEFA',
          secondary: '#5AAFED',
          glow: 'rgba(112,190,250,0.8)'
        }
      },
      {
        id: 'circle-purple',
        type: 'circle',
        name: 'Violet Sphere',
        colors: {
          primary: '#A78BFA',
          secondary: '#8B5CF6',
          glow: 'rgba(167,139,250,0.8)'
        }
      },
      {
        id: 'circle-green',
        type: 'circle',
        name: 'Emerald Globe',
        colors: {
          primary: '#34D399',
          secondary: '#10B981',
          glow: 'rgba(52,211,153,0.8)'
        }
      },
      {
        id: 'circle-gold',
        type: 'circle',
        name: 'Golden Orb',
        colors: {
          primary: '#FBBF24',
          secondary: '#F59E0B',
          glow: 'rgba(251,191,36,0.8)'
        }
      }
    ],
    squares: [
      {
        id: 'square-cyan',
        type: 'square',
        name: 'Cyan Crystal',
        rotation: 0,
        colors: {
          primary: '#06B6D4',
          secondary: '#0891B2',
          glow: 'rgba(6,182,212,0.8)'
        }
      },
      {
        id: 'square-pink',
        type: 'square',
        name: 'Rose Diamond',
        rotation: 45,
        colors: {
          primary: '#EC4899',
          secondary: '#DB2777',
          glow: 'rgba(236,72,153,0.8)'
        }
      },
      {
        id: 'square-orange',
        type: 'square',
        name: 'Amber Block',
        rotation: 0,
        colors: {
          primary: '#F97316',
          secondary: '#EA580C',
          glow: 'rgba(249,115,22,0.8)'
        }
      },
      {
        id: 'square-indigo',
        type: 'square',
        name: 'Indigo Gem',
        rotation: 45,
        colors: {
          primary: '#6366F1',
          secondary: '#4F46E5',
          glow: 'rgba(99,102,241,0.8)'
        }
      }
    ],
    triangles: [
      {
        id: 'triangle-red',
        type: 'triangle',
        name: 'Ruby Prism',
        orientation: 'up',
        colors: {
          primary: '#EF4444',
          secondary: '#DC2626',
          glow: 'rgba(239,68,68,0.8)'
        }
      },
      {
        id: 'triangle-teal',
        type: 'triangle',
        name: 'Teal Pyramid',
        orientation: 'down',
        colors: {
          primary: '#14B8A6',
          secondary: '#0D9488',
          glow: 'rgba(20,184,166,0.8)'
        }
      },
      {
        id: 'triangle-yellow',
        type: 'triangle',
        name: 'Sunburst Triangle',
        orientation: 'up',
        colors: {
          primary: '#EAB308',
          secondary: '#CA8A04',
          glow: 'rgba(234,179,8,0.8)'
        }
      },
      {
        id: 'triangle-lime',
        type: 'triangle',
        name: 'Lime Shard',
        orientation: 'down',
        colors: {
          primary: '#84CC16',
          secondary: '#65A30D',
          glow: 'rgba(132,204,22,0.8)'
        }
      }
    ]
  };

  // Get all shapes in a flat array
  const getAllShapes = () => {
    return [
      ...SHAPE_LIBRARY.circles,
      ...SHAPE_LIBRARY.squares,
      ...SHAPE_LIBRARY.triangles
    ];
  };

  // Prompt suggestions for Easy Mode (based on industry best practices)
  const PROMPT_SUGGESTIONS = {
    exercise1: [
      "Write a professional vacation request email. Start with a polite greeting, explain the dates (MM/DD to MM/DD), provide context about planned coverage, and close professionally.",
      "Create a vacation time-off email to my manager. Include: 1) Greeting 2) Request dates 3) Work coverage plan 4) Express willingness to discuss",
      "Draft an email requesting vacation approval. Structure: greeting → state dates → explain handover plans → thank manager for consideration"
    ],
    exercise2: [
      "Create a bar chart showing quarterly sales for Q1-Q4 2024. X-axis: quarters, Y-axis: revenue in dollars. Include grid lines and a title 'Quarterly Sales Performance 2024'.",
      "Generate a visualization with: Type: bar chart, Data: Q1 $450K, Q2 $520K, Q3 $610K, Q4 $580K, Labels on both axes, Legend showing sales data",
      "Make a sales chart. Specifics: bar graph format, four quarters as categories, sales figures as values, clear axis labels, professional color scheme"
    ],
    exercise3: [
      "The previous post was too casual. Rewrite it with: professional tone, no emojis, focus on value proposition, suitable for LinkedIn, 2-3 sentences maximum.",
      "Please revise the social media post. Changes needed: remove all emojis, use business-appropriate language, maintain key message but elevate tone, keep under 280 characters.",
      "Correction: the tone needs to be more professional. Rewrite with: formal business language, no slang or emojis, clear value statement, appropriate for corporate audience"
    ],
    exercise4: [
      "Write a tech blog post about [topic]. Match this style: [paste example]. Use similar: sentence structure, technical depth, tone, paragraph length, and opening hooks.",
      "Create a blog article following this example: [example text]. Key elements to mirror: casual yet professional tone, use of analogies, paragraph formatting, conclusion style.",
      "Generate a blog post in the style of: [example]. Replicate: writing voice, technical level, use of examples, paragraph structure, and engaging introductions."
    ],
    exercise5: [
      "Analyze this meeting note document. Extract: 1) Key decisions made 2) Action items with owners 3) Deadlines mentioned 4) Follow-up topics. Format as bulleted lists.",
      "Review the uploaded document and provide: summary of main topics, list of action items (who/what/when), any risks or blockers mentioned, next steps required.",
      "Parse this business document. Output: executive summary (3 sentences), action items table (owner, task, deadline), key metrics or numbers, outstanding questions."
    ],
    exercise6: [
      "Based on the campaign brief: create 3 headline options, 2 body copy variations, and 1 call-to-action. Match the target audience tone and address their pain points mentioned in the brief.",
      "Using the marketing brief provided: develop campaign content including hook/headline, value proposition paragraph, social proof element, and clear CTA. Align with audience demographics.",
      "Review the campaign brief and generate: attention-grabbing headline, persuasive body copy (150 words), emotional appeal relevant to target audience, strong closing CTA"
    ],
    exercise7: [
      "Analyze the business analytics dashboard. Identify: 3 key growth opportunities, 2 concerning trends, cross-department patterns, and provide 3 actionable recommendations with rationale.",
      "Review the analytics data across all departments. Create an executive summary with: highlights from each dept, inter-departmental insights, top 3 priorities, recommended actions.",
      "Examine the business data provided. Deliver: performance highlights, areas needing attention, patterns across departments, strategic recommendations for leadership team with supporting data."
    ]
  };

  // Certificate Shape Component - Enhanced with more glow layers
  const CertificateShape = ({ shapeConfig, size = 'large' }) => {
    if (!shapeConfig) return null;

    const sizeClasses = size === 'large' ? 'w-40 h-40' : 'w-24 h-24';

    if (shapeConfig.type === 'circle') {
      return (
        <div className={`relative ${sizeClasses}`}>
          {/* Outermost glow ring - slowest pulse */}
          <div
            className="absolute -inset-4 rounded-full animate-ping opacity-30"
            style={{
              backgroundColor: shapeConfig.colors.primary,
              animationDuration: '3s'
            }}
          ></div>
          {/* Second glow layer */}
          <div
            className="absolute -inset-2 rounded-full animate-pulse opacity-40"
            style={{
              backgroundColor: shapeConfig.colors.primary,
              animationDuration: '2.5s',
              animationDelay: '0.3s'
            }}
          ></div>
          {/* Third glow layer */}
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              backgroundColor: `${shapeConfig.colors.primary}50`,
              animationDuration: '2s'
            }}
          ></div>
          {/* Fourth glow layer */}
          <div
            className="absolute inset-3 rounded-full animate-pulse"
            style={{
              backgroundColor: `${shapeConfig.colors.primary}60`,
              animationDuration: '1.5s',
              animationDelay: '0.5s'
            }}
          ></div>
          {/* Core orb with enhanced multi-layer glow */}
          <div
            className="absolute inset-8 rounded-full"
            style={{
              backgroundColor: shapeConfig.colors.primary,
              boxShadow: `
                0 0 60px ${shapeConfig.colors.glow},
                0 0 120px ${shapeConfig.colors.glow.replace('0.8', '0.6')},
                0 0 180px ${shapeConfig.colors.glow.replace('0.8', '0.4')},
                inset 0 0 30px rgba(255,255,255,0.6),
                inset 0 0 60px ${shapeConfig.colors.glow.replace('0.8', '0.3')}
              `
            }}
          ></div>
        </div>
      );
    } else if (shapeConfig.type === 'square') {
      return (
        <div className={`relative ${sizeClasses}`} style={{ transform: `rotate(${shapeConfig.rotation}deg)` }}>
          {/* Outermost glow layer */}
          <div
            className="absolute -inset-4 animate-ping opacity-30"
            style={{
              backgroundColor: shapeConfig.colors.primary,
              borderRadius: '12px',
              animationDuration: '3s'
            }}
          ></div>
          {/* Second glow layer */}
          <div
            className="absolute -inset-2 animate-pulse opacity-40"
            style={{
              backgroundColor: shapeConfig.colors.primary,
              borderRadius: '10px',
              animationDuration: '2.5s',
              animationDelay: '0.3s'
            }}
          ></div>
          {/* Third glow layer */}
          <div
            className="absolute inset-0 animate-ping"
            style={{
              backgroundColor: `${shapeConfig.colors.primary}50`,
              borderRadius: '8px',
              animationDuration: '2s'
            }}
          ></div>
          {/* Fourth glow layer */}
          <div
            className="absolute inset-3 animate-pulse"
            style={{
              backgroundColor: `${shapeConfig.colors.primary}60`,
              borderRadius: '6px',
              animationDuration: '1.5s',
              animationDelay: '0.5s'
            }}
          ></div>
          {/* Core square with enhanced glow */}
          <div
            className="absolute inset-8"
            style={{
              backgroundColor: shapeConfig.colors.primary,
              borderRadius: '4px',
              boxShadow: `
                0 0 60px ${shapeConfig.colors.glow},
                0 0 120px ${shapeConfig.colors.glow.replace('0.8', '0.6')},
                0 0 180px ${shapeConfig.colors.glow.replace('0.8', '0.4')},
                inset 0 0 30px rgba(255,255,255,0.6),
                inset 0 0 60px ${shapeConfig.colors.glow.replace('0.8', '0.3')}
              `
            }}
          ></div>
        </div>
      );
    } else if (shapeConfig.type === 'triangle') {
      const isUp = shapeConfig.orientation === 'up';
      const triangleStyle = isUp
        ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
        : 'polygon(50% 100%, 0% 0%, 100% 0%)';

      return (
        <div className={`relative ${sizeClasses}`}>
          {/* Outermost glow layer */}
          <div
            className="absolute -inset-4 animate-ping opacity-30"
            style={{
              backgroundColor: shapeConfig.colors.primary,
              clipPath: triangleStyle,
              animationDuration: '3s'
            }}
          ></div>
          {/* Second glow layer */}
          <div
            className="absolute -inset-2 animate-pulse opacity-40"
            style={{
              backgroundColor: shapeConfig.colors.primary,
              clipPath: triangleStyle,
              animationDuration: '2.5s',
              animationDelay: '0.3s'
            }}
          ></div>
          {/* Third glow layer */}
          <div
            className="absolute inset-0 animate-ping"
            style={{
              backgroundColor: `${shapeConfig.colors.primary}50`,
              clipPath: triangleStyle,
              animationDuration: '2s'
            }}
          ></div>
          {/* Fourth glow layer */}
          <div
            className="absolute inset-3 animate-pulse"
            style={{
              backgroundColor: `${shapeConfig.colors.primary}60`,
              clipPath: triangleStyle,
              animationDuration: '1.5s',
              animationDelay: '0.5s'
            }}
          ></div>
          {/* Core triangle with enhanced glow */}
          <div
            className="absolute inset-8"
            style={{
              backgroundColor: shapeConfig.colors.primary,
              clipPath: triangleStyle,
              boxShadow: `
                0 0 60px ${shapeConfig.colors.glow},
                0 0 120px ${shapeConfig.colors.glow.replace('0.8', '0.6')},
                0 0 180px ${shapeConfig.colors.glow.replace('0.8', '0.4')}
              `
            }}
          ></div>
        </div>
      );
    }

    return null;
  };

  // Mock Company Data Generator
  const generateMockCompany = () => {
    const companies = [
      {
        name: "TechFlow Solutions",
        industry: "Software Development",
        employees: 45,
        founded: 2019,
        revenue: "$2.4M",
        quarterlyGrowth: "+18%",
        keyProjects: [
          "Cloud Migration Platform - Q1 2025, Budget: $180K, Status: In Progress",
          "Mobile App Redesign - Q4 2024, Budget: $95K, Status: Completed",
          "AI Analytics Dashboard - Q2 2025, Budget: $220K, Status: Planning"
        ],
        salesData: {
          q1: "$580K",
          q2: "$620K",
          q3: "$710K",
          q4: "$490K"
        },
        marketing: {
          budget: "$45K/month",
          channels: "LinkedIn Ads (40%), Content Marketing (30%), Events (20%), SEO (10%)",
          leads: "~250/month",
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
        founded: 2020,
        revenue: "$1.8M",
        quarterlyGrowth: "+24%",
        keyProjects: [
          "Product Line Expansion - Q2 2025, Budget: $120K, Status: In Progress",
          "Distribution Network - Q1 2025, Budget: $85K, Status: Completed",
          "Packaging Redesign - Q3 2025, Budget: $55K, Status: Planning"
        ],
        salesData: {
          q1: "$380K",
          q2: "$450K",
          q3: "$520K",
          q4: "$450K"
        },
        marketing: {
          budget: "$28K/month",
          channels: "Instagram (45%), Farmers Markets (25%), Email (20%), Influencers (10%)",
          leads: "~180/month",
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
        founded: 2021,
        revenue: "$1.2M",
        quarterlyGrowth: "+15%",
        keyProjects: [
          "Mobile App Development - Q1 2025, Budget: $145K, Status: In Progress",
          "New Studio Locations - Q4 2024, Budget: $200K, Status: Completed",
          "Virtual Training Platform - Q2 2025, Budget: $95K, Status: Planning"
        ],
        salesData: {
          q1: "$280K",
          q2: "$310K",
          q3: "$340K",
          q4: "$270K"
        },
        marketing: {
          budget: "$22K/month",
          channels: "Instagram (35%), Referrals (30%), Local Events (20%), Google Ads (15%)",
          leads: "~320/month",
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
  };

  // Milestone celebrations - only for meaningful achievements
  const milestones = {
    'exercise4': {
      title: "Halfway There! 🎯",
      message: "You're mastering prompt engineering! Your prompts are getting more specific and effective.",
      badge: "50% Complete"
    }
  };

  // Easy mode document data
  const easyModeDocument = {
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

  // Handle document upload simulation
  const handleDocumentUpload = () => {
    setUploadingDocument(true);
    const company = generateMockCompany();

    setTimeout(() => {
      setMockCompanyData(company);
      setDocumentUploaded(true);
      setUploadingDocument(false);
    }, 2000);
  };

  // Handle campaign brief loading
  const handleLoadCampaignBrief = () => {
    setLoadingCampaignBrief(true);
    const campaign = generateMarketingCampaign();

    setTimeout(() => {
      setMockCampaignData(campaign);
      setCampaignBriefLoaded(true);
      setLoadingCampaignBrief(false);
    }, 1500);
  };

  // Handle analytics data loading
  const handleLoadAnalytics = async () => {
    setLoadingAnalytics(true);

    try {
      const response = await fetch('/api/generate-analytics');
      const result = await response.json();

      if (result.data) {
        setTimeout(() => {
          setMockAnalyticsData(result.data);
          setAnalyticsLoaded(true);
          setLoadingAnalytics(false);
        }, 1800);
      } else {
        throw new Error('No data received');
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
      // Fallback to local generation if API fails
      const analytics = generateBusinessAnalytics();
      setTimeout(() => {
        setMockAnalyticsData(analytics);
        setAnalyticsLoaded(true);
        setLoadingAnalytics(false);
      }, 1800);
    }
  };

  // Mock Marketing Campaign Generator
  const generateMarketingCampaign = () => {
    const campaigns = [
      {
        clientName: "Sarah Chen",
        clientRole: "Marketing Director",
        companyName: "EcoHome Solutions",
        productLaunch: "Smart Home Energy Monitor",
        targetAudience: {
          primary: "Environmentally conscious homeowners, ages 30-55",
          secondary: "Tech-savvy millennials interested in cost savings",
          demographics: "Middle to upper-middle income, suburban areas"
        },
        campaignGoals: [
          "Generate 500 pre-orders in 30 days",
          "Build email list of 5,000+ interested prospects",
          "Achieve 15% click-through rate on ads"
        ],
        budget: "$25,000",
        channels: ["Email", "Instagram", "LinkedIn", "Google Ads"],
        timeline: "Launch in 3 weeks",
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
          secondary: "C-suite executives interested in employee retention",
          demographics: "Companies with 50-500 employees"
        },
        campaignGoals: [
          "Book 20 demo calls with qualified leads",
          "Establish thought leadership in corporate wellness",
          "Generate 2,000 website visits"
        ],
        budget: "$18,000",
        channels: ["LinkedIn", "Email", "Webinars", "Industry Publications"],
        timeline: "Q1 campaign starting in 2 weeks",
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
          secondary: "CTOs and IT decision-makers",
          demographics: "Tech companies with 20-200 employees, fully remote"
        },
        campaignGoals: [
          "Acquire 100 free trial signups",
          "Convert 20% to paid plans",
          "Build community of 1,000+ Slack/Discord members"
        ],
        budget: "$30,000",
        channels: ["Twitter", "Product Hunt", "Tech Podcasts", "Developer Communities"],
        timeline: "6-week campaign starting immediately",
        keyMessages: [
          "Built by remote teams, for remote teams",
          "Integrates with tools you already use",
          "10x faster than switching between apps"
        ],
        competitorInsight: "Market is saturated, need to stand out with personality and community-first approach"
      }
    ];

    return campaigns[Math.floor(Math.random() * campaigns.length)];
  };

  // Mock Business Analytics Data Generator
  const generateBusinessAnalytics = () => {
    const scenarios = [
      {
        companyName: "Stellar Retail Co.",
        period: "Q3 2024",
        departments: {
          sales: {
            revenue: "$1.2M",
            growth: "+18% YoY",
            topProducts: [
              { name: "Premium Wireless Headphones", sales: "$340K", units: 1200 },
              { name: "Smart Fitness Tracker", sales: "$280K", units: 1850 },
              { name: "Portable Power Bank", sales: "$190K", units: 2100 }
            ],
            regionalPerformance: [
              { region: "Northeast", revenue: "$420K", growth: "+25%" },
              { region: "Southeast", revenue: "$380K", growth: "+15%" },
              { region: "West", revenue: "$400K", growth: "+12%" }
            ],
            salesTeam: { reps: 12, avgDealsPerRep: 28, topPerformer: "Lisa Wong (42 deals)" }
          },
          marketing: {
            budget: "$95K",
            spent: "$89K",
            campaigns: [
              { name: "Summer Sale", spend: "$35K", leads: 2400, conversions: 340, roi: "2.8x" },
              { name: "Product Launch", spend: "$28K", leads: 1800, conversions: 220, roi: "3.1x" },
              { name: "Retargeting", spend: "$26K", leads: 1200, conversions: 180, roi: "2.4x" }
            ],
            channels: [
              { channel: "Social Media", spend: "$38K", impressions: "1.2M", ctr: "2.4%" },
              { channel: "Email", spend: "$15K", opens: "45%", clicks: "12%" },
              { channel: "PPC", spend: "$36K", impressions: "890K", ctr: "3.1%" }
            ]
          },
          accounting: {
            revenue: "$1.2M",
            expenses: "$840K",
            profit: "$360K",
            profitMargin: "30%",
            breakdown: [
              { category: "Cost of Goods", amount: "$480K", percentage: "57%" },
              { category: "Payroll", amount: "$220K", percentage: "26%" },
              { category: "Marketing", amount: "$89K", percentage: "11%" },
              { category: "Operations", amount: "$51K", percentage: "6%" }
            ],
            cashFlow: "+$145K vs last quarter",
            outstandingInvoices: "$82K (avg 28 days)"
          },
          operations: {
            productivity: "92% efficiency rating",
            fulfillment: [
              { metric: "Order Processing Time", value: "2.1 hours", target: "< 3 hours" },
              { metric: "Shipping Accuracy", value: "98.5%", target: "> 98%" },
              { metric: "Customer Support Response", value: "4.2 hours", target: "< 6 hours" }
            ],
            inventory: [
              { status: "In Stock", items: 1240, value: "$340K" },
              { status: "Low Stock (< 20 units)", items: 85, value: "$18K" },
              { status: "Out of Stock", items: 12, value: "$4K" }
            ],
            team: { employees: 28, avgTenure: "2.3 years", satisfaction: "8.1/10" }
          }
        },
        keyInsights: [
          "Northeast region outperforming others - opportunity to replicate strategy",
          "Email marketing has best ROI but lowest budget allocation",
          "High inventory on slow-moving items - consider promotion",
          "Customer support response time improving but still room for optimization"
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
              { name: "Enterprise Software License", sales: "$1.2M", units: 45 },
              { name: "Professional Services", sales: "$980K", units: 120 },
              { name: "Training & Support", sales: "$620K", units: 85 }
            ],
            regionalPerformance: [
              { region: "East Coast", revenue: "$1.1M", growth: "+28%" },
              { region: "Midwest", revenue: "$940K", growth: "+18%" },
              { region: "West Coast", revenue: "$760K", growth: "+20%" }
            ],
            salesTeam: { reps: 18, avgDealsPerRep: 15, topPerformer: "David Park (32 deals)" }
          },
          marketing: {
            budget: "$145K",
            spent: "$138K",
            campaigns: [
              { name: "Webinar Series", spend: "$42K", leads: 850, conversions: 68, roi: "4.2x" },
              { name: "Content Marketing", spend: "$38K", leads: 1200, conversions: 52, roi: "3.8x" },
              { name: "Trade Shows", spend: "$58K", leads: 420, conversions: 48, roi: "2.9x" }
            ],
            channels: [
              { channel: "LinkedIn", spend: "$62K", impressions: "2.4M", ctr: "3.8%" },
              { channel: "Email", spend: "$28K", opens: "52%", clicks: "18%" },
              { channel: "Events", spend: "$48K", impressions: "85K", ctr: "N/A" }
            ]
          },
          accounting: {
            revenue: "$2.8M",
            expenses: "$1.9M",
            profit: "$900K",
            profitMargin: "32%",
            breakdown: [
              { category: "Payroll", amount: "$1.1M", percentage: "58%" },
              { category: "Technology", amount: "$380K", percentage: "20%" },
              { category: "Marketing", amount: "$138K", percentage: "7%" },
              { category: "Operations", amount: "$282K", percentage: "15%" }
            ],
            cashFlow: "+$320K vs last quarter",
            outstandingInvoices: "$420K (avg 42 days)"
          },
          operations: {
            productivity: "89% efficiency rating",
            fulfillment: [
              { metric: "Project Delivery Time", value: "8.5 days", target: "< 10 days" },
              { metric: "Client Satisfaction", value: "94%", target: "> 90%" },
              { metric: "Support Ticket Resolution", value: "18 hours", target: "< 24 hours" }
            ],
            inventory: [
              { status: "Active Projects", items: 38, value: "$2.1M" },
              { status: "In Pipeline", items: 52, value: "$3.8M" },
              { status: "Completed This Quarter", items: 67, value: "$2.4M" }
            ],
            team: { employees: 45, avgTenure: "3.1 years", satisfaction: "8.6/10" }
          }
        },
        keyInsights: [
          "East Coast sales team significantly outperforming - investigate best practices",
          "Webinar series has highest ROI - consider doubling investment",
          "Outstanding invoices at 42 days - implement stricter payment terms",
          "Client satisfaction high but team efficiency could improve"
        ],
        concerns: [
          "$420K in outstanding invoices putting pressure on cash reserves",
          "Technology costs growing faster than revenue",
          "Pipeline strong but resource constraints may limit growth"
        ]
      }
    ];

    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  const lessons = [
    {
      id: 'intro',
      title: 'The Problem with Vague Prompts',
      type: 'lesson',
      content: (
        <div className="space-y-4">
          <div className="bg-red-950/20 border-l-4 border-red-500 p-4 rounded-xl">
            <p className="font-bold text-red-400 mb-2 flex items-center gap-2 text-sm">
              <XCircle className="w-4 h-4" />
              Vague Prompt
            </p>
            <p className="text-gray-300 text-base italic font-medium">"Make a sandwich"</p>
          </div>

          <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-500/30">
            <p className="font-bold text-amber-400 mb-2 text-sm">What the AI might do:</p>
            <ul className="space-y-1.5 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#70BEFA] mt-0.5">—</span>
                <span>Put ingredients on the counter instead of bread</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#70BEFA] mt-0.5">—</span>
                <span>Use ingredients you don't want</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#70BEFA] mt-0.5">—</span>
                <span>Skip steps entirely</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#70BEFA] mt-0.5">—</span>
                <span>Misunderstand what "sandwich" means to you</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#0A1929]/80 p-4 rounded-xl border border-[#70BEFA]/30">
            <p className="font-bold text-[#70BEFA] mb-2 flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4" />
              The Solution
            </p>
            <p className="text-gray-300 text-sm">Break down your request into clear, specific steps. Guide the AI like you're teaching someone who's never made a sandwich before!</p>
          </div>
        </div>
      )
    },
    {
      id: 'lesson1',
      title: 'Lesson 1: Break It Down',
      type: 'lesson',
      content: (
        <div className="space-y-4">
          <div className="bg-[#0A1929]/80 p-4 rounded-xl border border-[#70BEFA]/30">
            <h3 className="font-bold text-[#70BEFA] mb-3 flex items-center gap-2 text-sm">
              <Book className="w-4 h-4" />
              Key Principle: One Step at a Time
            </h3>
            <p className="text-gray-300 mb-4 text-sm">Instead of asking for a complete result, break your task into small, clear steps.</p>

            <div className="bg-[#1A1A1A] p-3 rounded-xl border border-[#70BEFA]/30">
              <p className="font-semibold text-white mb-2 text-sm">Example: Making eggs</p>
              <ol className="space-y-1.5 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#70BEFA] min-w-[16px]">1.</span>
                  <span>Turn on the stove</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#70BEFA] min-w-[16px]">2.</span>
                  <span>Put the pan on the stove</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#70BEFA] min-w-[16px]">3.</span>
                  <span>Add butter to the pan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#70BEFA] min-w-[16px]">4.</span>
                  <span>Increase temperature to 60°C</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#70BEFA] min-w-[16px]">5.</span>
                  <span>Break two eggs in the cooking area</span>
                </li>
              </ol>
            </div>
          </div>

          <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#70BEFA]/30">
            <p className="font-bold text-[#70BEFA] mb-3 text-sm">Why this works:</p>
            <div className="grid md:grid-cols-2 gap-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#70BEFA] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Each step is simple and clear</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#70BEFA] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">You maintain control</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#70BEFA] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Catch mistakes early</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#70BEFA] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">AI knows what to do next</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'exercise1',
      title: 'Exercise 1: Break Down a Task',
      type: 'exercise',
      scenario: 'You want AI to write a professional email to your manager requesting time off for a vacation.',
      task: 'Write a prompt that breaks this task down into clear steps. See how the AI responds!',
      evaluationCriteria: 'breaking the task into steps',
      hints: [
        'Think about the email structure: greeting, explanation, request, closing',
        'What specific information needs to be included?',
        'How should the tone be?'
      ]
    },
    {
      id: 'lesson2',
      title: 'Lesson 2: Be Specific',
      type: 'lesson',
      content: (
        <div className="space-y-4">
          <div className="bg-[#0A1929]/80 p-4 rounded-xl border border-[#70BEFA]/30">
            <h3 className="font-bold text-[#70BEFA] mb-2 flex items-center gap-2 text-sm">
              <Target className="w-4 h-4" />
              Key Principle: Details Matter
            </h3>
            <p className="text-gray-300 text-sm">Vague instructions lead to unexpected results. Add specific details about what, where, and how.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-red-950/20 p-4 rounded-xl border border-red-500/30">
              <p className="font-bold text-red-400 mb-2 flex items-center gap-2 text-sm">
                <XCircle className="w-4 h-4" />
                Vague
              </p>
              <p className="text-gray-300 italic text-base mb-2">"Add butter"</p>
              <p className="text-xs text-gray-400">Where? How much? What temperature?</p>
            </div>

            <div className="bg-[#0A1929]/80 p-4 rounded-xl border border-[#70BEFA]/30">
              <p className="font-bold text-[#70BEFA] mb-2 flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4" />
                Specific
              </p>
              <p className="text-gray-300 italic text-base mb-2">"Add 1 tablespoon of butter to the center of the pan"</p>
              <p className="text-xs text-gray-400">Clear location and amount!</p>
            </div>
          </div>

          <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#70BEFA]/30">
            <p className="font-bold text-white mb-3 text-sm">Types of specificity to include:</p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#70BEFA] rounded-full mt-1.5"></div>
                <div className="text-sm">
                  <span className="font-semibold text-white">Location:</span>
                  <span className="text-gray-400 ml-2">"in the pan" not just "add butter"</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#70BEFA] rounded-full mt-1.5"></div>
                <div className="text-sm">
                  <span className="font-semibold text-white">Amount:</span>
                  <span className="text-gray-400 ml-2">"two eggs" not just "add eggs"</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#70BEFA] rounded-full mt-1.5"></div>
                <div className="text-sm">
                  <span className="font-semibold text-white">Units:</span>
                  <span className="text-gray-400 ml-2">"60 degrees Celsius" not just "60 degrees"</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#70BEFA] rounded-full mt-1.5"></div>
                <div className="text-sm">
                  <span className="font-semibold text-white">Position:</span>
                  <span className="text-gray-400 ml-2">"on the second shelf to your left"</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#70BEFA] rounded-full mt-1.5"></div>
                <div className="text-sm">
                  <span className="font-semibold text-white">Context:</span>
                  <span className="text-gray-400 ml-2">"for a professional audience"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'exercise2',
      title: 'Exercise 2: Add Specificity',
      type: 'exercise',
      scenario: 'You need a data visualization showing your company\'s quarterly sales performance for 2024.',
      task: 'Write a specific prompt to create a chart from this data. Watch as AI generates the actual visualization based on your instructions!',
      evaluationCriteria: 'being specific with details (chart type, labels, colors, title, axis labels)',
      requiresVisualization: true,
      salesData: [
        { quarter: 'Q1 2024', sales: 45000, label: 'Q1' },
        { quarter: 'Q2 2024', sales: 62000, label: 'Q2' },
        { quarter: 'Q3 2024', sales: 58000, label: 'Q3' },
        { quarter: 'Q4 2024', sales: 71000, label: 'Q4' }
      ],
      hints: [
        'What type of chart? (bar, line, pie, area?)',
        'What colors should be used?',
        'What should the title say?',
        'Should there be axis labels? What should they say?',
        'Any specific formatting? (show values, grid lines, legend?)'
      ]
    },
    {
      id: 'lesson3',
      title: 'Lesson 3: Iterate & Correct',
      type: 'lesson',
      content: (
        <div className="space-y-4">
          <div className="bg-[#0A1929]/80 p-4 rounded-xl border border-[#70BEFA]/30">
            <h3 className="font-bold text-[#70BEFA] mb-2 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4" />
              Key Principle: Fix Misunderstandings Immediately
            </h3>
            <p className="text-gray-300 text-sm">AI will sometimes misunderstand. That's okay! Correct it right away and give context for future steps.</p>
          </div>

          <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#70BEFA]/30">
            <p className="font-bold text-white mb-3 text-sm">Example conversation:</p>
            <div className="space-y-2">
              <div className="bg-[#0D0D0D] p-3 rounded-xl border border-[#70BEFA]/30">
                <p className="text-xs text-[#70BEFA] font-semibold mb-1">You:</p>
                <p className="text-gray-200 text-sm">"Add butter to the pan"</p>
              </div>

              <div className="bg-[#0D0D0D] p-3 rounded-xl border border-gray-700">
                <p className="text-xs text-gray-400 font-semibold mb-1">AI:</p>
                <p className="text-gray-300 italic text-sm">*Places butter on the pan handle*</p>
              </div>

              <div className="bg-[#0D0D0D] p-3 rounded-xl border border-[#70BEFA]/30">
                <p className="text-xs text-[#70BEFA] font-semibold mb-1">You (Correcting):</p>
                <p className="text-gray-200 text-sm">"Not on the handle! Put it in the cooking area of the pan. Going forward, when I say 'add to the pan', I mean the cooking area."</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#70BEFA]/30">
            <p className="font-bold text-[#70BEFA] mb-2 text-sm">Correction tips:</p>
            <div className="space-y-1.5">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#70BEFA] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Point out the mistake clearly</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#70BEFA] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Explain what you actually meant</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#70BEFA] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Add context for future instructions</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#70BEFA] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Be specific about what needs to change</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'exercise3',
      title: 'Exercise 3: Correct & Iterate',
      type: 'exercise',
      scenario: 'You asked AI to create a social media post for your business, but it came back too casual and used emojis. You need a professional tone.',
      task: 'Write a correction prompt that fixes the mistake AND sets expectations for future posts.',
      evaluationCriteria: 'correcting mistakes and setting future expectations',
      mockBadResponse: "Hey guys! 🎉 So excited to announce our AMAZING new product line!!! 😍🔥 It's literally the BEST thing you'll see all day! Super affordable and totally worth it! 💯 DM us ASAP if you want one!!! Limited stock! 🚀✨",
      hints: [
        'Point out what went wrong specifically',
        'Specify the correct tone',
        'Add instructions for future requests'
      ]
    },
    {
      id: 'lesson4',
      title: 'Lesson 4: Provide Examples',
      type: 'lesson',
      content: (
        <div className="space-y-4">
          <div className="bg-[#0A1929]/80 p-4 rounded-xl border border-[#70BEFA]/30">
            <h3 className="font-bold text-[#70BEFA] mb-2 flex items-center gap-2 text-sm">
              <Book className="w-4 h-4" />
              Key Principle: Show, Don't Just Tell
            </h3>
            <p className="text-gray-300 text-sm">Instead of only describing what you want, provide examples. AI learns patterns from your examples and matches that style.</p>
          </div>

          <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#70BEFA]/30">
            <p className="font-bold text-white mb-3 text-sm">Ways to provide examples:</p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#70BEFA] rounded-full mt-1.5"></div>
                <div className="text-sm">
                  <span className="font-semibold text-white">Text samples:</span>
                  <span className="text-gray-400 ml-2">"Write like this: [paste example]"</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#70BEFA] rounded-full mt-1.5"></div>
                <div className="text-sm">
                  <span className="font-semibold text-white">Links:</span>
                  <span className="text-gray-400 ml-2">"Match the style of this article: [URL]"</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#70BEFA] rounded-full mt-1.5"></div>
                <div className="text-sm">
                  <span className="font-semibold text-white">Format examples:</span>
                  <span className="text-gray-400 ml-2">"Use this structure: [template]"</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#70BEFA] rounded-full mt-1.5"></div>
                <div className="text-sm">
                  <span className="font-semibold text-white">Before/After:</span>
                  <span className="text-gray-400 ml-2">"Transform this [input] to this [output]"</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#70BEFA]/30">
            <p className="font-bold text-[#70BEFA] mb-2 text-sm">Why examples work:</p>
            <div className="space-y-1.5">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#70BEFA] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">AI sees exactly what you want</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#70BEFA] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Matches tone and style automatically</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#70BEFA] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Reduces back-and-forth clarifications</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#70BEFA] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Works better than lengthy descriptions</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'exercise4',
      title: 'Exercise 4: Use Examples',
      type: 'exercise',
      scenario: 'You need to write blog posts for your tech company. You want AI to match the style of existing articles you like.',
      task: 'Write a prompt that references example articles (you can include URLs) and asks AI to match that writing style for a new topic.',
      evaluationCriteria: 'including reference examples (text or URLs) and asking AI to match the style',
      mockBadResponse: undefined,
      enableWebSearch: true,
      hints: [
        'You can reference URLs of example articles',
        'Or paste example text directly in your prompt',
        'Point out specific style elements (tone, structure, length)',
        'Clearly state the new topic you want written',
        'Ask AI to analyze and match the example style'
      ]
    },
    {
      id: 'lesson5',
      title: 'Lesson 5: Working with Documents',
      type: 'lesson',
      content: (
        <div className="space-y-4">
          <div className="bg-[#0A1929]/80 p-4 rounded-xl border border-[#70BEFA]/30">
            <h3 className="font-bold text-[#70BEFA] mb-2 flex items-center gap-2 text-sm">
              <Book className="w-4 h-4" />
              Key Principle: Guide AI Through Your Documents
            </h3>
            <p className="text-gray-300 text-sm">When working with uploaded documents, tell AI exactly what to look for and how to use the information.</p>
          </div>

          <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#70BEFA]/30">
            <p className="font-bold text-white mb-3 text-sm">Best practices for document prompts:</p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#70BEFA] rounded-full mt-1.5"></div>
                <div className="text-sm">
                  <span className="font-semibold text-white">Reference the document:</span>
                  <span className="text-gray-400 ml-2">"Based on the uploaded document..."</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#70BEFA] rounded-full mt-1.5"></div>
                <div className="text-sm">
                  <span className="font-semibold text-white">Specify sections:</span>
                  <span className="text-gray-400 ml-2">"Focus on the financial data in section 3"</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#70BEFA] rounded-full mt-1.5"></div>
                <div className="text-sm">
                  <span className="font-semibold text-white">Define the task clearly:</span>
                  <span className="text-gray-400 ml-2">"Summarize the key findings" or "Extract all dates"</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#70BEFA] rounded-full mt-1.5"></div>
                <div className="text-sm">
                  <span className="font-semibold text-white">Specify output format:</span>
                  <span className="text-gray-400 ml-2">"Create a bullet list" or "Make a table"</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#70BEFA] rounded-full mt-1.5"></div>
                <div className="text-sm">
                  <span className="font-semibold text-white">Ask questions:</span>
                  <span className="text-gray-400 ml-2">"What are the main risks mentioned?"</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#70BEFA]/30">
            <p className="font-bold text-[#70BEFA] mb-2 text-sm">Common mistakes to avoid:</p>
            <div className="space-y-1.5">
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">"Analyze this" (too vague - analyze what aspect?)</span>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">"Tell me about the document" (what specifically?)</span>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Not mentioning which document (if multiple uploaded)</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'exercise5',
      title: 'Exercise 5: Document Analysis',
      type: 'exercise',
      scenario: 'Analyze meeting notes or business documents to extract key information and action items.',
      task: 'Choose your difficulty: Easy mode shows meeting notes, Hard mode requires uploading a full business report.',
      evaluationCriteria: 'referencing the document, specifying what to extract, and defining output format',
      mockBadResponse: undefined,
      hasDifficultyModes: true,
      requiresDocumentUpload: true, // Only for hard mode
      hints: [
        'Acknowledge the document/notes explicitly',
        'Specify which information to focus on',
        'Define what information you need extracted',
        'Specify how you want the output formatted (table, bullets, summary, etc.)'
      ]
    },
    {
      id: 'exercise6',
      title: 'Final Challenge 1: Creative Writing',
      type: 'exercise',
      scenario: 'Review the marketing campaign brief and create compelling campaign content that resonates with the target audience.',
      task: 'Load the campaign brief, then write a prompt to create email copy, social posts, or ad copy that aligns with campaign goals.',
      evaluationCriteria: 'referencing campaign details, targeting audience, addressing goals, creative and specific output request',
      requiresCampaignBrief: true,
      hints: [
        'Reference the specific product and target audience',
        'Mention the campaign goals and key messages',
        'Specify the type of content needed (email, social, ad)',
        'Define tone, length, and format',
        'Include competitor insights to differentiate'
      ]
    },
    {
      id: 'exercise7',
      title: 'Final Challenge 2: Analytical Thinking',
      type: 'exercise',
      scenario: 'Analyze cross-departmental business data to identify insights, trends, and actionable recommendations for the leadership team.',
      task: 'Load the business analytics dashboard, then write a prompt to extract insights across Sales, Marketing, Accounting, and Operations.',
      evaluationCriteria: 'referencing multiple departments, specifying analysis type, defining output format, requesting actionable insights',
      requiresAnalytics: true,
      hints: [
        'Reference specific departments and metrics',
        'Ask for cross-department correlations and patterns',
        'Specify what insights you need (opportunities, concerns, trends)',
        'Define output format (executive summary, bullet points, recommendations)',
        'Request prioritized, actionable recommendations'
      ]
    }
  ];

  const generateAIResponse = async (userPrompt, lessonContext, enableWebSearch = false) => {
    try {
      setIsStreaming(true);
      setStreamingText('');

      // Check if prompt contains URLs and web search is enabled
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const urls = userPrompt.match(urlRegex);

      let contextWithUrls = lessonContext;

      if (enableWebSearch && urls && urls.length > 0) {
        contextWithUrls += "\n\nNote: The user has provided URLs in their prompt. Acknowledge that you would analyze these URLs to understand the style/content, and provide a response showing you understand the concept of using reference materials.";
      }

      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          max_tokens: 800,
          messages: [
            {
              role: "user",
              content: `You are simulating how an AI would respond to a user's prompt in a prompt engineering training exercise.

Context: ${contextWithUrls}

User's prompt: "${userPrompt}"

Your job:
1. If the prompt is vague, unclear, or missing important details, respond in a way that DEMONSTRATES THE PROBLEMS with the vague prompt. Make assumptions, miss key details, or misinterpret in realistic ways that show what goes wrong.

2. If the prompt is well-structured with clear steps and specific details, respond appropriately and helpfully.

3. If the user provided URLs or reference materials, acknowledge them and show you understand how to use examples.

4. Keep your response concise (2-4 sentences) and realistic.

5. DO NOT explain what's wrong with the prompt - just demonstrate it through your response.

Examples:
- Vague: "Write an email" → You might write an email but get the tone wrong, miss key details, or make assumptions
- Good: "Write a professional email to my manager. Start with 'Dear [Manager Name]', explain that I'm requesting time off, specify dates June 1-5, and close formally." → Respond appropriately

Generate a response now:`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          setStreamingText(fullText);
        }
      }

      setIsStreaming(false);
      return fullText;
    } catch (error) {
      console.error("Error generating AI response:", error);
      setIsStreaming(false);
      setStreamingText('');
      return "Error generating response. Please try again.";
    }
  };

  const evaluatePrompt = async (userPrompt, aiResponse, criteria, lessonContext) => {
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `You are evaluating a user's prompt in a prompt engineering training exercise.

Lesson context: ${lessonContext}
Evaluation criteria: The prompt should demonstrate ${criteria}

User's prompt: "${userPrompt}"

AI's response to their prompt: "${aiResponse}"

Analyze the user's prompt and provide feedback in this EXACT JSON format (DO NOT include any text outside the JSON):
{
  "passed": true or false,
  "score": number from 1-10,
  "strengths": ["strength 1", "strength 2"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "mainFeedback": "2-3 sentences explaining what went well or what needs improvement",
  "highlights": ["phrase from their prompt that was problematic", "another phrase"],
  "nextSteps": "One specific suggestion for improvement"
}

Rules:
- If the prompt demonstrates the criteria well (clear steps, specific details, good structure), set passed to true and score 7+
- If it's vague, missing steps, or lacks specificity, set passed to false and score below 7
- Be encouraging but honest
- Highlight 1-3 specific phrases from their prompt that were good or problematic
- DO NOT OUTPUT ANYTHING EXCEPT VALID JSON`
            }
          ]
        })
      });

      // Read the full text stream
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let responseText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          responseText += decoder.decode(value, { stream: true });
        }
      }
      
      responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      
      const evaluationData = JSON.parse(responseText);
      return evaluationData;
    } catch (error) {
      console.error("Error evaluating prompt:", error);
      return {
        passed: false,
        score: 0,
        strengths: [],
        weaknesses: ["Error evaluating your prompt"],
        mainFeedback: "There was an error evaluating your prompt. Please try again.",
        highlights: [],
        nextSteps: "Try resubmitting your answer."
      };
    }
  };

  const generateVisualization = async (userPrompt, salesData) => {
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          max_tokens: 1500,
          messages: [
            {
              role: "user",
              content: `You are generating a chart configuration based on a user's prompt.

Sales Data:
${JSON.stringify(salesData, null, 2)}

User's prompt: "${userPrompt}"

Generate a chart configuration based on their prompt. If their prompt is vague or missing details, make reasonable assumptions that demonstrate what happens when prompts lack specificity (e.g., use default colors if not specified, generic title if not specified, etc.).

Respond with ONLY valid JSON in this exact format:
{
  "chartType": "bar" | "line" | "area" | "pie",
  "title": "string - chart title",
  "xAxisLabel": "string",
  "yAxisLabel": "string",
  "showValues": boolean,
  "showGrid": boolean,
  "colors": ["#color1", "#color2", ...],
  "showLegend": boolean,
  "interpretation": "1-2 sentences explaining what you created and what assumptions you made due to vague/missing details"
}

Chart types available: bar, line, area, pie
DO NOT OUTPUT ANYTHING EXCEPT VALID JSON`
            }
          ]
        })
      });

      // Read the full text stream
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let responseText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          responseText += decoder.decode(value, { stream: true });
        }
      }
      
      responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      
      const chartConfig = JSON.parse(responseText);
      return chartConfig;
    } catch (error) {
      console.error("Error generating visualization:", error);
      return {
        chartType: 'bar',
        title: 'Sales Data',
        xAxisLabel: 'Quarter',
        yAxisLabel: 'Sales',
        showValues: false,
        showGrid: true,
        colors: ['#10B981'],
        showLegend: false,
        interpretation: "Error generating chart. Using default configuration."
      };
    }
  };

  const handleSubmitExercise = async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    setAiResponse(null);
    setEvaluation(null);
    setGeneratedChart(null);

    const lesson = lessons[currentLesson];

    if (lesson.requiresVisualization && lesson.salesData) {
      const chartConfig = await generateVisualization(userInput, lesson.salesData);
      setGeneratedChart(chartConfig);
    }

    // Add mock context based on exercise type
    let contextWithDocument = lesson.scenario;

    // Handle Exercise 5 difficulty modes
    if (lesson.hasDifficultyModes && exerciseDifficulty === 'easy') {
      contextWithDocument += `\n\nMeeting Notes - ${easyModeDocument.title}:\nDate: ${easyModeDocument.date}\nAttendees: ${easyModeDocument.attendees.join(', ')}\n\nDiscussion Points:\n${easyModeDocument.content.map(item => `- ${item}`).join('\n')}\n\nAction Items:\n${easyModeDocument.actionItems.map(item => `- ${item}`).join('\n')}`;
    } else if (lesson.requiresDocumentUpload && mockCompanyData && exerciseDifficulty === 'hard') {
      contextWithDocument += `\n\nUploaded Document Content:\nCompany: ${mockCompanyData.name}\nIndustry: ${mockCompanyData.industry}\nEmployees: ${mockCompanyData.employees}\nRevenue: ${mockCompanyData.revenue} (Growth: ${mockCompanyData.quarterlyGrowth})\nKey Projects: ${mockCompanyData.keyProjects.join(', ')}\nQuarterly Sales: Q1: ${mockCompanyData.salesData.q1}, Q2: ${mockCompanyData.salesData.q2}, Q3: ${mockCompanyData.salesData.q3}, Q4: ${mockCompanyData.salesData.q4}\nMarketing: Budget: ${mockCompanyData.marketing.budget}, Leads: ${mockCompanyData.marketing.leads}, Conversion: ${mockCompanyData.marketing.conversionRate}\nChallenges: ${mockCompanyData.challenges.join(', ')}`;
    }

    if (lesson.requiresCampaignBrief && mockCampaignData) {
      contextWithDocument += `\n\nCampaign Brief:\nClient: ${mockCampaignData.clientName} (${mockCampaignData.clientRole}) at ${mockCampaignData.companyName}\nProduct: ${mockCampaignData.productLaunch}\nTarget Audience: ${mockCampaignData.targetAudience.primary}, ${mockCampaignData.targetAudience.secondary}\nGoals: ${mockCampaignData.campaignGoals.join(', ')}\nBudget: ${mockCampaignData.budget}\nChannels: ${mockCampaignData.channels.join(', ')}\nKey Messages: ${mockCampaignData.keyMessages.join(', ')}\nCompetitor Insight: ${mockCampaignData.competitorInsight}`;
    }

    if (lesson.requiresAnalytics && mockAnalyticsData) {
      const sales = mockAnalyticsData.departments.sales;
      const marketing = mockAnalyticsData.departments.marketing;
      const accounting = mockAnalyticsData.departments.accounting;
      const operations = mockAnalyticsData.departments.operations;

      const outstandingInvoicesStr = typeof accounting.outstandingInvoices === 'object'
        ? `${accounting.outstandingInvoices.amount} (avg ${accounting.outstandingInvoices.avgDays} days)`
        : accounting.outstandingInvoices;

      contextWithDocument += `\n\nBusiness Analytics Dashboard - ${mockAnalyticsData.companyName} (${mockAnalyticsData.period}):\n\nSALES: Revenue ${sales.revenue} (${sales.growth}), Top Products: ${sales.topProducts.map(p => `${p.name} (${p.sales})`).join(', ')}\n\nMARKETING: Budget ${marketing.budget}, Spent ${marketing.spent}, Top Campaign: ${marketing.campaigns[0].name} (${marketing.campaigns[0].roi} ROI)\n\nACCOUNTING: Revenue ${accounting.revenue}, Expenses ${accounting.expenses}, Profit ${accounting.profit} (${accounting.profitMargin} margin), Outstanding Invoices: ${outstandingInvoicesStr}\n\nOPERATIONS: Efficiency ${operations.productivity}, Team: ${operations.team.employees} employees (${operations.team.satisfaction} satisfaction)\n\nKey Insights: ${mockAnalyticsData.keyInsights.join('; ')}\n\nConcerns: ${mockAnalyticsData.concerns.join('; ')}`;
    }

    const response = await generateAIResponse(userInput, contextWithDocument, lesson.enableWebSearch);
    setAiResponse(response);

    const evaluationResult = await evaluatePrompt(userInput, response, lesson.evaluationCriteria, contextWithDocument);
    setEvaluation(evaluationResult);

    setExerciseAttempts(exerciseAttempts + 1);

    if (evaluationResult.passed) {
      let points = Math.max(30 - (exerciseAttempts * 5), 10);
      // Apply 1/10 penalty if user used a suggestion
      if (usedSuggestion) {
        points = Math.floor(points / 10);
      }
      setScore(score + points);
    }

    setIsLoading(false);
  };

  const handleStart = () => {
    setCurrentScreen('lesson');
    setCurrentLesson(0);
  };

  const handleNext = () => {
    if (!completedLessons.includes(lessons[currentLesson].id)) {
      setCompletedLessons([...completedLessons, lessons[currentLesson].id]);
    }

    const currentLessonId = lessons[currentLesson].id;

    // Scroll to top for better UX on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger progress celebration
    setShowProgressCelebration(true);

    setTimeout(() => {
      setShowProgressCelebration(false);
    }, 1500);

    // Check if this is a milestone (50% completion)
    if (milestones[currentLessonId]) {
      setMilestoneData(milestones[currentLessonId]);
      setShowMilestone(true);

      // Auto-dismiss milestone after 2.5 seconds
      setTimeout(() => {
        setShowMilestone(false);
        setTimeout(() => {
          setMilestoneData(null);
        }, 500);
      }, 2500);
    }

    // Proceed to next lesson
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setUserInput('');
      setAiResponse(null);
      setEvaluation(null);
      setGeneratedChart(null);
      setExerciseAttempts(0);
      setUsedSuggestion(false);
      setDocumentUploaded(false);
      setUploadingDocument(false);
      setMockCompanyData(null);
      setCampaignBriefLoaded(false);
      setLoadingCampaignBrief(false);
      setMockCampaignData(null);
      setAnalyticsLoaded(false);
      setLoadingAnalytics(false);
      setMockAnalyticsData(null);
      setExerciseDifficulty('easy');
    } else {
      // Assign a random shape for the certificate if not already assigned
      if (!userShape) {
        const allShapes = getAllShapes();
        const randomShape = allShapes[Math.floor(Math.random() * allShapes.length)];
        setUserShape(randomShape);
      }
      setCurrentScreen('complete');
    }
  };

  const handleTryAgain = () => {
    setUserInput('');
    setAiResponse(null);
    setEvaluation(null);
    setGeneratedChart(null);
  };

  const downloadCertificate = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      
      const certificate = certificateRef.current;
      const canvas = await html2canvas(certificate, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `prompt-engineering-certificate-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Failed to download certificate. Please try again.');
    }
  };

  const shareCertificate = async () => {
    const shareText = `I just completed the AI Prompt Engineering course and scored ${score} points! 🎓✨ Master the art of communicating with AI effectively.`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI Prompt Engineering Certificate',
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          copyToClipboard(shareText);
        }
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Share text copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy. Please try again.');
    });
  };

  const shareToTwitter = () => {
    const text = `I just completed the AI Prompt Engineering course and scored ${score} points! 🎓✨`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const progress = ((currentLesson + 1) / lessons.length) * 100;

  if (currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-[#0D0D0D] p-4 md:p-8">
        <div className="max-w-6xl mx-auto pt-12 md:pt-20">
          {/* Asymmetric header - left aligned */}
          <div className="mb-16 max-w-2xl">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 text-[#70BEFA] text-sm font-mono tracking-wider">
                <div className="w-2 h-2 bg-[#70BEFA] rounded-sm"></div>
                INTERACTIVE COURSE
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Write prompts
              <br />
              <span className="text-[#70BEFA]">that actually work</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Most people write vague prompts and get vague results. This course teaches you the three principles that change everything.
            </p>
          </div>

          {/* Asymmetric grid layout */}
          <div className="grid md:grid-cols-12 gap-6 mb-16">
            {/* Left side - Course info */}
            <div className="md:col-span-7 space-y-6">
              <Card className="bg-[#1A1A1A] border-l-4 border-l-[#70BEFA] border-r-0 border-t-0 border-b-0 rounded-none rounded-r-lg">
                <CardContent className="p-6">
                  <h3 className="text-sm font-mono text-[#70BEFA] mb-4 tracking-wider">THE THREE PRINCIPLES</h3>
                  <div className="space-y-4">
                    <div className="border-l-2 border-gray-700 pl-4 hover:border-[#70BEFA] transition-colors">
                      <h4 className="text-white font-semibold mb-1">Break it down</h4>
                      <p className="text-gray-400 text-sm">One clear step beats ten vague instructions</p>
                    </div>
                    <div className="border-l-2 border-gray-700 pl-4 hover:border-[#70BEFA] transition-colors">
                      <h4 className="text-white font-semibold mb-1">Be specific</h4>
                      <p className="text-gray-400 text-sm">Details eliminate guesswork and assumptions</p>
                    </div>
                    <div className="border-l-2 border-gray-700 pl-4 hover:border-[#70BEFA] transition-colors">
                      <h4 className="text-white font-semibold mb-1">Iterate quickly</h4>
                      <p className="text-gray-400 text-sm">Fix mistakes immediately, don't wait</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1A1A1A] border-[#70BEFA]/20">
                <CardContent className="p-6">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    You'll write real prompts and see actual AI responses. When you mess up (and you will), you'll learn exactly why it happened and how to fix it.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Book className="w-4 h-4" />3 lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />4 exercises
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-4 h-4" />~30 min
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right side - CTA */}
            <div className="md:col-span-5">
              <Card className="bg-[#70BEFA] border-0 sticky top-8">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="text-5xl font-bold text-black mb-2">210</div>
                    <div className="text-black/70 text-sm">points to earn</div>
                  </div>
                  <Separator className="my-6 bg-black/20" />
                  <Button
                    onClick={handleStart}
                    size="lg"
                    className="w-full bg-black text-white hover:bg-black/90 font-semibold py-6 group"
                  >
                    Start course
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-black/60 text-xs mt-4 text-center">Free • No signup required</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'complete') {
    const completionDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    return (
      <div className="min-h-screen bg-[#0D0D0D] p-4 md:p-8">
        <div className="max-w-5xl mx-auto pt-12">
          {showNameInput && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-[#1A1A1A] rounded-2xl p-8 max-w-md w-full shadow-2xl border border-[#70BEFA]/30">
                <h3 className="text-2xl font-bold text-white mb-4">Enter Your Name for Certificate</h3>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full p-4 bg-[#0D0D0D] border-2 border-[#70BEFA]/30 text-white rounded-xl focus:border-[#70BEFA] focus:outline-none mb-6"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowNameInput(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-600 rounded-xl font-semibold text-gray-300 hover:bg-gray-700/50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (userName.trim()) {
                        setShowNameInput(false);
                      }
                    }}
                    disabled={!userName.trim()}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#70BEFA] to-[#5AAFED] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#70BEFA]/50 disabled:opacity-50 transition-all"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto mb-16">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-[#70BEFA] rounded-sm"></div>
                <span className="text-sm font-mono text-[#70BEFA] tracking-wider">COURSE COMPLETED</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                You did it.
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl">You've learned the fundamentals of effective AI prompting</p>
            </div>
          </div>

          {/* Social Media Share Card - Beautiful Design with Orb Hero */}
          <div className="relative mb-8 mx-auto w-full max-w-2xl px-4 sm:px-0">
            {/* Outer glow effect for the card */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#70BEFA]/20 via-transparent to-[#70BEFA]/20 rounded-3xl blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>

            {/* Animated floating particles */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <radialGradient id="particleGlow">
                  <stop offset="0%" stopColor="#70BEFA" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#70BEFA" stopOpacity="0"/>
                </radialGradient>
              </defs>

              {/* Floating particles with different animations */}
              <circle cx="10%" cy="20%" r="2" fill="url(#particleGlow)">
                <animate attributeName="cy" from="20%" to="80%" dur="8s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;0" dur="8s" repeatCount="indefinite"/>
              </circle>
              <circle cx="90%" cy="70%" r="3" fill="url(#particleGlow)">
                <animate attributeName="cy" from="70%" to="10%" dur="10s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;0" dur="10s" repeatCount="indefinite"/>
              </circle>
              <circle cx="30%" cy="90%" r="2.5" fill="url(#particleGlow)">
                <animate attributeName="cy" from="90%" to="30%" dur="12s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;0" dur="12s" repeatCount="indefinite"/>
              </circle>
              <circle cx="70%" cy="40%" r="2" fill="url(#particleGlow)">
                <animate attributeName="cy" from="40%" to="85%" dur="9s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;0" dur="9s" repeatCount="indefinite"/>
              </circle>
              <circle cx="50%" cy="15%" r="3" fill="url(#particleGlow)">
                <animate attributeName="cy" from="15%" to="95%" dur="11s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;0" dur="11s" repeatCount="indefinite"/>
              </circle>

              {/* Rotating ring animation */}
              <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#70BEFA" strokeWidth="0.5" opacity="0.2">
                <animate attributeName="r" from="40%" to="50%" dur="6s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.4;0.1;0.4" dur="6s" repeatCount="indefinite"/>
              </circle>
            </svg>

            <motion.div
              ref={certificateRef}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="relative bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] border-2 border-[#70BEFA] rounded-3xl overflow-hidden shadow-2xl shadow-[#70BEFA]/30"
              style={{ zIndex: 2 }}
            >
            {/* Grid Background Pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(112, 190, 250, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(112, 190, 250, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            ></div>

            {/* Radial gradient spotlight behind orb */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 rounded-full opacity-40 blur-3xl"
              style={{
                background: `radial-gradient(circle, ${userShape?.colors.primary || '#70BEFA'}90 0%, transparent 70%)`
              }}
            ></div>

            {/* Animated corner accents */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#70BEFA]/50 rounded-tl-lg"></div>
              <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#70BEFA]/50 rounded-tr-lg"></div>
              <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#70BEFA]/50 rounded-bl-lg"></div>
              <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#70BEFA]/50 rounded-br-lg"></div>
            </div>

            {/* Hero Section - Orb Takes Center Stage */}
            <div className="relative z-10 bg-gradient-to-b from-black/50 via-black/30 to-transparent flex flex-col items-center justify-center gap-4 pt-12 pb-10">
              {/* Large Prominent Orb */}
              <div className="flex-shrink-0">
                <CertificateShape shapeConfig={userShape} size="large" />
              </div>

              {/* Shape Name Badge */}
              {userShape && (
                <div className="px-5 py-2 bg-gradient-to-r from-[#0D0D0D]/90 to-[#1A1A1A]/90 border border-[#70BEFA]/50 rounded-full backdrop-blur-md shadow-lg shadow-[#70BEFA]/20">
                  <p className="text-sm font-mono text-[#70BEFA] tracking-[0.2em] font-bold">
                    {userShape.name.toUpperCase()}
                  </p>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="relative z-10 px-4 sm:px-8 pb-6 sm:pb-10 space-y-4 sm:space-y-6">
              {/* Main Message */}
              <div className="text-center space-y-1 sm:space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
                  Course Complete!
                </h2>
                {userName && (
                  <p className="text-base sm:text-lg md:text-xl font-bold text-[#70BEFA]">{userName}</p>
                )}
              </div>

              {/* Stats - Beautiful Spacing */}
              <div className="flex justify-center gap-3 sm:gap-6 py-2 sm:py-4">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#70BEFA] font-mono">{score}</div>
                  <div className="text-[10px] sm:text-xs text-gray-400 font-mono tracking-wider mt-1">POINTS</div>
                </div>
                <div className="text-center border-l border-r border-gray-700/50 px-3 sm:px-6">
                  <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{completedLessons.length}</div>
                  <div className="text-[10px] sm:text-xs text-gray-400 font-mono tracking-wider mt-1">LESSONS</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#70BEFA] font-mono">100%</div>
                  <div className="text-[10px] sm:text-xs text-gray-400 font-mono tracking-wider mt-1">COMPLETE</div>
                </div>
              </div>

              {/* Achievement badges - Better Visual Hierarchy */}
              <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0D0D0D] border border-[#70BEFA]/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg shadow-[#70BEFA]/10">
                  <CheckCircle className="w-4 h-4 text-[#70BEFA]" />
                  <span className="text-xs font-mono text-gray-300 tracking-wider">CLARITY</span>
                </div>
                <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0D0D0D] border border-[#70BEFA]/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg shadow-[#70BEFA]/10">
                  <Target className="w-4 h-4 text-[#70BEFA]" />
                  <span className="text-xs font-mono text-gray-300 tracking-wider">SPECIFICITY</span>
                </div>
                <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0D0D0D] border border-[#70BEFA]/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg shadow-[#70BEFA]/10">
                  <Zap className="w-4 h-4 text-[#70BEFA]" />
                  <span className="text-xs font-mono text-gray-300 tracking-wider">ITERATION</span>
                </div>
              </div>

              {/* Branding Footer - Elegant Separator */}
              <div className="border-t border-gray-800/50 pt-4 text-center space-y-1">
                <div className="text-base font-bold text-[#70BEFA] tracking-wide">Novagen Labs</div>
                <div className="text-xs text-gray-500 font-mono tracking-wider">AI PROMPT ENGINEERING</div>
              </div>

              {/* Call to Action - More Prominent */}
              <div className="bg-gradient-to-r from-[#70BEFA]/10 to-[#70BEFA]/5 border border-[#70BEFA]/30 rounded-xl p-4 text-center shadow-lg shadow-[#70BEFA]/10">
                <div className="text-xs text-gray-400 tracking-wider">Try it yourself:</div>
                <div className="text-sm font-bold text-[#70BEFA] font-mono tracking-wide mt-1">
                  learn2prompt.xyz
                </div>
                <div className="text-xs text-gray-500 mt-1">Beat my score! 🎯</div>
              </div>
            </div>
          </motion.div>
          </div>

          {/* Sharing Options */}
          <div className="bg-[#0D0D0D] border border-gray-800 rounded p-8 mb-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
              <span className="text-xs font-mono text-white tracking-wider">SHARE</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                onClick={downloadCertificate}
                variant="outline"
                className="flex items-center justify-center gap-2 bg-black text-white border-gray-800 hover:bg-[#70BEFA] hover:text-black hover:border-[#70BEFA] transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Download</span>
              </Button>
              <Button
                onClick={shareToTwitter}
                variant="outline"
                className="flex items-center justify-center gap-2 bg-black text-white border-gray-800 hover:bg-[#70BEFA] hover:text-black hover:border-[#70BEFA] transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Twitter</span>
              </Button>
              <Button
                onClick={shareToLinkedIn}
                variant="outline"
                className="flex items-center justify-center gap-2 bg-black text-white border-gray-800 hover:bg-[#70BEFA] hover:text-black hover:border-[#70BEFA] transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">LinkedIn</span>
              </Button>
              <Button
                onClick={shareCertificate}
                variant="outline"
                className="flex items-center justify-center gap-2 bg-black text-white border-gray-800 hover:bg-[#70BEFA] hover:text-black hover:border-[#70BEFA] transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </Button>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => {
                setCurrentScreen('welcome');
                setCurrentLesson(0);
                setScore(0);
                setCompletedLessons([]);
                setUserName('');
              }}
              size="lg"
              className="bg-black text-white border border-[#70BEFA]/30 hover:bg-[#70BEFA] hover:text-black transition-colors"
            >
              Start Over
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentLessonData = lessons[currentLesson];

  return (
    <div className="min-h-screen bg-[#0D0D0D] p-4 md:p-8">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Compact Header - Not centered */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#70BEFA] rounded-sm"></div>
            <span className="text-sm font-mono text-[#70BEFA] tracking-wider">
              LESSON {currentLesson + 1}/{lessons.length}
            </span>
          </div>
          <Badge variant="outline" className="text-gray-400 border-gray-700 font-mono text-xs">
            {score} pts
          </Badge>
        </div>

        {/* Progress bar - enhanced with animation */}
        <div className="mb-12 space-y-2 relative">
          <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
            <span>{Math.round(progress)}% COMPLETE</span>
            <span>{completedLessons.length}/{lessons.length} LESSONS</span>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="origin-left relative"
          >
            <motion.div
              animate={showProgressCelebration ? {
                boxShadow: [
                  '0 0 0px rgba(112, 190, 250, 0)',
                  '0 0 15px rgba(112, 190, 250, 0.8)',
                  '0 0 0px rgba(112, 190, 250, 0)'
                ]
              } : {}}
              transition={{ duration: 0.8 }}
              className="rounded-full"
            >
              <Progress value={progress} className="h-2" />
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Breadcrumb Navigation - only visible on mobile */}
        <div className="md:hidden mb-6 overflow-x-auto">
          <div className="flex items-center gap-2 px-1 pb-2">
            {lessons.map((lesson, idx) => {
              const isPast = idx < currentLesson;
              const isCurrent = idx === currentLesson;
              const isNext = idx === currentLesson + 1;

              // Only show past lesson, current, and next
              if (idx === currentLesson - 1 || isCurrent || isNext) {
                return (
                  <React.Fragment key={idx}>
                    {idx === currentLesson - 1 && idx > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="text-gray-600 text-xs">...</div>
                        <ArrowRight className="w-3 h-3 text-gray-700" />
                      </div>
                    )}
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border whitespace-nowrap transition-all ${
                        isCurrent
                          ? 'bg-[#70BEFA]/10 border-[#70BEFA] text-[#70BEFA]'
                          : isPast
                          ? 'bg-[#0D0D0D] border-gray-800 text-gray-500'
                          : 'bg-[#0D0D0D] border-gray-800 text-gray-600'
                      }`}
                    >
                      {isPast && <CheckCircle className="w-3 h-3" />}
                      <span className="text-xs font-mono">{String(idx + 1).padStart(2, '0')}</span>
                      {isCurrent && <span className="text-xs font-medium truncate max-w-[120px]">{lesson.title}</span>}
                    </div>
                    {!isNext && idx < lessons.length - 1 && (
                      <ArrowRight className={`w-3 h-3 ${isCurrent ? 'text-gray-700' : 'text-gray-800'}`} />
                    )}
                  </React.Fragment>
                );
              }
              return null;
            })}
            {currentLesson < lessons.length - 2 && (
              <div className="text-gray-600 text-xs">...</div>
            )}
          </div>
        </div>

        {/* Asymmetric Grid Layout */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Main Content - 8 columns */}
          <div className="md:col-span-8 space-y-8">
            {/* Title - Left aligned, no card */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight tracking-tight">
                {currentLessonData.title}
              </h1>
              <Separator className="mb-0 bg-gray-800" />
            </div>

          {currentLessonData.type === 'lesson' ? (
            <div className="space-y-8">
              {/* Lesson content in card with left accent */}
              <Card className="bg-[#0D0D0D] border-l-4 border-l-[#70BEFA] border-r-0 border-t-0 border-b-0 rounded-none rounded-r-xl">
                <CardContent className="p-6">
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    {currentLessonData.content}
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleNext}
                size="lg"
                className="bg-black text-white border border-[#70BEFA]/30 hover:bg-[#70BEFA] hover:text-black transition-all duration-200 group"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Scenario - left accent card */}
              <Card className="bg-[#0D0D0D] border-l-4 border-l-[#70BEFA] border-r-0 border-t-0 border-b-0 rounded-none rounded-r-xl">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-[#70BEFA] rounded-sm"></div>
                    <span className="text-xs font-mono text-[#70BEFA] tracking-wider">SCENARIO</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{currentLessonData.scenario}</p>
                  <div className="pt-2 border-t border-gray-800">
                    <p className="text-sm text-gray-400 font-medium">{currentLessonData.task}</p>
                  </div>

                  {currentLessonData.salesData && (
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                        <span className="text-xs font-mono text-white tracking-wider">DATA</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {currentLessonData.salesData.map((item, idx) => (
                          <div key={idx} className="bg-[#1A1A1A] p-4 rounded border border-gray-800 hover:border-[#70BEFA]/30 transition-colors">
                            <div className="text-xs font-mono text-gray-400 mb-2">{item.quarter}</div>
                            <div className="text-2xl font-bold text-white">
                              ${item.sales.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentLessonData.mockBadResponse && (
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-sm"></div>
                        <span className="text-xs font-mono text-orange-400 tracking-wider">AI'S PREVIOUS RESPONSE</span>
                      </div>
                      <div className="bg-orange-950/20 border border-orange-500/30 p-4 rounded">
                        <p className="text-gray-300 text-sm leading-relaxed">{currentLessonData.mockBadResponse}</p>
                      </div>
                      <p className="text-xs text-gray-500 italic">This response needs correction!</p>
                    </div>
                  )}

                  {/* Difficulty Selector for Exercise 5 */}
                  {currentLessonData.hasDifficultyModes && (
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1.5 h-1.5 bg-[#70BEFA] rounded-sm"></div>
                        <span className="text-xs font-mono text-[#70BEFA] tracking-wider">SELECT DIFFICULTY</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Easy Mode Button */}
                        <button
                          onClick={() => setExerciseDifficulty('easy')}
                          className={`group relative p-6 rounded-lg border-2 transition-all ${
                            exerciseDifficulty === 'easy'
                              ? 'bg-green-950/30 border-green-500 border-l-4'
                              : 'bg-[#1A1A1A] border-gray-700 hover:border-green-500/50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-lg font-bold text-white mb-1">Easy Mode</h4>
                              <Badge className="bg-green-600/20 text-green-300 border-green-500/30 text-xs">
                                Recommended
                              </Badge>
                            </div>
                            {exerciseDifficulty === 'easy' && (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            )}
                          </div>
                          <p className="text-sm text-gray-400">
                            Analyze simple meeting notes with clear action items.
                          </p>
                        </button>

                        {/* Hard Mode Button */}
                        <button
                          onClick={() => setExerciseDifficulty('hard')}
                          className={`group relative p-6 rounded-lg border-2 transition-all ${
                            exerciseDifficulty === 'hard'
                              ? 'bg-orange-950/30 border-orange-500 border-l-4'
                              : 'bg-[#1A1A1A] border-gray-700 hover:border-orange-500/50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-lg font-bold text-white mb-1">Hard Mode</h4>
                              <Badge className="bg-orange-600/20 text-orange-300 border-orange-500/30 text-xs">
                                Challenge
                              </Badge>
                            </div>
                            {exerciseDifficulty === 'hard' && (
                              <CheckCircle className="w-5 h-5 text-orange-400" />
                            )}
                          </div>
                          <p className="text-sm text-gray-400">
                            Upload and analyze comprehensive business reports.
                          </p>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Easy Mode Document Display */}
                  {currentLessonData.hasDifficultyModes && exerciseDifficulty === 'easy' && (
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-sm"></div>
                        <span className="text-xs font-mono text-green-400 tracking-wider">MEETING NOTES</span>
                      </div>

                      <div className="bg-green-950/20 border-l-4 border-green-500 border-r border-t border-b border-green-500/30 rounded-r-lg p-4 space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="w-5 h-5 text-green-400" />
                          <div>
                            <h4 className="text-sm font-semibold text-white">{easyModeDocument.title}</h4>
                            <p className="text-xs text-gray-400">{easyModeDocument.date} • {easyModeDocument.attendees.length} attendees</p>
                          </div>
                        </div>

                        <div className="bg-[#0D0D0D] border border-green-500/20 rounded p-3 space-y-3 text-sm">
                          <div>
                            <p className="text-xs font-mono text-green-400 mb-2">ATTENDEES</p>
                            <div className="flex flex-wrap gap-2">
                              {easyModeDocument.attendees.map((attendee, idx) => (
                                <span key={idx} className="text-xs bg-[#1A1A1A] border border-green-500/20 px-2 py-1 rounded text-gray-300">
                                  {attendee}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-mono text-green-400 mb-2">DISCUSSION POINTS</p>
                            <div className="space-y-1.5">
                              {easyModeDocument.content.map((item, idx) => (
                                <p key={idx} className="text-xs text-gray-300">• {item}</p>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-mono text-green-400 mb-2">ACTION ITEMS</p>
                            <div className="space-y-1.5">
                              {easyModeDocument.actionItems.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <Target className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-xs text-gray-300">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                        <span className="text-xs font-mono text-white tracking-wider">WRITE YOUR PROMPT</span>
                      </div>
                    </div>
                  )}

                  {/* Hard Mode Document Upload Section */}
                  {currentLessonData.hasDifficultyModes && exerciseDifficulty === 'hard' && (
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-sm"></div>
                        <span className="text-xs font-mono text-orange-400 tracking-wider">STEP 1: UPLOAD DOCUMENT</span>
                      </div>

                      {!documentUploaded ? (
                        <Button
                          onClick={handleDocumentUpload}
                          disabled={uploadingDocument}
                          className="w-full bg-[#70BEFA] hover:bg-[#5AAFED] text-black font-semibold py-6 rounded-lg flex items-center justify-center gap-3 transition-all"
                        >
                          {uploadingDocument ? (
                            <>
                              <Loader className="w-5 h-5 animate-spin" />
                              <span>Uploading document...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-5 h-5" />
                              <span>Upload Business Report</span>
                            </>
                          )}
                        </Button>
                      ) : mockCompanyData && (
                        <div className="bg-[#70BEFA]/10 border border-[#70BEFA]/30 rounded-lg p-4 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#70BEFA] rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-black" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-white">{mockCompanyData.name} - Business Report</p>
                              <p className="text-xs text-gray-400">10 pages • Uploaded successfully</p>
                            </div>
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          </div>

                          <Separator className="bg-[#70BEFA]/20" />

                          <div className="space-y-2">
                            <p className="text-xs font-mono text-[#70BEFA] tracking-wider">DOCUMENT CONTENTS</p>
                            <div className="bg-[#0D0D0D] border border-[#70BEFA]/20 rounded p-3 space-y-2 text-xs text-gray-300">
                              <p><span className="text-[#70BEFA] font-semibold">Company:</span> {mockCompanyData.name}</p>
                              <p><span className="text-[#70BEFA] font-semibold">Industry:</span> {mockCompanyData.industry}</p>
                              <p><span className="text-[#70BEFA] font-semibold">Employees:</span> {mockCompanyData.employees}</p>
                              <p><span className="text-[#70BEFA] font-semibold">Revenue:</span> {mockCompanyData.revenue} (Growth: {mockCompanyData.quarterlyGrowth})</p>
                              <p><span className="text-[#70BEFA] font-semibold">Key Projects:</span></p>
                              <ul className="ml-4 space-y-1">
                                {mockCompanyData.keyProjects.map((project, idx) => (
                                  <li key={idx} className="text-xs">• {project}</li>
                                ))}
                              </ul>
                              <p><span className="text-[#70BEFA] font-semibold">Quarterly Sales:</span> Q1: {mockCompanyData.salesData.q1}, Q2: {mockCompanyData.salesData.q2}, Q3: {mockCompanyData.salesData.q3}, Q4: {mockCompanyData.salesData.q4}</p>
                              <p><span className="text-[#70BEFA] font-semibold">Marketing:</span> Budget: {mockCompanyData.marketing.budget}, Leads: {mockCompanyData.marketing.leads}, Conversion: {mockCompanyData.marketing.conversionRate}</p>
                              <p><span className="text-[#70BEFA] font-semibold">Key Challenges:</span></p>
                              <ul className="ml-4 space-y-1">
                                {mockCompanyData.challenges.map((challenge, idx) => (
                                  <li key={idx} className="text-xs">• {challenge}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {documentUploaded && (
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                          <span className="text-xs font-mono text-white tracking-wider">STEP 2: WRITE YOUR PROMPT</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Campaign Brief Section */}
                  {currentLessonData.requiresCampaignBrief && (
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-sm"></div>
                        <span className="text-xs font-mono text-purple-400 tracking-wider">STEP 1: LOAD CAMPAIGN BRIEF</span>
                      </div>

                      {!campaignBriefLoaded ? (
                        <Button
                          onClick={handleLoadCampaignBrief}
                          disabled={loadingCampaignBrief}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6 rounded-lg flex items-center justify-center gap-3 transition-all"
                        >
                          {loadingCampaignBrief ? (
                            <>
                              <Loader className="w-5 h-5 animate-spin" />
                              <span>Loading campaign brief...</span>
                            </>
                          ) : (
                            <>
                              <Mail className="w-5 h-5" />
                              <span>Load Campaign Brief</span>
                            </>
                          )}
                        </Button>
                      ) : mockCampaignData && (
                        <div className="space-y-4">
                          {/* Email Preview Card */}
                          <div className="bg-purple-950/20 border-l-4 border-purple-500 border-r border-t border-b border-purple-500/30 rounded-r-lg p-4 space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-purple-600 rounded flex items-center justify-center flex-shrink-0">
                                <Mail className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white">New Campaign Brief from {mockCampaignData.clientName}</p>
                                <p className="text-xs text-gray-400">{mockCampaignData.clientRole} • {mockCampaignData.companyName}</p>
                              </div>
                            </div>

                            <div className="bg-[#0D0D0D] border border-purple-500/20 rounded p-3 space-y-3 text-sm text-gray-300">
                              <div className="border-b border-purple-500/20 pb-2">
                                <span className="text-purple-400 font-semibold">Product Launch: </span>
                                <span className="text-white">{mockCampaignData.productLaunch}</span>
                              </div>

                              {/* Asymmetric Grid for Campaign Details */}
                              <div className="grid grid-cols-2 gap-3">
                                <div className="col-span-2 bg-purple-950/30 border-l-2 border-purple-500 p-3 rounded-r">
                                  <p className="text-xs font-mono text-purple-400 mb-1">TARGET AUDIENCE</p>
                                  <p className="text-xs text-gray-300">{mockCampaignData.targetAudience.primary}</p>
                                  <p className="text-xs text-gray-400 mt-1">{mockCampaignData.targetAudience.secondary}</p>
                                </div>

                                <div className="bg-[#1A1A1A] border border-purple-500/20 p-2 rounded">
                                  <p className="text-xs font-mono text-purple-400">BUDGET</p>
                                  <p className="text-lg font-bold text-white">{mockCampaignData.budget}</p>
                                </div>

                                <div className="bg-[#1A1A1A] border border-purple-500/20 p-2 rounded">
                                  <p className="text-xs font-mono text-purple-400">TIMELINE</p>
                                  <p className="text-xs font-semibold text-white mt-1">{mockCampaignData.timeline}</p>
                                </div>
                              </div>

                              <div>
                                <p className="text-xs font-mono text-purple-400 mb-2">CAMPAIGN GOALS</p>
                                <div className="space-y-1">
                                  {mockCampaignData.campaignGoals.map((goal, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                      <Target className="w-3 h-3 text-purple-500 flex-shrink-0 mt-0.5" />
                                      <span className="text-xs text-gray-300">{goal}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <p className="text-xs font-mono text-purple-400 mb-2">KEY MESSAGES</p>
                                <div className="flex flex-wrap gap-2">
                                  {mockCampaignData.keyMessages.map((msg, idx) => (
                                    <Badge key={idx} className="bg-purple-600/20 text-purple-300 border-purple-500/30 text-xs">
                                      {msg}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <p className="text-xs font-mono text-purple-400 mb-1">CHANNELS</p>
                                <div className="flex flex-wrap gap-2">
                                  {mockCampaignData.channels.map((channel, idx) => (
                                    <span key={idx} className="text-xs bg-[#1A1A1A] border border-purple-500/20 px-2 py-1 rounded">
                                      {channel}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="bg-orange-950/20 border-l-2 border-orange-500 p-2 rounded-r">
                                <p className="text-xs font-mono text-orange-400 mb-1">COMPETITIVE EDGE</p>
                                <p className="text-xs text-gray-300 italic">{mockCampaignData.competitorInsight}</p>
                              </div>
                            </div>
                          </div>

                          {campaignBriefLoaded && (
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                              <span className="text-xs font-mono text-white tracking-wider">STEP 2: WRITE YOUR CREATIVE PROMPT</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Analytics Dashboard Section */}
                  {currentLessonData.requiresAnalytics && (
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-sm"></div>
                        <span className="text-xs font-mono text-green-400 tracking-wider">STEP 1: LOAD BUSINESS ANALYTICS</span>
                      </div>

                      {!analyticsLoaded ? (
                        <Button
                          onClick={handleLoadAnalytics}
                          disabled={loadingAnalytics}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 rounded-lg flex items-center justify-center gap-3 transition-all"
                        >
                          {loadingAnalytics ? (
                            <>
                              <Loader className="w-5 h-5 animate-spin" />
                              <span>Loading analytics dashboard...</span>
                            </>
                          ) : (
                            <>
                              <BarChart2 className="w-5 h-5" />
                              <span>Load Analytics Dashboard</span>
                            </>
                          )}
                        </Button>
                      ) : mockAnalyticsData ? (
                        <div className="space-y-4">
                          {/* Dashboard Header */}
                          <div className="bg-green-950/20 border-l-4 border-green-500 border-r border-t border-b border-green-500/30 rounded-r-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-bold text-white">{mockAnalyticsData.companyName}</h3>
                              <Badge className="bg-green-600/20 text-green-300 border-green-500/30">{mockAnalyticsData.period}</Badge>
                            </div>
                            <p className="text-xs text-gray-400">Cross-Department Performance Dashboard</p>
                          </div>

                          {/* Asymmetric Stats Grid: 2-1-2-1 Layout */}
                          <div className="grid grid-cols-3 gap-3">
                            {/* Sales - Wide Card */}
                            <div className="col-span-2 bg-[#0D0D0D] border-l-4 border-green-500 border-r border-t border-b border-green-500/30 rounded-r p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-4 h-4 text-green-400" />
                                <span className="text-xs font-mono text-green-400">SALES</span>
                              </div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-white">{mockAnalyticsData.departments.sales.revenue}</span>
                                <span className="text-sm text-green-400">{mockAnalyticsData.departments.sales.growth}</span>
                              </div>
                              <div className="mt-2 space-y-1">
                                <p className="text-xs text-gray-400">Top: {mockAnalyticsData.departments.sales.topProducts[0].name}</p>
                                <p className="text-xs text-gray-500">{mockAnalyticsData.departments.sales.salesTeam.reps} reps • {mockAnalyticsData.departments.sales.salesTeam.avgDealsPerRep} avg deals</p>
                              </div>
                            </div>

                            {/* Marketing - Narrow Card */}
                            <div className="col-span-1 bg-[#0D0D0D] border-l-4 border-purple-500 border-r border-t border-b border-purple-500/30 rounded-r p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-4 h-4 text-purple-400" />
                                <span className="text-xs font-mono text-purple-400">MARKETING</span>
                              </div>
                              <div className="text-lg font-bold text-white">{mockAnalyticsData.departments.marketing.spent}</div>
                              <p className="text-xs text-gray-400 mt-1">of {mockAnalyticsData.departments.marketing.budget}</p>
                              <p className="text-xs text-purple-400 mt-2">Best ROI: {mockAnalyticsData.departments.marketing.campaigns[0].roi}</p>
                            </div>

                            {/* Accounting - Wide Card */}
                            <div className="col-span-2 bg-[#0D0D0D] border-l-4 border-orange-500 border-r border-t border-b border-orange-500/30 rounded-r p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="w-4 h-4 text-orange-400" />
                                <span className="text-xs font-mono text-orange-400">ACCOUNTING</span>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <div>
                                  <p className="text-xs text-gray-400">Revenue</p>
                                  <p className="text-sm font-bold text-white">{mockAnalyticsData.departments.accounting.revenue}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400">Profit</p>
                                  <p className="text-sm font-bold text-green-400">{mockAnalyticsData.departments.accounting.profit}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400">Margin</p>
                                  <p className="text-sm font-bold text-white">{mockAnalyticsData.departments.accounting.profitMargin}</p>
                                </div>
                              </div>
                              <p className="text-xs text-orange-400 mt-2">Outstanding: {typeof mockAnalyticsData.departments.accounting.outstandingInvoices === 'object'
                                ? `${mockAnalyticsData.departments.accounting.outstandingInvoices.amount} (avg ${mockAnalyticsData.departments.accounting.outstandingInvoices.avgDays} days)`
                                : mockAnalyticsData.departments.accounting.outstandingInvoices}</p>
                            </div>

                            {/* Operations - Narrow Card */}
                            <div className="col-span-1 bg-[#0D0D0D] border-l-4 border-blue-500 border-r border-t border-b border-blue-500/30 rounded-r p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Users className="w-4 h-4 text-blue-400" />
                                <span className="text-xs font-mono text-blue-400">OPERATIONS</span>
                              </div>
                              <div className="text-lg font-bold text-white">{mockAnalyticsData.departments.operations.productivity}</div>
                              {(mockAnalyticsData.departments.operations.team?.employees || mockAnalyticsData.departments.operations.teamMetrics?.employeeCount) && (
                                <p className="text-xs text-gray-400 mt-1">
                                  {mockAnalyticsData.departments.operations.team?.employees || mockAnalyticsData.departments.operations.teamMetrics?.employeeCount} employees
                                </p>
                              )}
                              {(mockAnalyticsData.departments.operations.team?.satisfaction || mockAnalyticsData.departments.operations.teamMetrics?.satisfactionScore) && (
                                <p className="text-xs text-blue-400 mt-2">
                                  Satisfaction: {mockAnalyticsData.departments.operations.team?.satisfaction || mockAnalyticsData.departments.operations.teamMetrics?.satisfactionScore}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Insights and Concerns */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-green-950/20 border border-green-500/30 rounded p-3">
                              <p className="text-xs font-mono text-green-400 mb-2 flex items-center gap-2">
                                <CheckCircle className="w-3 h-3" />
                                KEY INSIGHTS
                              </p>
                              <div className="space-y-1.5">
                                {mockAnalyticsData.keyInsights.slice(0, 3).map((insight, idx) => (
                                  <p key={idx} className="text-xs text-gray-300">• {insight}</p>
                                ))}
                              </div>
                            </div>

                            <div className="bg-orange-950/20 border border-orange-500/30 rounded p-3">
                              <p className="text-xs font-mono text-orange-400 mb-2 flex items-center gap-2">
                                <AlertCircle className="w-3 h-3" />
                                CONCERNS
                              </p>
                              <div className="space-y-1.5">
                                {mockAnalyticsData.concerns.map((concern, idx) => (
                                  <p key={idx} className="text-xs text-gray-300">• {concern}</p>
                                ))}
                              </div>
                            </div>
                          </div>

                          {analyticsLoaded && (
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                              <span className="text-xs font-mono text-white tracking-wider">STEP 2: WRITE YOUR ANALYSIS PROMPT</span>
                            </div>
                          )}
                        </div>
                      ) : null}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Input Area */}
              {((!currentLessonData.requiresDocumentUpload && !currentLessonData.hasDifficultyModes) ||
                (currentLessonData.hasDifficultyModes && exerciseDifficulty === 'easy') ||
                (currentLessonData.hasDifficultyModes && exerciseDifficulty === 'hard' && documentUploaded) ||
                (!currentLessonData.hasDifficultyModes && documentUploaded)) &&
               (!currentLessonData.requiresCampaignBrief || campaignBriefLoaded) &&
               (!currentLessonData.requiresAnalytics || analyticsLoaded) && (
                <div className="space-y-3">
                  {!currentLessonData.requiresDocumentUpload && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                        <label className="text-xs font-mono text-white tracking-wider">
                          YOUR PROMPT
                        </label>
                      </div>

                      {/* Easy Mode Toggle */}
                      <button
                        onClick={() => {
                          setEasyModeEnabled(!easyModeEnabled);
                          if (easyModeEnabled) {
                            setUsedSuggestion(false);
                          }
                        }}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono transition-all ${
                          easyModeEnabled
                            ? 'bg-[#70BEFA]/20 text-[#70BEFA] border border-[#70BEFA]/30'
                            : 'bg-[#1A1A1A] text-gray-400 border border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <Zap className={`w-3 h-3 ${easyModeEnabled ? 'text-[#70BEFA]' : 'text-gray-500'}`} />
                        {easyModeEnabled ? 'Easy Mode: ON' : 'Easy Mode: OFF'}
                        <span className="text-[10px] opacity-70">(1/10 pts)</span>
                      </button>
                    </div>
                  )}

                  {/* Prompt Suggestions (Easy Mode) */}
                  {easyModeEnabled && PROMPT_SUGGESTIONS[currentLessonData.id] && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-[#70BEFA]" />
                        <span className="text-xs text-gray-400 font-mono">SUGGESTED PROMPTS</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {PROMPT_SUGGESTIONS[currentLessonData.id].map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setUserInput(suggestion);
                              setUsedSuggestion(true);
                            }}
                            className="text-left px-3 py-2 bg-[#1A1A1A] hover:bg-[#70BEFA]/10 border border-gray-800 hover:border-[#70BEFA]/30 rounded-lg text-xs text-gray-300 hover:text-white transition-all group"
                          >
                            <div className="flex items-start gap-2">
                              <span className="text-[#70BEFA] font-mono text-[10px] mt-0.5">#{index + 1}</span>
                              <span className="flex-1 line-clamp-2 group-hover:line-clamp-none">{suggestion}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                      {usedSuggestion && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-amber-950/20 border border-amber-500/30 rounded-lg">
                          <AlertCircle className="w-3 h-3 text-amber-400" />
                          <span className="text-xs text-amber-400 font-mono">
                            Using suggestions reduces your score to 1/10 of normal points
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <Textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-full bg-[#0D0D0D] border border-gray-800 text-white focus:border-[#70BEFA] focus:ring-0 min-h-[140px] placeholder-gray-600 rounded"
                    placeholder="Write your prompt here..."
                    disabled={isLoading}
                  />
                </div>
              )}

              {/* Generated Visualization */}
              {generatedChart && currentLessonData.salesData && (
                <DynamicChart config={generatedChart} data={currentLessonData.salesData} />
              )}

              {/* AI Response */}
              {(aiResponse || isStreaming) && (
                <Card className="bg-[#0D0D0D] border-l-0 border-r-0 border-t border-b border-gray-800 rounded-none">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                      <span className="text-xs font-mono text-white tracking-wider">RESPONSE</span>
                      {isStreaming && (
                        <span className="text-xs text-[#70BEFA] animate-pulse">● Streaming...</span>
                      )}
                    </div>
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({node, ...props}) => <p className="text-gray-300 leading-relaxed mb-4" {...props} />,
                          h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-white mt-6 mb-4" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-xl font-bold text-white mt-5 mb-3" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-lg font-bold text-white mt-4 mb-2" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4" {...props} />,
                          ol: ({node, ...props}: any) => <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4" {...props} />,
                          li: ({node, ...props}: any) => <li className="text-gray-300" {...props} />,
                          code: ({node, inline, ...props}: any) =>
                            inline ?
                              <code className="bg-[#1A1A1A] text-[#70BEFA] px-1.5 py-0.5 rounded text-sm font-mono" {...props} /> :
                              <code className="block bg-[#1A1A1A] text-[#70BEFA] p-4 rounded text-sm font-mono overflow-x-auto mb-4" {...props} />,
                          pre: ({node, ...props}: any) => <pre className="bg-[#1A1A1A] rounded p-4 mb-4 overflow-x-auto" {...props} />,
                          blockquote: ({node, ...props}: any) => <blockquote className="border-l-4 border-[#70BEFA] pl-4 italic text-gray-400 mb-4" {...props} />,
                          a: ({node, ...props}) => <a className="text-[#70BEFA] hover:underline" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                          em: ({node, ...props}) => <em className="italic text-gray-300" {...props} />,
                          hr: ({node, ...props}) => <hr className="border-gray-700 my-6" {...props} />,
                          table: ({node, ...props}) => <table className="min-w-full border-collapse border border-gray-700 mb-4" {...props} />,
                          thead: ({node, ...props}) => <thead className="bg-[#1A1A1A]" {...props} />,
                          tbody: ({node, ...props}) => <tbody {...props} />,
                          tr: ({node, ...props}) => <tr className="border-b border-gray-700" {...props} />,
                          th: ({node, ...props}) => <th className="border border-gray-700 px-4 py-2 text-left text-white font-semibold" {...props} />,
                          td: ({node, ...props}) => <td className="border border-gray-700 px-4 py-2 text-gray-300" {...props} />,
                        }}
                      >
                        {isStreaming ? streamingText : aiResponse}
                      </ReactMarkdown>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Evaluation */}
              {evaluation && (
                <Card className={`border-l-4 border-r-0 border-t-0 border-b-0 rounded-none rounded-r-xl ${
                  evaluation.passed
                    ? 'bg-[#0D0D0D] border-l-[#70BEFA]'
                    : 'bg-[#0D0D0D] border-l-orange-500'
                }`}>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          {evaluation.passed ? (
                            <CheckCircle className="w-5 h-5 text-[#70BEFA]" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-orange-400" />
                          )}
                          <span className="text-xs font-mono tracking-wider text-white">
                            {evaluation.passed ? 'PASSED' : 'NEEDS WORK'}
                          </span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{evaluation.mainFeedback}</p>
                      </div>
                      <div className="bg-[#1A1A1A] px-4 py-2 rounded border border-gray-800">
                        <span className="font-mono text-sm text-white">{evaluation.score}/10</span>
                      </div>
                    </div>

                    {evaluation.highlights && evaluation.highlights.length > 0 && (
                      <div className="border-t border-gray-800 pt-4 space-y-2">
                        <span className="text-xs font-mono text-gray-400 tracking-wider">
                          {evaluation.passed ? 'HIGHLIGHTS' : 'WATCH OUT'}
                        </span>
                        <ul className="text-sm text-gray-400 space-y-2">
                          {evaluation.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#70BEFA] mt-1">—</span>
                              <span>"{highlight}"</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {evaluation.strengths && evaluation.strengths.length > 0 && (
                      <div className="border-t border-gray-800 pt-4 space-y-2">
                        <span className="text-xs font-mono text-gray-400 tracking-wider">STRENGTHS</span>
                        <ul className="text-sm text-gray-400 space-y-2">
                          {evaluation.strengths.map((strength, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#70BEFA] mt-1">+</span>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {evaluation.weaknesses && evaluation.weaknesses.length > 0 && (
                      <div className="border-t border-gray-800 pt-4 space-y-2">
                        <span className="text-xs font-mono text-gray-400 tracking-wider">IMPROVE</span>
                        <ul className="text-sm text-gray-400 space-y-2">
                          {evaluation.weaknesses.map((weakness, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-orange-400 mt-1">—</span>
                              <span>{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {evaluation.nextSteps && (
                      <div className="border-t border-gray-800 pt-4 space-y-2">
                        <span className="text-xs font-mono text-gray-400 tracking-wider">NEXT STEP</span>
                        <p className="text-sm text-gray-300">{evaluation.nextSteps}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                {!evaluation ? (
                  <Button
                    onClick={handleSubmitExercise}
                    disabled={!userInput.trim() || isLoading}
                    size="lg"
                    className="flex-1 bg-[#70BEFA] text-black hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin mr-2" />
                        {currentLessonData.requiresVisualization
                          ? 'Generating...'
                          : 'Generating...'}
                      </>
                    ) : (
                      currentLessonData.requiresVisualization
                        ? 'Generate Visualization'
                        : 'Submit Prompt'
                    )}
                  </Button>
                ) : (
                  <>
                    {!evaluation.passed && (
                      <Button
                        onClick={handleTryAgain}
                        size="lg"
                        className="flex-1 bg-black text-white border border-orange-500 hover:bg-orange-500 hover:text-black transition-colors"
                      >
                        Try Again
                      </Button>
                    )}
                    <Button
                      onClick={handleNext}
                      size="lg"
                      className="flex-1 bg-black text-white border border-[#70BEFA]/30 hover:bg-[#70BEFA] hover:text-black transition-colors group"
                    >
                      <span>{evaluation.passed ? 'Continue' : 'Skip Lesson'}</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
          </div>

          {/* Sidebar - 4 columns */}
          <div className="md:col-span-4 space-y-6">
            {/* Hints Card */}
            {!evaluation && currentLessonData.hints && currentLessonData.type === 'exercise' && (
              <Card className="bg-[#0D0D0D] border border-gray-800 rounded sticky top-8">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                    <span className="text-xs font-mono text-white tracking-wider">HINTS</span>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-400">
                    {currentLessonData.hints.map((hint, idx) => (
                      <li key={idx} className="flex items-start gap-2 hover:text-gray-300 transition-colors">
                        <span className="text-[#70BEFA] mt-1 flex-shrink-0">—</span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Lesson Navigation */}
            <Card className="bg-[#0D0D0D] border border-gray-800 rounded">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                  <span className="text-xs font-mono text-white tracking-wider">LESSONS</span>
                </div>
                <div className="space-y-2">
                  {lessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      className={`text-sm p-2 border-l-2 pl-3 transition-colors ${
                        idx === currentLesson
                          ? 'border-[#70BEFA] text-white'
                          : idx < currentLesson
                          ? 'border-gray-800 text-gray-500'
                          : 'border-gray-800 text-gray-600'
                      }`}
                    >
                      <div className="font-mono text-xs mb-1">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div className="text-xs">{lesson.title}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Milestone Celebration - Appears in center briefly */}
      <AnimatePresence>
        {showMilestone && milestoneData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="max-w-md w-full"
            >
              <Card className="bg-[#0D0D0D] border-l-4 border-l-[#70BEFA] border-r border-t border-b border-[#70BEFA]/30 rounded-r-xl shadow-2xl">
                <CardContent className="p-6 space-y-4">
                  {/* Pulsating Blue Orb */}
                  <div className="flex justify-center">
                    <div className="relative w-24 h-24">
                      {/* Outer glow rings */}
                      <div className="absolute inset-0 rounded-full bg-[#70BEFA]/30 animate-ping" style={{animationDuration: '2s'}}></div>
                      <div className="absolute inset-2 rounded-full bg-[#70BEFA]/40 animate-pulse" style={{animationDuration: '1.5s'}}></div>
                      {/* Core orb with constant glow */}
                      <div className="absolute inset-6 rounded-full bg-[#70BEFA] shadow-[0_0_40px_rgba(112,190,250,0.8),0_0_80px_rgba(112,190,250,0.6),inset_0_0_20px_rgba(255,255,255,0.5)]"></div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {milestoneData.title}
                    </h3>
                    <Badge className="bg-[#70BEFA]/20 text-[#70BEFA] border-[#70BEFA]/30">
                      {milestoneData.badge}
                    </Badge>
                  </div>

                  {/* Message */}
                  <p className="text-gray-300 text-center text-sm leading-relaxed">
                    {milestoneData.message}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PromptEngineeringGame;
