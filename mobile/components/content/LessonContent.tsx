import React from 'react';
import { View } from 'react-native';
import { Card, CardContent } from '@/components/ui/Card';
import { H2, Body, Label, BodySmall } from '@/components/ui/Typography';
import { XCircle, CheckCircle, Sparkles, Book, Target, Zap } from 'lucide-react-native';

interface LessonContentProps {
    lesson: any;
}

export const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
    if (lesson.id === 'intro') {
        return (
            <View className="space-y-6">
                <Card variant="accent-left" className="border-l-red-500 bg-red-950/10">
                    <CardContent className="p-4">
                        <View className="flex-row items-center gap-2 mb-2">
                            <XCircle size={16} color="#F87171" />
                            <Label className="text-red-400 mb-0">{lesson.vaguePromptLabel}</Label>
                        </View>
                        <Body className="text-gray-300 italic">{lesson.vaguePromptExample}</Body>
                    </CardContent>
                </Card>

                <Card className="bg-amber-950/10 border-amber-500/30">
                    <CardContent className="p-4">
                        <Label className="text-amber-400 mb-2">{lesson.whatAiMightDoLabel}</Label>
                        <View className="space-y-2">
                            {lesson.aiProblems.map((problem: string, index: number) => (
                                <View key={index} className="flex-row items-start gap-2">
                                    <BodySmall className="text-novagen-blue mt-0.5">—</BodySmall>
                                    <BodySmall className="text-gray-300 flex-1">{problem}</BodySmall>
                                </View>
                            ))}
                        </View>
                    </CardContent>
                </Card>

                <Card variant="outline" className="bg-novagen-bg-primary">
                    <CardContent className="p-4">
                        <View className="flex-row items-center gap-2 mb-2">
                            <Sparkles size={16} color="#70BEFA" />
                            <Label className="text-novagen-blue mb-0">{lesson.solutionLabel}</Label>
                        </View>
                        <Body className="text-gray-300 text-sm">{lesson.solutionText}</Body>
                    </CardContent>
                </Card>
            </View>
        );
    }

    if (lesson.id === 'lesson1') {
        return (
            <View className="space-y-6">
                <Card variant="default" className="bg-novagen-bg-primary">
                    <CardContent className="p-4">
                        <View className="flex-row items-center gap-2 mb-3">
                            <Book size={16} color="#70BEFA" />
                            <Label className="text-novagen-blue mb-0">{lesson.keyPrincipleLabel}</Label>
                        </View>
                        <Body className="text-gray-300 mb-4 text-sm">{lesson.keyPrincipleText}</Body>

                        <View className="bg-novagen-bg-secondary p-3 rounded-xl border border-novagen-blue/20">
                            <Label className="text-white mb-2">{lesson.exampleLabel}</Label>
                            <View className="space-y-2">
                                {lesson.exampleSteps.map((step: string, index: number) => (
                                    <View key={index} className="flex-row items-start gap-2">
                                        <Label className="text-novagen-blue min-w-[16px] mb-0">{index + 1}.</Label>
                                        <BodySmall className="text-gray-300 flex-1">{step}</BodySmall>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </CardContent>
                </Card>

                <Card variant="flat-blue" className="bg-novagen-blue/10 border-novagen-blue/20">
                    <CardContent className="p-4">
                        <Label className="text-novagen-blue mb-3">{lesson.whyWorksLabel}</Label>
                        <View className="space-y-2">
                            {lesson.benefits.map((benefit: string, index: number) => (
                                <View key={index} className="flex-row items-start gap-2">
                                    <CheckCircle size={16} color="#70BEFA" />
                                    <BodySmall className="text-gray-300 flex-1">{benefit}</BodySmall>
                                </View>
                            ))}
                        </View>
                    </CardContent>
                </Card>
            </View>
        );
    }

    if (lesson.id === 'lesson2') {
        return (
            <View className="space-y-6">
                <Card variant="outline">
                    <CardContent className="p-4">
                        <View className="flex-row items-center gap-2 mb-2">
                            <Target size={16} color="#70BEFA" />
                            <Label className="text-novagen-blue mb-0">{lesson.keyPrincipleLabel}</Label>
                        </View>
                        <Body className="text-gray-300 text-sm">{lesson.keyPrincipleText}</Body>
                    </CardContent>
                </Card>

                <View className="space-y-4">
                    <Card variant="accent-left" className="border-l-red-500 bg-red-950/10">
                        <CardContent className="p-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <XCircle size={16} color="#F87171" />
                                <Label className="text-red-400 mb-0">{lesson.vagueLabel}</Label>
                            </View>
                            <Body className="text-gray-300 italic mb-2">{lesson.vagueExample}</Body>
                            <BodySmall className="text-gray-400">{lesson.vagueQuestion}</BodySmall>
                        </CardContent>
                    </Card>

                    <Card variant="accent-left" className="border-l-novagen-blue bg-novagen-blue/10">
                        <CardContent className="p-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <CheckCircle size={16} color="#70BEFA" />
                                <Label className="text-novagen-blue mb-0">{lesson.specificLabel}</Label>
                            </View>
                            <Body className="text-gray-300 italic mb-2">{lesson.specificExample}</Body>
                            <BodySmall className="text-gray-400">{lesson.specificNote}</BodySmall>
                        </CardContent>
                    </Card>
                </View>

                <Card>
                    <CardContent className="p-4">
                        <Label className="text-white mb-3">{lesson.specificsLabel}</Label>
                        <View className="space-y-3">
                            {lesson.specificTypes.map((item: any, index: number) => (
                                <View key={index} className="flex-row items-start gap-2">
                                    <View className="w-1.5 h-1.5 bg-novagen-blue rounded-full mt-1.5" />
                                    <View className="flex-1">
                                        <Body className="font-semibold text-white text-sm">{item.type}</Body>
                                        <BodySmall className="text-gray-400">{item.example}</BodySmall>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </CardContent>
                </Card>
            </View>
        );
    }

    if (lesson.id === 'lesson3') {
        return (
            <View className="space-y-6">
                <Card variant="outline">
                    <CardContent className="p-4">
                        <View className="flex-row items-center gap-2 mb-2">
                            <Zap size={16} color="#70BEFA" />
                            <Label className="text-novagen-blue mb-0">{lesson.keyPrincipleLabel}</Label>
                        </View>
                        <Body className="text-gray-300 text-sm">{lesson.keyPrincipleText}</Body>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <Label className="text-white mb-3">{lesson.conversationLabel}</Label>
                        <View className="space-y-3">
                            <View className="bg-novagen-bg-primary p-3 rounded-xl border border-novagen-blue/20">
                                <Label className="text-novagen-blue text-xs mb-1">{lesson.conversationExample.userLabel}</Label>
                                <BodySmall className="text-gray-200">{lesson.conversationExample.userMessage}</BodySmall>
                            </View>

                            <View className="bg-novagen-bg-primary p-3 rounded-xl border border-gray-700">
                                <Label className="text-gray-400 text-xs mb-1">{lesson.conversationExample.aiLabel}</Label>
                                <BodySmall className="text-gray-300 italic">{lesson.conversationExample.aiMessage}</BodySmall>
                            </View>

                            <View className="bg-novagen-bg-primary p-3 rounded-xl border border-novagen-blue/20">
                                <Label className="text-novagen-blue text-xs mb-1">{lesson.conversationExample.correctionLabel}</Label>
                                <BodySmall className="text-gray-200">{lesson.conversationExample.correctionMessage}</BodySmall>
                            </View>
                        </View>
                    </CardContent>
                </Card>

                <Card variant="flat-blue" className="bg-novagen-blue/10 border-novagen-blue/20">
                    <CardContent className="p-4">
                        <Label className="text-novagen-blue mb-2">{lesson.correctionTipsLabel}</Label>
                        <View className="space-y-2">
                            {lesson.correctionTips.map((tip: string, index: number) => (
                                <View key={index} className="flex-row items-start gap-2">
                                    <CheckCircle size={16} color="#70BEFA" />
                                    <BodySmall className="text-gray-300 flex-1">{tip}</BodySmall>
                                </View>
                            ))}
                        </View>
                    </CardContent>
                </Card>
            </View>
        );
    }

    return (
        <View className="space-y-4">
            <Card variant="outline">
                <CardContent className="p-4">
                    <View className="flex-row items-center gap-2 mb-2">
                        <Book size={16} color="#70BEFA" />
                        <Label className="text-novagen-blue mb-0">{lesson.keyPrincipleLabel}</Label>
                    </View>
                    <Body className="text-gray-300 text-sm">{lesson.keyPrincipleText}</Body>
                </CardContent>
            </Card>
            <BodySmall className="text-gray-400 italic">Content for this lesson is being ported...</BodySmall>
        </View>
    );
};
