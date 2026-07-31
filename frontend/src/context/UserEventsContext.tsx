import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Définition du type de données stockées dans le Context
interface UserEventsContextType {
  registeredEventIds: string[]; // Liste des IDs d'événements rejoints
  registerToEvent: (eventId: string) => void; // Fonction pour s'inscrire
  unregisterFromEvent: (eventId: string) => void; // Fonction pour se désinscrire
  isRegistered: (eventId: string) => boolean; // Vérifie si l'utilisateur est inscrit
}

const UserEventsContext = createContext<UserEventsContextType | undefined>(
  undefined,
);

export const UserEventsProvider = ({ children }: { children: ReactNode }) => {
  // Par défaut, on initialise avec quelques IDs du JSON ('1' et '2') pour pré-remplir l'écran
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([
    '1',
    '2',
  ]);

  // Ajouter un événement aux inscriptions
  const registerToEvent = (eventId: string) => {
    setRegisteredEventIds(prev =>
      prev.includes(eventId) ? prev : [...prev, eventId],
    );
  };

  // Retirer un événement des inscriptions
  const unregisterFromEvent = (eventId: string) => {
    setRegisteredEventIds(prev => prev.filter(id => id !== eventId));
  };

  // Vérifier si un événement est déjà rejoint
  const isRegistered = (eventId: string) =>
    registeredEventIds.includes(eventId);

  return (
    <UserEventsContext.Provider
      value={{
        registeredEventIds,
        registerToEvent,
        unregisterFromEvent,
        isRegistered,
      }}
    >
      {children}
    </UserEventsContext.Provider>
  );
};

export const useUserEvents = () => {
  const context = useContext(UserEventsContext);
  if (!context) {
    throw new Error(
      'useUserEvents doit être utilisé dans un UserEventsProvider',
    );
  }
  return context;
};
