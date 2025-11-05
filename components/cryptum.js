import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../styles";
import { theme } from "../theme";

import backImg from "../assets/back.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Title({ back = false }) {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const customStyles = StyleSheet.create({
        title: {
            marginTop: insets.top,
            marginBottom: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-start",
        },
        heading: {
            ...styles.heading,
            color: theme.colors.primary,
            marginBottom: 0
        },
        back: {
            width: 20,
            height: 20,
            marginRight: 10,
        },
    });

    return (
        <TouchableOpacity 
            style={customStyles.title} 
            onPress={() => back && router.back()}
            activeOpacity={back ? 0.7 : 1}
        >
            {back && (
                <Image source={backImg} style={customStyles.back} />
            )}
            <Text style={customStyles.heading}>Cryptum</Text>
        </TouchableOpacity>
    );
}


