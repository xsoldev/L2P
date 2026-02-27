import React, { useEffect, useRef } from 'react';
import { View, Text, Dimensions, Animated } from 'react-native';
import { Star, Trophy } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { H1, H2, Body } from '@/components/ui/Typography';
import * as Haptics from 'expo-haptics';

interface VictoryOverlayProps {
    score: number;
    stars: number;
    onContinue: () => void;
    visible: boolean;
}

const { width, height } = Dimensions.get('window');

export const VictoryOverlay: React.FC<VictoryOverlayProps> = ({ score, stars, onContinue, visible }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.8)).current;

    // Star animations
    const star1Scale = useRef(new Animated.Value(0)).current;
    const star2Scale = useRef(new Animated.Value(0)).current;
    const star3Scale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            // Reset values
            opacity.setValue(0);
            scale.setValue(0.8);
            star1Scale.setValue(0);
            star2Scale.setValue(0);
            star3Scale.setValue(0);

            // Animate in
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.spring(scale, {
                    toValue: 1,
                    friction: 8,
                    useNativeDriver: true,
                }),
            ]).start();

            // Animate stars sequentially with haptics
            const animateStar = (starScale: Animated.Value, delay: number) => {
                setTimeout(() => {
                    Animated.sequence([
                        Animated.spring(starScale, {
                            toValue: 1.2,
                            friction: 8,
                            useNativeDriver: true,
                        }),
                        Animated.spring(starScale, {
                            toValue: 1,
                            friction: 8,
                            useNativeDriver: true,
                        }),
                    ]).start();
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                }, delay);
            };

            if (stars >= 1) animateStar(star1Scale, 500);
            if (stars >= 2) animateStar(star2Scale, 1000);
            if (stars >= 3) animateStar(star3Scale, 1500);
        }
    }, [visible, stars, score]);

    if (!visible) return null;

    return (
        <View className="absolute top-0 left-0 right-0 bottom-0 z-50 items-center justify-center bg-black/90 px-6">
            <Animated.View
                style={{
                    opacity,
                    transform: [{ scale }],
                    width: '100%',
                    alignItems: 'center'
                }}
            >
                <Trophy size={64} color="#FBBF24" className="mb-6" />

                <H2 className="text-white text-3xl mb-2">LESSON COMPLETE!</H2>
                <Body className="text-gray-400 mb-8">Excellent work!</Body>

                {/* Stars Container */}
                <View className="flex-row gap-4 mb-8">
                    <Animated.View style={{ transform: [{ scale: star1Scale }] }}>
                        <Star size={48} color={stars >= 1 ? "#FBBF24" : "#374151"} fill={stars >= 1 ? "#FBBF24" : "none"} />
                    </Animated.View>
                    <Animated.View style={{ transform: [{ scale: star2Scale }], marginTop: -20 }}>
                        <Star size={64} color={stars >= 2 ? "#FBBF24" : "#374151"} fill={stars >= 2 ? "#FBBF24" : "none"} />
                    </Animated.View>
                    <Animated.View style={{ transform: [{ scale: star3Scale }] }}>
                        <Star size={48} color={stars >= 3 ? "#FBBF24" : "#374151"} fill={stars >= 3 ? "#FBBF24" : "none"} />
                    </Animated.View>
                </View>

                {/* Score */}
                <View className="items-center mb-12">
                    <H1 className="text-5xl text-novagen-blue mb-2">{score}</H1>
                    <Body className="text-gray-400">TOTAL XP EARNED</Body>
                </View>

                <Button
                    onPress={onContinue}
                    size="lg"
                    className="w-full"
                >
                    CONTINUE JOURNEY
                </Button>
            </Animated.View>
        </View>
    );
};
