import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ScrollView } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { styles } from "../styles";
import { theme } from "../theme";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-root-toast";
import Store from "../utilities/store";
import Title from "../components/cryptum";
import Bar from "../components/bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IconPicker from "../components/iconPicker";
import { Chip, SelectableChip } from "../components/chip";

export default function Add() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const inputAddref = useRef(null);


    const [modalVisible, setModalVisible] = useState(false);
    const [newGroupName, setNewGroupName] = useState("");
    const [groups, setGroups] = useState([]);
    const [password, setPassword] = useState({
        name: "",
        username: "",
        password: "",
        icon: "",
        groups: [],
        note: ""
    });

    useEffect(() => {
        const getGroups = async () => {
            const store = new Store("groups");
            await store.init();
            const groups = await store.getAll();
            setGroups(groups);
        };
        getGroups();
    }, []);

    useEffect(() => {
        if (modalVisible) {
            setTimeout(() => {
                inputAddref.current?.focus();
            }, 100);
        }
    }, [modalVisible]);


    const savePassword = async () => {
        if (password.name == "") {
            return Toast.show("ATENCIÓN: Debes ingresar el nombre", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                containerStyle: { backgroundColor: "#333", borderRadius: 8, paddingHorizontal: 16, paddingVertical: 10 },
                textStyle: { color: theme.colors.primary, fontSize: 15, textAlign: "center" },
            });
        }

        const store = new Store("passwords");
        await store.init();
        store.addPassword({ ...password, createdAt: Date.now() });

        setPassword({ name: "", username: "", password: "", icon: "", note: "", groups: [] });
        router.back();
    };

    const addOrRemoveGroup = (groupName) => {
        if (!password.groups.includes(groupName))
            setPassword({ ...password, groups: [...password.groups, groupName] });
        else
            setPassword({ ...password, groups: password.groups.filter(g => g !== groupName) });
    };

    const saveNewGroup = async () => {
        const trimmed = newGroupName.trim();
        if (!trimmed) return;

        const store = new Store("groups");
        await store.init();

        const newGroup = { name: trimmed };
        await store.addPassword(newGroup);
        setGroups(prev => [...prev, newGroup]);
        setNewGroupName("");
        setModalVisible(false);

        addOrRemoveGroup(trimmed);
    };

    const customStyles = StyleSheet.create({
        heading: {
            ...styles.heading,
            color: theme.colors.primary,
            marginTop: 15,
        },
        whiteHeading: {
            ...styles.heading,
            alignSelf: "center",
            marginTop: 20
        },
        label: {
            ...styles.secondaryText,
            marginTop: 15,
            padding: 5
        },
        required: {
            color: theme.colors.primary,
        },
        input: {
            width: "100%",
            backgroundColor: "#1e1e1e",
            color: theme.colors.primary,
            borderRadius: 10,
            padding: 12,
            fontSize: 16,
            borderWidth: 1,
        },
        chipsBoxContainer: {
            width: "100%",
        },
        chipsBox: {
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
        },
        buttonsContainer: {
            position: "absolute",
            bottom: insets.bottom + 20,
            left: 0,
            right: 0,

            backgroundColor: "#0f0f0f",
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: "#222",
        },
        saveButton: { ...styles.button, width: "90%", height: 45 },
        cancelButton: { ...styles.button, backgroundColor: theme.colors.textPrimary, width: "90%", height: 45 },
        secondaryButtonText: { ...styles.buttonText, color: theme.colors.primary },
        modalContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        modalContent: {
            width: "85%",
            backgroundColor: "#1c1c1c",
            borderRadius: 12,
            padding: 20,
            borderWidth: 1
        },
        modalTitle: {
            fontSize: 18,
            color: theme.colors.primary,
            marginBottom: 12,
            textAlign: "center",
        },
        modalInput: {
            borderWidth: 1,
            borderColor: theme.colors.primary,
            borderRadius: 8,
            padding: 10,
            color: theme.colors.textPrimary,
            marginBottom: 20,
        },
        modalButtons: {
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
        },
        modalButton: {
            flex: 1,
            padding: 10,
            borderRadius: 8,
            alignItems: "center",
        },
        modalSave: { backgroundColor: theme.colors.primary },
        modalCancel: { backgroundColor: "#333" },
        modalButtonText: { color: "#fff", fontWeight: "bold" },

        sep: { marginTop: 30 },
    });

    return (
        <RootSiblingParent>
            <Bar />
            <View style={[styles.screen, { flex: 1 }]}>
                {/* ✅ El contenido principal ahora es scrollable */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 160 }} // deja espacio para los botones
                >
                    <Title back />
                    <Text style={customStyles.whiteHeading}>Agregar contraseña</Text>

                    <Text style={customStyles.label}>
                        Nombre: <Text style={customStyles.required}>*</Text>
                    </Text>
                    <TextInput
                        style={customStyles.input}
                        placeholder="Ej. Cuenta de banco"
                        placeholderTextColor="#aaa"
                        value={password.name}
                        onChangeText={(value) => setPassword({ ...password, name: value })}
                    />

                    <Text style={customStyles.label}>Nombre de usuario:</Text>
                    <TextInput
                        style={customStyles.input}
                        placeholder="Ej. john@doe.com"
                        placeholderTextColor="#aaa"
                        value={password.username}
                        onChangeText={(value) => setPassword({ ...password, username: value })}
                        autoCapitalize="none"
                    />

                    <Text style={customStyles.label}>Contraseña:</Text>
                    <TextInput
                        style={customStyles.input}
                        placeholder="Ej. 1234567"
                        placeholderTextColor="#aaa"
                        value={password.password}
                        onChangeText={(value) => setPassword({ ...password, password: value })}
                        autoCapitalize="none"
                    />

                    <Text style={customStyles.label}>Nota:</Text>
                    <TextInput
                        style={[customStyles.input, { height: 100, textAlignVertical: "top" }]}
                        placeholder="Ej. recordatorio..."
                        placeholderTextColor="#aaa"
                        value={password.note}
                        onChangeText={(value) => setPassword({ ...password, note: value })}
                        multiline
                        numberOfLines={4}
                    />

                    <Text style={customStyles.label}>Grupos:</Text>
                    <View style={customStyles.chipsBoxContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={customStyles.chipsBox}>
                            {groups.map((element, idx) => (
                                <SelectableChip
                                    key={idx}
                                    label={element.name}
                                    selected={password.groups.includes(element.name)}
                                    onPress={() => addOrRemoveGroup(element.name)}
                                />
                            ))}
                            <Chip icon="add" selected onPress={() => setModalVisible(true)} />
                        </ScrollView>
                    </View>

                    <Text style={customStyles.label}>Icono:</Text>
                    <IconPicker
                        value={password.icon}
                        onChange={(icon) => setPassword({ ...password, icon })}
                    />

                    <View style={customStyles.sep} />
                </ScrollView>

                {/* ✅ Botones fijos abajo */}
                <View style={customStyles.buttonsContainer}>
                    <TouchableOpacity style={customStyles.saveButton} onPress={savePassword}>
                        <Text style={styles.text}>Guardar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={customStyles.cancelButton} onPress={() => router.back()}>
                        <Text style={customStyles.secondaryButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal para nuevo grupo */}
            <Modal transparent visible={modalVisible} animationType="fade">
                <View style={customStyles.modalContainer}>
                    <View style={customStyles.modalContent}>
                        <Text style={customStyles.modalTitle}>Nuevo grupo</Text>
                        <TextInput
                            ref={inputAddref}
                            style={customStyles.modalInput}
                            placeholder="Nombre del grupo"
                            placeholderTextColor="#aaa"
                            value={newGroupName}
                            onChangeText={setNewGroupName}
                        />
                        <View style={customStyles.modalButtons}>
                            <TouchableOpacity
                                style={[customStyles.modalButton, customStyles.modalCancel]}
                                onPress={() => {
                                    setNewGroupName("");
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={customStyles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[customStyles.modalButton, customStyles.modalSave]}
                                onPress={saveNewGroup}
                            >
                                <Text style={customStyles.modalButtonText}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </RootSiblingParent>
    );
}
