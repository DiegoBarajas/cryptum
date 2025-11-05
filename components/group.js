import { View, Text, StyleSheet } from "react-native";
import Element from "./element";
import { styles } from "../styles";
import { theme } from "../theme";

export default function Group({ title, items }) {
    return (
        <View style={customStyles.box}>
            <Text style={styles.text}>{title}</Text>
            <View style={customStyles.line} />

            {
                items.map((item, index) => 
                    <Element key={`element-${index}`} item={item} />
                )
            }
        </View>
    );
}

const customStyles = StyleSheet.create({
    box: {
        width: "100%",
        marginTop: 10
    },
    line: {
        width: "100%",
        height: 2,
        backgroundColor: theme.colors.textPrimary,
        marginBottom: 10
    },

});

