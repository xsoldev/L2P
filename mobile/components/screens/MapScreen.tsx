import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Line, Circle } from 'react-native-svg';
import { Star, Lock, Check, Play, Book, Zap } from 'lucide-react-native';
import { H1, H2, Body, Label, BodySmall } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { useProgress } from '@/components/hooks/useProgress';
import { getTranslations } from '@/lib/i18n';

interface MapScreenProps {
    onStartLesson: (index: number) => void;
}

const { width } = Dimensions.get('window');
const NODE_SIZE = 64;
const PATH_WIDTH = 4;

export const MapScreen: React.FC<MapScreenProps> = ({ onStartLesson }) => {
    const {
        currentLesson,
        completedLessons,
        stars,
        language,
        score,
        streak,
        level
    } = useProgress();

    const translations = getTranslations(language);
    const lessons = translations.lessons;

    // Calculate node positions
    // We'll use a simple sine wave pattern for the path
    const nodes = lessons.map((lesson: any, index: number) => {
        const isLeft = index % 2 === 1;
        const xOffset = isLeft ? -60 : 60;
        return {
            ...lesson,
            x: width / 2 + (index === 0 || index === lessons.length - 1 ? 0 : xOffset),
            y: 100 + index * 140,
            status: completedLessons.includes(lesson.id)
                ? 'completed'
                : 'active' // All lessons are now accessible
        };
    });

    const totalHeight = nodes[nodes.length - 1].y + 150;

    // Generate SVG path
    const pathD = nodes.reduce((acc: string, node: any, index: number) => {
        if (index === 0) return `M ${node.x} ${node.y}`;
        const prev = nodes[index - 1];
        // Bezier curve for smooth path
        const cp1x = prev.x;
        const cp1y = (prev.y + node.y) / 2;
        const cp2x = node.x;
        const cp2y = (prev.y + node.y) / 2;
        return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${node.x} ${node.y}`;
    }, '');

    return (
        <SafeAreaView className="flex-1 bg-novagen-bg-primary" edges={['top']}>
            {/* Header */}
            <View className="px-6 py-4 border-b border-novagen-blue/10 bg-novagen-bg-primary z-10 flex-row justify-between items-center">
                <View className="flex-row gap-6">
                    <View>
                        <Label className="text-xs text-gray-400 mb-0">LEVEL {level}</Label>
                        <H2 className="text-xl text-novagen-blue mb-0">{score} XP</H2>
                    </View>
                    <View>
                        <Label className="text-xs text-gray-400 mb-0">STREAK</Label>
                        <View className="flex-row items-center gap-1">
                            <H2 className="text-xl text-amber-500 mb-0">{streak}</H2>
                            <Text className="text-lg">🔥</Text>
                        </View>
                    </View>
                </View>
                <View className="items-end">
                    <Label className="text-xs text-gray-400 mb-0">COURSE</Label>
                    <BodySmall className="text-white font-bold mb-0">Prompt Engineering</BodySmall>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={{ height: Math.max(totalHeight, Dimensions.get('window').height) }}
                className="flex-1"
                showsVerticalScrollIndicator={false}
            >
                {/* Background Path */}
                <View className="absolute top-0 left-0 right-0 bottom-0">
                    <Svg width={width} height={totalHeight}>
                        <Path
                            d={pathD}
                            stroke="#1F2937" // Dark gray for locked path
                            strokeWidth={PATH_WIDTH + 4}
                            fill="none"
                        />
                        <Path
                            d={pathD}
                            stroke="#70BEFA" // Blue for active path (we could mask this to show progress)
                            strokeWidth={PATH_WIDTH}
                            strokeOpacity={0.3}
                            fill="none"
                        />
                    </Svg>
                </View>

                {/* Nodes */}
                {nodes.map((node: any, index: number) => {
                    const isCompleted = node.status === 'completed';
                    const isActive = !isCompleted; // All non-completed are active
                    const lessonStars = stars?.[node.id] || 0;

                    // Determine which icon to show
                    let iconSource;
                    if (isCompleted) {
                        iconSource = require('../../assets/images/icon-completed.png');
                    } else if (node.type === 'exercise') {
                        iconSource = require('../../assets/images/icon-exercise.png');
                    } else {
                        iconSource = require('../../assets/images/icon-lesson.png');
                    }

                    // Scale up the node size for the images
                    const IMAGE_SIZE = 80;

                    return (
                        <View
                            key={node.id}
                            style={{
                                position: 'absolute',
                                left: node.x - IMAGE_SIZE / 2,
                                top: node.y - IMAGE_SIZE / 2,
                                width: IMAGE_SIZE,
                                height: IMAGE_SIZE,
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10, // Ensure nodes are above path
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => onStartLesson(index)}
                                activeOpacity={0.8}
                                style={{
                                    width: IMAGE_SIZE,
                                    height: IMAGE_SIZE,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {/* Icon Image */}
                                <Image
                                    source={iconSource}
                                    style={{
                                        width: IMAGE_SIZE,
                                        height: IMAGE_SIZE,
                                        resizeMode: 'contain',
                                    }}
                                />

                                {/* Stars for Exercises */}
                                {node.type === 'exercise' && isCompleted && (
                                    <View className="absolute -bottom-2 left-0 right-0 flex-row justify-center gap-1">
                                        {[1, 2, 3].map((star) => (
                                            <Star
                                                key={star}
                                                size={12}
                                                color={star <= lessonStars ? "#FBBF24" : "#4B5563"}
                                                fill={star <= lessonStars ? "#FBBF24" : "none"}
                                            />
                                        ))}
                                    </View>
                                )}

                                {/* Label */}
                                <View className="absolute top-20 w-40 -left-10 items-center">
                                    <BodySmall className="text-center font-bold mb-0 text-white shadow-black shadow-lg" style={{ textShadowColor: 'rgba(0,0,0,0.8)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 }}>
                                        {node.title}
                                    </BodySmall>
                                    {node.type === 'exercise' && (
                                        <View className="flex-row items-center gap-1 mt-1 bg-black/40 px-2 py-0.5 rounded-full">
                                            <Zap size={10} color="#FBBF24" />
                                            <Text className="text-[10px] text-amber-400 font-bold">
                                                EXERCISE
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};
