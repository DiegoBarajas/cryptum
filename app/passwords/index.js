import React, { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Animated,
    Text,
    TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import AlphabeticalIndex from "../../components/alphabetIndex";
import Store from "../../utilities/store";
import Bar from "../../components/bar";
import { styles } from "../../styles";
import { theme } from "../../theme";

import searchImg from "../../assets/search.png";
import quitImg from "../../assets/quit.png";
import addImg from "../../assets/add.png";

export default function PasswordIndex() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const inputRef = useRef(null);

    const [groups, setGroups] = useState({});
    const [currentGroups, setCurrentGroups] = useState({});
    const [searchMode, setSearchMode] = useState(false);
    const [searchText, setSearchText] = useState("");

    const iconAnim = useRef(new Animated.Value(0)).current;
    const titleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const getGroups = async () => {
            const store = new Store();
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

            const ordered = {};
            if (groups["#"]) ordered["#"] = groups["#"];
            Object.keys(groups)
                .filter((k) => k !== "#")
                .sort()
                .forEach((k) => (ordered[k] = groups[k]));
            setGroups(ordered);
            setCurrentGroups(ordered);
        };
        getGroups();
    }, []);

    useEffect(() => {
        if (!searchText || searchText.trim() === "") setCurrentGroups(groups);

        const lowerValue = searchText.toLowerCase();
        const filtered = {};

        Object.keys(groups).forEach((key) => {
            const matches = groups[key].filter((item) =>
                item.name.toLowerCase().includes(lowerValue)
            );

            if (matches.length > 0) {
                filtered[key] = matches;
            }
        });

        setCurrentGroups(filtered);
    }, [searchText]);

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
            if (newMode) {
                inputRef.current?.focus();
            } else {
                setSearchText("");
            }
        });
    };


    // Animaciones
    const searchOpacity = iconAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });
    const quitOpacity = iconAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
    const rotation = iconAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
    });

    const titleOpacity = titleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });
    const inputOpacity = titleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
    const inputTranslateX = titleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0],
    });

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
    });

    return (
        <View style={styles.screen}>
            <Bar />

            <View style={customStyles.searchBox}>
                <View style={customStyles.titleWrapper}>
                    <Animated.View
                        style={[
                            customStyles.titleAbsolute,
                            { opacity: titleOpacity, zIndex: searchMode ? 0 : 1 },
                        ]}
                    >
                        <Title />
                    </Animated.View>

                    <Animated.View
                        style={[
                            customStyles.titleAbsolute,
                            {
                                opacity: inputOpacity,
                                transform: [{ translateX: inputTranslateX }],
                                zIndex: searchMode ? 1 : 0,
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
                                { opacity: searchOpacity, transform: [{ rotate: rotation }] },
                            ]}
                        />
                        <Animated.Image
                            source={quitImg}
                            style={[
                                customStyles.searchImage,
                                { opacity: quitOpacity, transform: [{ rotate: rotation }] },
                            ]}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <AlphabeticalIndex data={currentGroups} totalElements={Object.keys(groups).length}/>

            <TouchableOpacity style={customStyles.addButton} onPress={addElement}>
                <Image style={customStyles.addImage} source={addImg} />
            </TouchableOpacity>
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
