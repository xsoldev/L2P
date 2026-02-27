import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, ArrowLeft } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { H1, H2, Body, Label } from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/Card';

interface LessonScreenProps {
    lesson: any;
    onComplete: () => void;
    onBack?: () => void;
    t: (key: string) => string;
    content: React.ReactNode;
}

export const LessonScreen: React.FC<LessonScreenProps> = ({ lesson, onComplete, onBack, t, content }) => {
    return (
        <SafeAreaView className="flex-1 bg-novagen-bg-primary">
            <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }}>
                {/* Header */}
                <View className="mb-8">
                    {onBack && (
                        <TouchableOpacity
                            onPress={onBack}
                            className="mb-4 flex-row items-center gap-2"
                        >
                            <ArrowLeft size={20} color="#70BEFA" />
                            <Label className="mb-0 text-novagen-blue">Back to Map</Label>
                        </TouchableOpacity>
                    )}
                    <View className="flex-row items-center gap-2 mb-4">
                        <View className="w-2 h-2 bg-novagen-blue rounded-sm" />
                        <Label className="mb-0 text-novagen-blue">
                            {t('lesson')} {lesson.id === 'intro' ? '' : lesson.id.replace('lesson', '')}
                        </Label>
                    </View>
                    <H1 className="text-3xl md:text-4xl">{lesson.title}</H1>
                </View>

                {/* Content Card */}
                <Card variant="default" className="bg-novagen-bg-secondary border-novagen-blue/10">
                    <CardContent className="p-6">
                        {content}
                    </CardContent>
                </Card>
            </ScrollView>

            {/* Sticky Footer */}
            <View className="absolute bottom-0 left-0 right-0 p-6 bg-novagen-bg-primary/95 border-t border-novagen-blue/20">
                <Button
                    onPress={onComplete}
                    size="lg"
                    className="w-full flex-row justify-between items-center"
                >
                    <Text className="text-black font-bold text-lg">{t('startExercise')}</Text>
                    <ArrowRight size={24} color="black" />
                </Button>
            </View>
        </SafeAreaView>
    );
};
