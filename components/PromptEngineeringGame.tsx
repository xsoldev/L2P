'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, Star, Book, Zap, Target, Loader, AlertCircle, Download, Share2, Trophy, Sparkles, Upload, FileText, Mail, BarChart2, TrendingUp, DollarSign, Users, Globe } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createTranslator, getTranslations, type Language } from '@/lib/i18n';
import { useProgress, useGameState } from '@/components/hooks';
import { SHAPE_LIBRARY, getAllShapes, getRandomShape, findShapeById } from '@/lib/game/shape-library';
import { downloadCertificate as downloadCert, shareCertificate as shareCert } from '@/lib/game/certificate-actions';
import { generateMockCompany, generateMarketingCampaign, generateBusinessAnalytics, EASY_MODE_DOCUMENT } from '@/lib/game/data-generators';
import { evaluatePrompt as evaluatePromptAPI, generateAIResponse as generateAIResponseAPI, generateVisualization as generateVisualizationAPI } from '@/lib/game/evaluation';
import { AuthButton } from '@/components/features/auth/AuthButton';

const PromptEngineeringGame = () => {
  // Use custom hooks for state management
  const {
    currentScreen, setCurrentScreen,
    currentLesson, setCurrentLesson,
    score, setScore,
    completedLessons, setCompletedLessons,
    userName, setUserName,
    userShape, setUserShape,
    exerciseDifficulty, setExerciseDifficulty,
    language, setLanguage,
    isLoadingProgress,
    resetProgress
  } = useProgress();

  const {
    showNameInput, setShowNameInput,
    showResetDialog, setShowResetDialog,
    showProgressCelebration,
    showMilestone,
    milestoneData,
    easyModeEnabled, setEasyModeEnabled,
    checkMilestone,
    celebrateProgress
  } = useGameState();

  // Local component state (not persisted)
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [exerciseAttempts, setExerciseAttempts] = useState(0);
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
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [usedSuggestion, setUsedSuggestion] = useState(false);
  const [pendingPoints, setPendingPoints] = useState(0); // Points earned but not yet added to score

  // Get the shape object from userShape ID
  const userShapeObj = userShape ? findShapeById(userShape) : null;

  // Create translator function based on current language
  const t = createTranslator(language);

  // Get translations object and lessons array
  const translations = getTranslations(language);
  const translatedLessons = translations.lessons;

  // Scroll to top whenever lesson changes to fix mobile scroll issue
  useEffect(() => {
    if (currentScreen === 'lesson') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentLesson, currentScreen]);

  // Show name input when reaching certificate screen if name not yet provided
  useEffect(() => {
    if (currentScreen === 'certificate' && !userName.trim()) {
      setShowNameInput(true);
    }
  }, [currentScreen, userName]);

  // Dynamic Chart Component
  const DynamicChart = ({ config, data }: { config: any; data: any }) => {
    if (!config) return null;

    // Apple-esque chart colors
    const colors = config.colors || ['#007AFF', '#34C759', '#FF9500', '#AF52DE'];

    const renderChart = () => {
      switch (config.chartType) {
        case 'bar':
          return (
            <BarChart data={data}>
              {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />}
              <XAxis dataKey="label" label={{ value: config.xAxisLabel, position: 'insideBottom', offset: -5 }} stroke="var(--muted-foreground)" />
              <YAxis label={{ value: config.yAxisLabel, angle: -90, position: 'insideLeft' }} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--foreground)' }} />
              {config.showLegend && <Legend />}
              <Bar dataKey="sales" fill={colors[0]} radius={[8, 8, 0, 0]} label={config.showValues ? { position: 'top', fill: 'var(--foreground)' } : false} />
            </BarChart>
          );
        
        case 'line':
          return (
            <LineChart data={data}>
              {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />}
              <XAxis dataKey="label" label={{ value: config.xAxisLabel, position: 'insideBottom', offset: -5 }} stroke="var(--muted-foreground)" />
              <YAxis label={{ value: config.yAxisLabel, angle: -90, position: 'insideLeft' }} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--foreground)' }} />
              {config.showLegend && <Legend />}
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke={colors[0]} 
                strokeWidth={3}
                dot={{ fill: colors[0], r: 5, strokeWidth: 2, stroke: 'var(--background)' }}
                activeDot={{ r: 7 }}
                label={config.showValues ? { position: 'top', fill: 'var(--foreground)' } : false}
              />
            </LineChart>
          );
        
        case 'area':
          return (
            <AreaChart data={data}>
              {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />}
              <XAxis dataKey="label" label={{ value: config.xAxisLabel, position: 'insideBottom', offset: -5 }} stroke="var(--muted-foreground)" />
              <YAxis label={{ value: config.yAxisLabel, angle: -90, position: 'insideLeft' }} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--foreground)' }} />
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
                label={config.showValues ? { position: 'top', fill: 'var(--foreground)' } : false}
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
                stroke="var(--background)"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--foreground)' }} />
              {config.showLegend && <Legend />}
            </PieChart>
          );
        
        default:
          return <p className="text-muted-foreground">Unknown chart type</p>;
      }
    };

    return (
      <div className="bg-secondary border border-primary/30 rounded-2xl p-6 mb-6 shadow-lg shadow-primary/10">
        <h3 className="text-xl font-bold text-foreground mb-6 text-center">{config.title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          {renderChart()}
        </ResponsiveContainer>
        {config.interpretation && (
          <div className="mt-6 bg-background border border-primary/30 p-4 rounded-xl">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">AI's interpretation: </span>
              {config.interpretation}
            </p>
          </div>
        )}
      </div>
    );
  };

  // Certificate Shape Library - Multiple geometric variations with different colors

  // Prompt suggestions for Easy Mode - get from translations
  const PROMPT_SUGGESTIONS = translations.promptSuggestions;

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

  // Easy mode document data - imported from data-generators
  const easyModeDocument = EASY_MODE_DOCUMENT;

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

  const lessons = translatedLessons.map((lesson) => {
    // Handle lesson types with content (non-exercise lessons)
    if (lesson.type === 'lesson') {
      // Intro lesson
      if (lesson.id === 'intro') {
        return {
          id: lesson.id,
          title: lesson.title,
          type: lesson.type,
          content: (
            <div className="space-y-4">
              <div className="bg-red-950/20 border-l-4 border-red-500 p-4 rounded-xl">
                <p className="font-bold text-red-400 mb-2 flex items-center gap-2 text-sm">
                  <XCircle className="w-4 h-4" />
                  {lesson.vaguePromptLabel}
                </p>
                <p className="text-muted-foreground text-base italic font-medium">{lesson.vaguePromptExample}</p>
              </div>

              <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-500/30">
                <p className="font-bold text-amber-400 mb-2 text-sm">{lesson.whatAiMightDoLabel}</p>
                <ul className="space-y-1.5 text-muted-foreground text-sm">
                  {lesson.aiProblems.map((problem, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">—</span>
                      <span>{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-secondary/80 p-4 rounded-xl border border-primary/30">
                <p className="font-bold text-primary mb-2 flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4" />
                  {lesson.solutionLabel}
                </p>
                <p className="text-muted-foreground text-sm">{lesson.solutionText}</p>
              </div>
            </div>
          )
        };
      }
      
      // Lesson 1 - Break It Down
      if (lesson.id === 'lesson1') {
        return {
          id: lesson.id,
          title: lesson.title,
          type: lesson.type,
          content: (
            <div className="space-y-4">
              <div className="bg-secondary/80 p-4 rounded-xl border border-primary/30">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2 text-sm">
                  <Book className="w-4 h-4" />
                  {lesson.keyPrincipleLabel}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">{lesson.keyPrincipleText}</p>

                <div className="bg-secondary p-3 rounded-xl border border-primary/30">
                  <p className="font-semibold text-foreground mb-2 text-sm">{lesson.exampleLabel}</p>
                  <ol className="space-y-1.5 text-muted-foreground text-sm">
                    {lesson.exampleSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="font-bold text-primary min-w-[16px]">{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="bg-secondary p-4 rounded-xl border border-primary/30">
                <p className="font-bold text-primary mb-3 text-sm">{lesson.whyWorksLabel}</p>
                <div className="grid md:grid-cols-2 gap-2">
                  {lesson.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        };
      }
      
      // Lesson 2 - Be Specific
      if (lesson.id === 'lesson2') {
        return {
          id: lesson.id,
          title: lesson.title,
          type: lesson.type,
          content: (
            <div className="space-y-4">
              <div className="bg-secondary/80 p-4 rounded-xl border border-primary/30">
                <h3 className="font-bold text-primary mb-2 flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4" />
                  {lesson.keyPrincipleLabel}
                </h3>
                <p className="text-muted-foreground text-sm">{lesson.keyPrincipleText}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-red-950/20 p-4 rounded-xl border border-red-500/30">
                  <p className="font-bold text-red-400 mb-2 flex items-center gap-2 text-sm">
                    <XCircle className="w-4 h-4" />
                    {lesson.vagueLabel}
                  </p>
                  <p className="text-muted-foreground italic text-base mb-2">{lesson.vagueExample}</p>
                  <p className="text-xs text-muted-foreground">{lesson.vagueQuestion}</p>
                </div>

                <div className="bg-secondary/80 p-4 rounded-xl border border-primary/30">
                  <p className="font-bold text-primary mb-2 flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    {lesson.specificLabel}
                  </p>
                  <p className="text-muted-foreground italic text-base mb-2">{lesson.specificExample}</p>
                  <p className="text-xs text-muted-foreground">{lesson.specificNote}</p>
                </div>
              </div>

              <div className="bg-secondary p-4 rounded-xl border border-primary/30">
                <p className="font-bold text-foreground mb-3 text-sm">{lesson.specificsLabel}</p>
                <div className="space-y-2">
                  {lesson.specificTypes.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"></div>
                      <div className="text-sm">
                        <span className="font-semibold text-foreground">{item.type}</span>
                        <span className="text-muted-foreground ml-2">{item.example}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        };
      }
      
      // Lesson 3 - Iterate & Correct
      if (lesson.id === 'lesson3') {
        return {
          id: lesson.id,
          title: lesson.title,
          type: lesson.type,
          content: (
            <div className="space-y-4">
              <div className="bg-secondary/80 p-4 rounded-xl border border-primary/30">
                <h3 className="font-bold text-primary mb-2 flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4" />
                  {lesson.keyPrincipleLabel}
                </h3>
                <p className="text-muted-foreground text-sm">{lesson.keyPrincipleText}</p>
              </div>

              <div className="bg-secondary p-4 rounded-xl border border-primary/30">
                <p className="font-bold text-foreground mb-3 text-sm">{lesson.conversationLabel}</p>
                <div className="space-y-2">
                  <div className="bg-background p-3 rounded-xl border border-primary/30">
                    <p className="text-xs text-primary font-semibold mb-1">{lesson.conversationExample.userLabel}</p>
                    <p className="text-foreground text-sm">{lesson.conversationExample.userMessage}</p>
                  </div>

                  <div className="bg-background p-3 rounded-xl border border-border">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">{lesson.conversationExample.aiLabel}</p>
                    <p className="text-muted-foreground italic text-sm">{lesson.conversationExample.aiMessage}</p>
                  </div>

                  <div className="bg-background p-3 rounded-xl border border-primary/30">
                    <p className="text-xs text-primary font-semibold mb-1">{lesson.conversationExample.correctionLabel}</p>
                    <p className="text-foreground text-sm">{lesson.conversationExample.correctionMessage}</p>
                  </div>
                </div>
              </div>

              <div className="bg-secondary p-4 rounded-xl border border-primary/30">
                <p className="font-bold text-primary mb-2 text-sm">{lesson.correctionTipsLabel}</p>
                <div className="space-y-1.5">
                  {lesson.correctionTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        };
      }
      
      // Lesson 4 - Provide Examples
      if (lesson.id === 'lesson4') {
        return {
          id: lesson.id,
          title: lesson.title,
          type: lesson.type,
          content: (
            <div className="space-y-4">
              <div className="bg-secondary/80 p-4 rounded-xl border border-primary/30">
                <h3 className="font-bold text-primary mb-2 flex items-center gap-2 text-sm">
                  <Book className="w-4 h-4" />
                  {lesson.keyPrincipleLabel}
                </h3>
                <p className="text-muted-foreground text-sm">{lesson.keyPrincipleText}</p>
              </div>

              <div className="bg-secondary p-4 rounded-xl border border-primary/30">
                <p className="font-bold text-foreground mb-3 text-sm">{lesson.waysToProvideLabel}</p>
                <div className="space-y-2">
                  {lesson.exampleWays.map((way, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"></div>
                      <div className="text-sm">
                        <span className="font-semibold text-foreground">{way.type}</span>
                        <span className="text-muted-foreground ml-2">{way.example}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary p-4 rounded-xl border border-primary/30">
                <p className="font-bold text-primary mb-2 text-sm">{lesson.whyExamplesWorkLabel}</p>
                <div className="space-y-1.5">
                  {lesson.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        };
      }
      
      // Lesson 5 - Working with Documents
      if (lesson.id === 'lesson5') {
        return {
          id: lesson.id,
          title: lesson.title,
          type: lesson.type,
          content: (
            <div className="space-y-4">
              <div className="bg-secondary/80 p-4 rounded-xl border border-primary/30">
                <h3 className="font-bold text-primary mb-2 flex items-center gap-2 text-sm">
                  <Book className="w-4 h-4" />
                  {lesson.keyPrincipleLabel}
                </h3>
                <p className="text-muted-foreground text-sm">{lesson.keyPrincipleText}</p>
              </div>

              <div className="bg-secondary p-4 rounded-xl border border-primary/30">
                <p className="font-bold text-foreground mb-3 text-sm">{lesson.bestPracticesLabel}</p>
                <div className="space-y-2">
                  {lesson.bestPractices.map((practice, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"></div>
                      <div className="text-sm">
                        <span className="font-semibold text-foreground">{practice.type}</span>
                        <span className="text-muted-foreground ml-2">{practice.example}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary p-4 rounded-xl border border-primary/30">
                <p className="font-bold text-primary mb-2 text-sm">{lesson.mistakesToAvoidLabel}</p>
                <div className="space-y-1.5">
                  {lesson.commonMistakes.map((mistake, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{mistake}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        };
      }
    }
    
    // Handle exercise types
    if (lesson.type === 'exercise') {
      const exerciseObj: any = {
        id: lesson.id,
        title: lesson.title,
        type: lesson.type,
        scenario: lesson.scenario,
        task: lesson.task,
        evaluationCriteria: lesson.evaluationCriteria,
        hints: lesson.hints
      };

      // Exercise 2 specific properties
      if (lesson.id === 'exercise2') {
        exerciseObj.requiresVisualization = true;
        const quarterPrefix = language === 'fr' ? 'T' : 'Q';
        exerciseObj.salesData = [
          { quarter: `${quarterPrefix}1 2024`, sales: 45000, label: `${quarterPrefix}1` },
          { quarter: `${quarterPrefix}2 2024`, sales: 62000, label: `${quarterPrefix}2` },
          { quarter: `${quarterPrefix}3 2024`, sales: 58000, label: `${quarterPrefix}3` },
          { quarter: `${quarterPrefix}4 2024`, sales: 71000, label: `${quarterPrefix}4` }
        ];
      }

      // Exercise 3 specific properties
      if (lesson.id === 'exercise3') {
        exerciseObj.mockBadResponse = lesson.mockBadResponse;
      }

      // Exercise 4 specific properties
      if (lesson.id === 'exercise4') {
        exerciseObj.mockBadResponse = undefined;
        exerciseObj.enableWebSearch = true;
      }

      // Exercise 5 specific properties
      if (lesson.id === 'exercise5') {
        exerciseObj.mockBadResponse = undefined;
        exerciseObj.hasDifficultyModes = true;
        exerciseObj.requiresDocumentUpload = true;
      }

      // Exercise 6 specific properties
      if (lesson.id === 'exercise6') {
        exerciseObj.requiresCampaignBrief = true;
      }

      // Exercise 7 specific properties
      if (lesson.id === 'exercise7') {
        exerciseObj.requiresAnalytics = true;
      }

      return exerciseObj;
    }

    // Fallback for any unexpected lesson types
    return {
      id: lesson.id,
      title: lesson.title,
      type: lesson.type
    };
  });

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
          language: language,
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

6. NEVER provide code examples or code snippets in your response. Users are learning to write prompts, not to read code.

7. If the task involves creating a visualization or chart, simply describe what you would create based on the prompt, or acknowledge limitations if the prompt was vague.

Examples:
- Vague: "Write an email" → You might write an email but get the tone wrong, miss key details, or make assumptions
- Good: "Write a professional email to my manager. Start with 'Dear [Manager Name]', explain that I'm requesting time off, specify dates June 1-5, and close formally." → Respond appropriately
- Visualization: "Make a chart of sales" → Describe what chart you'd make or ask for clarification on missing details

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
          language: language,
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
          language: language,
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
        colors: ['#34C759'],
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

    let chartConfig = null;
    if (lesson.requiresVisualization && lesson.salesData) {
      chartConfig = await generateVisualization(userInput, lesson.salesData);
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

    // For visualization exercises, use the chart interpretation as the response
    // For other exercises, generate a text response
    let response;
    if (chartConfig && chartConfig.interpretation) {
      response = chartConfig.interpretation;
    } else {
      response = await generateAIResponse(userInput, contextWithDocument, lesson.enableWebSearch);
    }
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
      // Store pending points - will be added to score when user clicks Continue
      setPendingPoints(points);
    }

    setIsLoading(false);
  };

  const handleStart = () => {
    setCurrentScreen('lesson');
    setCurrentLesson(0);
  };

  const handleNext = () => {
    // Add pending points to score when completing the lesson
    if (pendingPoints > 0) {
      setScore(score + pendingPoints);
      setPendingPoints(0);
    }

    if (!completedLessons.includes(lessons[currentLesson].id)) {
      setCompletedLessons([...completedLessons, lessons[currentLesson].id]);
    }

    const currentLessonId = lessons[currentLesson].id;

    // Scroll to top for better UX on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger progress celebration
    celebrateProgress();

    // Check if this is a milestone (50% completion)
    checkMilestone(currentLessonId);

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
        setUserShape(randomShape.id);
      }
      setCurrentScreen('complete');
    }
  };

  const handleTryAgain = () => {
    setUserInput('');
    setAiResponse(null);
    setEvaluation(null);
    setGeneratedChart(null);
    setPendingPoints(0);
  };

  const downloadCertificate = async () => {
    if (certificateRef.current) {
      await downloadCert(certificateRef.current, userName, language);
    }
  };

  const shareCertificate = async () => {
    await shareCert(score, language);
  };

  const shareToTwitter = () => {
    const text = `I just completed the AI Prompt Engineering course and scored ${score} points! 🎓✨\n\nTry it yourself at learn2prompt.xyz`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://learn2prompt.xyz')}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleResetProgress = () => {
    setShowResetDialog(true);
  };

  const confirmReset = async () => {
    await resetProgress();
    setUserInput('');
    setAiResponse(null);
    setEvaluation(null);
    setExerciseAttempts(0);
    setShowResetDialog(false);
    toast.success(language === 'fr' ? 'Progression réinitialisée avec succès !' : 'Progress has been reset successfully!');
  };

  const progress = ((currentLesson + 1) / lessons.length) * 100;

  if (currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8 relative">
        {/* Auth Button - Top Right */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10">
          <AuthButton />
        </div>

        <div className="max-w-6xl mx-auto pt-12 md:pt-20">
          {/* Asymmetric header - left aligned */}
          <div className="mb-16 max-w-2xl">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 text-primary text-sm font-mono tracking-wider">
                <div className="w-2 h-2 bg-primary rounded-sm"></div>
                {t('welcome.badge')}
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
              {t('welcome.title')}
              <br />
              <span className="text-primary">{t('welcome.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('welcome.subtitle')}
            </p>
          </div>

          {/* Language Selector */}
          <div className="mb-12">
            <div className="flex gap-3 max-w-md">
              <Button
                onClick={() => setLanguage('en')}
                variant={language === 'en' ? 'default' : 'outline'}
                className={language === 'en'
                  ? 'flex-1 bg-primary text-black hover:bg-primary/90 border-0'
                  : 'flex-1 bg-secondary border-border text-muted-foreground hover:bg-secondary/80 hover:border-primary/50'}
              >
                <Globe className="w-4 h-4 mr-2" />
                {t('ui.language.english')}
              </Button>
              <Button
                onClick={() => setLanguage('fr')}
                variant={language === 'fr' ? 'default' : 'outline'}
                className={language === 'fr'
                  ? 'flex-1 bg-primary text-black hover:bg-primary/90 border-0'
                  : 'flex-1 bg-secondary border-border text-muted-foreground hover:bg-secondary/80 hover:border-primary/50'}
              >
                <Globe className="w-4 h-4 mr-2" />
                {t('ui.language.french')}
              </Button>
            </div>
          </div>

          {/* Asymmetric grid layout */}
          <div className="grid md:grid-cols-12 gap-6 mb-16">
            {/* Left side - Course info */}
            <div className="md:col-span-7 space-y-6">
              <Card className="bg-secondary border-l-4 border-l-primary border-r-0 border-t-0 border-b-0 rounded-none rounded-r-lg">
                <CardContent className="p-6">
                  <h3 className="text-sm font-mono text-primary mb-4 tracking-wider">{t('welcome.principles.heading')}</h3>
                  <div className="space-y-4">
                    <div className="border-l-2 border-border pl-4 hover:border-primary transition-colors">
                      <h4 className="text-foreground font-semibold mb-1">{t('welcome.principles.breakItDown.title')}</h4>
                      <p className="text-muted-foreground text-sm">{t('welcome.principles.breakItDown.description')}</p>
                    </div>
                    <div className="border-l-2 border-border pl-4 hover:border-primary transition-colors">
                      <h4 className="text-foreground font-semibold mb-1">{t('welcome.principles.beSpecific.title')}</h4>
                      <p className="text-muted-foreground text-sm">{t('welcome.principles.beSpecific.description')}</p>
                    </div>
                    <div className="border-l-2 border-border pl-4 hover:border-primary transition-colors">
                      <h4 className="text-foreground font-semibold mb-1">{t('welcome.principles.iterateQuickly.title')}</h4>
                      <p className="text-muted-foreground text-sm">{t('welcome.principles.iterateQuickly.description')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary border-primary/20">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t('welcome.description')}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Book className="w-4 h-4" />{t('welcome.stats.lessons')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />{t('welcome.stats.exercises')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-4 h-4" />{t('welcome.stats.duration')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right side - CTA */}
            <div className="md:col-span-5">
              <Card className="bg-primary border-0 sticky top-8">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="text-5xl font-bold text-black mb-2">{t('welcome.pointsToEarn')}</div>
                    <div className="text-black/70 text-sm">{t('welcome.pointsLabel')}</div>
                  </div>
                  <Separator className="my-6 bg-black/20" />
                  <Button
                    onClick={handleStart}
                    size="lg"
                    className="w-full bg-black text-foreground hover:bg-black/90 font-semibold py-6 group"
                  >
                    {completedLessons.length > 0 ? t('welcome.cta.continue') : t('welcome.cta.start')}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  {completedLessons.length > 0 && (
                    <Button
                      onClick={handleResetProgress}
                      variant="outline"
                      size="sm"
                      className="w-full mt-3 border-black/20 text-black/60 hover:bg-black/5 text-xs"
                    >
                      {t('welcome.cta.reset')}
                    </Button>
                  )}
                  <p className="text-black/60 text-xs mt-4 text-center">{t('welcome.free')}</p>
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
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-5xl mx-auto pt-12">
          {showNameInput && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-secondary rounded-2xl p-8 max-w-md w-full shadow-2xl border border-primary/30">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {language === 'fr' ? 'Entrez votre nom' : 'Enter Your Name'}
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {language === 'fr'
                    ? 'Votre nom apparaîtra sur votre certificat'
                    : 'Your name will appear on your certificate'}
                </p>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder={t('ui.placeholders.fullName')}
                  className="w-full p-4 bg-background border-2 border-primary/30 text-foreground rounded-xl focus:border-primary focus:outline-none mb-6"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && userName.trim()) {
                      setShowNameInput(false);
                    }
                  }}
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowNameInput(false)}
                    className="flex-1 px-6 py-3 border-2 border-border rounded-xl font-semibold text-muted-foreground hover:bg-border/50 transition-colors"
                  >
                    {t('ui.buttons.cancel')}
                  </button>
                  <button
                    onClick={() => {
                      if (userName.trim()) {
                        setShowNameInput(false);
                      }
                    }}
                    disabled={!userName.trim()}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-foreground rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 transition-all"
                  >
                    {t('ui.buttons.confirm')}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto mb-16">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-primary rounded-sm"></div>
                <span className="text-sm font-mono text-primary tracking-wider">COURSE COMPLETED</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
                You did it.
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">You've learned the fundamentals of effective AI prompting</p>
            </div>
          </div>

          {/* Social Media Share Card - Beautiful Design with Orb Hero */}
          <div className="relative mb-8 mx-auto w-full max-w-2xl px-4 sm:px-0">
            {/* Outer glow effect for the card */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/20 rounded-3xl blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>

            {/* Animated floating particles */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <radialGradient id="particleGlow">
                  <stop offset="0%" stopColor="#007AFF" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#007AFF" stopOpacity="0"/>
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
              <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#007AFF" strokeWidth="0.5" opacity="0.2">
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
              className="relative bg-gradient-to-br from-background via-secondary to-background border-2 border-primary rounded-3xl overflow-hidden shadow-2xl shadow-primary/30"
              style={{ zIndex: 2 }}
            >
            {/* Grid Background Pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 122, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 122, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            ></div>

            {/* Radial gradient spotlight behind orb */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 rounded-full opacity-40 blur-3xl"
              style={{
                background: `radial-gradient(circle, ${userShapeObj?.colors.primary || '#007AFF'}90 0%, transparent 70%)`
              }}
            ></div>

            {/* Animated corner accents */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-primary/50 rounded-tl-lg"></div>
              <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-primary/50 rounded-tr-lg"></div>
              <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-primary/50 rounded-bl-lg"></div>
              <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-primary/50 rounded-br-lg"></div>
            </div>

            {/* Hero Section - Orb Takes Center Stage */}
            <div className="relative z-10 bg-gradient-to-b from-black/50 via-black/30 to-transparent flex flex-col items-center justify-center gap-4 pt-12 pb-10">
              {/* Large Prominent Orb */}
              <div className="flex-shrink-0">
                <CertificateShape shapeConfig={userShapeObj} size="large" />
              </div>

              {/* Shape Name Badge */}
              {userShapeObj && (
                <div className="px-5 py-2 bg-gradient-to-r from-background/90 to-secondary/90 border border-primary/50 rounded-full backdrop-blur-md shadow-lg shadow-primary/20">
                  <p className="text-sm font-mono text-primary tracking-[0.2em] font-bold">
                    {userShapeObj.name.toUpperCase()}
                  </p>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="relative z-10 px-4 sm:px-8 pb-6 sm:pb-10 space-y-4 sm:space-y-6">
              {/* Main Message */}
              <div className="text-center space-y-1 sm:space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight">
                  Course Complete!
                </h2>
                {userName && (
                  <p className="text-base sm:text-lg md:text-xl font-bold text-primary">{userName}</p>
                )}
              </div>

              {/* Stats - Compact Single Row */}
              <div className="flex justify-center items-center gap-2 sm:gap-4 py-2">
                <div className="flex items-center gap-1.5">
                  <div className="text-xl sm:text-2xl font-bold text-primary font-mono">{score}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">PTS</div>
                </div>
                <div className="w-px h-6 bg-border/50"></div>
                <div className="flex items-center gap-1.5">
                  <div className="text-xl sm:text-2xl font-bold text-foreground font-mono">{completedLessons.length}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">LESSONS</div>
                </div>
                <div className="w-px h-6 bg-border/50"></div>
                <div className="flex items-center gap-1.5">
                  <div className="text-xl sm:text-2xl font-bold text-primary font-mono">100%</div>
                </div>
              </div>

              {/* Achievement badge - Show best skill */}
              <div className="flex justify-center">
                {(() => {
                  // Determine best badge based on score
                  let badge, icon;
                  if (score >= 180) {
                    badge = 'ITERATION MASTER';
                    icon = <Zap className="w-4 h-4 text-primary" />;
                  } else if (score >= 160) {
                    badge = 'SPECIFICITY EXPERT';
                    icon = <Target className="w-4 h-4 text-primary" />;
                  } else {
                    badge = 'CLARITY CHAMPION';
                    icon = <CheckCircle className="w-4 h-4 text-primary" />;
                  }

                  return (
                    <div className="bg-gradient-to-r from-secondary to-background border border-primary/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg shadow-primary/10">
                      {icon}
                      <span className="text-xs font-mono text-muted-foreground tracking-wider">{badge}</span>
                    </div>
                  );
                })()}
              </div>

              {/* Branding Footer - Elegant Separator */}
              <div className="border-t border-border/50 pt-4 text-center space-y-1">
                <div className="text-base font-bold text-primary tracking-wide">Novagen Labs</div>
                <div className="text-xs text-muted-foreground font-mono tracking-wider">AI PROMPT ENGINEERING</div>
              </div>

              {/* Call to Action - More Prominent */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 rounded-xl p-4 text-center shadow-lg shadow-primary/10">
                <div className="text-xs text-muted-foreground tracking-wider">Try it yourself:</div>
                <div className="text-sm font-bold text-primary font-mono tracking-wide mt-1">
                  learn2prompt.xyz
                </div>
                <div className="text-xs text-muted-foreground mt-1">Beat my score! 🎯</div>
              </div>
            </div>
          </motion.div>
          </div>

          {/* Sharing Options */}
          <div className="bg-background border border-border rounded p-8 mb-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
              <span className="text-xs font-mono text-foreground tracking-wider">SHARE</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                onClick={shareToTwitter}
                variant="outline"
                className="flex items-center justify-center gap-2 bg-black text-foreground border-border hover:bg-primary hover:text-black hover:border-primary transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">{t('ui.buttons.twitter')}</span>
              </Button>
              <Button
                onClick={shareToLinkedIn}
                variant="outline"
                className="flex items-center justify-center gap-2 bg-black text-foreground border-border hover:bg-primary hover:text-black hover:border-primary transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">{t('ui.buttons.linkedin')}</span>
              </Button>
              <Button
                onClick={shareCertificate}
                variant="outline"
                className="flex items-center justify-center gap-2 bg-black text-foreground border-border hover:bg-primary hover:text-black hover:border-primary transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">{t('ui.buttons.share')}</span>
              </Button>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={confirmReset}
              size="lg"
              className="bg-black text-foreground border border-primary/30 hover:bg-primary hover:text-black transition-colors"
            >
              {t('ui.buttons.startOver')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentLessonData = lessons[currentLesson];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Compact Header - Not centered */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-sm"></div>
            <span className="text-sm font-mono text-primary tracking-wider">
              {t('ui.navigation.lessonCounter').replace('{{current}}', String(currentLesson + 1)).replace('{{total}}', String(lessons.length))}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-muted-foreground border-border font-mono text-xs">
              {t('ui.navigation.pointsLabel').replace('{{score}}', String(score))}
            </Badge>
            <button
              onClick={handleResetProgress}
              className="text-xs text-muted-foreground hover:text-primary font-mono transition-colors"
              title={t('ui.navigation.resetTitle')}
            >
              {t('ui.navigation.reset')}
            </button>
            <div className="hidden sm:block">
              <AuthButton showName={false} />
            </div>
          </div>
        </div>

        {/* Progress bar - enhanced with animation */}
        <div className="mb-12 space-y-2 relative">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>{t('ui.navigation.progress').replace('{{percent}}', String(Math.round(progress)))}</span>
            <span>{t('ui.navigation.lessonsCompleted').replace('{{completed}}', String(completedLessons.length)).replace('{{total}}', String(lessons.length))}</span>
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
                  '0 0 0px rgba(0, 122, 255, 0)',
                  '0 0 15px rgba(0, 122, 255, 0.8)',
                  '0 0 0px rgba(0, 122, 255, 0)'
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
                        <div className="text-muted-foreground text-xs">...</div>
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      </div>
                    )}
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border whitespace-nowrap transition-all ${
                        isCurrent
                          ? 'bg-primary/10 border-primary text-primary'
                          : isPast
                          ? 'bg-background border-border text-muted-foreground'
                          : 'bg-background border-border text-muted-foreground'
                      }`}
                    >
                      {isPast && <CheckCircle className="w-3 h-3" />}
                      <span className="text-xs font-mono">{String(idx + 1).padStart(2, '0')}</span>
                      {isCurrent && <span className="text-xs font-medium truncate max-w-[120px]">{lesson.title}</span>}
                    </div>
                    {!isNext && idx < lessons.length - 1 && (
                      <ArrowRight className={`w-3 h-3 ${isCurrent ? 'text-muted-foreground' : 'text-foreground'}`} />
                    )}
                  </React.Fragment>
                );
              }
              return null;
            })}
            {currentLesson < lessons.length - 2 && (
              <div className="text-muted-foreground text-xs">...</div>
            )}
          </div>
        </div>

        {/* Asymmetric Grid Layout */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Main Content - 8 columns */}
          <div className="md:col-span-8 space-y-8">
            {/* Title - Left aligned, no card */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight tracking-tight">
                {currentLessonData.title}
              </h1>
              <Separator className="mb-0 bg-secondary" />
            </div>

          {currentLessonData.type === 'lesson' ? (
            <div className="space-y-8">
              {/* Lesson content in card with left accent */}
              <Card className="bg-background border-l-4 border-l-primary border-r-0 border-t-0 border-b-0 rounded-none rounded-r-xl">
                <CardContent className="p-6">
                  <div className="text-muted-foreground leading-relaxed space-y-4">
                    {currentLessonData.content}
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleNext}
                size="lg"
                className="bg-black text-foreground border border-primary/30 hover:bg-primary hover:text-black transition-all duration-200 group"
              >
                <span>{t('ui.buttons.continue')}</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Scenario - left accent card */}
              <Card className="bg-background border-l-4 border-l-primary border-r-0 border-t-0 border-b-0 rounded-none rounded-r-xl">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-sm"></div>
                    <span className="text-xs font-mono text-primary tracking-wider">{t('ui.labels.scenario')}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{currentLessonData.scenario}</p>
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground font-medium">{currentLessonData.task}</p>
                  </div>

                  {currentLessonData.salesData && (
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                        <span className="text-xs font-mono text-foreground tracking-wider">{t('ui.labels.data')}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {currentLessonData.salesData.map((item, idx) => (
                          <div key={idx} className="bg-secondary p-4 rounded border border-border hover:border-primary/30 transition-colors">
                            <div className="text-xs font-mono text-muted-foreground mb-2">{item.quarter}</div>
                            <div className="text-2xl font-bold text-foreground">
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
                        <p className="text-muted-foreground text-sm leading-relaxed">{currentLessonData.mockBadResponse}</p>
                      </div>
                      <p className="text-xs text-muted-foreground italic">This response needs correction!</p>
                    </div>
                  )}

                  {/* Difficulty Selector for Exercise 5 */}
                  {currentLessonData.hasDifficultyModes && (
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1.5 h-1.5 bg-primary rounded-sm"></div>
                        <span className="text-xs font-mono text-primary tracking-wider">SELECT DIFFICULTY</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Easy Mode Button */}
                        <button
                          onClick={() => setExerciseDifficulty('easy')}
                          className={`group relative p-6 rounded-lg border-2 transition-all ${
                            exerciseDifficulty === 'easy'
                              ? 'bg-green-950/30 border-green-500 border-l-4'
                              : 'bg-secondary border-border hover:border-green-500/50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-lg font-bold text-foreground mb-1">Easy Mode</h4>
                              <Badge className="bg-green-600/20 text-green-300 border-green-500/30 text-xs">
                                Recommended
                              </Badge>
                            </div>
                            {exerciseDifficulty === 'easy' && (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Analyze simple meeting notes with clear action items.
                          </p>
                        </button>

                        {/* Hard Mode Button */}
                        <button
                          onClick={() => setExerciseDifficulty('hard')}
                          className={`group relative p-6 rounded-lg border-2 transition-all ${
                            exerciseDifficulty === 'hard'
                              ? 'bg-orange-950/30 border-orange-500 border-l-4'
                              : 'bg-secondary border-border hover:border-orange-500/50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-lg font-bold text-foreground mb-1">Hard Mode</h4>
                              <Badge className="bg-orange-600/20 text-orange-300 border-orange-500/30 text-xs">
                                Challenge
                              </Badge>
                            </div>
                            {exerciseDifficulty === 'hard' && (
                              <CheckCircle className="w-5 h-5 text-orange-400" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
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
                            <h4 className="text-sm font-semibold text-foreground">{easyModeDocument.title}</h4>
                            <p className="text-xs text-muted-foreground">{easyModeDocument.date} • {easyModeDocument.attendees.length} attendees</p>
                          </div>
                        </div>

                        <div className="bg-background border border-green-500/20 rounded p-3 space-y-3 text-sm">
                          <div>
                            <p className="text-xs font-mono text-green-400 mb-2">ATTENDEES</p>
                            <div className="flex flex-wrap gap-2">
                              {easyModeDocument.attendees.map((attendee, idx) => (
                                <span key={idx} className="text-xs bg-secondary border border-green-500/20 px-2 py-1 rounded text-muted-foreground">
                                  {attendee}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-mono text-green-400 mb-2">DISCUSSION POINTS</p>
                            <div className="space-y-1.5">
                              {easyModeDocument.content.map((item, idx) => (
                                <p key={idx} className="text-xs text-muted-foreground">• {item}</p>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-mono text-green-400 mb-2">ACTION ITEMS</p>
                            <div className="space-y-1.5">
                              {easyModeDocument.actionItems.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <Target className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-xs text-muted-foreground">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                        <span className="text-xs font-mono text-foreground tracking-wider">{t('ui.labels.yourPrompt')}</span>
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
                          className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-6 rounded-lg flex items-center justify-center gap-3 transition-all"
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
                        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-black" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-foreground">{mockCompanyData.name} - Business Report</p>
                              <p className="text-xs text-muted-foreground">10 pages • Uploaded successfully</p>
                            </div>
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          </div>

                          <Separator className="bg-primary/20" />

                          <div className="space-y-2">
                            <p className="text-xs font-mono text-primary tracking-wider">DOCUMENT CONTENTS</p>
                            <div className="bg-background border border-primary/20 rounded p-3 space-y-2 text-xs text-muted-foreground">
                              <p><span className="text-primary font-semibold">Company:</span> {mockCompanyData.name}</p>
                              <p><span className="text-primary font-semibold">Industry:</span> {mockCompanyData.industry}</p>
                              <p><span className="text-primary font-semibold">Employees:</span> {mockCompanyData.employees}</p>
                              <p><span className="text-primary font-semibold">Revenue:</span> {mockCompanyData.revenue} (Growth: {mockCompanyData.quarterlyGrowth})</p>
                              <p><span className="text-primary font-semibold">Key Projects:</span></p>
                              <ul className="ml-4 space-y-1">
                                {mockCompanyData.keyProjects.map((project, idx) => (
                                  <li key={idx} className="text-xs">• {project}</li>
                                ))}
                              </ul>
                              <p><span className="text-primary font-semibold">Quarterly Sales:</span> Q1: {mockCompanyData.salesData.q1}, Q2: {mockCompanyData.salesData.q2}, Q3: {mockCompanyData.salesData.q3}, Q4: {mockCompanyData.salesData.q4}</p>
                              <p><span className="text-primary font-semibold">Marketing:</span> Budget: {mockCompanyData.marketing.budget}, Leads: {mockCompanyData.marketing.leads}, Conversion: {mockCompanyData.marketing.conversionRate}</p>
                              <p><span className="text-primary font-semibold">Key Challenges:</span></p>
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
                          <span className="text-xs font-mono text-foreground tracking-wider">{t('ui.labels.yourPrompt')}</span>
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
                          className="w-full bg-purple-600 hover:bg-purple-700 text-foreground font-semibold py-6 rounded-lg flex items-center justify-center gap-3 transition-all"
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
                                <Mail className="w-5 h-5 text-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground">New Campaign Brief from {mockCampaignData.clientName}</p>
                                <p className="text-xs text-muted-foreground">{mockCampaignData.clientRole} • {mockCampaignData.companyName}</p>
                              </div>
                            </div>

                            <div className="bg-background border border-purple-500/20 rounded p-3 space-y-3 text-sm text-muted-foreground">
                              <div className="border-b border-purple-500/20 pb-2">
                                <span className="text-purple-400 font-semibold">Product Launch: </span>
                                <span className="text-foreground">{mockCampaignData.productLaunch}</span>
                              </div>

                              {/* Asymmetric Grid for Campaign Details */}
                              <div className="grid grid-cols-2 gap-3">
                                <div className="col-span-2 bg-purple-950/30 border-l-2 border-purple-500 p-3 rounded-r">
                                  <p className="text-xs font-mono text-purple-400 mb-1">TARGET AUDIENCE</p>
                                  <p className="text-xs text-muted-foreground">{mockCampaignData.targetAudience.primary}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{mockCampaignData.targetAudience.secondary}</p>
                                </div>

                                <div className="bg-secondary border border-purple-500/20 p-2 rounded">
                                  <p className="text-xs font-mono text-purple-400">BUDGET</p>
                                  <p className="text-lg font-bold text-foreground">{mockCampaignData.budget}</p>
                                </div>

                                <div className="bg-secondary border border-purple-500/20 p-2 rounded">
                                  <p className="text-xs font-mono text-purple-400">TIMELINE</p>
                                  <p className="text-xs font-semibold text-foreground mt-1">{mockCampaignData.timeline}</p>
                                </div>
                              </div>

                              <div>
                                <p className="text-xs font-mono text-purple-400 mb-2">CAMPAIGN GOALS</p>
                                <div className="space-y-1">
                                  {mockCampaignData.campaignGoals.map((goal, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                      <Target className="w-3 h-3 text-purple-500 flex-shrink-0 mt-0.5" />
                                      <span className="text-xs text-muted-foreground">{goal}</span>
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
                                    <span key={idx} className="text-xs bg-secondary border border-purple-500/20 px-2 py-1 rounded">
                                      {channel}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="bg-orange-950/20 border-l-2 border-orange-500 p-2 rounded-r">
                                <p className="text-xs font-mono text-orange-400 mb-1">COMPETITIVE EDGE</p>
                                <p className="text-xs text-muted-foreground italic">{mockCampaignData.competitorInsight}</p>
                              </div>
                            </div>
                          </div>

                          {campaignBriefLoaded && (
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                              <span className="text-xs font-mono text-foreground tracking-wider">STEP 2: WRITE YOUR CREATIVE PROMPT</span>
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
                          className="w-full bg-green-600 hover:bg-green-700 text-foreground font-semibold py-6 rounded-lg flex items-center justify-center gap-3 transition-all"
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
                              <h3 className="text-lg font-bold text-foreground">{mockAnalyticsData.companyName}</h3>
                              <Badge className="bg-green-600/20 text-green-300 border-green-500/30">{mockAnalyticsData.period}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">Cross-Department Performance Dashboard</p>
                          </div>

                          {/* Asymmetric Stats Grid: 2-1-2-1 Layout */}
                          <div className="grid grid-cols-3 gap-3">
                            {/* Sales - Wide Card */}
                            <div className="col-span-2 bg-background border-l-4 border-green-500 border-r border-t border-b border-green-500/30 rounded-r p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-4 h-4 text-green-400" />
                                <span className="text-xs font-mono text-green-400">SALES</span>
                              </div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-foreground">{mockAnalyticsData.departments.sales.revenue}</span>
                                <span className="text-sm text-green-400">{mockAnalyticsData.departments.sales.growth}</span>
                              </div>
                              <div className="mt-2 space-y-1">
                                <p className="text-xs text-muted-foreground">Top: {mockAnalyticsData.departments.sales.topProducts[0].name}</p>
                                <p className="text-xs text-muted-foreground">{mockAnalyticsData.departments.sales.salesTeam.reps} reps • {mockAnalyticsData.departments.sales.salesTeam.avgDealsPerRep} avg deals</p>
                              </div>
                            </div>

                            {/* Marketing - Narrow Card */}
                            <div className="col-span-1 bg-background border-l-4 border-purple-500 border-r border-t border-b border-purple-500/30 rounded-r p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-4 h-4 text-purple-400" />
                                <span className="text-xs font-mono text-purple-400">MARKETING</span>
                              </div>
                              <div className="text-lg font-bold text-foreground">{mockAnalyticsData.departments.marketing.spent}</div>
                              <p className="text-xs text-muted-foreground mt-1">of {mockAnalyticsData.departments.marketing.budget}</p>
                              <p className="text-xs text-purple-400 mt-2">Best ROI: {mockAnalyticsData.departments.marketing.campaigns[0].roi}</p>
                            </div>

                            {/* Accounting - Wide Card */}
                            <div className="col-span-2 bg-background border-l-4 border-orange-500 border-r border-t border-b border-orange-500/30 rounded-r p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="w-4 h-4 text-orange-400" />
                                <span className="text-xs font-mono text-orange-400">ACCOUNTING</span>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <div>
                                  <p className="text-xs text-muted-foreground">Revenue</p>
                                  <p className="text-sm font-bold text-foreground">{mockAnalyticsData.departments.accounting.revenue}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Profit</p>
                                  <p className="text-sm font-bold text-green-400">{mockAnalyticsData.departments.accounting.profit}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Margin</p>
                                  <p className="text-sm font-bold text-foreground">{mockAnalyticsData.departments.accounting.profitMargin}</p>
                                </div>
                              </div>
                              <p className="text-xs text-orange-400 mt-2">Outstanding: {typeof mockAnalyticsData.departments.accounting.outstandingInvoices === 'object'
                                ? `${mockAnalyticsData.departments.accounting.outstandingInvoices.amount} (avg ${mockAnalyticsData.departments.accounting.outstandingInvoices.avgDays} days)`
                                : mockAnalyticsData.departments.accounting.outstandingInvoices}</p>
                            </div>

                            {/* Operations - Narrow Card */}
                            <div className="col-span-1 bg-background border-l-4 border-blue-500 border-r border-t border-b border-blue-500/30 rounded-r p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Users className="w-4 h-4 text-blue-400" />
                                <span className="text-xs font-mono text-blue-400">OPERATIONS</span>
                              </div>
                              <div className="text-lg font-bold text-foreground">{mockAnalyticsData.departments.operations.productivity}</div>
                              {(mockAnalyticsData.departments.operations.team?.employees || mockAnalyticsData.departments.operations.teamMetrics?.employeeCount) && (
                                <p className="text-xs text-muted-foreground mt-1">
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
                                  <p key={idx} className="text-xs text-muted-foreground">• {insight}</p>
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
                                  <p key={idx} className="text-xs text-muted-foreground">• {concern}</p>
                                ))}
                              </div>
                            </div>
                          </div>

                          {analyticsLoaded && (
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                              <span className="text-xs font-mono text-foreground tracking-wider">STEP 2: WRITE YOUR ANALYSIS PROMPT</span>
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
                        <label className="text-xs font-mono text-foreground tracking-wider">
                          {t('ui.labels.yourPrompt')}
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
                            ? 'bg-primary/20 text-primary border border-primary/30'
                            : 'bg-secondary text-muted-foreground border border-border hover:border-border'
                        }`}
                      >
                        <Zap className={`w-3 h-3 ${easyModeEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
                        {easyModeEnabled ? 'Easy Mode: ON' : 'Easy Mode: OFF'}
                        <span className="text-[10px] opacity-70">(1/10 pts)</span>
                      </button>
                    </div>
                  )}

                  {/* Prompt Suggestions (Easy Mode) */}
                  {easyModeEnabled && PROMPT_SUGGESTIONS[currentLessonData.id] && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-primary" />
                        <span className="text-xs text-muted-foreground font-mono">SUGGESTED PROMPTS</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {PROMPT_SUGGESTIONS[currentLessonData.id].map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setUserInput(suggestion);
                              setUsedSuggestion(true);
                            }}
                            className="text-left px-3 py-2 bg-secondary hover:bg-primary/10 border border-border hover:border-primary/30 rounded-lg text-xs text-muted-foreground hover:text-foreground transition-all group"
                          >
                            <div className="flex items-start gap-2">
                              <span className="text-primary font-mono text-[10px] mt-0.5">#{index + 1}</span>
                              <span className="flex-1 line-clamp-2 group-hover:line-clamp-none">{suggestion}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                      {usedSuggestion && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-amber-950/20 border border-amber-500/30 rounded-lg">
                          <AlertCircle className="w-3 h-3 text-amber-400" />
                          <span className="text-xs text-amber-400 font-mono">
                            {t('ui.labels.suggestionWarning')}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <Textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-full bg-background border border-border text-foreground focus:border-primary focus:ring-0 min-h-[140px] placeholder-muted-foreground rounded"
                    placeholder={t('ui.placeholders.promptInput')}
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
                <Card className="bg-background border-l-0 border-r-0 border-t border-b border-border rounded-none">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                      <span className="text-xs font-mono text-foreground tracking-wider">{t('ui.labels.response')}</span>
                      {isStreaming && (
                        <span className="text-xs text-primary animate-pulse">{t('ui.labels.streaming')}</span>
                      )}
                    </div>
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({node, ...props}) => <p className="text-muted-foreground leading-relaxed mb-4" {...props} />,
                          h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-foreground mt-6 mb-4" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-xl font-bold text-foreground mt-5 mb-3" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-lg font-bold text-foreground mt-4 mb-2" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4" {...props} />,
                          ol: ({node, ...props}: any) => <ol className="list-decimal list-inside text-muted-foreground space-y-2 mb-4" {...props} />,
                          li: ({node, ...props}: any) => <li className="text-muted-foreground" {...props} />,
                          code: ({node, inline, ...props}: any) =>
                            inline ?
                              <code className="bg-secondary text-primary px-1.5 py-0.5 rounded text-sm font-mono" {...props} /> :
                              <code className="block bg-secondary text-primary p-4 rounded text-sm font-mono overflow-x-auto mb-4" {...props} />,
                          pre: ({node, ...props}: any) => <pre className="bg-secondary rounded p-4 mb-4 overflow-x-auto" {...props} />,
                          blockquote: ({node, ...props}: any) => <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4" {...props} />,
                          a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold text-foreground" {...props} />,
                          em: ({node, ...props}) => <em className="italic text-muted-foreground" {...props} />,
                          hr: ({node, ...props}) => <hr className="border-border my-6" {...props} />,
                          table: ({node, ...props}) => <table className="min-w-full border-collapse border border-border mb-4" {...props} />,
                          thead: ({node, ...props}) => <thead className="bg-secondary" {...props} />,
                          tbody: ({node, ...props}) => <tbody {...props} />,
                          tr: ({node, ...props}) => <tr className="border-b border-border" {...props} />,
                          th: ({node, ...props}) => <th className="border border-border px-4 py-2 text-left text-foreground font-semibold" {...props} />,
                          td: ({node, ...props}) => <td className="border border-border px-4 py-2 text-muted-foreground" {...props} />,
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
                    ? 'bg-background border-l-primary'
                    : 'bg-background border-l-orange-500'
                }`}>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          {evaluation.passed ? (
                            <CheckCircle className="w-5 h-5 text-primary" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-orange-400" />
                          )}
                          <span className="text-xs font-mono tracking-wider text-foreground">
                            {evaluation.passed ? 'PASSED' : 'NEEDS WORK'}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{evaluation.mainFeedback}</p>
                      </div>
                    </div>

                    {evaluation.highlights && evaluation.highlights.length > 0 && (
                      <div className="border-t border-border pt-4 space-y-2">
                        <span className="text-xs font-mono text-muted-foreground tracking-wider">
                          {evaluation.passed ? 'HIGHLIGHTS' : 'WATCH OUT'}
                        </span>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          {evaluation.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary mt-1">—</span>
                              <span>"{highlight}"</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {evaluation.strengths && evaluation.strengths.length > 0 && (
                      <div className="border-t border-border pt-4 space-y-2">
                        <span className="text-xs font-mono text-muted-foreground tracking-wider">STRENGTHS</span>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          {evaluation.strengths.map((strength, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary mt-1">+</span>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {evaluation.weaknesses && evaluation.weaknesses.length > 0 && (
                      <div className="border-t border-border pt-4 space-y-2">
                        <span className="text-xs font-mono text-muted-foreground tracking-wider">IMPROVE</span>
                        <ul className="text-sm text-muted-foreground space-y-2">
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
                      <div className="border-t border-border pt-4 space-y-2">
                        <span className="text-xs font-mono text-muted-foreground tracking-wider">NEXT STEP</span>
                        <p className="text-sm text-muted-foreground">{evaluation.nextSteps}</p>
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
                    className="flex-1 bg-primary text-black hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin mr-2" />
                        {t('ui.buttons.generating')}
                      </>
                    ) : (
                      currentLessonData.requiresVisualization
                        ? t('ui.buttons.generateVisualization')
                        : t('ui.buttons.submitPrompt')
                    )}
                  </Button>
                ) : (
                  <>
                    {!evaluation.passed && (
                      <Button
                        onClick={handleTryAgain}
                        size="lg"
                        className="flex-1 bg-black text-foreground border border-orange-500 hover:bg-orange-500 hover:text-black transition-colors"
                      >
                        {t('ui.buttons.tryAgain')}
                      </Button>
                    )}
                    <Button
                      onClick={handleNext}
                      size="lg"
                      className="flex-1 bg-black text-foreground border border-primary/30 hover:bg-primary hover:text-black transition-colors group"
                    >
                      <span>{evaluation.passed ? t('ui.buttons.continue') : t('ui.buttons.skipLesson')}</span>
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
              <Card className="bg-background border border-border rounded sticky top-8">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                    <span className="text-xs font-mono text-foreground tracking-wider">{t('ui.labels.hints')}</span>
                  </div>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {currentLessonData.hints.map((hint, idx) => (
                      <li key={idx} className="flex items-start gap-2 hover:text-muted-foreground transition-colors">
                        <span className="text-primary mt-1 flex-shrink-0">—</span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Lesson Navigation */}
            <Card className="bg-background border border-border rounded">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                  <span className="text-xs font-mono text-foreground tracking-wider">{t('ui.labels.lessons')}</span>
                </div>
                <div className="space-y-2">
                  {lessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      className={`text-sm p-2 border-l-2 pl-3 transition-colors ${
                        idx === currentLesson
                          ? 'border-primary text-foreground'
                          : idx < currentLesson
                          ? 'border-border text-muted-foreground'
                          : 'border-border text-muted-foreground'
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
              <Card className="bg-background border-l-4 border-l-primary border-r border-t border-b border-primary/30 rounded-r-xl shadow-2xl">
                <CardContent className="p-6 space-y-4">
                  {/* Pulsating Blue Orb */}
                  <div className="flex justify-center">
                    <div className="relative w-24 h-24">
                      {/* Outer glow rings */}
                      <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" style={{animationDuration: '2s'}}></div>
                      <div className="absolute inset-2 rounded-full bg-primary/40 animate-pulse" style={{animationDuration: '1.5s'}}></div>
                      {/* Core orb with constant glow */}
                      <div className="absolute inset-6 rounded-full bg-primary shadow-[0_0_40px_rgba(0,122,255,0.8),0_0_80px_rgba(0,122,255,0.6),inset_0_0_20px_rgba(255,255,255,0.5)]"></div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-foreground mb-1">
                      {milestoneData.title}
                    </h3>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {milestoneData.badge}
                    </Badge>
                  </div>

                  {/* Message */}
                  <p className="text-muted-foreground text-center text-sm leading-relaxed">
                    {milestoneData.message}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Progress Confirmation Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent className="bg-secondary border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">
              {language === 'fr' ? 'Réinitialiser la progression ?' : 'Reset Progress?'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              {language === 'fr'
                ? 'Êtes-vous sûr de vouloir réinitialiser toute votre progression ? Cette action ne peut pas être annulée.'
                : 'Are you sure you want to reset all your progress? This action cannot be undone.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary text-foreground border-border hover:bg-secondary">
              {language === 'fr' ? 'Annuler' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmReset}
              className="bg-red-600 text-foreground hover:bg-red-700"
            >
              {language === 'fr' ? 'Réinitialiser' : 'Reset'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PromptEngineeringGame;
