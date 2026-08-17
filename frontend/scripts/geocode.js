/**
 * Script d'automatisation pour géocoder les adresses des événements
 * Exécution : node scripts/geocode.js
 */

const fs = require('fs');
const path = require('path');

// 1. Définition du chemin vers le fichier JSON
// path.join permet de construire un chemin de fichier compatible Mac/Windows/Linux
const filePath = path.join(__dirname, '../src/data/events.json');

// 2. Fonction qui interroge l'API Nominatim d'OpenStreetMap
async function geocodeAddress(address) {
  // encodeURIComponent sécurise l'adresse texte pour l'intégrer dans une URL HTTP
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address,
  )}`;

  try {
    const response = await fetch(url, {
      headers: {
        // L'API OpenStreetMap exige la présence d'un entête User-Agent
        'User-Agent': 'ReactNativeApp/1.0',
      },
    });
    const data = await response.json();

    // Si l'API retourne au moins un résultat, on extrait la latitude et la longitude
    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      };
    }
  } catch (error) {
    console.error(
      `❌ Erreur lors du géocodage de l'adresse "${address}" :`,
      error,
    );
  }
  return null;
}

// 3. Fonction principale pour parcourir et mettre à jour le JSON
async function run() {
  console.log('🔄 Lecture du fichier events.json...');

  // Lecture du fichier JSON sur le disque dur
  const fileData = fs.readFileSync(filePath, 'utf8');
  const events = JSON.parse(fileData);

  console.log(
    `📍 ${events.length} événement(s) trouvé(s). Début du géocodage...\n`,
  );

  for (let event of events) {
    // Si l'événement n'a pas encore de coordonnées et possède une adresse
    if (!event.coordinate && event.address) {
      console.log(
        `🔎 Recherche GPS pour : "${event.title}" (${event.address})`,
      );

      const coord = await geocodeAddress(event.address);

      if (coord) {
        event.coordinate = coord;
        console.log(
          `✅ Coordonnées trouvées : Lat ${coord.latitude}, Lon ${coord.longitude}\n`,
        );
      } else {
        console.log(`⚠️ Aucune coordonnée trouvée pour cette adresse.\n`);
      }

      // Pause de 1 seconde entre chaque requête pour respecter la politique de l'API
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Sauvegarde des données mises à jour dans le fichier JSON (avec un renfoncement de 2 espaces)
  fs.writeFileSync(filePath, JSON.stringify(events, null, 2), 'utf8');
  console.log('🎉 Fichier events.json mis à jour avec succès !');
}

// Lancement du script
run();
