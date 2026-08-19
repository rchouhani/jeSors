import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView  } from 'react-native';
import InputComp from '../../components/Input';
import FAB from '../../components/FAB';


const RegisterTwoScreen = ({ navigation }: any) => {
    const [photo, setPhoto] = useState<string | null>(null);

    return (
        <>
        <SafeAreaView style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
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
                    <Text style={{ fontStyle: 'bold', color: 'grey', fontSize: 12 }}>
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
        placeholder='Ville' />
        <InputComp
            label='Bio'
            placeholder='Raconte-nous qui tu es'
            style={{ height: 150 }}
        />
        </SafeAreaView>
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