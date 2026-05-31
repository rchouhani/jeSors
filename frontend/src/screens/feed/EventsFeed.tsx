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

// IMPORT DES TYPES
import { EventsFeedNavigationProp, EventItem } from '../../types/navigation';

// Ici, on type proprement notre constante globale, TypeScript valide le JSON d'un coup !
const DATA_EVENTS: EventItem[] = rawEvents;

// Badges catégories par couleurs
const CATEGORY_COLORS: { [key: string]: string } = {
  Bar: '#FF9500',
  Concert: '#007AFF',
  Expo: '#FFCC00',
  Balade: '#AF52DE',
  Atelier: '#FF2D55',
  Sport: '#28A745',
};

// Typage strict de l'objet de propriétés (Props) attendu par le composant
interface EventsFeedProps {
  navigation: EventsFeedNavigationProp;
}

const EventsFeed = ({ navigation }: EventsFeedProps) => {
  // L'état pour savoir quel bouton est cliqué ('tous' au départ)
  const [events] = useState<EventItem[]>(DATA_EVENTS);
  const [selectedCategory, setSelectedCategory] = useState('tous');

  // La logique qui trie le JSON selon le bouton cliqué
  const filteredEvents =
    selectedCategory === 'tous'
      ? events
      : events.filter(event => event.category === selectedCategory);

  // TYPAGE ICI : On indique à TypeScript que 'item' respecte l'interface EventItem
  const renderEventCard = ({ item }: { item: EventItem }) => {
    const categoryColor = CATEGORY_COLORS[item.category] || '#7A7A7A';

    {
      /* 1er return : On rend la carte cliquable pour naviguer vers les détails de lévénement, en passant l'objet 'item' complet en paramètre */
    }
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.95}
        onPress={() => navigation.navigate('EventDetails', { event: item })}
        // onPress={() => console.log('👉 CLIC SUR LA CARTE :', item.title)}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />

        <View style={styles.cardContent}>
          <View style={[styles.badge, { backgroundColor: categoryColor }]}>
            <Text style={styles.badgeText}>{item.category}</Text>
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
                  // On donne au fond la couleur du dictionnaire (ou noir pour tous, ou gris)
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
