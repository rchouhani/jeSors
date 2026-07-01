#!/bin/bash
 
# ─────────────────────────────────────────
#  start-android.sh
#  Lance l'environnement React Native Android
#  À placer et exécuter à la racine du projet
# ─────────────────────────────────────────
 
set -e
 
# ── Couleurs ──
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'
 
log()    { echo -e "${GREEN}[✔]${NC} $1"; }
warn()   { echo -e "${YELLOW}[!]${NC} $1"; }
error()  { echo -e "${RED}[✘]${NC} $1"; exit 1; }
 
# ── 1. Vérification de l'environnement ──
log "Vérification de l'environnement..."
 
command -v node   >/dev/null 2>&1 || error "Node.js n'est pas installé."
command -v npm    >/dev/null 2>&1 || error "npm n'est pas installé."
command -v adb    >/dev/null 2>&1 || error "adb introuvable. Vérifie que Android SDK platform-tools est dans ton PATH."
 
# ── 2. Trouver emulator ──
EMULATOR_BIN=""
if command -v emulator >/dev/null 2>&1; then
  EMULATOR_BIN="emulator"
elif [ -n "$ANDROID_HOME" ] && [ -f "$ANDROID_HOME/emulator/emulator" ]; then
  EMULATOR_BIN="$ANDROID_HOME/emulator/emulator"
elif [ -n "$ANDROID_SDK_ROOT" ] && [ -f "$ANDROID_SDK_ROOT/emulator/emulator" ]; then
  EMULATOR_BIN="$ANDROID_SDK_ROOT/emulator/emulator"
else
  error "Emulator Android introuvable. Vérifie que ANDROID_HOME ou ANDROID_SDK_ROOT est défini."
fi
 
# ── 3. Lancement de l'émulateur ──
log "Recherche des AVDs disponibles..."
AVDS=$("$EMULATOR_BIN" -list-avds 2>/dev/null)
 
if [ -z "$AVDS" ]; then
  error "Aucun AVD trouvé. Crée un émulateur dans Android Studio (Device Manager)."
fi
 
AVD_COUNT=$(echo "$AVDS" | wc -l)
 
if [ "$AVD_COUNT" -eq 1 ]; then
  AVD_NAME="$AVDS"
  log "Un seul AVD trouvé : $AVD_NAME"
else
  echo ""
  warn "Plusieurs AVDs disponibles, choisis-en un :"
  echo "$AVDS" | nl -w2 -s') '
  echo ""
  read -rp "Numéro de l'AVD : " AVD_NUM
  AVD_NAME=$(echo "$AVDS" | sed -n "${AVD_NUM}p")
  [ -z "$AVD_NAME" ] && error "Choix invalide."
fi
 
# Vérifier si un émulateur est déjà lancé
RUNNING=$(adb devices | grep "emulator" | grep "device" || true)
 
if [ -n "$RUNNING" ]; then
  warn "Un émulateur est déjà en cours d'exécution, on l'utilise."
else
  log "Lancement de l'émulateur : $AVD_NAME ..."
  "$EMULATOR_BIN" -avd "$AVD_NAME" -no-snapshot-load &
  EMULATOR_PID=$!
 
  log "Attente du démarrage de l'émulateur..."
  adb wait-for-device
 
  # Attendre que le boot soit complet
  BOOT_COMPLETE=""
  TRIES=0
  while [ "$BOOT_COMPLETE" != "1" ]; do
    BOOT_COMPLETE=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r' || true)
    TRIES=$((TRIES + 1))
    if [ "$TRIES" -gt 60 ]; then
      error "L'émulateur met trop de temps à démarrer."
    fi
    sleep 3
  done
  log "Émulateur prêt !"
fi
 
# ── 4. Mise à jour des packages npm ──
log "Mise à jour des packages npm..."
npm update --save --save-dev
 
# ── 5. Installation des dépendances ──
log "Installation des dépendances (npm install)..."
npm install
 
# ── 6. Lancement de Metro en arrière-plan ──
log "Lancement du serveur Metro en arrière-plan..."
npx react-native start --reset-cache &
METRO_PID=$!
 
# Attendre que Metro soit prêt
log "Attente que Metro soit prêt..."
TRIES=0
until curl -s http://localhost:8081/status | grep -q "packager-status:running" 2>/dev/null; do
  TRIES=$((TRIES + 1))
  if [ "$TRIES" -gt 40 ]; then
    error "Metro ne répond pas après 2 minutes."
  fi
  sleep 3
done
log "Metro est prêt !"
 
# ── 7. Lancement de l'app Android ──
log "Lancement de l'app Android..."
npm run android
 
# ── Nettoyage à la sortie ──
trap "kill $METRO_PID 2>/dev/null; warn 'Metro arrêté.'" EXIT