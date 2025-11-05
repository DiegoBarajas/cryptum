// App.js
import React, { useState } from "react";
import { View, Text, Button, Alert, Platform } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

export default function App() {
  const [status, setStatus] = useState("");

  // ======== GUARDAR TOKEN ========
  async function saveToken() {
      if (Platform.OS === "web") {    
        localStorage.setItem("userToken", "token-web-demo");
        Alert.alert("Guardado token en web");
      } else {
        await SecureStore.setItemAsync("userToken", "token-mobile-demo");
        Alert.alert("Guardado token seguro en móvil");
      }
  }

  // ======== AUTENTICAR ========
  async function authenticate() {
    if (Platform.OS === "web") {
      try {
        // WebAuthn básico (demostrativo)
        if (!window.PublicKeyCredential) {
          Alert.alert("WebAuthn no disponible en este navegador");
          return;
        }
        // Simula challenge: normalmente lo entrega tu backend
        const challenge = Uint8Array.from("demo-challenge", c => c.charCodeAt(0));
        await navigator.credentials.create({
          publicKey: {
            challenge,
            rp: { name: "Demo Cryptum" },
            user: {
              id: new Uint8Array(16),
              name: "demo@user",
              displayName: "Demo User",
            },
            pubKeyCredParams: [{ type: "public-key", alg: -7 }],
            timeout: 60000,
          },
        });
        const token = localStorage.getItem("userToken");
        Alert.alert("Login web OK", token ?? "Sin token guardado");
      } catch (e) {
        Alert.alert("Error WebAuthn", e.message);
      }
    } else {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Verifícate con huella/FaceID",
      });
      if (result.success) {
        const token = await SecureStore.getItemAsync("userToken");
        Alert.alert("Login móvil OK", token ?? "Sin token guardado");
      } else {
        Alert.alert("Autenticación fallida o cancelada");
      }
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Auth Biométrica Universal</Text>
      <Text>Plataforma: {Platform.OS}</Text>
      <Button title="Guardar token" onPress={saveToken} />
      <Button title="Autenticarse" onPress={authenticate} />
      <Text style={{ marginTop: 20 }}>{status}</Text>
    </View>
  );
}
