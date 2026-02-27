// Core types for the Prompt Engineering Game

export type GameScreen = 'welcome' | 'lesson' | 'certificate' | 'complete';
export type ExerciseDifficulty = 'easy' | 'hard';

export interface Evaluation {
  passed: boolean;
  score: number;
  strengths: string[];
  weaknesses: string[];
  mainFeedback: string;
  highlights: string[];
  nextSteps: string;
}

export interface ChartConfig {
  chartType: 'bar' | 'line' | 'area' | 'pie';
  colors?: string[];
  showGrid?: boolean;
  showLegend?: boolean;
  showValues?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  interpretation?: string;
}

export interface SalesData {
  label: string;
  sales: number;
  quarter?: string;
  [key: string]: any; // Index signature for recharts compatibility
}

export interface MockCompanyData {
  name: string;
  industry: string;
  employees: number;
  revenue: string;
  quarterlyGrowth: string;
  keyProjects: string[];
  salesData: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
  };
  marketing: {
    budget: string;
    leads: number;
    conversionRate: string;
  };
  challenges: string[];
}

export interface MockCampaignData {
  clientName: string;
  clientRole: string;
  companyName: string;
  productLaunch: string;
  targetAudience: {
    primary: string;
    secondary: string;
  };
  campaignGoals: string[];
  budget: string;
  channels: string[];
  keyMessages: string[];
  competitorInsight: string;
}

export interface MockAnalyticsData {
  companyName: string;
  period: string;
  departments: {
    sales: {
      revenue: string;
      growth: string;
      topProducts: Array<{ name: string; sales: string }>;
    };
    marketing: {
      budget: string;
      spent: string;
      campaigns: Array<{ name: string; roi: string }>;
    };
    accounting: {
      revenue: string;
      expenses: string;
      profit: string;
      profitMargin: string;
      outstandingInvoices: string | { amount: string; avgDays: string };
    };
    operations: {
      productivity: string;
      team: {
        employees: number;
        satisfaction: string;
      };
    };
  };
  keyInsights: string[];
  concerns: string[];
}

export interface MilestoneData {
  title: string;
  message: string;
  badge: string;
}

export interface GameProgress {
  currentScreen: GameScreen;
  currentLesson: number;
  score: number;
  completedLessons: string[];
  userName: string;
  userShape: string | null;
  exerciseDifficulty: ExerciseDifficulty;
  language: string;
  lastSaved: string;
}

export interface ShapeConfig {
  component: string;
  name: string;
  colors: string[];
  gradients?: boolean;
}
