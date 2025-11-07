import { useState } from "react";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
import { theme } from "../theme";

const icons = [
    { label: "Automático", value: "", icon: () => <FontAwesome5 name="sync" size={20} color={theme.colors.primary} /> },
    
    { label: "DUMMI", value: "", icon: () => <FontAwesome name="" size={20} color={theme.colors.primary} /> },
    { label: "DUMMI", value: "", icon: () => <FontAwesome name="" size={20} color={theme.colors.primary} /> },
    { label: "DUMMI", value: "", icon: () => <FontAwesome name="" size={20} color={theme.colors.primary} /> },
    { label: "DUMMI", value: "", icon: () => <FontAwesome name="" size={20} color={theme.colors.primary} /> },
    
    { label: "Advertencia", value: "FontAwesome:warning", icon: () => <FontAwesome name="warning" size={20} color={theme.colors.primary} /> },
    { label: "Airbnb", value: "FontAwesome5:airbnb", icon: () => <FontAwesome5 name="airbnb" size={20} color={theme.colors.primary} /> },
    { label: "Alcancia", value: "FontAwesome5:piggy-bank", icon: () => <FontAwesome5 name="piggy-bank" size={20} color={theme.colors.primary} /> },
    { label: "Amazon", value: "FontAwesome5:amazon", icon: () => <FontAwesome5 name="amazon" size={20} color={theme.colors.primary} /> },
    { label: "Android", value: "FontAwesome5:android", icon: () => <FontAwesome5 name="android" size={20} color={theme.colors.primary} /> },
    { label: "Apple", value: "FontAwesome:apple", icon: () => <FontAwesome name="apple" size={20} color={theme.colors.primary} /> },
    { label: "Archivo", value: "FontAwesome:file", icon: () => <FontAwesome name="file" size={20} color={theme.colors.primary} /> },
    { label: "Arroba", value: "FontAwesome5:at", icon: () => <FontAwesome5 name="at" size={20} color={theme.colors.primary} /> },
    { label: "Asterisco", value: "FontAwesome5:asterisk", icon: () => <FontAwesome5 name="asterisk" size={20} color={theme.colors.primary} /> },
    { label: "Autobus", value: "FontAwesome:bus", icon: () => <FontAwesome name="bus" size={20} color={theme.colors.primary} /> },
    { label: "Banco", value: "FontAwesome:bank", icon: () => <FontAwesome name="bank" size={20} color={theme.colors.primary} /> },
    { label: "Base de datos", value: "FontAwesome:database", icon: () => <FontAwesome name="database" size={20} color={theme.colors.primary} /> },
    { label: "Bolsa de compra", value: "FontAwesome5:shopping-bag", icon: () => <FontAwesome5 name="shopping-bag" size={20} color={theme.colors.primary} /> },
    { label: "Cafe", value: "FontAwesome:coffee", icon: () => <FontAwesome name="coffee" size={20} color={theme.colors.primary} /> },
    { label: "Caja", value: "FontAwesome:archive", icon: () => <FontAwesome name="archive" size={20} color={theme.colors.primary} /> },
    { label: "Camion", value: "FontAwesome:truck", icon: () => <FontAwesome name="truck" size={20} color={theme.colors.primary} /> },
    { label: "Canasta de compra", value: "FontAwesome5:shopping-basket", icon: () => <FontAwesome5 name="shopping-basket" size={20} color={theme.colors.primary} /> },
    { label: "Carrito de compra", value: "FontAwesome5:shopping-cart", icon: () => <FontAwesome5 name="shopping-cart" size={20} color={theme.colors.primary} /> },
    { label: "Carpeta", value: "FontAwesome:folder", icon: () => <FontAwesome name="folder" size={20} color={theme.colors.primary} /> },
    { label: "Carro", value: "FontAwesome:car", icon: () => <FontAwesome name="car" size={20} color={theme.colors.primary} /> },
    { label: "Cartera", value: "FontAwesome5:wallet", icon: () => <FontAwesome5 name="wallet" size={20} color={theme.colors.primary} /> },
    { label: "Circulo", value: "FontAwesome:circle", icon: () => <FontAwesome name="circle" size={20} color={theme.colors.primary} /> },
    { label: "Clip", value: "FontAwesome5:paperclip", icon: () => <FontAwesome5 name="paperclip" size={20} color={theme.colors.primary} /> },
    { label: "Código", value: "FontAwesome:code", icon: () => <FontAwesome name="code" size={20} color={theme.colors.primary} /> },
    { label: "Corazon", value: "FontAwesome:heart", icon: () => <FontAwesome name="heart" size={20} color={theme.colors.primary} /> },
    { label: "Correo", value: "FontAwesome:envelope", icon: () => <FontAwesome name="envelope" size={20} color={theme.colors.primary} /> },
    { label: "Cuadros", value: "FontAwesome:th-large", icon: () => <FontAwesome name="th-large" size={20} color={theme.colors.primary} /> },
    { label: "Cuadros", value: "FontAwesome:th", icon: () => <FontAwesome name="th" size={20} color={theme.colors.primary} /> },
    { label: "Cubiertos", value: "FontAwesome:cutlery", icon: () => <FontAwesome name="cutlery" size={20} color={theme.colors.primary} /> },
    { label: "Cuchara", value: "FontAwesome:spoon", icon: () => <FontAwesome name="spoon" size={20} color={theme.colors.primary} /> },
    { label: "Desktop", value: "FontAwesome5:desktop", icon: () => <FontAwesome5 name="desktop" size={20} color={theme.colors.primary} /> },
    { label: "Dinero", value: "FontAwesome:money", icon: () => <FontAwesome name="money" size={20} color={theme.colors.primary} /> },
    { label: "Dinero", value: "FontAwesome:dollar", icon: () => <FontAwesome name="dollar" size={20} color={theme.colors.primary} /> },
    { label: "Edge", value: "FontAwesome5:edge", icon: () => <FontAwesome5 name="edge" size={20} color={theme.colors.primary} /> },
    { label: "Enviar", value: "FontAwesome:send", icon: () => <FontAwesome name="send" size={20} color={theme.colors.primary} /> },
    { label: "Escuela", value: "FontAwesome:mortar-board", icon: () => <FontAwesome name="mortar-board" size={20} color={theme.colors.primary} /> },
    { label: "Estrella", value: "FontAwesome:star", icon: () => <FontAwesome name="star" size={20} color={theme.colors.primary} /> },
    { label: "Facebook", value: "FontAwesome5:facebook", icon: () => <FontAwesome5 name="facebook" size={20} color={theme.colors.primary} /> },
    { label: "Foto", value: "FontAwesome:photo", icon: () => <FontAwesome name="photo" size={20} color={theme.colors.primary} /> },
    { label: "Github", value: "FontAwesome5:github", icon: () => <FontAwesome5 name="github" size={20} color={theme.colors.primary} /> },
    { label: "Google", value: "FontAwesome5:google", icon: () => <FontAwesome5 name="google" size={20} color={theme.colors.primary} /> },
    { label: "Google Play", value: "FontAwesome5:google-play", icon: () => <FontAwesome5 name="google-play" size={20} color={theme.colors.primary} /> },
    { label: "Impresora", value: "FontAwesome:print", icon: () => <FontAwesome name="print" size={20} color={theme.colors.primary} /> },
    { label: "Inbox", value: "FontAwesome:inbox", icon: () => <FontAwesome name="inbox" size={20} color={theme.colors.primary} /> },
    { label: "Industría", value: "FontAwesome:industry", icon: () => <FontAwesome name="industry" size={20} color={theme.colors.primary} /> },
    { label: "Información", value: "FontAwesome:info", icon: () => <FontAwesome name="info" size={20} color={theme.colors.primary} /> },
    { label: "Instituto", value: "FontAwesome:institution", icon: () => <FontAwesome name="institution" size={20} color={theme.colors.primary} /> },
    { label: "Instagram", value: "FontAwesome5:instagram", icon: () => <FontAwesome5 name="instagram" size={20} color={theme.colors.primary} /> },
    { label: "Java", value: "FontAwesome:java", icon: () => <FontAwesome5 name="java" size={20} color={theme.colors.primary} /> },
    { label: "Jira", value: "FontAwesome:jira", icon: () => <FontAwesome5 name="jira" size={20} color={theme.colors.primary} /> },
    { label: "Lapiz", value: "FontAwesome:pencil", icon: () => <FontAwesome name="pencil" size={20} color={theme.colors.primary} /> },
    { label: "Laptop", value: "FontAwesome:laptop", icon: () => <FontAwesome5 name="laptop" size={20} color={theme.colors.primary} /> },
    { label: "Legal", value: "FontAwesome:legal", icon: () => <FontAwesome name="legal" size={20} color={theme.colors.primary} /> },
    { label: "Libro", value: "FontAwesome:book", icon: () => <FontAwesome name="book" size={20} color={theme.colors.primary} /> },
    { label: "LinkedIn", value: "FontAwesome:linkedin", icon: () => <FontAwesome name="linkedin" size={20} color={theme.colors.primary} /> },
    { label: "Linux", value: "FontAwesome5:linux", icon: () => <FontAwesome name="linux" size={20} color={theme.colors.primary} /> },
    { label: "Lista", value: "FontAwesome:th-list", icon: () => <FontAwesome name="th-list" size={20} color={theme.colors.primary} /> },
    { label: "Maletín", value: "FontAwesome:briefcase", icon: () => <FontAwesome name="briefcase" size={20} color={theme.colors.primary} /> },
    { label: "Mapa", value: "FontAwesome:map", icon: () => <FontAwesome name="map" size={20} color={theme.colors.primary} /> },
    { label: "Mastercard", value: "FontAwesome5:cc-mastercard", icon: () => <FontAwesome5 name="cc-mastercard" size={20} color={theme.colors.primary} /> },
    { label: "Messenger", value: "FontAwesome5:facebook-messenger", icon: () => <FontAwesome5 name="facebook-messenger" size={20} color={theme.colors.primary} /> },
    { label: "Microsoft", value: "FontAwesome5:microsoft", icon: () => <FontAwesome5 name="microsoft" size={20} color={theme.colors.primary} /> },
    { label: "Moto", value: "FontAwesome5:motorcycle", icon: () => <FontAwesome5 name="motorcycle" size={20} color={theme.colors.primary} /> },
    { label: "Mouse", value: "FontAwesome5:mouse", icon: () => <FontAwesome5 name="mouse" size={20} color={theme.colors.primary} /> },
    { label: "Musica", value: "FontAwesome:music", icon: () => <FontAwesome name="music" size={20} color={theme.colors.primary} /> },
    { label: "Nota", value: "FontAwesome:sticky-note", icon: () => <FontAwesome name="sticky-note" size={20} color={theme.colors.primary} /> },
    { label: "Nube", value: "FontAwesome:cloud", icon: () => <FontAwesome name="cloud" size={20} color={theme.colors.primary} /> },
    { label: "palette", value: "FontAwesome5:palette", icon: () => <FontAwesome5 name="palette" size={20} color={theme.colors.primary} /> },
    { label: "Palomita", value: "FontAwesome:check", icon: () => <FontAwesome name="check" size={20} color={theme.colors.primary} /> },
    { label: "Paypal", value: "FontAwesome5:paypal", icon: () => <FontAwesome5 name="paypal" size={20} color={theme.colors.primary} /> },
    { label: "Pelicula", value: "FontAwesome:video-camera", icon: () => <FontAwesome name="video-camera" size={20} color={theme.colors.primary} /> },
    { label: "Pincel", value: "FontAwesome:paint-brush", icon: () => <FontAwesome name="paint-brush" size={20} color={theme.colors.primary} /> },
    { label: "Pregunta", value: "FontAwesome:question", icon: () => <FontAwesome name="question" size={20} color={theme.colors.primary} /> },
    { label: "Puerta", value: "FontAwesome5:door-closed", icon: () => <FontAwesome5 name="door-closed" size={20} color={theme.colors.primary} /> },
    { label: "Puerta abierta", value: "FontAwesome5:door-open", icon: () => <FontAwesome5 name="door-open" size={20} color={theme.colors.primary} /> },
    { label: "Python", value: "FontAwesome5:python", icon: () => <FontAwesome5 name="python" size={20} color={theme.colors.primary} /> },
    { label: "Reddit", value: "FontAwesome:reddit", icon: () => <FontAwesome name="reddit" size={20} color={theme.colors.primary} /> },
    { label: "Regalo", value: "FontAwesome:gift", icon: () => <FontAwesome name="gift" size={20} color={theme.colors.primary} /> },
    { label: "Servidor", value: "FontAwesome5:server", icon: () => <FontAwesome5 name="server" size={20} color={theme.colors.primary} /> },
    { label: "Spotify", value: "FontAwesome:spotify", icon: () => <FontAwesome name="spotify" size={20} color={theme.colors.primary} /> },
    { label: "Steam", value: "FontAwesome:steam", icon: () => <FontAwesome name="steam" size={20} color={theme.colors.primary} /> },
    { label: "Streaming", value: "FontAwesome5:stream", icon: () => <FontAwesome5 name="stream" size={20} color={theme.colors.primary} /> },
    { label: "Tablet", value: "FontAwesome5:tablet-alt", icon: () => <FontAwesome5 name="tablet-alt" size={20} color={theme.colors.primary} /> },
    { label: "Tarjeta de credito", value: "FontAwesome5:credit-card", icon: () => <FontAwesome5 name="credit-card" size={20} color={theme.colors.primary} /> },
    { label: "Taxi", value: "FontAwesome5:taxi", icon: () => <FontAwesome5 name="taxi" size={20} color={theme.colors.primary} /> },
    { label: "Telefono", value: "FontAwesome:phone", icon: () => <FontAwesome name="phone" size={20} color={theme.colors.primary} /> },
    { label: "Telegram", value: "FontAwesome:telegram", icon: () => <FontAwesome name="telegram" size={20} color={theme.colors.primary} /> },
    { label: "Terminal", value: "FontAwesome:terminal", icon: () => <FontAwesome name="terminal" size={20} color={theme.colors.primary} /> },
    { label: "Tienda", value: "FontAwesome5:store", icon: () => <FontAwesome5 name="store" size={20} color={theme.colors.primary} /> },
    { label: "Twitch", value: "FontAwesome5:twitch", icon: () => <FontAwesome5 name="twitch" size={20} color={theme.colors.primary} /> },
    { label: "Twitter", value: "FontAwesome5:twitter", icon: () => <FontAwesome5 name="twitter" size={20} color={theme.colors.primary} /> },
    { label: "USB", value: "FontAwesome5:usb", icon: () => <FontAwesome5 name="usb" size={20} color={theme.colors.primary} /> },
    { label: "Videojuego", value: "FontAwesome:gamepad", icon: () => <FontAwesome name="gamepad" size={20} color={theme.colors.primary} /> },
    { label: "Visa", value: "FontAwesome5:cc-visa", icon: () => <FontAwesome5 name="cc-visa" size={20} color={theme.colors.primary} /> },
    { label: "WhatsApp", value: "FontAwesome5:whatsapp", icon: () => <FontAwesome5 name="whatsapp" size={20} color={theme.colors.primary} /> },
    { label: "Wi-fi", value: "FontAwesome5:wifi", icon: () => <FontAwesome5 name="wifi" size={20} color={theme.colors.primary} /> },
    { label: "Windows", value: "FontAwesome5:windows", icon: () => <FontAwesome5 name="windows" size={20} color={theme.colors.primary} /> },
    { label: "Xbox", value: "FontAwesome5:xbox", icon: () => <FontAwesome5 name="xbox" size={20} color={theme.colors.primary} /> },
    { label: "Youtube", value: "FontAwesome5:youtube", icon: () => <FontAwesome5 name="youtube" size={20} color={theme.colors.primary} /> },
];

export default function IconPicker({ value, onChange }) {
    const [visible, setVisible] = useState(false);
    const selectedItem = icons.find((item) => item.value === value);

    return (
        <>
            <TouchableOpacity
                style={styles.input}
                onPress={() => setVisible(true)}
            >
                {selectedItem ? (
                    <View style={styles.iconRow}>
                        <View style={styles.iconContainer}>
                            {selectedItem.icon()}
                        </View>
                        <Text style={styles.labelText}>{selectedItem.label}</Text>
                    </View>
                ) : (
                    <Text style={{ color: "#888" }}>Seleccionar icono</Text>
                )}
            </TouchableOpacity>

            <Modal visible={visible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Elige un ícono</Text>

                        <FlatList
                            data={icons}
                            keyExtractor={(item) => item.value || "auto"}
                            numColumns={5}
                            renderItem={({ item }) => {
                                if (item.value === "") {
                                    // 👇 opción especial: ocupa toda la fila
                                    return (
                                        <TouchableOpacity
                                            style={[
                                                styles.autoOption,
                                                value === item.value && {
                                                    backgroundColor: theme.colors.primary + "33",
                                                    borderColor: theme.colors.primary,
                                                    borderWidth: 1,
                                                },
                                            ]}
                                            onPress={() => {
                                                onChange(item.value);
                                                setVisible(false);
                                            }}
                                        >
                                            <View style={styles.iconContainer}>
                                                {item.icon()}
                                            </View>
                                            <Text style={styles.autoOptionText}>
                                                Asignar letra automáticamente
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                }

                                return (
                                    <TouchableOpacity
                                        style={[
                                            styles.iconButton,
                                            value === item.value && {
                                                backgroundColor: theme.colors.primary + "33",
                                                borderColor: theme.colors.primary,
                                                borderWidth: 1,
                                            },
                                        ]}
                                        onPress={() => {
                                            onChange(item.value);
                                            setVisible(false);
                                        }}
                                    >
                                        <View style={styles.iconContainer}>
                                            {item.icon()}
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                            contentContainerStyle={styles.iconGrid}
                            showsVerticalScrollIndicator={false}
                        />



                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setVisible(false)}
                        >
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const ICON_SIZE = 32;

const styles = StyleSheet.create({
    input: {
        width: "100%",
        backgroundColor: "#1e1e1e",
        color: theme.colors.primary,
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#333",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    labelText: {
        color: theme.colors.textPrimary,
        marginLeft: 8,
    },
    iconRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        alignItems: "center",
        justifyContent: "center",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.8)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    modalContainer: {
        backgroundColor: "#1e1e1e",
        borderRadius: 12,
        padding: 20,
        width: "100%",
        maxWidth: 420,
        maxHeight: "80%",
    },
    modalTitle: {
        color: theme.colors.textPrimary,
        fontSize: 18,
        textAlign: "center",
        marginBottom: 12,
    },
    iconGrid: {
        justifyContent: "center",
        paddingBottom: 10,
    },
    iconButton: {
        width: "18%", // 5 columnas con márgenes
        margin: "1%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "#2a2a2a",
        aspectRatio: 1,
    },

    cancelButton: {
        marginTop: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        paddingVertical: 10,
    },
    cancelText: {
        textAlign: "center",
        color: theme.colors.textPrimary,
        fontWeight: "600",
    },
    autoOption: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2a2a2a",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginVertical: 6,
        width: "100%",
        alignSelf: "center",
    },
    autoOptionText: {
        color: theme.colors.primary,
        marginLeft: 10,
        fontSize: 15,
    },

});
