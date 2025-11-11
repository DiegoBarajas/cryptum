import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import packageJson from "../package.json"
import { useRouter } from "expo-router";
import Bar from "../components/bar";
import { styles } from "../styles";
import { useEffect } from "react";

import { authenticate } from "../utilities/auth"

import icon from "../assets/icon.png"
import fingerprint from "../assets/fingerprint.png"

export default function Home() {
    const insets = useSafeAreaInsets();

    const router = useRouter();

    useEffect(() => {
        authenticate("Ingresar", navigate);
    }, []);

    const login = () => {
        authenticate("Ingresar", navigate);
    }

    const navigate = () => {
        router.push("/passwords");
    }

    return (
        <View style={customStyles.screen}>
            <Bar />
            <Image
                style={customStyles.icon}
                source={icon}
            />
            <Text style={customStyles.heading}>Cryptum</Text>

            <View style={[customStyles.footer, { bottom: insets.bottom + 25 }]}>
                <TouchableOpacity style={customStyles.button} onPress={login}>
                    <Image
                        style={customStyles.iconButton}
                        source={fingerprint}
                    />
                    <Text style={styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>

                <Text style={customStyles.text}>
                    Ingresa tu huella para comenzar
                </Text>
            </View>

            <Text 
                style={[
                        styles.secondaryText, 
                        {fontSize: 12, position: "absolute", bottom: insets.bottom+5, right: 15,  alignSelf: "flex-end"}
                    ]}
                onPress={() => router.push("list")}
            >vBeta {packageJson.version}</Text>

        </View>
    );
}

const customStyles = StyleSheet.create({
    screen: {
        ...styles.screen,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        width: 150,
        height: 150
    },
    heading: {
        ...styles.heading,
        alignSelf: "center",
        marginTop: 10
    },
    text: {
        ...styles.secondaryText,
        alignSelf: "center",
        textAlign: "justify",
        marginTop: 4
    },
    iconButton: {
        width: 35,
        height: 35
    },
    button: {
        ...styles.button,
        paddingLeft: 50,
        paddingRight: 50
    },

    footer: {
        position: "absolute"
    }
})
