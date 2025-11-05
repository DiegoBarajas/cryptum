import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { theme } from "../theme";
import { AntDesign, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Element({ item }) {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => router.push(`/passwords/${item.index}`) } style={customStyles.card}>
            <View style={customStyles.row}>
                <Icon icon={item.icon} itemName={item.name} />

                <View style={customStyles.textContainer}>
                    <Text style={customStyles.title}>{item.name}</Text>
                    <Text style={customStyles.subtitle}>{showName(item)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const showName = (item) => {
    function isSetted(value) {
        console.log(value);
        
        if(value && value != "") return true;
        else return false;
    }

    if(isSetted(item.email)) return item.email;
    else if(isSetted(item.password)) return "*".repeat(item.password.length)
    else return "";
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
                style={customStyles.icon}
            />
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
    }, letterContainer: {
        width: 40,
        height: 40,
        justifyContent: "start",
        alignItems: "center",
        marginRight: 16,
    },
    letter: {
        fontSize: 30,
        color: theme.colors.primary,
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
