import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../../styles";
import { theme } from "../../theme";
import AlphabeticalIndex from "../../components/alphabetIndex";

import addImg from "../../assets/add.png";
import { useEffect, useState } from "react";
import Store from "../../utilities/store";

import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


export default function PasswordIndex() {
    const router = useRouter();

    const [ groups, setGroups ] = useState({});

    useEffect(() => {
        const getGroups = async() => {
            const store = new Store();
            await store.init();

            const passwords = await store.getAll();
           
            const groups = {};
            passwords.forEach((item, indx) => {
                if (!item.name || typeof item.name !== "string") return;

                const firstChar = item.name[0].toUpperCase();
                const key = /^[A-Z]$/.test(firstChar) ? firstChar : "#";

                if (!groups[key]) {
                    groups[key] = [];
                }

                item['index'] = indx;

                groups[key].push(item);

            });

            setGroups(groups)
        }

        getGroups();
    }, []);

    const addElement = () => {
        router.push("/add");
    }

    return (
        <View style={styles.screen}>
            <Text style={customStyles.heading}>Cryptum</Text>

            <AlphabeticalIndex data={groups} />

            <TouchableOpacity style={customStyles.addButton} onPress={addElement}>
                <Image 
                    style={customStyles.addImage}
                    source={addImg}
                />
            </TouchableOpacity>

        </View>
    );
}

const customStyles = StyleSheet.create({
    heading: {
        ...styles.heading,       
        color: theme.colors.primary,
        marginTop: 15,
    },
    button: {
        ...styles.button,
        marginTop: 50
    },
    addButton: {
        ...styles.button,
        position: "absolute",
        bottom: width * 0.175,
        right: width * 0.15,
        width: 65,
        height: 65,
        borderRadius: 100
    },
    addImage: {
        width: 35,
        height: 35
    }
});
