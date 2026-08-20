import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputComp from '../../components/Input';
import ButtonComp from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';
import { useRegister } from '../../context/RegisterContext';

const AuthScreen = () => {
    const navigation = useNavigation();
    const { setProgress } = useRegister();
    const [isLogin, setIsLogin] = useState(true);
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [inputValue, setInputValue ] = useState('');

    useEffect(() => {
         if (!isLogin) return;
        const filled = [pseudo, password, confirm].filter(v => v.length > 0).length;
        setProgress((filled / 3) * 50);
    }, [pseudo, password, confirm, isLogin]);

    return(
        <View style={styles.container}>
        <ProgressBar />
            <Text style={styles.titleText}>
                {isLogin ? 'Inscription' : 'Connexion'}
            </Text>
            <InputComp
                label='pseudo'
                placeholder='Pseudo'
                value={pseudo}
                onChangeText={setPseudo}
                keyboardType='email-address'
            />
            <InputComp
                label='Mot Passe'
                placeholder='Mot de Passe'
                value={password}
                onChangeText={setPassword}
                keyboardType='default'
                secureTextEntry={true}
            />
            {isLogin && (
                <InputComp
                    label='Confirmer le mot de passe'
                    placeholder='Confirmer'
                    value={confirm}
                    onChangeText={setConfirm}
                    keyboardType='default'
                    secureTextEntry={true}
                />
            )}
            <ButtonComp
                title={isLogin ? 'Suivant' : 'Se connecter'}
                onPress={() => isLogin
                    ? navigation.navigate('RegisterTwo')
                    : navigation.navigate('Login')
                }
            />
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