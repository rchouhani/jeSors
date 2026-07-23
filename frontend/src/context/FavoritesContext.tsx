import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Définition du type d'informations stockées dans notre Context
interface FavoritesContextType {
  favorites: string[]; // Tableau contenant les 'id' des sorties (ex: ['1', '3'])
  toggleFavorite: (eventId: string) => void; // Fonction pour ajouter/enlever un ID
  isFavorite: (eventId: string) => boolean; // Fonction pour vérifier si un ID est favori
}

// 2. Création du Context initial
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

// 3. Création du "Provider" (le composant qui va envelopper notre application)
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  // Liste des IDs enregistrés en favoris
  const [favorites, setFavorites] = useState<string[]>([]);

  // Fonction qui ajoute l'ID s'il n'y est pas, ou le retire s'il y est déjà
  const toggleFavorite = (eventId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(eventId)) {
        // Retire l'id du tableau
        return prevFavorites.filter(id => id !== eventId);
      } else {
        // Ajoute l'id au tableau
        return [...prevFavorites, eventId];
      }
    });
  };

  // Fonction utilitaire qui renvoie true ou false
  const isFavorite = (eventId: string) => favorites.includes(eventId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// 4. Hook personnalisé pour utiliser facilement les favoris dans nos composants
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavorites doit être utilisé à l'intérieur d'un FavoritesProvider",
    );
  }
  return context;
};
