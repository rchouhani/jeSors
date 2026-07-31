import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputComp from '../../components/Input';
import ButtonComp from '../../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;


const LoginScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={ styles.titleText }>Connexion</Text>
      <InputComp label='Pseudo' placeholder='Pseudo' />
      <InputComp label='Mot de Passe' placeholder='Mot de Passe' />
      <ButtonComp title="Se Connecter" />
    </View>
  );
};

const styles = StyleSheet.create({
    titleText: {
        color: 'steelblue',
        fontSize: 40,
        }
    });

export default LoginScreen;