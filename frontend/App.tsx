import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import SplashScreen from './src/screens/splash/Splash';

const App = () => {
  return (
    // On utilise le style défini dans le StyleSheet plus bas
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <SplashScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default App;
