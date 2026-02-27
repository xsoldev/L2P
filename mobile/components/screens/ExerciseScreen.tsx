import React, { useState, useRef } from 'react';
import { View, ScrollView, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, RefreshCw, Sparkles, AlertCircle, Zap, ArrowLeft } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { H2, Body, Label, BodySmall } from '@/components/ui/Typography';
import { streamAIResponse, userMessage, assistantMessage } from '@/lib/ai/client';
import { evaluatePrompt } from '@/lib/game/evaluation';
import * as Haptics from 'expo-haptics';
import { getTranslations } from '@/lib/i18n';
import { VictoryOverlay } from '@/components/ui/VictoryOverlay';
import { TypingIndicator } from '@/components/ui/TypingIndicator';
import { Animated } from 'react-native';

interface ExerciseScreenProps {
    lesson: any;
    onComplete: (score: number) => void;
    onBack?: () => void;
    t: (key: string) => string;
    language?: 'en' | 'fr';
}

export const ExerciseScreen: React.FC<ExerciseScreenProps> = ({ lesson, onComplete, onBack, t, language = 'en' }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [evaluation, setEvaluation] = useState<any>(null);
    const [showVictory, setShowVictory] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [finalStars, setFinalStars] = useState(0);

    const [easyModeEnabled, setEasyModeEnabled] = useState(false);
    const [usedSuggestion, setUsedSuggestion] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    // Get prompt suggestions from translations
    const translations = getTranslations(language);
    const PROMPT_SUGGESTIONS = translations.promptSuggestions || {};
    const suggestions = (PROMPT_SUGGESTIONS as any)[lesson.id] || [];

    const handleReset = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setInput('');
        setMessages([]);
        setEvaluation(null);
        setUsedSuggestion(false);
    };

    const handleUseSuggestion = (suggestion: string) => {
        setInput(suggestion);
        setUsedSuggestion(true);
        Haptics.selectionAsync();
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        const userMsg = userMessage(input);
        setMessages(prev => [...prev, userMsg]);
        const userPrompt = input; // Save before clearing
        setInput('');
        setIsLoading(true);
        setEvaluation(null);

        try {
            const systemPrompt = `You are a helpful AI assistant in a training simulation. 
      The user is learning prompt engineering. 
      Current Scenario: ${lesson.scenario}
      Task: ${lesson.task}
      
      Respond to the user's prompt naturally as the AI would.`;

            let aiText = '';
            await streamAIResponse(
                [...messages, userMsg],
                systemPrompt,
                {
                    onChunk: (text) => { },
                    onComplete: (fullText) => {
                        aiText = fullText;
                        setMessages(prev => [...prev, assistantMessage(fullText)]);
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    }
                }
            );

            const evalResult = await evaluatePrompt(
                userPrompt,
                aiText,
                lesson.evaluationCriteria || 'clear structure and specificity',
                lesson.scenario || '',
                language
            );

            // Apply suggestion penalty if user used a suggestion
            let finalScore = evalResult.score;
            if (usedSuggestion) {
                finalScore = Math.floor(evalResult.score / 10);
            }

            setEvaluation({ ...evalResult, score: finalScore, originalScore: evalResult.score });

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, assistantMessage("Error: Could not generate response.")]);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleContinue = () => {
        if (evaluation && evaluation.score >= 70) {
            setFinalScore(evaluation.score);
            // Calculate stars
            let stars = 1;
            if (evaluation.score >= 90) stars = 3;
            else if (evaluation.score >= 70) stars = 2;
            setFinalStars(stars);

            setShowVictory(true);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-novagen-bg-primary" edges={['top']}>
            <VictoryOverlay
                visible={showVictory}
                score={finalScore}
                stars={finalStars}
                onContinue={() => onComplete(finalScore)}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                {/* Header */}
                <View className="p-4 border-b border-novagen-blue/20 bg-novagen-bg-primary">
                    {onBack && (
                        <TouchableOpacity
                            onPress={onBack}
                            className="mb-3 flex-row items-center gap-2"
                        >
                            <ArrowLeft size={18} color="#70BEFA" />
                            <BodySmall className="text-novagen-blue mb-0">Back to Map</BodySmall>
                        </TouchableOpacity>
                    )}
                    <View className="flex-row items-center justify-between mb-1">
                        <View className="flex-row items-center gap-2">
                            <View className="w-1.5 h-1.5 bg-novagen-blue rounded-sm" />
                            <Label className="mb-0 text-xs text-novagen-blue">{t('exercise')}</Label>
                        </View>
                        {messages.length > 0 && (
                            <TouchableOpacity onPress={handleReset}>
                                <View className="flex-row items-center gap-2 px-3 py-1.5 bg-novagen-bg-secondary rounded-lg border border-novagen-blue/20">
                                    <RefreshCw size={14} color="#70BEFA" />
                                    <BodySmall className="text-novagen-blue mb-0">Reset</BodySmall>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                    <H2 className="text-lg mb-2">{lesson.title}</H2>

                    {/* Scenario - The context/situation */}
                    {lesson.scenario && (
                        <View className="bg-novagen-bg-secondary p-4 rounded-lg border border-novagen-blue/20 mb-3">
                            <Label className="text-xs text-novagen-blue mb-2">SCENARIO</Label>
                            <Body className="text-base text-white leading-6">{lesson.scenario}</Body>
                        </View>
                    )}

                    {/* Task - What the user should do */}
                    <View className="bg-novagen-bg-secondary p-3 rounded-lg border border-novagen-blue/10 mb-2">
                        <Label className="text-xs text-gray-400 mb-1">YOUR TASK</Label>
                        <Body className="text-sm text-gray-200 leading-5">{lesson.task}</Body>
                    </View>

                    {/* Easy Mode Toggle */}
                    {suggestions.length > 0 && (
                        <TouchableOpacity
                            onPress={() => {
                                setEasyModeEnabled(!easyModeEnabled);
                                if (easyModeEnabled) {
                                    setUsedSuggestion(false);
                                }
                                Haptics.selectionAsync();
                            }}
                            className="mt-3"
                        >
                            <View className={`flex-row items-center gap-2 px-3 py-2 rounded-lg ${easyModeEnabled
                                ? 'bg-novagen-blue/20 border border-novagen-blue/30'
                                : 'bg-novagen-bg-secondary border border-gray-700'
                                }`}>
                                <Zap size={14} color={easyModeEnabled ? '#70BEFA' : '#6B7280'} />
                                <BodySmall className={`mb-0 ${easyModeEnabled ? 'text-novagen-blue' : 'text-gray-400'}`}>
                                    {easyModeEnabled ? 'Easy Mode: ON' : 'Easy Mode: OFF'}
                                </BodySmall>
                                <BodySmall className="text-[10px] opacity-70 mb-0">(1/10 pts)</BodySmall>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Chat Area */}
                <ScrollView
                    ref={scrollViewRef}
                    className="flex-1 px-4 py-4"
                    contentContainerStyle={{ paddingBottom: 20 }}
                    onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                >
                    {/* Prompt Suggestions */}
                    {easyModeEnabled && suggestions.length > 0 && messages.length === 0 && (
                        <View className="mb-6">
                            <View className="flex-row items-center gap-2 mb-3">
                                <Sparkles size={14} color="#70BEFA" />
                                <Label className="text-xs text-gray-400 mb-0">SUGGESTED PROMPTS</Label>
                            </View>
                            <View className="space-y-2">
                                {suggestions.map((suggestion: string, index: number) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleUseSuggestion(suggestion)}
                                    >
                                        <View className="flex-row items-start gap-3 p-3 bg-novagen-bg-secondary border border-gray-700 rounded-xl">
                                            <Label className="text-novagen-blue text-xs mb-0">#{index + 1}</Label>
                                            <BodySmall className="flex-1 text-gray-300 mb-0">{suggestion}</BodySmall>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            {usedSuggestion && (
                                <View className="flex-row items-center gap-2 mt-3 px-3 py-2 bg-amber-950/20 border border-amber-500/30 rounded-lg">
                                    <AlertCircle size={14} color="#FBBF24" />
                                    <BodySmall className="text-amber-400 mb-0">
                                        Using suggestions reduces your score to 1/10 of normal points
                                    </BodySmall>
                                </View>
                            )}
                        </View>
                    )}

                    {/* Messages */}
                    {messages.map((msg, index) => (
                        <View
                            key={index}
                            className={`mb-4 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                        >
                            <View className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user'
                                ? 'bg-novagen-blue rounded-tr-none'
                                : 'bg-novagen-bg-secondary border border-novagen-blue/20 rounded-tl-none'
                                }`}>
                                <Body className={`mb-0 ${msg.role === 'user' ? 'text-black font-medium' : 'text-gray-200'}`}>
                                    {msg.content}
                                </Body>
                            </View>
                        </View>
                    ))}
                    {isLoading && (
                        <View className="items-start mb-4">
                            <View className="bg-novagen-bg-secondary border border-novagen-blue/20 p-4 rounded-2xl rounded-tl-none min-w-[80px] items-center justify-center">
                                <TypingIndicator />
                            </View>
                        </View>
                    )}

                    {evaluation && (
                        <View className="mt-4 mb-8">
                            <Card
                                className={evaluation.score < 70 ? "border-l-amber-500 bg-amber-950/10" : "bg-novagen-blue/10 border-novagen-blue/30"}
                            >
                                <CardContent className="p-6">
                                    <View className="flex-row items-center justify-between mb-2">
                                        <H2 className={`text-lg mb-0 ${evaluation.score >= 70 ? 'text-white' : 'text-amber-500'}`}>
                                            {evaluation.score >= 70 ? t('success') : t('needsImprovement')}
                                        </H2>
                                        <Label className={`text-lg mb-0 ${evaluation.score >= 70 ? 'text-novagen-blue' : 'text-amber-500'}`}>
                                            {evaluation.score}/100
                                        </Label>
                                    </View>
                                    {usedSuggestion && evaluation.originalScore && (
                                        <BodySmall className={`mb-2 ${evaluation.score >= 70 ? 'text-gray-300' : 'text-gray-400'}`}>
                                            (Original score: {evaluation.originalScore}/100, reduced for using suggestion)
                                        </BodySmall>
                                    )}

                                    {/* Score Breakdown */}
                                    {evaluation.breakdown && (
                                        <View className="mb-4 mt-3">
                                            <Label className="text-xs text-gray-400 mb-2">SCORE BREAKDOWN</Label>
                                            {Object.entries(evaluation.breakdown).map(([category, score]) => {
                                                const scoreValue = score as number;
                                                const percentage = (scoreValue / 25) * 100;
                                                const color = percentage >= 80 ? '#70BEFA' : percentage >= 60 ? '#FBBF24' : '#EF4444';
                                                return (
                                                    <View key={category} className="mb-2">
                                                        <View className="flex-row justify-between mb-1">
                                                            <BodySmall className="text-gray-300 capitalize mb-0">{category}</BodySmall>
                                                            <BodySmall className="text-gray-400 mb-0">{scoreValue}/25</BodySmall>
                                                        </View>
                                                        <View className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                            <View
                                                                style={{
                                                                    width: `${percentage}%`,
                                                                    backgroundColor: color
                                                                }}
                                                                className="h-full"
                                                            />
                                                        </View>
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    )}

                                    <Body className={`mb-6 ${evaluation.score >= 70 ? 'text-gray-200' : 'text-gray-300'}`}>
                                        {evaluation.mainFeedback}
                                    </Body>

                                    <View className="flex-row gap-3">
                                        {evaluation.score >= 70 && (
                                            <Button
                                                variant="default"
                                                onPress={handleContinue}
                                                className="flex-1"
                                            >
                                                {t('continue')}
                                            </Button>
                                        )}
                                        <Button
                                            variant={evaluation.score >= 70 ? "ghost" : "secondary"}
                                            onPress={handleReset}
                                            className={evaluation.score >= 70 ? "" : "flex-1"}
                                        >
                                            <View className="flex-row items-center gap-2">
                                                <RefreshCw size={16} color={evaluation.score >= 70 ? "#70BEFA" : "white"} />
                                                <Text className={evaluation.score >= 70 ? "text-novagen-blue font-bold" : "text-white font-bold"}>
                                                    Try Again
                                                </Text>
                                            </View>
                                        </Button>
                                    </View>
                                </CardContent>
                            </Card>
                        </View>
                    )}
                </ScrollView>

                {/* Input Area */}
                <View className="p-4 bg-novagen-bg-primary border-t border-novagen-blue/20">
                    <View className="flex-row gap-3">
                        <TextInput
                            className="flex-1 bg-novagen-bg-secondary border border-novagen-blue/30 rounded-xl px-4 py-3 text-white text-base"
                            style={{ minHeight: 56 }}
                            placeholder={t('typePromptPlaceholder') || 'Write your prompt here...'}
                            placeholderTextColor="#6B7280"
                            value={input}
                            onChangeText={setInput}
                            onSubmitEditing={handleSend}
                            returnKeyType="send"
                            multiline
                        />
                        <Button
                            size="icon"
                            onPress={handleSend}
                            className="h-14 w-14 rounded-xl"
                            disabled={isLoading || !input.trim()}
                        >
                            <Send size={24} color="black" />
                        </Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
