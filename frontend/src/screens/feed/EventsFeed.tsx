import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import rawEvents from '../../data/events.json';
import { CATEGORY_COLORS, CATEGORY_TEXT_COLORS } from '../../theme/colors';
import { useFavorites } from '../../context/FavoritesContext';

// IMPORT DES TYPES
import { EventsFeedNavigationProp, EventItem } from '../../types/navigation';

// Ici, on type proprement notre constante globale : TypeScript valide le JSON
const DATA_EVENTS: EventItem[] = rawEvents;

// Typage strict de l'objet de propriétés (Props) attendu par le composant
interface EventsFeedProps {
  navigation: EventsFeedNavigationProp;
}

const EventsFeed = ({ navigation }: EventsFeedProps) => {
  // L'état pour savoir quel bouton est cliqué ('tous' au départ)
  const [events] = useState<EventItem[]>(DATA_EVENTS);
  const [selectedCategory, setSelectedCategory] = useState('tous');

  // Récupération des fonctions du gestionnaire de favoris
  const { toggleFavorite, isFavorite } = useFavorites();

  // La logique qui filtre le JSON selon le bouton "catégorie" cliqué
  const filteredEvents =
    selectedCategory === 'tous'
      ? events
      : events.filter(event => event.category === selectedCategory);

  // TYPAGE ICI : On indique à TypeScript que 'item' respecte l'interface EventItem
  const renderEventCard = ({ item }: { item: EventItem }) => {
    // Couleurs des badges (background et texte)
    const badgeBg = CATEGORY_COLORS[item.category] || '#7A7A7A';
    const badgeColor = CATEGORY_TEXT_COLORS[item.category] || '#FFFFFF';

    // Vérification si cet événement précis est actuellement en favori
    const isItemFavorite = isFavorite(item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.95}
        onPress={() => navigation.navigate('EventDetails', { event: item })}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />

        {/* BOUTON CŒUR POUR LES FAVORIS */}
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => toggleFavorite(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.heartIcon}>{isItemFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>

        <View style={styles.cardContent}>
          <View style={[styles.badge, { backgroundColor: badgeBg }]}>
            <Text style={[styles.badgeText, { color: badgeColor }]}>
              {item.category}
            </Text>
          </View>

          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDate}>📅 {item.date}</Text>
          <Text style={styles.cardLocation}>📍 {item.location}</Text>
          <Text style={styles.cardParticipants}>
            👥 {item.participants} / {item.maxParticipants} participants
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Découvrir les sorties</Text>

      {/* BARRE DE FILTRES HORIZONTALE */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['tous', 'Bar', 'Concert', 'Expo', 'Balade', 'Atelier', 'Sport'].map(
            cat => (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.filterBtn,
                  {
                    backgroundColor:
                      cat === 'tous'
                        ? '#1A1A1A'
                        : CATEGORY_COLORS[cat] || '#7A7A7A',
                  },
                ]}
              >
                <Text style={styles.filterBtnText}>{cat}</Text>
              </TouchableOpacity>
            ),
          )}
        </ScrollView>
      </View>

      {/* LISTE DES SORTIES */}
      <FlatList
        data={filteredEvents}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={renderEventCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', paddingTop: 60 },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 15,
    color: '#1A1A1A',
  },
  filterBar: { marginBottom: 15, paddingLeft: 20 },
  filterBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EAEAEA',
    marginRight: 10,
  },
  filterBtnActive: { backgroundColor: '#1A1A1A' },
  filterBtnText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  filterBtnTextActive: { color: '#FFFFFF' },
  listContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardImage: { width: '100%', height: 180 },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  heartIcon: { fontSize: 18 },
  cardContent: { padding: 15 },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 50,
    marginBottom: 8,
  },
  badgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  cardDate: {
    fontSize: 14,
    color: '#FF6B6B',
    marginBottom: 4,
    fontWeight: '500',
  },
  cardLocation: { fontSize: 13, color: '#7A7A7A', marginBottom: 6 },
  cardParticipants: { fontSize: 13, color: '#28A745', fontWeight: '600' },
});

export default EventsFeed;
