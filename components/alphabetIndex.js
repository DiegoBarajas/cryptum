import { useRef } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import Group from "./group"
import { theme } from "../theme";

export default function NinetyTenExample({ data }) {
    const alphabet = "#ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

    const scrollViewRef = useRef();
    const groupRefs = useRef({}); // almacenar refs de cada grupo

    const goToLetter = (letter) => {
        const ref = groupRefs.current[letter];
        if (ref) {
            ref.measureLayout(
                scrollViewRef.current,
                (x, y) => {
                    scrollViewRef.current.scrollTo({ y, animated: true });
                }
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <ScrollView 
                    style={styles.scroll}
                    showsVerticalScrollIndicator={false}
                    ref={scrollViewRef}
                >
                    {Object.entries(data).length === 0 && (
                        <Text style={styles.textNoPass}>
                            No hay contraseñas guardadas.
                        </Text>
                    )}

                    {Object.entries(data).map(([key, value]) => (
                        <View
                            key={`group-${key}`}
                            ref={(ref) => (groupRefs.current[key] = ref)}
                        >
                            <Group title={key} items={value} />
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.alphabet}>
                    {alphabet.split("").map((letter) => (
                        <TouchableOpacity
                            style={styles.letterButton}
                            key={`letter-${letter}`}
                            onPress={() => goToLetter(letter)}
                        >
                            <Text style={styles.text}>{letter}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    row: { flexDirection: "row", flex: 1 },
    scroll: { width: "90%" },
    alphabet: {
        width: "10%",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 10,
    },
    letterButton: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
    },
    text: {
        color: theme.colors.textPrimary,
        fontWeight: "bold",
        fontSize: 15,
    },
    textNoPass: {
        color: theme.colors.textPrimary,
        alignSelf: "center",
        marginTop: "100%",
        marginLeft: 20
    },
});
