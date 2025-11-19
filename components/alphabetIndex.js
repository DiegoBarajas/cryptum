import { useRef } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import Group from "./group"
import { theme } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function AlphabetIndex({ data, totalElements = 0, textIfEmpty = "No hay coincidencias con la búsqueda." }) {
    const insets = useSafeAreaInsets();
    const alphabet = "#ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

    const scrollViewRef = useRef();
    const groupRefs = useRef({}); // almacenar refs de cada grupo

    const goToLetter = (letter) => {
        const lettersAvailable = Object.keys(groupRefs.current);

        // Si existe la letra, scroll normal
        if (groupRefs.current[letter]) {
            scrollToLetter(letter);
            return;
        }

        // Buscar la más cercana hacia abajo primero (preferencia)
        const alphabetArray = alphabet.split("");
        const index = alphabetArray.indexOf(letter);

        // Buscar hacia abajo
        for (let i = index + 1; i < alphabetArray.length; i++) {
            const down = alphabetArray[i];
            if (groupRefs.current[down]) {
                scrollToLetter(down);
                return;
            }
        }

        // Si no encontró abajo, buscar hacia arriba
        for (let i = index - 1; i >= 0; i--) {
            const up = alphabetArray[i];
            if (groupRefs.current[up]) {
                scrollToLetter(up);
                return;
            }
        }
    };

    // Separo para mejor claridad
    const scrollToLetter = (letter) => {
        const ref = groupRefs.current[letter];
        if (!ref) return;

        ref.measureLayout(
            scrollViewRef.current,
            (x, y) => {
                scrollViewRef.current.scrollTo({ y, animated: true });
            }
        );
    };

    const styles = StyleSheet.create({
        container: { flex: 1 },
        row: { flexDirection: "row", flex: 1 },
        scroll: { width: "90%" },
        alphabet: {
            width: "10%",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 10,
            paddingBottom: insets.bottom
        },
        letterButton: {
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
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
        sep: {
            marginBottom: 30
        }
    });

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
                            {textIfEmpty}
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
                    <View style={styles.sep} />
                </ScrollView>

                <View style={styles.alphabet}>
                    {alphabet.split("").map((letter) => (
                        <TouchableOpacity
                            style={styles.letterButton}
                            key={`letter-${letter}`}
                            onPress={() => goToLetter(letter)}
                            onPressIn={() => goToLetter(letter)}
                        >
                            <Text style={styles.text}>{letter}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
}

