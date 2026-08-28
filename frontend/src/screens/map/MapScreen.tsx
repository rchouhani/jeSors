import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_DEFAULT } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Importation des types et données
import { RootStackParamList, EventItem } from '../../types/navigation';
import eventsData from '../../data/events.json';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Position initiale par défaut (Paris)
const INITIAL_REGION = {
  latitude: 48.8566,
  longitude: 2.3522,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const events = eventsData as EventItem[];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {events.map(event => {
          // Sécurité : Vérifie que l'événement possède des coordonnées GPS
          if (!event.coordinates?.latitude || !event.coordinates?.longitude) {
            return null;
          }

          return (
            <Marker
              key={event.id}
              coordinate={{
                latitude: event.coordinates.latitude,
                longitude: event.coordinates.longitude,
              }}
              title={event.title}
            >
              {/* Bulle d'information au clic sur le marqueur */}
              <Callout
                tooltip
                onPress={() => navigation.navigate('EventDetails', { event })}
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{event.title}</Text>
                  <Text style={styles.calloutSubtitle}>
                    📅 {event.date} - 📍 {event.location}
                  </Text>
                  <Text style={styles.calloutAction}>Voir les détails ›</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  calloutContainer: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1A202C',
    marginBottom: 4,
  },
  calloutSubtitle: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 6,
  },
  calloutAction: {
    fontSize: 12,
    color: '#3182CE',
    fontWeight: '600',
  },
});

export default MapScreen;
