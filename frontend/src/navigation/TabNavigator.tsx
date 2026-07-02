import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false,

        // Configuration dynamique des icônes
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'list';

          if (route.name === 'Feed') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Carte') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Favoris') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Feed"
        component={EventsFeed}
        options={{ title: 'Sorties' }}
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
