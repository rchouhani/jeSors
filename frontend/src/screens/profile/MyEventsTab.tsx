import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Importation des données de sorties, des couleurs et des typages
import rawEvents from '../../data/events.json';
import { EventItem, MyEventsProps } from '../../types/navigation';
import { useUserEvents } from '../../context/UserEventsContext';
import { CATEGORY_COLORS, CATEGORY_TEXT_COLORS } from '../../theme/colors';
const DATA_EVENTS: EventItem[] = rawEvents;

export const MyEventsTab = ({ navigation }: MyEventsProps) => {
  // État local pour le sous-filtre ('a_venir' ou 'passees')
  const [subFilter, setSubFilter] = useState<'a_venir' | 'passees'>('a_venir');

  // Récupération des données d'inscription globales et de la fonction de désinscription
  const { registeredEventIds, unregisterFromEvent } = useUserEvents();

  // Filtrage des événements pour ne garder que ceux où l'utilisateur est inscrit
  const myEvents = DATA_EVENTS.filter(event =>
    registeredEventIds.includes(event.id),
  );

  // Structure d'affichage d'une carte de sortie
  const renderMyEventCard = ({ item }: { item: EventItem }) => {
    const badgeBg = CATEGORY_COLORS[item.category] || '#EAEAEA';
    const badgeColor = CATEGORY_TEXT_COLORS[item.category] || '#FFFFFF';

    return (
      <View style={styles.card}>
        {/* Photo de l'événement */}
        <Image source={{ uri: item.image }} style={styles.cardImage} />

        <View style={styles.cardContent}>
          {/* Titre et Badge de catégorie */}
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={[styles.badge, { backgroundColor: badgeBg }]}>
              <Text style={[styles.badgeText, { color: badgeColor }]}>
                {item.category}
              </Text>
            </View>
          </View>

          {/* Date et Lieu */}
          <Text style={styles.cardDate}>📅 {item.date}</Text>
          <Text style={styles.cardLocation}>📍 {item.location}</Text>

          {/* Bouton rouge "Se désinscrire" */}
          <TouchableOpacity
            style={styles.unsubscribeButton}
            onPress={() => unregisterFromEvent(item.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.unsubscribeText}>Se désinscrire</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>
        {/* EN-TÊTE AVEC BOUTON RETOUR (Même style exact que EventDetails) */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('Feed');
              }
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mes Sorties</Text>
        </View>

        {/* 1. Sous-filtres (À venir / Passées) */}
        <View style={styles.subFilterContainer}>
          <TouchableOpacity
            style={[
              styles.subFilterBtn,
              subFilter === 'a_venir' && styles.activeSubFilterBtn,
            ]}
            onPress={() => setSubFilter('a_venir')}
          >
            <Text
              style={[
                styles.subFilterText,
                subFilter === 'a_venir' && styles.activeSubFilterText,
              ]}
            >
              À venir
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.subFilterBtn,
              subFilter === 'passees' && styles.activeSubFilterBtn,
            ]}
            onPress={() => setSubFilter('passees')}
          >
            <Text
              style={[
                styles.subFilterText,
                subFilter === 'passees' && styles.activeSubFilterText,
              ]}
            >
              Passées
            </Text>
          </TouchableOpacity>
        </View>

        {/* 2. Affichage de la liste ou message d'absence de sorties */}
        {myEvents.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Vous n'êtes inscrit à aucune sortie pour le moment.
            </Text>
          </View>
        ) : (
          <FlatList
            data={myEvents}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            renderItem={renderMyEventCard}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginRight: 15,
  },
  backText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  // Boutons des sous-filtres
  subFilterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  subFilterBtn: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F3F3',
    marginRight: 10,
  },
  activeSubFilterBtn: { backgroundColor: '#1A1A1A' },
  subFilterText: { color: '#7A7A7A', fontWeight: '600', fontSize: 14 },
  activeSubFilterText: { color: '#FFFFFF' },

  // Cartes de sorties
  listContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    overflow: 'hidden',
  },
  cardImage: { width: 110, height: '100%', backgroundColor: '#EAEAEA' },
  cardContent: { flex: 1, padding: 12 },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#1A1A1A', flex: 1 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 6,
  },
  badgeText: { fontSize: 11, fontWeight: 'bold' },
  cardDate: { fontSize: 12, color: '#7A7A7A', marginBottom: 2 },
  cardLocation: { fontSize: 12, color: '#7A7A7A', marginBottom: 10 },

  // Bouton rouge de désinscription
  unsubscribeButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  unsubscribeText: { color: '#FF6B6B', fontSize: 12, fontWeight: '600' },

  // Message quand la liste est vide
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyText: { color: '#7A7A7A', textAlign: 'center', fontSize: 15 },
});

export default MyEventsTab;
