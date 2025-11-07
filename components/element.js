import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { theme } from "../theme";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

import { useRouter } from "expo-router";

export default function Element({ item }) {
    const router = useRouter();

    return (
        <TouchableOpacity style={customStyles.card} onPress={() => router.push(`/passwords/${item.index}`)}>
            <View style={customStyles.row}>
                <Icon icon={item.icon} itemName={item.name} />
                <View style={customStyles.textContainer}>
                    <Text 
                        style={customStyles.title}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >{item.name}</Text>
                    <Text style={customStyles.subtitle}>{item.username}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

function Icon({ icon, itemName }) {
    const [type, name] = icon.split(":");
    if (type == "FontAwesome")
        return (
            <FontAwesome
                name={name}
                size={40}
                color={theme.colors.primary}
                style={customStyles.icon}
            />
        )
    else if (type == "FontAwesome5")
        return (
            <FontAwesome5
                name={name}
                size={40}
                color={theme.colors.primary}
                style={customStyles.icon} />
        )
    else
        return (
            <View style={customStyles.letterContainer}>
                <Text style={customStyles.letter}>{itemName[0].toUpperCase()}</Text>
            </View>
        )
}

const customStyles = StyleSheet.create({
    card: {
        width: "100%",
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
    letterContainer: { 
        justifyContent: "center", 
        alignItems: "center", 
        minWidth: 40, 
        height: 40 
    },
    letter: {
        textAlign: "center",
        lineHeight: 50,
        fontSize: 40,
        color: theme.colors.primary,
        marginRight: 16,
        fontWeight: "bold",
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