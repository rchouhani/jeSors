import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/screens/splash/Splash';
import EventsFeed from './src/screens/feed/EventsFeed';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />

        <Stack.Screen name="EventsFeed" component={EventsFeed} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
