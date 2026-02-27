/**
 * Hook for managing haptic feedback
 * Mobile implementation using expo-haptics
 */

import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export type HapticFeedbackType =
    | 'light'
    | 'medium'
    | 'heavy'
    | 'success'
    | 'warning'
    | 'error';

export function useHaptics() {
    /**
     * Trigger haptic feedback
     * @param type - Type of haptic feedback
     */
    const trigger = useCallback(async (type: HapticFeedbackType = 'light') => {
        if (Platform.OS === 'web') return;

        try {
            switch (type) {
                case 'light':
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    break;
                case 'medium':
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    break;
                case 'heavy':
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    break;
                case 'success':
                    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    break;
                case 'warning':
                    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                    break;
                case 'error':
                    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                    break;
            }
        } catch (error) {
            console.warn('Haptics not available', error);
        }
    }, []);

    /**
     * Trigger selection haptic (for UI interactions like taps)
     */
    const selection = useCallback(async () => {
        if (Platform.OS === 'web') return;
        try {
            await Haptics.selectionAsync();
        } catch (error) {
            console.warn('Haptics not available', error);
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

    return {
        trigger,
        selection,
        impact,
        success,
        error
    };
}
