import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { RootSiblingParent } from "react-native-root-siblings";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as Clipboard from 'expo-clipboard';
import Toast from "react-native-root-toast";

import { authenticate } from "../../utilities/auth";
import Title from "../../components/cryptum";
import Store from "../../utilities/store";
import Bar from "../../components/bar";
import { styles } from "../../styles";
import { theme } from "../../theme";

import showPasswordPng from "../../assets/show_password.png";
import hidePassword from "../../assets/hide_password.png";
import copy from "../../assets/copy.png";
import infoPng from "../../assets/info.png"
import { SelectableChip } from "../../components/chip";

export default function Add() {
    const insets = useSafeAreaInsets();
    const { indx } = useLocalSearchParams();
    const router = useRouter();

    const [pass, setPass] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);

    useEffect(() => {
        const getPass = async () => {
            const store = new Store("passwords");
            await store.init();

            const password = await store.getByIndex(indx);
            setPass(password);
        };
        getPass();
    }, []);

    const handleDelete = async () => {
        authenticate("Identificate para eliminar", async () => {
            const store = new Store("passwords");
            await store.init();
            await store.deleteByIndex(indx);
            setShowConfirm(false);
            router.replace("/passwords");
        });

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

    const buttonStyles = StyleSheet.create({
        editButton: { ...styles.button, width: "90%", alignSelf: "center", position: "absolute", bottom: insets.bottom + 80, height: 45 },
        deleteButton: { ...styles.button, backgroundColor: theme.colors.textPrimary, width: "90%", alignSelf: "center", position: "absolute", bottom: insets.bottom + 20, height: 45 },
    });

    const handleUpdate = () => {
        authenticate("Identificate para editar", goToUpdate);
    }

    const goToUpdate = () => { router.push(`/passwords/edit/${indx}`) }

    const iconStyle = StyleSheet.create({
        infoIcon: {
            width: 30,
            height: 30,
            marginTop: insets.top,
        }
    });

    return (
        <RootSiblingParent>
            <View style={styles.screen}>
                <Bar />
                <View style={customStyles.headerBox}>
                    <Title back />

                    <TouchableOpacity
                        onPress={() => setShowInfoModal(true)}
                    >
                        <Image
                            source={infoPng}
                            style={iconStyle.infoIcon}
                        />
                    </TouchableOpacity>
                </View>

                {pass ? (
                    <>
                        {/* Icono y nombre */}
                        <View style={customStyles.iconBox}>
                            <Icon icon={pass.icon} itemName={pass.name} />
                            <Text style={customStyles.nameText}>{pass.name}</Text>
                        </View>

                        {
                            pass.groups ? (
                                <View style={customStyles.chipsBoxContainer}>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={[
                                            customStyles.chipsBox,
                                            { justifyContent: "center", flexGrow: 1 }
                                        ]}
                                    >
                                        {pass.groups.map((name, idx) => (
                                            <SelectableChip
                                                key={idx}
                                                label={name}
                                                selected
                                            />
                                        ))}
                                    </ScrollView>
                                </View>
                            ) : null

                        }

                        {/* Campos */}
                        {renderCopyField("Nombre de usuario", pass.username, copyToClipboard)}
                        {renderPasswordField("Contraseña", pass.password, showPassword, setShowPassword, copyToClipboard)}
                        {renderNoteField(pass.note)}

                        {/* Botones */}
                        <TouchableOpacity
                            onPress={handleUpdate}
                            style={buttonStyles.editButton}
                        >
                            <Text style={styles.buttonText}>Editar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setShowConfirm(true)}
                            style={buttonStyles.deleteButton}
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
                            <Text style={[styles.text, { textAlign: "center", marginBottom: 25 }]}>
                                ¿Estás seguro de que quieres eliminar este elemento?
                            </Text>

                            <View style={{ width: "100%", alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={handleDelete}
                                    style={[styles.button, { backgroundColor: "#ff4444", width: "90%", marginBottom: 10 }]}
                                >
                                    <Text style={styles.buttonText}>Eliminar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setShowConfirm(false)}
                                    style={[styles.button, { width: "90%" }]}
                                >
                                    <Text style={styles.buttonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>


                <Modal
                    transparent
                    visible={showInfoModal}
                    animationType="fade"
                    onRequestClose={() => setShowInfoModal(false)}
                >
                    <View style={customStyles.modalOverlay}>
                        <View style={customStyles.infoModalBox}>
                            <Text style={customStyles.modalTitle}>Información del elemento</Text>

                            <View style={customStyles.infoRow}>
                                <Text style={customStyles.infoLabel}>Creado:</Text>
                                <Text style={customStyles.infoValue}>
                                    {pass?.createdAt ? formatDate(pass.createdAt).toLocaleString() : "-"}
                                </Text>
                            </View>

                            <View style={customStyles.infoRow}>
                                <Text style={customStyles.infoLabel}>Última actualización:</Text>
                                <Text style={customStyles.infoValue}>
                                    {pass?.updatedAt ? formatDate(pass.updatedAt).toLocaleString() : "-"}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => setShowInfoModal(false)}
                                style={[styles.button, { alignSelf: "center" }]}
                            >
                                <Text style={styles.buttonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


            </View>
        </RootSiblingParent>
    );
}

const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    const now = new Date();

    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const optionsTime = { hour: "2-digit", minute: "2-digit" };

    if (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
    ) {
        return `Hoy a las ${date.toLocaleTimeString([], optionsTime)}`;
    } else if (
        date.getDate() === now.getDate() - 1 &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
    ) {
        return `Ayer a las ${date.toLocaleTimeString([], optionsTime)}`;
    } else if (diffDays < 7 && date.getFullYear() === now.getFullYear()) {
        const dayName = date.toLocaleDateString("es-ES", { weekday: "long" });
        return `${capitalizeFirstLetter(dayName)} a las ${date.toLocaleTimeString([], optionsTime)}`;
    } else if (date.getFullYear() === now.getFullYear()) {
        const day = date.getDate();
        const month = date.toLocaleDateString("es-ES", { month: "long" });
        return `${day} de ${capitalizeFirstLetter(month)} a las ${date.toLocaleTimeString([], optionsTime)}`;
    } else {
        const day = date.getDate();
        const month = date.toLocaleDateString("es-ES", { month: "long" });
        const year = date.getFullYear();
        return `${day} de ${capitalizeFirstLetter(month)} del ${year} a las ${date.toLocaleTimeString([], optionsTime)}`;
    }
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


// Componente de icono
function Icon({ icon, itemName }) {
    const [type, name] = icon.split(":");

    if (type === "FontAwesome")
        return <FontAwesome name={name} size={60} color={theme.colors.primary} style={customStyles.icon} />;
    else if (type === "FontAwesome5")
        return <FontAwesome5 name={name} size={60} color={theme.colors.primary} style={customStyles.icon} />;
    else if (type === "MaterialCommunityIcons")
        return <MaterialCommunityIcons name={name} size={60} color={theme.colors.primary} style={customStyles.icon} />;
    else
        return (
            <View style={customStyles.letterContainer}>
                <Text style={customStyles.letter}>{itemName[0].toUpperCase()}</Text>
            </View>
        );
}

// Campo de texto con copiar (para email u otros)
const renderCopyField = (label, value, copyFunc) => (
    <View style={{ marginTop: 15 }}>
        <Text style={customStyles.label}>{label}:</Text>
        {value ? (
            <View style={customStyles.copyBox}>
                <TouchableOpacity onPress={() => copyFunc(value)} style={{ marginRight: 10 }}>
                    <Image source={copy} style={customStyles.copy} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => copyFunc(value)}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.text]} numberOfLines={1} ellipsizeMode="tail">
                        {value}
                    </Text>
                </TouchableOpacity>
            </View>
        ) : (
            <Text style={styles.secondaryText}>-</Text>
        )}
    </View>
);

// Campo de contraseña con copiar a la izquierda y mostrar/ocultar a la derecha
const renderPasswordField = (label, value, showPassword, setShowPassword, copyFunc) => (
    <View style={{ marginTop: 15 }}>
        <Text style={customStyles.label}>{label}:</Text>
        {value ? (
            <View style={customStyles.copyBox}>
                <TouchableOpacity
                    onPress={() => copyFunc(value)} style={{ marginRight: 10 }}>
                    <Image source={copy}
                        style={customStyles.copy}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => copyFunc(value)}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.text]} numberOfLines={1} ellipsizeMode="tail">
                        {showPassword ? value : "*".repeat(value.length)}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ marginLeft: 10 }}>
                    <Image
                        source={showPassword ? hidePassword : showPasswordPng}
                        style={{ width: 24, height: 24, tintColor: theme.colors.primary }}
                    />
                </TouchableOpacity>
            </View>
        ) : (
            <Text style={styles.secondaryText}>-</Text>
        )}
    </View>
);

// Campo de nota (solo si existe)
const renderNoteField = (note) => {
    if (!note) return null; // no mostrar si no hay nota

    return (
        <View style={{ marginTop: 15 }}>
            <Text style={customStyles.label}>Nota:</Text>
            <View style={customStyles.noteBox}>
                <ScrollView
                    style={{ maxHeight: 120 }}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                >
                    <Text
                        style={[styles.text, { lineHeight: 20 }]}
                        selectable={true} // permite seleccionar texto
                    >
                        {note}
                    </Text>
                </ScrollView>
            </View>
        </View>
    );
};


const customStyles = StyleSheet.create({
    heading: { ...styles.heading, color: theme.colors.primary, marginTop: 15 },
    headerBox: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    back: { width: 20, height: 20 },
    iconBox: { flexDirection: "column", alignItems: "center", justifyContent: "center" },
    icon: { marginTop: 5 },
    copyBox: {
        flexDirection: "row",
        alignItems: "center",
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
    deleteButtonText: { ...styles.buttonText, color: theme.colors.primary },
    nameText: { ...styles.text, textAlign: "center" },
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
    infoModalBox: {
        width: 320,
        padding: 25,
        backgroundColor: "#2a2a2a",
        borderRadius: 12,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: theme.colors.primary,
        marginBottom: 20,
        alignSelf: "center",
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 12,
    },
    infoLabel: {
        color: "#aaa",
        fontSize: 14,
        flex: 1,
    },
    infoValue: {
        color: "#fff",
        fontSize: 14,
        flex: 1,
        textAlign: "right",
    },
    closeButton: {
        alignSelf: "center",
        marginTop: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
    },
    closeButtonText: {
        color: "#1e1e1e",
        fontWeight: "bold",
        fontSize: 14,
    },
    noteBox: {
        backgroundColor: "#1e1e1e",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 5,
    },
    chipsBoxContainer: {
        width: "100%",
        justifyContent: "center",
        marginTop: 5
    },
    chipsBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
    },
});
