import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// On ajoute ({ navigation }: any) pour permettre à l'écran de rediriger l'utilisateur
const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const chrono = setTimeout(() => {
      // Au bout de 3 secondes, on bascule vers le feed
      navigation.replace('EventsFeed');
    }, 3000);

    return () => clearTimeout(chrono);
  }, []);

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

// créer un type pour les styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#121212',
    backgroundColor: '#F5F5F5', // Un fond légèrement grisé pour voir si l'image est blanche
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain', // Force l'image à s'adapter sans déborder
    backgroundColor: 'transparent',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    // color: '#fff',
    color: '#333333',
    marginTop: 20,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});

export default SplashScreen;
