/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                border: "#70BEFA",
                input: "#262626",
                ring: "#70BEFA",
                background: "#0D0D0D",
                foreground: "#FFFFFF",
                primary: {
                    DEFAULT: "#70BEFA",
                    foreground: "#0D0D0D",
                },
                secondary: {
                    DEFAULT: "#1A1A1A",
                    foreground: "#FFFFFF",
                },
                destructive: {
                    DEFAULT: "#EF4444",
                    foreground: "#FFFFFF",
                },
                muted: {
                    DEFAULT: "#262626",
                    foreground: "#A3A3A3",
                },
                accent: {
                    DEFAULT: "#262626",
                    foreground: "#FFFFFF",
                },
                popover: {
                    DEFAULT: "#1A1A1A",
                    foreground: "#FFFFFF",
                },
                card: {
                    DEFAULT: "#1A1A1A",
                    foreground: "#FFFFFF",
                },
                // Novagen Brand Colors
                novagen: {
                    blue: {
                        DEFAULT: "#70BEFA",
                        dark: "#5AAFED",
                        light: "#8CCFFD",
                        darker: "#4A9FE0",
                    },
                    bg: {
                        primary: "#0D0D0D",
                        secondary: "#1A1A1A",
                    }
                }
            },
            fontFamily: {
                sans: ["System", "sans-serif"],
                mono: ["System", "monospace"],
            },
            spacing: {
                xs: "0.25rem", // 4px
                sm: "0.5rem",  // 8px
                md: "1rem",    // 16px
                lg: "1.5rem",  // 24px
                xl: "2rem",    // 32px
                "2xl": "3rem", // 48px
                "3xl": "4rem", // 64px
            }
        },
    },
    plugins: [],
}
