import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const FAB = ({ onImageSelected }: { onImageSelected: (uri: string) => void }) => {
    const pickImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 1,
                selectionLimit: 1,
            },
            (response) => {
                if (response.didCancel) return;
                if (response.errorCode) {
                    console.errorCode(response.errorMessage);
                    return;
                }
                if (response.assets && response.assets[0].uri) {
                    onImageSelected(response.assets[0].uri);
                }
            }
        );
    };
    return (
            <TouchableOpacity style={styles.fab} onPress={pickImage}>
                <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        top: -55,
        left: 70,
        position: 'relative',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'steelblue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    plus: {
        color: 'white',
        fontSize: 30,
        lineHeight: 32,
    }
});

export default FAB;