# 🚀 Guide de Démarrage Rapide - GymEasIA

## Installation

### 1. Prérequis

- Node.js 18+
- Python 3.8+
- Docker (pour MongoDB)
- Expo CLI : `npm install -g expo-cli`

### 2. MongoDB

```bash
docker compose up -d
```

### 3. Backend

```bash
cd backend
npm install
cp .env.example .env
# Éditer .env si nécessaire
npm run dev
```

Le backend sera accessible sur `http://localhost:3000`

### 4. Mobile

```bash
cd mobile
npm install
npx expo start
```

Scannez le QR code avec Expo Go sur votre téléphone.

## Tests

```bash
cd backend
npm test
```

## Structure du Projet

```
gymeasia/
├── backend/          # API Node.js + Express + MongoDB
│   ├── src/
│   ├── ai/           # Brique IA Python (RepNet)
│   ├── uploads/      # Vidéos uploadées
│   └── tests/
│
├── mobile/           # App React Native + Expo
│   └── src/
│
└── docker-compose.yml
```

## Mode Mock IA

Si le modèle `model.h5` n'est pas présent, l'IA fonctionne automatiquement en mode mock et retourne des résultats réalistes.

## Endpoints API

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur
- `POST /api/videos/upload` - Upload vidéo
- `GET /api/videos` - Liste des vidéos
- `GET /api/videos/:id` - Détails vidéo
- `GET /api/inference/:videoId` - Résultats IA

## Notes

- Le backend démarre même sans modèle IA (mode mock)
- Les vidéos sont stockées dans `backend/uploads/`
- JWT stocké dans SecureStore (mobile)
- MongoDB persiste dans un volume Docker
