import { Text, TextProps } from "react-native";
import { styled } from "nativewind";

const StyledText = styled(Text);

interface TypographyProps extends TextProps {
    className?: string;
    children: React.ReactNode;
}

export function H1({ className, children, ...props }: TypographyProps) {
    return (
        <StyledText
            className={`text-4xl font-bold text-foreground ${className || ""}`}
            {...props}
        >
            {children}
        </StyledText>
    );
}

export function H2({ className, children, ...props }: TypographyProps) {
    return (
        <StyledText
            className={`text-3xl font-bold text-foreground ${className || ""}`}
            {...props}
        >
            {children}
        </StyledText>
    );
}

export function H3({ className, children, ...props }: TypographyProps) {
    return (
        <StyledText
            className={`text-2xl font-semibold text-foreground ${className || ""}`}
            {...props}
        >
            {children}
        </StyledText>
    );
}

export function Body({ className, children, ...props }: TypographyProps) {
    return (
        <StyledText
            className={`text-base text-muted-foreground ${className || ""}`}
            {...props}
        >
            {children}
        </StyledText>
    );
}

export function BodySmall({ className, children, ...props }: TypographyProps) {
    return (
        <StyledText
            className={`text-sm text-muted-foreground ${className || ""}`}
            {...props}
        >
            {children}
        </StyledText>
    );
}

export function Label({ className, children, ...props }: TypographyProps) {
    return (
        <StyledText
            className={`text-sm font-medium text-foreground ${className || ""}`}
            {...props}
        >
            {children}
        </StyledText>
    );
}
