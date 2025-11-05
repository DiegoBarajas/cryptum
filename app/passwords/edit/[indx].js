import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";

import { styles } from "../../../styles";
import { theme } from "../../../theme";
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import Toast from "react-native-root-toast";

import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import Store from "../../../utilities/store";
import Title from "../../../components/cryptum";
import Bar from "../../../components/bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IconPicker from "../../../components/iconPicker";

export default function Edit() {
    const insets = useSafeAreaInsets();

    const router = useRouter();
    const { indx } = useLocalSearchParams();

    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState({
        name: "",
        email: "",
        password: "",
        icon: ""
    });

    // Cargar los datos existentes
    useEffect(() => {
        const loadPassword = async () => {
            const store = new Store();
            await store.init();
            const data = await store.getByIndex(indx);
            if (data) setPassword(data);
        };
        loadPassword();
    }, []);

    const savePassword = async () => {
        if (password.name.trim() === "") {
            return Toast.show("ATENCIÓN: Debes ingresar el nombre", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                containerStyle: { backgroundColor: "#333", borderRadius: 8, paddingHorizontal: 16, paddingVertical: 10 },
                textStyle: { color: theme.colors.primary, fontSize: 15, textAlign: "center" },
            });
        }

        const store = new Store();
        await store.init();
        await store.updateByIndex(indx, {
            ...password,
            updatedAt: Date.now()
        });

        Toast.show("Elemento actualizado", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            containerStyle: { backgroundColor: "#333", borderRadius: 8, paddingHorizontal: 16, paddingVertical: 10 },
            textStyle: { color: theme.colors.primary, fontSize: 15, textAlign: "center" },
        });

        router.back();
    };


    const buttonStyles = StyleSheet.create({
        saveButton: { ...styles.button, width: "90%", alignSelf: "center", position: "absolute", bottom: insets.bottom + 80, height: 45 },
        cancelButton: { ...styles.button, backgroundColor: theme.colors.textPrimary, width: "90%", alignSelf: "center", position: "absolute", bottom: insets.bottom + 20, height: 45 },
    })

    return (
        <RootSiblingParent>
            <Bar />
            <View style={styles.screen}>
                <Title back />
                <Text style={customStyles.whiteHeading}>Editar contraseña</Text>

                <Text style={customStyles.label}>Nombre: <Text style={customStyles.required}>*</Text></Text>
                <TextInput
                    style={customStyles.input}
                    placeholder="Ej. Facebook"
                    placeholderTextColor="#aaa"
                    value={password.name}
                    onChangeText={(value) => setPassword({ ...password, name: value })}
                />

                <Text style={customStyles.label}>Correo/usuario:</Text>
                <TextInput
                    style={customStyles.input}
                    placeholder="Ej. john@doe.com"
                    placeholderTextColor="#aaa"
                    value={password.email}
                    onChangeText={(value) => setPassword({ ...password, email: value })}
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

                <Text style={customStyles.label}>Icono:</Text>
                <IconPicker
                    value={password.icon}
                    onChange={(icon) => setPassword({ ...password, icon })}
                />

                <View style={customStyles.sep} />

                <TouchableOpacity style={buttonStyles.saveButton} onPress={savePassword}>
                    <Text style={styles.text}>Guardar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={buttonStyles.cancelButton} onPress={() => router.back()}>
                    <Text style={styles.secondaryButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </RootSiblingParent>
    );
}

const customStyles = StyleSheet.create({
    heading: { ...styles.heading, color: theme.colors.primary, marginTop: 15 },
    whiteHeading: { ...styles.heading, alignSelf: "center", marginTop: 20 },
    required: { ...styles.heading, color: theme.colors.primary, marginTop: 20, fontSize: 18 },
    label: { ...styles.secondaryText, marginTop: 15, padding: 5 },
    input: { width: "100%", backgroundColor: "#1e1e1e", color: theme.colors.primary, borderRadius: 10, padding: 12, fontSize: 16, borderWidth: 1 },
    secondaryButtonText: { ...styles.buttonText, color: theme.colors.primary },
    sep: { marginTop: 50 },
});
