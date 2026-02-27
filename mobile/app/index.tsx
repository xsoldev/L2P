import { PromptEngineeringGame } from '@/components/PromptEngineeringGame';
import { View } from 'react-native';
import { Stack } from 'expo-router';

export default function Index() {
    return (
        <View className="flex-1 bg-novagen-bg-primary">
            <Stack.Screen options={{ headerShown: false }} />
            <PromptEngineeringGame />
        </View>
    );
}
