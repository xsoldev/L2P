/**
 * Hook for managing keyboard behavior
 * Web-only implementation (No-op)
 */

import { useState } from 'react';

export function useKeyboard() {
  const isNative = false;
  const [isKeyboardVisible] = useState(false);
  const [keyboardHeight] = useState(0);

  const show = async () => { };
  const hide = async () => { };
  const setResizeMode = async () => { };
  const setAccessoryBarVisible = async () => { };
  const setScroll = async () => { };

  return {
    isKeyboardVisible,
    keyboardHeight,
    show,
    hide,
    setResizeMode,
    setAccessoryBarVisible,
    setScroll,
    isNative
  };
}
