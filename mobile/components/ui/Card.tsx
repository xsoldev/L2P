import { View, ViewProps } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);

interface CardProps extends ViewProps {
    className?: string;
    children: React.ReactNode;
    variant?: string;
}

export function Card({ className, children, variant, ...props }: CardProps) {
    return (
        <StyledView
            className={`bg-card rounded-xl border border-border p-4 shadow-sm ${className || ""}`}
            {...props}
        >
            {children}
        </StyledView>
    );
}

export function CardHeader({ className, children, ...props }: CardProps) {
    return (
        <StyledView className={`mb-4 ${className || ""}`} {...props}>
            {children}
        </StyledView>
    );
}

export function CardTitle({ className, children, ...props }: CardProps) {
    return (
        <StyledView className={`${className || ""}`} {...props}>
            {children}
        </StyledView>
    );
}

export function CardDescription({ className, children, ...props }: CardProps) {
    return (
        <StyledView className={`mt-1 ${className || ""}`} {...props}>
            {children}
        </StyledView>
    );
}

export function CardContent({ className, children, ...props }: CardProps) {
    return (
        <StyledView className={`${className || ""}`} {...props}>
            {children}
        </StyledView>
    );
}

export function CardFooter({ className, children, ...props }: CardProps) {
    return (
        <StyledView className={`mt-4 flex-row items-center ${className || ""}`} {...props}>
            {children}
        </StyledView>
    );
}
