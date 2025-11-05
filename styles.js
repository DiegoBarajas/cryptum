import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const styles = StyleSheet.create({
    // Fondo general
    screen: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.lg,
    },

    // Textos
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.text.baseSize,
        fontFamily: theme.text.fontFamily,
    },
    secondaryText: {
        color: theme.colors.textSecondary,
        fontSize: theme.text.baseSize,
        fontFamily: theme.text.fontFamily,
    },

    // Titulos
    heading: {
        color: theme.colors.textPrimary,
        fontSize: theme.text.headingSize,
        fontWeight: "700",
        marginBottom: theme.spacing.md,
    },

    // Botones genéricos
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
        borderRadius: theme.radius.md,
        alignItems: "center",
        justifyContent: "center",
        marginTop: theme.spacing.md,
    },
    buttonText: {
        color: theme.colors.textPrimary,
        fontSize: theme.text.baseSize,
        fontWeight: "600",
    },

    secondaryButton: {
        backgroundColor: theme.colors.textPrimary,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
        borderRadius: theme.radius.md,
        alignItems: "center",
        justifyContent: "center",
        marginTop: theme.spacing.md,
    },
    secondaryButtonText: {
        color: theme.colors.primary,
        fontSize: theme.text.baseSize,
        fontWeight: "600",

    }
});
