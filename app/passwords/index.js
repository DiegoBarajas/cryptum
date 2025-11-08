import React, { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Animated,
    Text,
    TextInput,
    ScrollView,
    Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Vibration } from "react-native";

import AlphabeticalIndex from "../../components/alphabetIndex";
import Store from "../../utilities/store";
import Bar from "../../components/bar";
import { styles } from "../../styles";
import { theme } from "../../theme";

import searchImg from "../../assets/search.png";
import quitImg from "../../assets/quit.png";
import addImg from "../../assets/add.png";
import { Chip, SelectableChip } from "../../components/chip";
import { authenticate } from "../../utilities/auth";

export default function PasswordIndex() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const inputRef = useRef(null);
    const inputAddref = useRef(null);

    const [allPasswords, setAllPasswords] = useState([]);
    const [currentPasswords, setCurrentPasswords] = useState({});

    const [groups, setGroups] = useState([]);

    const [searchMode, setSearchMode] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("Todos");

    const [modalVisible, setModalVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [newGroupName, setNewGroupName] = useState("");

    const iconAnim = useRef(new Animated.Value(0)).current;
    const titleAnim = useRef(new Animated.Value(0)).current;

    // cargar datos iniciales
    useEffect(() => {
        const getPasswordsAndGroup = async () => {
            const store = new Store("passwords");
            await store.init();
            const passwords = await store.getAll();

            const groups = {};

            passwords.forEach((item, indx) => {
                if (!item.name || typeof item.name !== "string") return;

                const firstChar = item.name[0].toUpperCase();
                const key = /^[A-Z]$/.test(firstChar) ? firstChar : "#";

                if (!groups[key]) groups[key] = [];
                item.index = indx;
                groups[key].push(item);
            });

            Object.keys(groups).forEach((key) => {
                groups[key].sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));
            });

            const ordered = {};
            if (groups["#"]) ordered["#"] = groups["#"];

            Object.keys(groups)
                .filter((k) => k !== "#")
                .sort()
                .forEach((k) => (ordered[k] = groups[k]));

            setAllPasswords(ordered);
            setCurrentPasswords(ordered);
        };

        const getGroups = async () => {
            const store = new Store("groups");
            await store.init();
            const groups = await store.getAll();
            setGroups(groups);
        };

        getGroups();
        getPasswordsAndGroup();
    }, []);

    useEffect(() => {
        const lowerValue = searchText?.toLowerCase().trim();
        let filtered = {};

        // 🧩 Caso 1: no hay texto de búsqueda
        if (!lowerValue) {
            if (selectedGroup === "Todos") {
                setCurrentPasswords(allPasswords);
                return;
            }

            // 🔹 Filtrar solo por grupo
            Object.keys(currentPasswords).forEach((key) => {
                const matches = currentPasswords[key].filter(
                    (item) =>
                        Array.isArray(item.groups) &&
                        item.groups.includes(selectedGroup)
                );

                if (matches.length > 0) filtered[key] = matches;
            });

            setCurrentPasswords(filtered);
            return;
        }

        // 🧩 Caso 2: hay búsqueda
        Object.keys(currentPasswords).forEach((key) => {
            const matches = currentPasswords[key].filter((item) => {
                const nameMatches = item.name.toLowerCase().includes(lowerValue);

                if (selectedGroup === "Todos") return nameMatches;

                return (
                    nameMatches &&
                    Array.isArray(item.groups) &&
                    item.groups.includes(selectedGroup)
                );
            });

            if (matches.length > 0) filtered[key] = matches;
        });

        setCurrentPasswords(filtered);



        setCurrentPasswords(filtered);
    }, [searchText]);

    useEffect(() => {
        const filterByGroup = () => {

            let filtered = {};

            const lowerValue = searchText.toLowerCase().trim();

            if (selectedGroup === "Todos") {
                if (!lowerValue) {
                    setCurrentPasswords(allPasswords);
                    return;
                }

                Object.keys(allPasswords).forEach((key) => {
                    const matches = allPasswords[key].filter((item) =>
                        item.name.toLowerCase().includes(lowerValue)
                    );

                    if (matches.length > 0) filtered[key] = matches;
                });
            } else {
                Object.keys(allPasswords).forEach((key) => {
                    const matches = allPasswords[key].filter((item) => {
                        const inGroup =
                            Array.isArray(item.groups) &&
                            item.groups.includes(selectedGroup);

                        if (!inGroup) return false;
                        if (!lowerValue) return true;

                        return item.name.toLowerCase().includes(lowerValue);
                    });

                    if (matches.length > 0) filtered[key] = matches;
                });
            }

            setCurrentPasswords(filtered);




        }

        filterByGroup();
    }, [selectedGroup]);

    useEffect(() => {
        if (modalVisible) {
            setTimeout(() => {
                inputAddref.current?.focus();
            }, 100);
        }
    }, [modalVisible]);


    const addElement = () => router.push("/add");

    const toggleSearch = () => {
        const newMode = !searchMode;
        setSearchMode(newMode);

        Animated.parallel([
            Animated.timing(iconAnim, {
                toValue: newMode ? 1 : 0,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(titleAnim, {
                toValue: newMode ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (newMode) inputRef.current?.focus();
            else setSearchText("");
        });
    };

    const saveNewGroup = async () => {
        const trimmed = newGroupName.trim();
        if (!trimmed) return;

        const store = new Store("groups");
        await store.init();

        const newGroup = { name: trimmed };
        await store.addPassword(newGroup);

        setGroups((prev) => [...prev, newGroup]);
        setNewGroupName("");
        setModalVisible(false);
    };

    const askToDeleteGroup = (index) => {
        Vibration.vibrate(100);
        setModalDeleteVisible(index);
    }

    const handleDeleteGroup = async () => {
        const deleteGroup = async () => {
            const newGroup = [...groups];
            const groupName = groups[modalDeleteVisible].name;

            const store = new Store("groups");
            await store.deleteByIndex(modalDeleteVisible);

            const storePass = new Store("passwords");
            const newPasswords = await storePass.getAll();

            newGroup.splice(modalDeleteVisible, 1);
            newPasswords.forEach(item => {
                if (item.groups)
                    item.groups = item.groups.filter(g => g !== groupName);
            });

            storePass.setAll(newPasswords);
            if (selectedGroup === groupName)
                setSelectedGroup("Todos");


            setGroups(newGroup);
            setModalDeleteVisible(false);
        }

        authenticate("Identificate para eliminar", deleteGroup);
    }

    const customStyles = StyleSheet.create({
        searchBox: {
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginTop: insets.top,
            paddingBottom: 10,
            position: "relative",
        },
        titleWrapper: {
            flex: 1,
            justifyContent: "center",
        },
        titleAbsolute: {
            position: "absolute",
            left: 0,
            right: 0,
            justifyContent: "center",
        },
        searchImage: { width: 30, height: 30, position: "absolute" },
        addButton: {
            ...styles.button,
            position: "absolute",
            bottom: insets.bottom + 20,
            right: "10%",
            transform: [{ translateX: -15 }],
            width: 65,
            height: 65,
            borderRadius: 100,
        },
        addImage: { width: 35, height: 35 },
        input: {
            width: "95%",
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
        modalSave: {
            backgroundColor: theme.colors.primary,
        },
        modalCancel: {
            backgroundColor: "#333",
        },
        modalButtonText: {
            color: "#fff",
            fontWeight: "bold",
        },
    });

    return (
        <View style={styles.screen}>
            <Bar />

            {/* --- Título / búsqueda --- */}
            <View style={customStyles.searchBox}>
                <View style={customStyles.titleWrapper}>
                    <Animated.View
                        style={[
                            customStyles.titleAbsolute,
                            { opacity: titleAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) },
                        ]}
                    >
                        <Title />
                    </Animated.View>

                    <Animated.View
                        style={[
                            customStyles.titleAbsolute,
                            {
                                opacity: titleAnim,
                                transform: [
                                    { translateX: titleAnim.interpolate({ inputRange: [0, 1], outputRange: [100, 0] }) },
                                ],
                            },
                        ]}
                    >
                        <TextInput
                            ref={inputRef}
                            placeholder="Buscar..."
                            placeholderTextColor="#aaa"
                            value={searchText}
                            onChangeText={setSearchText}
                            style={customStyles.input}
                            autoFocus={searchMode}
                        />
                    </Animated.View>
                </View>

                <TouchableOpacity onPress={toggleSearch}>
                    <View style={{ width: 30, height: 30 }}>
                        <Animated.Image
                            source={searchImg}
                            style={[
                                customStyles.searchImage,
                                { opacity: iconAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) },
                            ]}
                        />
                        <Animated.Image
                            source={quitImg}
                            style={[
                                customStyles.searchImage,
                                { opacity: iconAnim, transform: [{ rotate: "180deg" }] },
                            ]}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            {/* --- Chips de grupos --- */}
            <View style={customStyles.chipsBoxContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={customStyles.chipsBox}>
                    <SelectableChip
                        selected={selectedGroup === "Todos"}
                        label="Todos"
                        onPress={() => setSelectedGroup("Todos")}
                    />
                    {groups.map((element, idx) => (
                        <SelectableChip
                            key={idx}
                            label={element.name}
                            selected={selectedGroup === element.name}
                            onPress={() => setSelectedGroup(element.name)}
                            onLongPress={() => askToDeleteGroup(idx)}
                        />
                    ))}
                    <Chip icon="add" selected onPress={() => setModalVisible(true)} />
                </ScrollView>
            </View>

            {/* --- Lista --- */}
            <AlphabeticalIndex 
                data={currentPasswords} 
                textIfEmpty={
                    Object.keys(allPasswords).length
                        ? searchText !== "" 
                            ? "No hay coincidencias con la búsqueda."
                            : "No hay elementos en este grupo."
                        : "No hay elementos guardados."
                } 
            />

            {/* --- Botón agregar --- */}
            <TouchableOpacity style={customStyles.addButton} onPress={addElement}>
                <Image style={customStyles.addImage} source={addImg} />
            </TouchableOpacity>

            {/* --- Modal de nuevo grupo --- */}
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

            {/* Modal delete */}
            <Modal transparent visible={modalDeleteVisible !== false} animationType="fade">
                <View style={customStyles.modalContainer}>
                    <View style={customStyles.modalContent}>
                        <Text style={[customStyles.modalTitle, { marginBottom: 30 }]}>¿Quieres eliminar el grupo "{modalDeleteVisible !== false ? groups[modalDeleteVisible].name : ""}"?</Text>
                        <View style={customStyles.modalButtons}>
                            <TouchableOpacity
                                style={[customStyles.modalButton, customStyles.modalCancel]}
                                onPress={() => setModalDeleteVisible(false)}
                            >
                                <Text style={customStyles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[customStyles.modalButton, customStyles.modalSave]}
                                onPress={handleDeleteGroup}
                            >
                                <Text style={customStyles.modalButtonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

function Title() {
    return (
        <View style={titleStyles.titleContainer}>
            <Text style={titleStyles.heading}>Cryptum</Text>
        </View>
    );
}

const titleStyles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    heading: {
        ...styles.heading,
        color: theme.colors.primary,
        marginBottom: 0,
    },
});
