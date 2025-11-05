import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { styles } from "../styles";
import { useRouter } from "expo-router";
import { authenticate } from "../utilities/auth"
import { useEffect } from "react";

import icon from "../assets/icon.png"
import fingerprint from "../assets/fingerprint.png"
import Bar from "../components/bar";

export default function Home() {
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

            <View style={customStyles.footer}>
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
        position: "absolute",
        bottom: 70
    }
})
