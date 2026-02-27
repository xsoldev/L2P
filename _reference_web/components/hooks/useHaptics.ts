/**
 * Hook for managing haptic feedback
 * Web-only implementation using Navigator.vibrate
 */

import { useCallback } from 'react';

export type HapticFeedbackType =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'success'
  | 'warning'
  | 'error';

export function useHaptics() {
  const isNative = false;

  /**
   * Trigger haptic feedback
   * @param type - Type of haptic feedback
   */
  const trigger = useCallback(async (type: HapticFeedbackType = 'light') => {
    // Fallback for web: use vibration API if available
    if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
      const duration = type === 'heavy' ? 50 : type === 'medium' ? 30 : 10;
      navigator.vibrate(duration);
    }
  }, []);

  /**
   * Trigger selection haptic (for UI interactions like taps)
   */
  const selection = useCallback(async () => {
    if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
      navigator.vibrate(5);
    }
  }, []);

  /**
   * Trigger light impact (for button taps)
   */
  const impact = useCallback(() => trigger('light'), [trigger]);

  /**
   * Trigger success feedback
   */
  const success = useCallback(() => trigger('success'), [trigger]);

  /**
   * Trigger error feedback
   */
  const error = useCallback(() => trigger('error'), [trigger]);

  /**
   * Trigger warning feedback
   */
  const warning = useCallback(() => trigger('warning'), [trigger]);

  return {
    trigger,
    selection,
    impact,
    success,
    error,
    warning,
    isNative
  };
}
