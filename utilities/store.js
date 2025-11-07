import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export default class Store {
    async init() {
        const passwords = await this.getAllRaw();
        if (!passwords) {
            await this.setAll([]);
        }
    }

    // Obtiene los datos crudos (string o null)
    async getAllRaw() {
        if (isWeb) {
            return localStorage.getItem("passwords");
        } else {
            return await SecureStore.getItemAsync("passwords");
        }
    }

    // Guarda datos completos
    async setAll(data) {
        const value = JSON.stringify(data);
        if (isWeb) {
            localStorage.setItem("passwords", value);
        } else {
            await SecureStore.setItemAsync("passwords", value);
        }
    }

    async getAll() {
        const stored = await this.getAllRaw();
        /* TEMP */
        if(stored) {
            const newStored = [];

            JSON.parse(stored).map((s, index) => {
                const newElement = {...s}
                if(newElement.username == null)
                    newElement.username = s.email;
                delete newElement.email;
                newStored.push(newElement);
            });

            this.setAll(newStored);
        }
        /* TEMP */

        return stored ? JSON.parse(stored) : [];
    }

    async addPassword(password) {
        const data = await this.getAll();
        data.push(password);
        await this.setAll(data);
    }

    async getByIndex(index) {
        const data = await this.getAll();
        return data[index];
    }

    async deleteByIndex(index) {
        const data = await this.getAll();
        if (index >= 0 && index < data.length) {
            data.splice(index, 1);
            await this.setAll(data);
        }
    }

    async updateByIndex(index, password) {
        const data = await this.getAll();
        if (index >= 0 && index < data.length) {
            data[index] = password;
            await this.setAll(data);
        }
    }
}
