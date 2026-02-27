import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles, Play, Book, Target, Zap } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { H1, H2, Body, Label } from '@/components/ui/Typography';

interface WelcomeScreenProps {
    onStart: () => void;
    t: (key: string) => string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, t }) => {
    return (
        <SafeAreaView className="flex-1 bg-novagen-bg-primary">
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
                {/* Hero Section - Left Aligned */}
                <View className="mb-12 mt-8">
                    <View className="flex-row items-center gap-2 mb-6">
                        <View className="w-2 h-2 bg-novagen-blue rounded-sm" />
                        <Label className="mb-0 text-novagen-blue">INTERACTIVE COURSE</Label>
                    </View>

                    <H1 className="mb-6">
                        Write prompts{'\n'}
                        <Text style={{ color: '#70BEFA' }}>that actually work</Text>
                    </H1>

                    <Body className="text-xl">
                        {t('gameSubtitle')}
                    </Body>
                </View>

                {/* Asymmetric Grid Content */}
                <View className="space-y-6 mb-24">
                    <Card variant="accent-left">
                        <CardContent>
                            <H2 className="text-lg mb-2">{t('whatYouWillLearn')}</H2>
                            <View className="space-y-4 mt-4">
                                <View className="flex-row gap-3">
                                    <Book size={20} color="#70BEFA" />
                                    <Body className="flex-1 text-sm">{t('learnPoint1')}</Body>
                                </View>
                                <View className="flex-row gap-3">
                                    <Target size={20} color="#70BEFA" />
                                    <Body className="flex-1 text-sm">{t('learnPoint2')}</Body>
                                </View>
                                <View className="flex-row gap-3">
                                    <Zap size={20} color="#70BEFA" />
                                    <Body className="flex-1 text-sm">{t('learnPoint3')}</Body>
                                </View>
                            </View>
                        </CardContent>
                    </Card>
                </View>
            </ScrollView>

            {/* Sticky Bottom CTA */}
            <View className="absolute bottom-0 left-0 right-0 p-6 bg-novagen-bg-primary/95 border-t border-novagen-blue/20">
                <Button
                    onPress={onStart}
                    size="lg"
                    className="w-full flex-row justify-between items-center"
                >
                    <Text className="text-black font-bold text-lg">{t('startGame')}</Text>
                    <Play size={24} color="black" fill="black" />
                </Button>
            </View>
        </SafeAreaView>
    );
};
