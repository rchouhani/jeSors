import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importation stricte du typage global
import { RootStackParamList } from './src/types/navigation';

// Importation des composants d'écrans et de la navigation
import SplashScreen from './src/screens/splash/Splash';
import TabNavigator from './src/navigation/TabNavigator';
import EventDetails from './src/screens/details/EventDetails';

// On applique le typage RootStackParamList au Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        {/* Écran 1 : Le Splash Screen autonome */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* Écran 2 : La barre d'onglets (contenant Feed, Carte, Favoris, Profil) */}
        <Stack.Screen name="MainTabs" component={TabNavigator} />

        {/* Écran 3 : Les détails (qui s'ouvriront par-dessus les onglets) */}
        <Stack.Screen name="EventDetails" component={EventDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
