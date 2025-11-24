import React, { useState } from 'react'
import { theme } from '../theme';
import { Modal, View } from 'react-native-web';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';

const ModalConfirm = ({ isOpen=false, setIsOpen=()=>{}, title, content, animationType="", cancelLabel="Cancelar", confirmLabel="Confirmar", onConfirm = () => { }, onCancel = () => { } }) => {
    const handleConfirm = () => {
        onConfirm();
    }

    const handleCancel = () => {
        setIsOpen(false);
        onCancel();
    }

    return (
        <Modal transparent visible={isOpen} animationType="fade">
            <View style={customStyles.modalContainer}>
                <View style={customStyles.modalContent}>
                    <Text style={[customStyles.modalTitle]}>{title}</Text>
                    <Text style={[customStyles.modalText, content ? {marginBottom: 30} : {}]}>{content}</Text>
                    <View style={customStyles.modalButtons}>
                        <TouchableOpacity
                            style={[customStyles.modalButton, customStyles.modalCancel]}
                            onPress={handleCancel}
                        >
                            <Text style={customStyles.modalButtonText}>{cancelLabel}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[customStyles.modalButton, customStyles.modalSave]}
                            onPress={handleConfirm}
                        >
                            <Text style={customStyles.modalButtonText}>{confirmLabel}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const customStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "85%",
        maxWidth: 600,
        backgroundColor: "#1c1c1c",
        borderRadius: 12,
        padding: 20,
        borderWidth: 1
    },
    modalTitle: {
        fontSize: 18,
        color: theme.colors.primary,
        marginBottom: 10,
        textAlign: "center",
    }, 
    modalText: {
        color: theme.colors.textPrimary,
        textAlign: "center",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    modalButton: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    modalSave: {
        backgroundColor: theme.colors.primary,
    },
    modalCancel: {
        backgroundColor: "#333",
    },
    modalButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default ModalConfirm

