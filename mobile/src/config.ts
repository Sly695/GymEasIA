// Configuration de l'URL du backend
// 
// ⚠️ PROBLÈME MODE TUNNEL : En mode tunnel, l'app ne peut pas accéder à l'IP locale !
// 
// SOLUTIONS :
// 1. Passer en mode LAN (recommandé pour développement) :
//    - Dans le terminal Expo, appuyez sur 's' pour changer de mode
//    - Sélectionnez 'LAN' au lieu de 'Tunnel'
//    - Utilisez alors votre IP locale ci-dessous
//
// 2. Utiliser un émulateur/simulateur :
//    - iOS Simulator : utilisez 'localhost:3000'
//    - Android Emulator : utilisez '10.0.2.2:3000'
//
// 3. Pour trouver votre IP locale :
//    - Windows : ipconfig → cherchez "IPv4 Address"
//    - Mac/Linux : ifconfig → cherchez "inet"

// Détection automatique de l'environnement
const getBackendURL = () => {
  if (!__DEV__) {
    return 'https://your-production-api.com';
  }

  // Pour émulateur Android
  // return 'http://10.0.2.2:3000';
  
  // Pour émulateur iOS ou simulateur
  // return 'http://localhost:3000';
  
  // Pour téléphone physique en mode LAN (remplacez par votre IP)
  return 'http://192.168.1.153:3000';
};

export const API_BASE_URL = getBackendURL();

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    ME: '/api/auth/me'
  },
  VIDEOS: {
    UPLOAD: '/api/videos/upload',
    LIST: '/api/videos',
    GET: (id: string) => `/api/videos/${id}`,
    PROCESS: (id: string) => `/api/videos/${id}/process`
  },
  INFERENCE: {
    GET: (videoId: string) => `/api/inference/${videoId}`
  }
};

export const POLL_INTERVAL = 2000; // 2 seconds
