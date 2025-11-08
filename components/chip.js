import { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

export function SelectableChip({ selected = false, label, icon, onPress=null, onLongPress=()=>{} }) {

    return onPress ? (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
                styles.chipBase,
                selected ? styles.chipSelected : styles.chipUnselected,
            ]}
        >
            <View style={styles.content}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={16}
                        color={selected ? theme.colors.textPrimary : theme.colors.primary}
                        style={{ marginRight: 6 }}
                    />
                )}
                <Text
                    style={[
                        styles.labelBase,
                        selected ? styles.labelSelected : styles.labelUnselected,
                    ]}
                >
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    ) : (
        <Pressable
            style={[
                styles.chipBase,
                selected ? styles.chipSelected : styles.chipUnselected,
            ]}
        >
            <View style={styles.content}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={16}
                        color={selected ? theme.colors.textPrimary : theme.colors.primary}
                        style={{ marginRight: 6 }}
                    />
                )}
                <Text
                    style={[
                        styles.labelBase,
                        selected ? styles.labelSelected : styles.labelUnselected,
                    ]}
                >
                    {label}
                </Text>
            </View>
        </Pressable>
    );
}

export function Chip({ label, icon, selected = false, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.chipBase,
                selected ? styles.chipSelected : styles.chipUnselected,
            ]}
        >
            <View style={styles.content}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={17}
                        color={selected ? theme.colors.textPrimary : theme.colors.primary}
                    />
                )}
                <Text
                    style={[
                        styles.labelBase,
                        selected ? styles.labelSelected : styles.labelUnselected,
                    ]}
                >
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export function SelectChipsArea({ data = [], defaultValue = null, onChange }) {
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    const handleSelect = (value) => {
        setSelectedValue(value);
        if (onChange) onChange(value);
    };

    return (
        <>
            {data.map((item) => (
                <SelectableChip
                    key={item.name}
                    label={item.name}
                    icon={item.icon}
                    selected={selectedValue == item.name}
                    onPress={() => handleSelect(item.name)}
                />
            ))}
        </>
    );
}


const styles = StyleSheet.create({
    chipBase: {
        alignSelf: 'flex-start', // <- hace que ocupe solo el ancho necesario
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 4,
    },
    chipSelected: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    chipUnselected: {
        borderColor: theme.colors.primary,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelBase: {
        fontSize: 14,
    },
    labelSelected: {
        color: theme.colors.textPrimary,
    },
    labelUnselected: {
        color: theme.colors.primary,
    },
});
