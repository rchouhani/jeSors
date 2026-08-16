import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importation du typage global
import { RootStackParamList } from './src/types/navigation';

// Importation des composants d'écrans et de la navigation
import SplashScreen from './src/screens/splash/Splash';
import TabNavigator from './src/navigation/TabNavigator';
import EventDetails from './src/screens/details/EventDetails';
import LoginScreen from './src/screens/login/LoginScreen';
import AuthScreen from './src/screens/register/AuthScreen';

// Importation des deux gestionnaires d'état globaux (Contexts)
import { FavoritesProvider } from './src/context/FavoritesContext';
import { UserEventsProvider } from './src/context/UserEventsContext';

// Application du typage RootStackParamList au Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    /*
      1. FavoritesProvider : Rend la liste des favoris accessible dans toute l'application.
      2. UserEventsProvider : Rend la liste des sorties auxquelles l'utilisateur est inscrit accessible partout.
    */
    <FavoritesProvider>
      <UserEventsProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
          >
            {/* Écran 1 : Splash Screen au démarrage */}
            <Stack.Screen name="Splash" component={SplashScreen} />

            {/* Écran 2 : La barre d'onglets principale (Feed, Carte, Favoris, Profil) */}
            <Stack.Screen name="MainTabs" component={TabNavigator} />

            {/* Écran 3 : Les détails (qui s'ouvriront par-dessus les onglets) */}
            <Stack.Screen name="EventDetails" component={EventDetails} />

            {/* Écran 4 : Ecran de Login non utilisé pour le moment, voir si utile */}
            <Stack.Screen name="Login" component={LoginScreen} />

            {/* Écran 5 : Ecrans avec switch entre connexion et enregistrement */}
            <Stack.Screen name="Register" component={AuthScreen} />
          </Stack.Navigator>
          ’
        </NavigationContainer>
      </UserEventsProvider>
    </FavoritesProvider>
  );
};

export default App;
