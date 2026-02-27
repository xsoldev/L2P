/**
 * Hook for managing the status bar
 * Web-only implementation (No-op)
 */

export type StatusBarStyle = 'light' | 'dark' | 'default';

interface UseStatusBarOptions {
  style?: StatusBarStyle;
  backgroundColor?: string;
  overlaysWebView?: boolean;
}

export function useStatusBar(options: UseStatusBarOptions = {}) {
  const isNative = false;

  const setStyle = async () => { };
  const setBackgroundColor = async () => { };
  const show = async () => { };
  const hide = async () => { };
  const setOverlaysWebView = async () => { };

  return {
    setStyle,
    setBackgroundColor,
    show,
    hide,
    setOverlaysWebView,
    isNative
  };
}
