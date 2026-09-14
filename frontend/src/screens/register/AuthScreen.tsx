import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView, TextInput, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import InputComp from '../../components/Input';
import ButtonComp from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';
import { useRegister } from '../../context/RegisterContext';
import { TEST_USER } from '../../data/testUser';

type AuthNavigationParamList = {
    RegisterTwo: undefined;
    Login: undefined;
    MainTabs: undefined;
};


const AuthScreen = () => {
    const navigation = useNavigation<NavigationProp<AuthNavigationParamList>>();
    const { setProgress, isLogin, setIsLogin } = useRegister();
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const handlelogin = () => {
        if (pseudo === TEST_USER.email && password === TEST_USER.password) {
            navigation.navigate('MainTabs');
        } else {
            Alert.alert('Email ou mot de passe incorrect');
        }
    }
    
    useEffect(() => {
         if (!isLogin) return;
        const filled = [pseudo, password, confirm].filter(v => v.length > 0).length;
        setProgress((filled / 3) * 50);
    }, [pseudo, password, confirm, isLogin]);

    return(
    <KeyboardAvoidingView // class native de react native qui permet de ne pas cacher ce qu'il y a sous le clavier
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1}}
    >  
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.container}> 
                <ProgressBar />
                    <Text style={styles.titleText}>
                        {isLogin ? 'Inscription' : 'Connexion'}
                    </Text>
                    <InputComp
                        label='E-mail'
                        placeholder='user@mail.fr'
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
                            placeholder='Confirmer le mot de passe'
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
                            : handlelogin()
                        }
                    />
                    <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                        <Text style={styles.switchText}>
                            {isLogin ? "Déjà un compte ? Se connecter" : "Pas encore de compte ? S'inscrire"}
                        </Text>
                    </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>  
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