import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator } from "react-native";
import { styled } from "nativewind";
import * as Haptics from 'expo-haptics';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

interface ButtonProps extends TouchableOpacityProps {
    variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
    children: React.ReactNode;
    isLoading?: boolean;
}

export function Button({
    variant = "default",
    size = "default",
    className,
    children,
    isLoading,
    disabled,
    onPress,
    ...props
}: ButtonProps) {
    let variantClasses = "";
    let textClasses = "";

    switch (variant) {
        case "default":
            variantClasses = "bg-primary";
            textClasses = "text-primary-foreground font-bold";
            break;
        case "secondary":
            variantClasses = "bg-secondary";
            textClasses = "text-secondary-foreground";
            break;
        case "outline":
            variantClasses = "border border-input bg-transparent";
            textClasses = "text-foreground";
            break;
        case "ghost":
            variantClasses = "bg-transparent";
            textClasses = "text-foreground";
            break;
        case "destructive":
            variantClasses = "bg-destructive";
            textClasses = "text-destructive-foreground";
            break;
    }

    let sizeClasses = "";
    switch (size) {
        case "default":
            sizeClasses = "h-12 px-6 py-3";
            break;
        case "sm":
            sizeClasses = "h-9 px-3";
            break;
        case "lg":
            sizeClasses = "h-14 px-8";
            break;
        case "icon":
            sizeClasses = "h-10 w-10 items-center justify-center";
            break;
    }

    const handlePress = (e: any) => {
        if (!disabled && !isLoading) {
            Haptics.selectionAsync();
            onPress?.(e);
        }
    };

    return (
        <StyledTouchableOpacity
            onPress={handlePress}
            className={`flex-row items-center justify-center rounded-lg ${variantClasses} ${sizeClasses} ${disabled || isLoading ? "opacity-50" : ""
                } ${className || ""}`}
            disabled={disabled || isLoading}
            activeOpacity={0.7}
            {...props}
        >
            {isLoading ? (
                <ActivityIndicator color={variant === "default" ? "black" : "white"} className="mr-2" />
            ) : null}
            {typeof children === "string" ? (
                <StyledText className={`text-center font-medium ${textClasses}`}>
                    {children}
                </StyledText>
            ) : (
                children
            )}
        </StyledTouchableOpacity>
    );
}
