import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Je Sors !</Text>

      <Text style={styles.subtitle}>Trouve des sorties autour de toi</Text>
    </View>
  );
};

export default SplashScreen;

// créer un type pour les styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },

  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
  },

  subtitle: {
    fontSize: 18,
    color: '#ccc',
    marginTop: 10,
  },
});
