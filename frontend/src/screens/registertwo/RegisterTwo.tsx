import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import InputComp from '../../components/Input';
import ProgressBar from '../../components/ProgressBar';
import { useRegister } from '../../context/RegisterContext';
import { launchImageLibrary } from 'react-native-image-picker';


const RegisterTwoScreen = () => {
    const { setProgress } = useRegister();
    const [photo, setPhoto] = useState<string | null>(null);
    const [city, setCity] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
    const filled = [city, bio].filter(v => v && v.length > 0).length;
        setProgress(50 + (filled / 2) * 50);
    }, [city, bio]);

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
            if (!response.didCancel && response.assets?.[0].uri) {
                setPhoto(response.assets[0].uri);
            }
        });
    }

    return (
        <>
        <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'flex-start' }}>
        <ProgressBar />
        <Text style={{ fontSize: 40, fontWeight: 800, marginTop: 70, marginBottom: -10 }}>Ton profil</Text>
        <Text style={{ fontWeight: 'bold', color: 'grey', fontSize: 12, marginBottom: 50 }}>
            {'\n'}Les autres participants le verront ainsi
        </Text>
        <TouchableOpacity
            style={styles.photoCircle}
            onPress={pickImage}
        >
            {photo
                ? <Image source={{ uri: photo }} style={styles.photoImage} />
                : <Text style={styles.photoPlaceholder}>Ajoute ta photo<Text style={{ fontStyle: 'italic', fontSize: 10 }}>{'\n'}(Optionnel)</Text></Text>
            }
        </TouchableOpacity>
        <InputComp
            label='Ville'
            placeholder='Ville'
            value={city}
            onChangeText={setCity}
            keyboardType='default'
         />
        <InputComp
            label='Bio'
            placeholder='Raconte-nous qui tu es'
            style={{ height: 150 }}
            value={bio}
            onChangeText={setBio}
            keyboardType='default'
        />
        </View>
        </>
    );
}

const styles = StyleSheet.create ({
    container: {
        marginTop: 150,
        marginLeft: 50,
        fontSize: 16,
    },
     photoCircle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'cornflowerblue',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: -20,
    },
    photoImage: {
        width: 250,
        height: 250,
        borderRadius: 125,
    },
    photoPlaceholder: {
        fontSize: 17,
        color: 'black',
        textAlign: 'center',
    },
});

export default RegisterTwoScreen;