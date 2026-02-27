import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

export const TypingIndicator: React.FC = () => {
    const dot1Opacity = useRef(new Animated.Value(0.3)).current;
    const dot2Opacity = useRef(new Animated.Value(0.3)).current;
    const dot3Opacity = useRef(new Animated.Value(0.3)).current;

    const dot1TranslateY = useRef(new Animated.Value(0)).current;
    const dot2TranslateY = useRef(new Animated.Value(0)).current;
    const dot3TranslateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const createAnimation = (opacity: Animated.Value, translateY: Animated.Value, delay: number) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.parallel([
                        Animated.timing(opacity, {
                            toValue: 1,
                            duration: 400,
                            useNativeDriver: true,
                        }),
                        Animated.timing(translateY, {
                            toValue: -4,
                            duration: 400,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.parallel([
                        Animated.timing(opacity, {
                            toValue: 0.3,
                            duration: 400,
                            useNativeDriver: true,
                        }),
                        Animated.timing(translateY, {
                            toValue: 0,
                            duration: 400,
                            useNativeDriver: true,
                        }),
                    ]),
                ])
            );
        };

        const anim1 = createAnimation(dot1Opacity, dot1TranslateY, 0);
        const anim2 = createAnimation(dot2Opacity, dot2TranslateY, 150);
        const anim3 = createAnimation(dot3Opacity, dot3TranslateY, 300);

        anim1.start();
        anim2.start();
        anim3.start();

        return () => {
            anim1.stop();
            anim2.stop();
            anim3.stop();
        };
    }, []);

    const dotStyle = {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#70BEFA', // novagen-blue
        marginHorizontal: 2,
    };

    return (
        <View className="flex-row items-center justify-center py-2">
            <Animated.View style={[dotStyle, { opacity: dot1Opacity, transform: [{ translateY: dot1TranslateY }] }]} />
            <Animated.View style={[dotStyle, { opacity: dot2Opacity, transform: [{ translateY: dot2TranslateY }] }]} />
            <Animated.View style={[dotStyle, { opacity: dot3Opacity, transform: [{ translateY: dot3TranslateY }] }]} />
        </View>
    );
};
