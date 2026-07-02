import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ConfirmationModal from '../../components/ConfirmationModal';

// On importe nos types globaux depuis le dossier partagé
import { RootStackParamList } from '../../types/navigation';

// On définit précisément le type des propriétés de cet écran grâce à React Navigation
type EventDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'EventDetails'
>;

// Dictionnaire de couleurs pour les catégories (cohérent avec le flux)
const CATEGORY_COLORS: { [key: string]: string } = {
  Bar: '#FF9500',
  Concert: '#007AFF',
  Expo: '#FFCC00',
  Balade: '#AF52DE',
  Atelier: '#FF2D55',
  Sport: '#28A745',
};

const EventDetails = ({ route, navigation }: EventDetailsProps) => {
  // mettre toujours les hooks d'état en haut du composant
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const { event } = route.params;
  const categoryColor = CATEGORY_COLORS[event.category] || '#7A7A7A';

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />


      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* 1. Image Header (Prend une grande partie du haut de l'écran) */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: event.image }} style={styles.image} />

          {/* Bouton Retour superposé sur l'image */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        </View>

        {/* 2. Conteneur de contenu (qui remonte légèrement sur l'image avec un arrondi) */}
        <View style={styles.contentContainer}>
          {/* Badge Catégorie */}
          <View
            style={[styles.categoryBadge, { backgroundColor: categoryColor }]}
          >
            <Text style={styles.categoryText}>{event.category}</Text>
          </View>

          {/* Titre principal */}
          <Text style={styles.title}>{event.title}</Text>

          {/* Ligne Infos : Date et Heure */}
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📅</Text>
            <Text style={styles.infoText}>{event.date}</Text>
          </View>

          {/* Ligne Infos : Lieu et Adresse précise */}
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <View style={styles.addressBlock}>
              <Text style={styles.infoTextBold}>{event.location}</Text>
              <Text style={styles.infoTextSmall}>{event.address}</Text>
            </View>
          </View>

          <View style={styles.separator} />

          {/* Section Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{event.description}</Text>

          <View style={styles.separator} />

          {/* Section Participants */}
          <Text style={styles.sectionTitle}>
            Participants ({event.participants} / {event.maxParticipants})
          </Text>
          <View style={styles.participantsPlaceholder}>
            <Text style={styles.avatar}>👤</Text>
            <Text style={styles.avatar}>👤</Text>
            <Text style={styles.avatar}>👤</Text>
            <Text style={styles.avatarCount}>+ {event.participants - 3}</Text>
          </View>

          {/* Marge de sécurité en bas pour que le bouton fixe ne masque pas le texte */}
          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      {/* 3. Bouton Fixe "Je participe" en bas de l'écran */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.participateButton}
          activeOpacity={0.8}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.participateButtonText}>Je participe</Text>
        </TouchableOpacity>
      </View>

      {/* 4. Pop-up de demande de confirmation */}
      <ConfirmationModal
        isVisible={isModalVisible}
        title="Confirmer ta participation ?"
        subtitle={`${event.title} • ${event.date}`}
        details={event.location}
        cancelText="Annuler"
        confirmText="Confirmer"
        onClose={() => setIsModalVisible(false)}
        onConfirm={() => {
          setIsModalVisible(false); // on ferme la première pop-up
          setIsSuccessModalVisible(true); // on ouvre la pop-up de succès
          console.log('Participation confirmée !');
        }}
      />

      {/* 5. Pop-up de succès */}
      <ConfirmationModal
        isVisible={isSuccessModalVisible}
        title="🎉 Participation confirmée !"
        subtitle="Tu es maintenant inscrit à cet événement."
        confirmText="OK"
        onClose={() => setIsSuccessModalVisible(false)}
        onConfirm={() => {
          setIsSuccessModalVisible(false); // 1. On ferme la modale
          navigation.navigate('MainTabs'); // 2. On redirige l'utilisateur vers l'écran de toutes les sorties
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  imageContainer: {
    height: 350,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
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
  },
  backText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  contentContainer: {
    padding: 24,
    marginTop: -30,
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginBottom: 12,
  },
  categoryText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#444',
  },
  addressBlock: {
    flex: 1,
  },
  infoTextBold: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  infoTextSmall: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#555',
  },
  participantsPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  avatar: {
    fontSize: 18,
    marginRight: -5,
    backgroundColor: '#E1E1E1',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FAFAFA',
    overflow: 'hidden',
  },
  avatarCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#777',
    marginLeft: 15,
  },
  bottomSpacer: {
    height: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
  participateButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  participateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventDetails;
