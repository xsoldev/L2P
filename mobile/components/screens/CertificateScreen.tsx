import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Share2, Download, RotateCcw } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { H1, H2, Body, Label } from '@/components/ui/Typography';
import * as Haptics from 'expo-haptics';

interface CertificateScreenProps {
    userName: string;
    score: number;
    onReset: () => void;
    t: (key: string) => string;
}

export const CertificateScreen: React.FC<CertificateScreenProps> = ({ userName, score, onReset, t }) => {
    return (
        <SafeAreaView className="flex-1 bg-novagen-bg-primary">
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, alignItems: 'center', justifyContent: 'center' }}>

                <View className="items-center mb-8">
                    <Trophy size={64} color="#FFD700" />
                    <H1 className="text-3xl text-center mt-6 mb-2">{t('congratulations')}</H1>
                    <Body className="text-center">{t('courseCompleted')}</Body>
                </View>

                {/* Certificate Card */}
                <Card className="w-full mb-8 border-2 border-[#FFD700] bg-novagen-bg-secondary shadow-2xl shadow-[#FFD700]/20">
                    <CardContent className="items-center py-10">
                        <Label className="text-[#FFD700] text-lg mb-6 tracking-[0.2em]">CERTIFICATE OF COMPLETION</Label>

                        <Body className="text-sm mb-2">Presented to</Body>
                        <H2 className="text-3xl text-center mb-6 text-white">{userName || 'Prompt Engineer'}</H2>

                        <Body className="text-sm mb-2">for mastering</Body>
                        <H2 className="text-xl text-novagen-blue mb-8 text-center">Advanced Prompt Engineering</H2>

                        <View className="w-full h-px bg-novagen-blue/30 mb-8" />

                        <View className="flex-row justify-between w-full px-4">
                            <View>
                                <Label className="text-gray-500 text-xs mb-1">SCORE</Label>
                                <H2 className="text-xl mb-0">{score} pts</H2>
                            </View>
                            <View className="items-end">
                                <Label className="text-gray-500 text-xs mb-1">DATE</Label>
                                <H2 className="text-xl mb-0">{new Date().toLocaleDateString()}</H2>
                            </View>
                        </View>
                    </CardContent>
                </Card>

                {/* Actions */}
                <View className="w-full space-y-4">
                    <Button
                        onPress={() => { Haptics.selectionAsync(); }}
                        className="w-full flex-row justify-center gap-3"
                    >
                        <Share2 size={20} color="black" />
                        <Text className="text-black font-bold">{t('shareCertificate')}</Text>
                    </Button>

                    <Button
                        variant="secondary"
                        onPress={() => { Haptics.selectionAsync(); }}
                        className="w-full flex-row justify-center gap-3"
                    >
                        <Download size={20} color="white" />
                        <Text className="text-white font-bold">{t('downloadCertificate')}</Text>
                    </Button>

                    <Button
                        variant="ghost"
                        onPress={onReset}
                        className="w-full flex-row justify-center gap-3 mt-4"
                    >
                        <RotateCcw size={20} color="#70BEFA" />
                        <Text className="text-novagen-blue font-bold">{t('startNewGame')}</Text>
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
