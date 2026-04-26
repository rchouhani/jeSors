# jeSors ! 🎉

**Je Sors !** est une application mobile de sorties et de rencontres sociales. Elle permet à ses utilisateurs de découvrir des sorties organisées près de chez eux, de s'y inscrire et d'échanger avec d'autres participants.

---

## Aperçu

Je Sors ! propose une expérience simple et conviviale pour ne plus rester chez soi :

- Parcourir les sorties du moment par date, heure et quartier
- Filtrer par catégorie : concerts, expositions, sport, bars...
- S'inscrire à une sortie et voir qui participe
- Ajouter des sorties à ses favoris
- Visualiser les sorties sur une carte interactive

---

## 🛠️ Stack technique

- **React Native CLI** 0.84
- **TypeScript**
- **React Navigation** — navigation entre les écrans
- **React Native Maps** — carte interactive
- **AsyncStorage** — stockage local
- **Node.js** 22 (LTS)

## 🛠️ Outils

---

- [Xcode](https://developer.apple.com/xcode/) (pour iOS, Mac uniquement)
- [Android Studio](https://developer.android.com/studio) (pour Android)
- [CocoaPods](https://cocoapods.org/) (pour iOS)
- [JDK 17](https://www.azul.com/downloads/) (pour Android)

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/ton-compte/je-sors.git
cd je-sors
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Installer les pods iOS

```bash
cd ios && pod install && cd ..
```

---

## ▶️ Lancer l'application

### Démarrer le serveur Metro

```bash
npm start
```

### Lancer sur iOS

```bash
npm run ios
```

### Lancer sur Android

```bash
npm run android
```

---

## 📁 Structure du projet

```
je-sors/
├── app/
│   ├── components/        # Composants réutilisables
│   ├── screens/           # Écrans de l'application
│   ├── navigation/        # Configuration de la navigation
│   ├── services/          # Appels API et services
│   └── types/             # Types TypeScript
├── android/               # Configuration Android
├── ios/                   # Configuration iOS
├── App.tsx                # Point d'entrée
└── package.json
```

---

## 📱 Écrans

L'application comprend 10 écrans :

- **Splash screen** — écran de chargement au lancement
- **Connexion** — authentification par email et mot de passe
- **Inscription** (2 écrans) — création de compte en deux étapes
- **CGU** — conditions d'utilisation
- **Feed** — liste des sorties organisées par date
- **Détail d'une sortie** — informations complètes et inscription
- **Carte** — visualisation géographique des sorties
- **Mon profil (2 écrans) / Mes sorties** — espace personnel

---

## 👥 Auteurs

- **Romain Chouani** — [GitHub](https://github.com/rchouhani/)
- **Eva Tharrats** — [GitHub](https://github.com/EvaTP)

---

## 📄 Licence

Ce projet est réalisé dans le cadre d'un apprentissage personnel. Tous droits réservés.
