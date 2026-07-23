import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

// Import des données locales
import rawEvents from '../../data/events.json';
import { EventItem } from '../../types/navigation';
import { useFavorites } from '../../context/FavoritesContext';

const DATA_EVENTS: EventItem[] = rawEvents;

const CATEGORY_COLORS: { [key: string]: string } = {
  Bar: '#FF9500',
  Concert: '#007AFF',
  Expo: '#FFCC00',
  Balade: '#AF52DE',
  Atelier: '#FF2D55',
  Sport: '#28A745',
};

const Favorites = ({ navigation }: any) => {
  // Récupération de la liste des favoris et de la fonction pour interagir
  const { favorites, toggleFavorite } = useFavorites();

  // Filtrage : On ne garde que les évènements dont l'ID est dans le tableau favorites
  const favoriteEvents = DATA_EVENTS.filter(event =>
    favorites.includes(event.id),
  );

  // Rendu de chaque carte (identique à ton EventsFeed)
  const renderEventCard = ({ item }: { item: EventItem }) => {
    const categoryColor = CATEGORY_COLORS[item.category] || '#7A7A7A';

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.95}
        onPress={() => navigation.navigate('EventDetails', { event: item })}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />

        {/* Bouton Cœur pour retirer des favoris */}
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Text style={styles.heartIcon}>❤️</Text>
        </TouchableOpacity>

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
      <Text style={styles.headerTitle}>Mes Favoris ❤️</Text>

      {/* Si aucun favori n'est sélectionné, on affiche un message explicatif */}
      {favoriteEvents.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Vous n'avez pas encore de sorties en favoris.
          </Text>
          <Text style={styles.emptySubText}>
            Cliquez sur le cœur d'une sortie pour l'ajouter ici !
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteEvents}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={renderEventCard}
        />
      )}
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
  listContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#7A7A7A',
    textAlign: 'center',
  },
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
    position: 'relative',
  },
  cardImage: { width: '100%', height: 180 },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    elevation: 5,
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

export default Favorites;
