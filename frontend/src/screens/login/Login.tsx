import React from 'react';
import { View, Text } from 'react-native';
import Input from '../../components/Input';

const LoginScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Connexion</Text>
      <Input
        placeholder='Nom utilisateur'
        style={{ borderWidth: 1, borderColor: 'red', borderRadius: 8 }}
      />
    </View>
  );
};

export default LoginScreen;