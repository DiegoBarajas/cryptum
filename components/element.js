import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { theme } from "../theme";

export default function Element({ item }) {
    return (
        <TouchableOpacity style={customStyles.card}>
            <View style={customStyles.row}>
                <FontAwesome
                    name={item.icon.toLowerCase()}
                    size={40}
                    color={theme.colors.primary}
                    style={customStyles.icon}
                />

                <View style={customStyles.textContainer}>
                    <Text style={customStyles.title}>{item.name}</Text>
                    <Text style={customStyles.subtitle}>{item.email}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const customStyles = StyleSheet.create({
    card: {
        width: "100%",
        maxWidth: 600,
        backgroundColor: "#1e1e1e",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginRight: 16,
    },
    textContainer: {
        flexShrink: 1,
    },
    title: {
        fontSize: 18,
        color: theme.colors.textPrimary,
        fontWeight: "600",
    },
    subtitle: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginTop: 4,
    },
});
