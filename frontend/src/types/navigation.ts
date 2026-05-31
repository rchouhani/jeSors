import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 1. On définit d'abord précisément à quoi ressemble un Événement du JSON
export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  address: string;
  description: string;
  participants: number;
  maxParticipants: number;
  image: string;
}

// 2. On définit la liste des écrans et leurs paramètres associés
export type RootStackParamList = {
  Splash: undefined;
  EventsFeed: undefined;
  // Grâce à EventItem, l'écran de détail sait exactement quelle structure de données il va recevoir
  EventDetails: { event: EventItem };
};

// 3. On crée un type réutilisable pour la navigation de l'écran Flux d'événements
export type EventsFeedNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EventsFeed'
>;
