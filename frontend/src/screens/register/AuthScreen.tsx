import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InputComp from '../../components/Input';
import ButtonComp from '../../components/Button';

const AuthScreen = ({ navigation }: any) => {
    const [isLogin, setIsLogin] = useState(true);

    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>
                {isLogin ? 'Inscription' : 'Connexion'}
            </Text>
            <InputComp label='Pseudo' placeholder='Pseudo' />
            <InputComp label='Mot de Passe' placeholder='Mot de Passe'/>
            {isLogin && (
                <InputComp label='Confirmer le mot de passe' placeholder='Confirmer'/>
            )}
            <ButtonComp title={isLogin ? 'S\'enregistrer' : 'Se connecter'} />
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.switchText}>
                    {isLogin ? "Déjà un compte ? Se connecter" : "Pas encore de compte ? S'inscrire"}
                </Text>
            </TouchableOpacity>
        </View>
        );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        },
    titleText: {
        color: 'steelblue',
        fontSize: 40,
    },
    switchText: {
        color: 'steelblue',
        marginTop: 16,
        textDecorationLine: 'underline',
    }
})

export default AuthScreen;