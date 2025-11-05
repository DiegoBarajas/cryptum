import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import DropDownPicker from "react-native-dropdown-picker";

import { styles } from "../styles";
import { theme } from "../theme";
import { useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-root-toast";


import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import Store from "../utilities/store";


export default function Add() {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState({
        name: "",
        email: "",
        password: "",
        icon: ""
    });

    const savePassword = async () => {

        if (password.name == "") {
            return Toast.show("ATENCION: Debes ingresar el nombre", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                containerStyle: { backgroundColor: "#333", borderRadius: 8, paddingHorizontal: 16, paddingVertical: 10 },
                textStyle: { color: theme.colors.primary, fontSize: 15, textAlign: "center" },
            });
        }


        const store = new Store();
        await store.init();

        store.addPassword(password);

        setPassword({
            name: "",
            email: "",
            password: "",
            icon: ""
        });

        router.back();
    }

    const items = [
        { label: "Automático", value: "", icon: () => <FontAwesome5 name="sync" size={20} color={theme.colors.primary} /> },
        { label: "Alcancia", value: "FontAwesome5:piggy-bank", icon: () => <FontAwesome5 name="piggy-bank" size={20} color={theme.colors.primary} /> },
        { label: "Amazon", value: "FontAwesome5:amazon", icon: () => <FontAwesome5 name="amazon" size={20} color={theme.colors.primary} /> },
        { label: "Banco", value: "FontAwesome:bank", icon: () => <FontAwesome name="bank" size={20} color={theme.colors.primary} /> },
        { label: "Base de datos", value: "FontAwesome:database", icon: () => <FontAwesome name="database" size={20} color={theme.colors.primary} /> },
        { label: "Bolsa de compra", value: "FontAwesome5:shopping-bag", icon: () => <FontAwesome5 name="shopping-bag" size={20} color={theme.colors.primary} /> },
        { label: "Canasta de compra", value: "FontAwesome5:shopping-basket", icon: () => <FontAwesome5 name="shopping-basket" size={20} color={theme.colors.primary} /> },
        { label: "Carpeta", value: "FontAwesome:folder", icon: () => <FontAwesome name="folder" size={20} color={theme.colors.primary} /> },
        { label: "Carrito de compra", value: "FontAwesome5:shopping-cart", icon: () => <FontAwesome5 name="shopping-cart" size={20} color={theme.colors.primary} /> },
        { label: "Desktop", value: "FontAwesome5:desktop", icon: () => <FontAwesome5 name="desktop" size={20} color={theme.colors.primary} /> },
        { label: "Edge", value: "FontAwesome5:edge", icon: () => <FontAwesome5 name="edge" size={20} color={theme.colors.primary} /> },
        { label: "Enviar", value: "FontAwesome:send", icon: () => <FontAwesome name="send" size={20} color={theme.colors.primary} /> },
        { label: "Escuela", value: "FontAwesome5:school", icon: () => <FontAwesome5 name="school" size={20} color={theme.colors.primary} /> },
        { label: "Estrella", value: "FontAwesome:star", icon: () => <FontAwesome name="star" size={20} color={theme.colors.primary} /> },
        { label: "Facebook", value: "FontAwesome5:facebook", icon: () => <FontAwesome5 name="facebook" size={20} color={theme.colors.primary} /> },
        { label: "Foto", value: "FontAwesome:photo", icon: () => <FontAwesome name="photo" size={20} color={theme.colors.primary} /> },
        { label: "Github", value: "FontAwesome5:github", icon: () => <FontAwesome5 name="github" size={20} color={theme.colors.primary} /> },
        { label: "Google", value: "FontAwesome5:google", icon: () => <FontAwesome5 name="google" size={20} color={theme.colors.primary} /> },
        { label: "Google Play", value: "FontAwesome5:google-play", icon: () => <FontAwesome5 name="google-play" size={20} color={theme.colors.primary} /> },
        { label: "Inbox", value: "FontAwesome:inbox", icon: () => <FontAwesome name="inbox" size={20} color={theme.colors.primary} /> },
        { label: "Instituto", value: "FontAwesome:institution", icon: () => <FontAwesome name="institution" size={20} color={theme.colors.primary} /> },
        { label: "Instagram", value: "FontAwesome5:instagram", icon: () => <FontAwesome5 name="instagram" size={20} color={theme.colors.primary} /> },
        { label: "Libro", value: "FontAwesome:book", icon: () => <FontAwesome name="book" size={20} color={theme.colors.primary} /> },
        { label: "Linux", value: "FontAwesome5:linux", icon: () => <FontAwesome5 name="linux" size={20} color={theme.colors.primary} /> },
        { label: "Mastercard", value: "FontAwesome5:cc-mastercard", icon: () => <FontAwesome5 name="cc-mastercard" size={20} color={theme.colors.primary} /> },
        { label: "Messenger", value: "FontAwesome5:facebook-messenger", icon: () => <FontAwesome5 name="facebook-messenger" size={20} color={theme.colors.primary} /> },
        { label: "Microsoft", value: "FontAwesome5:microsoft", icon: () => <FontAwesome5 name="microsoft" size={20} color={theme.colors.primary} /> },
        { label: "Moto", value: "FontAwesome5:motorcycle", icon: () => <FontAwesome5 name="motorcycle" size={20} color={theme.colors.primary} /> },
        { label: "Musica", value: "FontAwesome:music", icon: () => <FontAwesome name="music" size={20} color={theme.colors.primary} /> },
        { label: "Nube", value: "FontAwesome:cloud", icon: () => <FontAwesome name="cloud" size={20} color={theme.colors.primary} /> },
        { label: "Paypal", value: "FontAwesome5:paypal", icon: () => <FontAwesome5 name="paypal" size={20} color={theme.colors.primary} /> },
        { label: "Pelicula", value: "FontAwesome:video-camera", icon: () => <FontAwesome name="video-camera" size={20} color={theme.colors.primary} /> },
        { label: "Python", value: "FontAwesome5:python", icon: () => <FontAwesome5 name="python" size={20} color={theme.colors.primary} /> },
        { label: "Reddit", value: "FontAwesome5:reddit", icon: () => <FontAwesome5 name="reddit" size={20} color={theme.colors.primary} /> },
        { label: "Server", value: "FontAwesome5:server", icon: () => <FontAwesome5 name="server" size={20} color={theme.colors.primary} /> },
        { label: "Spotify", value: "FontAwesome:spotify", icon: () => <FontAwesome name="spotify" size={20} color={theme.colors.primary} /> },
        { label: "Steam", value: "FontAwesome:steam", icon: () => <FontAwesome name="steam" size={20} color={theme.colors.primary} /> },
        { label: "Streaming", value: "FontAwesome:stream", icon: () => <FontAwesome5 name="stream" size={20} color={theme.colors.primary} /> },
        { label: "Taxi", value: "FontAwesome5:taxi", icon: () => <FontAwesome5 name="taxi" size={20} color={theme.colors.primary} /> },
        { label: "Twitch", value: "FontAwesome5:twitch", icon: () => <FontAwesome5 name="twitch" size={20} color={theme.colors.primary} /> },
        { label: "Twitter", value: "FontAwesome5:twitter", icon: () => <FontAwesome5 name="twitter" size={20} color={theme.colors.primary} /> },
        { label: "Visa", value: "FontAwesome5:cc-visa", icon: () => <FontAwesome5 name="cc-visa" size={20} color={theme.colors.primary} /> },
        { label: "Waller", value: "FontAwesome5:wallet", icon: () => <FontAwesome5 name="wallet" size={20} color={theme.colors.primary} /> },
        { label: "Wi-fi", value: "FontAwesome5:wifi", icon: () => <FontAwesome5 name="wifi" size={20} color={theme.colors.primary} /> },
        { label: "Windows", value: "FontAwesome5:windows", icon: () => <FontAwesome5 name="windows" size={20} color={theme.colors.primary} /> },
        { label: "Youtube", value: "FontAwesome5:youtube", icon: () => <FontAwesome5 name="youtube" size={20} color={theme.colors.primary} /> },
    ];


    return (
        <RootSiblingParent>
            <View style={styles.screen}>
                <Text style={customStyles.heading} onPress={() => router.back()}>Cryptum</Text>
                <Text style={customStyles.whiteHeading}>Agregar contraseña</Text>

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
                <DropDownPicker 
                    open={open} 
                    value={password.icon} 
                    items={items} 
                    setOpen={setOpen} 
                    setValue={(callback) => 
                        setPassword({ ...password, icon: callback(password.icon) })
                    } 
                    style={customStyles.input} 
                    textStyle={{ color: theme.colors.textPrimary }} 
                    dropDownContainerStyle={{ backgroundColor: "#1e1e1e", height: 500 }} 
                    arrowIconStyle={{ tintColor: theme.colors.primary }} 
                    tickIconStyle={{ tintColor: theme.colors.primary }} 
                />


                <View style={customStyles.sep} />

                <TouchableOpacity style={customStyles.button} onPress={savePassword}>
                    <Text style={styles.text}>Guardar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={customStyles.cancelButton} onPress={() => router.back()}>
                    <Text style={styles.secondaryButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </RootSiblingParent>

    );
}

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
    required: {
        ...styles.heading,
        color: theme.colors.primary,
        marginTop: 20,
        fontSize: 18
    },
    label: {
        ...styles.secondaryText,
        marginTop: 15,
        padding: 5
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
    button: {
        ...styles.button,
        height: 40
    },
    cancelButton: {
        ...styles.secondaryButton,
        height: 40,
    },
    sep: {
        marginTop: 75
    }
});
