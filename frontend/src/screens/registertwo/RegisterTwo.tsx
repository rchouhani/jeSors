import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView  } from 'react-native';
import InputComp from '../../components/Input';
import FAB from '../../components/FAB';
import ProgressBar from '../../components/ProgressBar';
import { useRegister } from '../../context/RegisterContext';


const RegisterTwoScreen = ({ navigation }: any) => {
    const { setProgress } = useRegister();
    const [photo, setPhoto] = useState<string | null>(null);
    const [city, setCity] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        const filled = [city, bio].filter(v => v && v.length > 0).length;
        setProgress(50 + (filled / 2) * 50);
    }, [city, bio]);

    return (
        <>
        <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
        <ProgressBar />
        <InputComp
            style={{
                position: 'relative',
                left: 25,
                alignItems: 'center',
                justifyContent: 'center',
                width: 250,
                height: 250,
                borderRadius: 125,
                textAlign: 'center',
            }}
            labelStyle={{ marginBottom: 30, fontSize: 30 }}
            label={
                <>
                    <Text>Ton profil</Text>
                    <Text style={{ fontWeight: 'bold', color: 'grey', fontSize: 12 }}>
                        {'\n'}Les autres participants le verront ainsi
                    </Text>
                </>
            }
            placeholder='Ajoute une photo'
        />
        <View>
            {photo && <Image source={{ uri: photo }} style={{ width: 100, height: 100 }}/>}
            <FAB onImageSelected={(uri) => setPhoto(uri)} />
        </View>
        <Text style={{ marginTop: -50 }}>Optionnel</Text>
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
    }
});

export default RegisterTwoScreen;