import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from "react-native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { RootSiblingParent } from "react-native-root-siblings";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as Clipboard from 'expo-clipboard';
import Toast from "react-native-root-toast";

import Store from "../../utilities/store";
import { styles } from "../../styles";
import { theme } from "../../theme";

import copy from "../../assets/copy.png"
import back from "../../assets/back.png";

export default function Add() {
    const { indx } = useLocalSearchParams();
    const router = useRouter();

    const [pass, setPass] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        const getPass = async () => {
            const store = new Store();
            await store.init();

            const password = await store.getByIndex(indx);
            setPass(password);
        }

        getPass();
    }, []);

    const goHome = () => {
        router.replace("/passwords");
    }

    const handleDelete = async () => {
        const store = new Store();
        await store.init();
        await store.deleteByIndex(indx);
        setShowConfirm(false);
        router.replace("/passwords");
    };

    const copyToClipboard = async (value) => {
        if (!value) return;
        await Clipboard.setStringAsync(value);
        Toast.show("Copiado al portapapeles", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            backgroundColor: "#222",
            textColor: theme.colors.primary,
        });
    };

    return (
        <RootSiblingParent>
            <View style={styles.screen}>
                {/* Header */}
                <Text style={customStyles.heading} onPress={goHome}>
                    <Image source={back} style={customStyles.back} />
                    Cryptum
                </Text>

                {pass ? (
                    <>
                        {/* Icono y nombre */}
                        <View style={customStyles.iconBox}>
                            <Icon icon={pass.icon} itemName={pass.name} />
                            <Text style={styles.text}>{pass.name}</Text>
                        </View>

                        {/* Campos */}
                        {renderValue("Correo/usuario", pass.email, copyToClipboard)}
                        {renderValue("Contraseña", pass.password, copyToClipboard)}

                        {/* Botones */}
                        <TouchableOpacity
                            onPress={() => router.push(`/passwords/edit/${indx}`)}
                            style={customStyles.editButton}
                        >
                            <Text style={styles.buttonText}>Editar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setShowConfirm(true)}
                            style={customStyles.deleteButton}
                        >
                            <Text style={customStyles.deleteButtonText}>Eliminar</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <View style={customStyles.iconBox}>
                        <Text style={styles.text}>Cargando...</Text>
                    </View>
                )}

                {/* Modal de confirmación */}
                <Modal
                    transparent
                    visible={showConfirm}
                    animationType="fade"
                    onRequestClose={() => setShowConfirm(false)}
                >
                    <View style={customStyles.modalOverlay}>
                        <View style={customStyles.modalBox}>
                            <Text style={styles.text}>¿Estás seguro de que quieres eliminar este elemento?</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                                <TouchableOpacity onPress={() => setShowConfirm(false)}>
                                    <Text style={{ color: theme.colors.primary }}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleDelete}>
                                    <Text style={{ color: "#ff4444" }}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </RootSiblingParent>
    );
}

// Componente de icono
function Icon({ icon, itemName }) {
    const [type, name] = icon.split(":");

    if (type === "FontAwesome")
        return <FontAwesome name={name} size={60} color={theme.colors.primary} style={customStyles.icon} />;
    else if (type === "FontAwesome5")
        return <FontAwesome5 name={name} size={60} color={theme.colors.primary} style={customStyles.icon} />;
    else
        return (
            <View style={customStyles.letterContainer}>
                <Text style={customStyles.letter}>{itemName[0].toUpperCase()}</Text>
            </View>
        );
}

// Render de valor con copy
const renderValue = (label, value, copyFunc) => (
    <View style={{ marginTop: 15 }}>
        <Text style={customStyles.label}>{label}:</Text>
        {value ? (
            <TouchableOpacity
                style={customStyles.copyBox}
                onPress={() => copyFunc(value)}
                activeOpacity={0.7}
            >
                <Text style={[styles.text, { flex: 1 }]} numberOfLines={1} ellipsizeMode="tail">
                    {value}
                </Text>
                <Image source={copy} style={customStyles.copy} />
            </TouchableOpacity>
        ) : (
            <Text style={styles.secondaryText}>-</Text>
        )}
    </View>
);

const customStyles = StyleSheet.create({
    heading: { ...styles.heading, color: theme.colors.primary, marginTop: 15 },
    back: { width: 20, height: 20 },
    iconBox: { flexDirection: "column", alignItems: "center", justifyContent: "center" },
    icon: {
        marginTop: 5
    },
    copyBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1e1e1e",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 5,
    },
    copy: { width: 18, height: 18, tintColor: theme.colors.primary },
    letter: { fontSize: 50, color: theme.colors.primary, fontWeight: "bold" },
    letterContainer: { justifyContent: "center", alignItems: "center", width: 60, height: 60 },
    label: { ...styles.secondaryText, marginTop: 15 },

    editButton: { ...styles.button, width: "90%", alignSelf: "center", position: "absolute", bottom: 135, height: 45 },

    deleteButton: { ...styles.button, backgroundColor: theme.colors.textPrimary, width: "90%", alignSelf: "center", position: "absolute", bottom: 75, height: 45 },
    deleteButtonText: { ...styles.buttonText, color: theme.colors.primary },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        width: 300,
        padding: 20,
        backgroundColor: "#1e1e1e",
        borderRadius: 10,
    },
});
