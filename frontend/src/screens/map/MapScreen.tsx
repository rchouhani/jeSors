import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  Map,
  Camera,
  ViewAnnotation,
  type StyleSpecification,
} from '@maplibre/maplibre-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList, EventItem } from '../../types/navigation';
import eventsData from '../../data/events.json';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Style raster utilisant exclusivement les tuiles OpenStreetMap
const OSM_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      maxzoom: 19,
      attribution: '© OpenStreetMap contributors',
    },
  },
  layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
};

// Attention : MapLibre attend [longitude, latitude]
const PARIS: [number, number] = [2.3522, 48.8566];

const MapScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const events = eventsData as EventItem[];
  const [selected, setSelected] = useState<EventItem | null>(null);

  return (
    <View style={styles.container}>
      <Map style={styles.map} mapStyle={OSM_STYLE} onPress={() => setSelected(null)}>
        <Camera initialViewState={{ center: PARIS, zoom: 12 }} />

        {events.map(event => {
          if (!event.coordinate?.latitude || !event.coordinate?.longitude) {
            return null;
          }

          return (
            <ViewAnnotation
              key={event.id}
              id={event.id}
              lngLat={[event.coordinate.longitude, event.coordinate.latitude]}
              anchor="bottom"
              onPress={() => setSelected(event)}
            >
              <View style={styles.marker}>
                <Text style={styles.markerText}>📍</Text>
              </View>
            </ViewAnnotation>
          );
        })}
      </Map>

      {selected && (
        <TouchableOpacity
          style={styles.calloutContainer}
          onPress={() => navigation.navigate('EventDetails', { event: selected })}
        >
          <Text style={styles.calloutTitle}>{selected.title}</Text>
          <Text style={styles.calloutSubtitle}>
            📅 {selected.date} - 📍 {selected.location}
          </Text>
          <Text style={styles.calloutAction}>Voir les détails ›</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  marker: { alignItems: 'center', justifyContent: 'center' },
  markerText: { fontSize: 30 },
  calloutContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  calloutTitle: { fontWeight: 'bold', fontSize: 14, color: '#1A202C', marginBottom: 4 },
  calloutSubtitle: { fontSize: 12, color: '#718096', marginBottom: 6 },
  calloutAction: { fontSize: 12, color: '#3182CE', fontWeight: '600' },
});

export default MapScreen;