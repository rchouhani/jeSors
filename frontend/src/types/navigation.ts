import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';

// 1. Structure d'un Événement
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
  MainTabs: undefined; // L'écran principal qui contient les onglets
  // EventsFeed: undefined;

  // Grâce à EventItem, l'écran de détail sait exactement quelle structure de données il va recevoir
  EventDetails: { event: EventItem };
};

// 3. Type réutilisable pour la navigation depuis le Flux (Feed)
// Comme Feed est maintenant dans les onglets, son hook de navigation doit connaître
// à la fois les routes du Stack principal (pour ouvrir les détails) et des Onglets.
export type EventsFeedNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainTabs'
>;

// 4. Les 4 onglets officiels l'application
export type RootTabParamList = {
  Feed: undefined;
  Carte: undefined;
  Favorites: undefined;
  Profil: undefined;
};

// 5. Type strict de navigation fusionné pour l'écran Profil / Mes Sorties (combine Onglets + Stack)
export type MyEventsNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Profil'>,
  NativeStackNavigationProp<RootStackParamList>
>;

// 6. Interface des Props globales transmises à l'écran MyEventsTab
export interface MyEventsProps {
  navigation: MyEventsNavigationProp;
}
