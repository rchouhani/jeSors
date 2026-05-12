import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import SplashScreen from './src/screens/splash/Splash';

const App = () => {
  return (
    // On utilise le style défini dans le StyleSheet plus bas
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SplashScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#121212',
  },
});

export default App;
