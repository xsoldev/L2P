// Hook for managing exercise-specific data (documents, campaigns, analytics)

import { useState } from 'react';
import type { MockCompanyData, MockCampaignData, MockAnalyticsData } from '@/lib/game/types';
import {
  generateMockCompany,
  generateMarketingCampaign,
  generateBusinessAnalytics
} from '@/lib/game/data-generators';

export function useExerciseData() {
  // Document upload state
  const [documentUploaded, setDocumentUploaded] = useState(false);
  const [uploadingDocument, setUploadingDocument] = useState(false);
  const [mockCompanyData, setMockCompanyData] = useState<MockCompanyData | null>(null);

  // Campaign brief state
  const [campaignBriefLoaded, setCampaignBriefLoaded] = useState(false);
  const [loadingCampaignBrief, setLoadingCampaignBrief] = useState(false);
  const [mockCampaignData, setMockCampaignData] = useState<MockCampaignData | null>(null);

  // Analytics state
  const [analyticsLoaded, setAnalyticsLoaded] = useState(false);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [mockAnalyticsData, setMockAnalyticsData] = useState<MockAnalyticsData | null>(null);

  /**
   * Simulate document upload with mock company data
   */
  const handleDocumentUpload = () => {
    setUploadingDocument(true);
    const company = generateMockCompany();

    setTimeout(() => {
      setMockCompanyData(company);
      setDocumentUploaded(true);
      setUploadingDocument(false);
    }, 2000);
  };

  /**
   * Load campaign brief data
   */
  const handleLoadCampaignBrief = () => {
    setLoadingCampaignBrief(true);
    const campaign = generateMarketingCampaign();

    setTimeout(() => {
      setMockCampaignData(campaign);
      setCampaignBriefLoaded(true);
      setLoadingCampaignBrief(false);
    }, 1500);
  };

  /**
   * Load analytics data
   */
  const handleLoadAnalytics = async () => {
    setLoadingAnalytics(true);
    const analytics = generateBusinessAnalytics();

    setTimeout(() => {
      setMockAnalyticsData(analytics);
      setAnalyticsLoaded(true);
      setLoadingAnalytics(false);
    }, 2000);
  };

  /**
   * Reset all exercise data
   */
  const resetExerciseData = () => {
    setDocumentUploaded(false);
    setUploadingDocument(false);
    setMockCompanyData(null);
    setCampaignBriefLoaded(false);
    setLoadingCampaignBrief(false);
    setMockCampaignData(null);
    setAnalyticsLoaded(false);
    setLoadingAnalytics(false);
    setMockAnalyticsData(null);
  };

  return {
    // Document upload
    documentUploaded,
    uploadingDocument,
    mockCompanyData,
    handleDocumentUpload,

    // Campaign brief
    campaignBriefLoaded,
    loadingCampaignBrief,
    mockCampaignData,
    handleLoadCampaignBrief,

    // Analytics
    analyticsLoaded,
    loadingAnalytics,
    mockAnalyticsData,
    handleLoadAnalytics,

    // Reset
    resetExerciseData
  };
}
