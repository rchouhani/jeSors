import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importation de la liste des onglets officiels
import { RootTabParamList } from '../types/navigation';

// Importation de l'écran EventsFeed existant
import EventsFeed from '../screens/feed/EventsFeed';

// --- ÉCRANS TEMPORAIRES (En attendant de créer les fichiers d'écrans) ---
function CarteScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Écran Carte</Text>
    </View>
  );
}

function FavorisScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Écran Favoris</Text>
    </View>
  );
}

function ProfilScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Écran Profil</Text>
    </View>
  );
}
// -----------------------------------------------------------------------------------------

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000000', // Noir pour l'onglet actif (comme sur ton image)
        tabBarInactiveTintColor: '#8E8E93', // Gris pour les onglets inactifs
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={EventsFeed}
        options={{ title: 'Feed' }}
      />
      <Tab.Screen
        name="Carte"
        component={CarteScreen}
        options={{ title: 'Carte' }}
      />
      <Tab.Screen
        name="Favoris"
        component={FavorisScreen}
        options={{ title: 'Favoris' }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfilScreen}
        options={{ title: 'Profil' }}
      />
    </Tab.Navigator>
  );
}
