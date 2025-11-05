import * as LocalAuthentication from "expo-local-authentication";
import { Platform } from "react-native";

export async function authenticate(promptMessage, onSuccess) {
	if (Platform.OS === "web") {
		try {
			if (!window.PublicKeyCredential) {
				console.error("WebAuthn no disponible");
				return;
			}

			const challenge = Uint8Array.from("demo", (c) => c.charCodeAt(0));

			// Más rápido: usamos get() en vez de create()
			await navigator.credentials.get({
				publicKey: {
					challenge,
					timeout: 10000,
					userVerification: "preferred",
				},
			});

			if (typeof onSuccess === "function") onSuccess();
		} catch (e) {
		}
	} else {
		try {
			const hasHardware = await LocalAuthentication.hasHardwareAsync();
			const isEnrolled = await LocalAuthentication.isEnrolledAsync();

			if (!hasHardware || !isEnrolled) {
				console.error("Configura FaceID o huella para continuar");
				return;
			}

			const result = await LocalAuthentication.authenticateAsync({
				promptMessage: promptMessage,
				fallbackLabel: "hola",
				disableDeviceFallback: true,
				requireConfirmation: false,
			});

			if (result.success) {
				if (typeof onSuccess === "function") onSuccess();
			} else { }
		} catch (error) { }
	}
}
