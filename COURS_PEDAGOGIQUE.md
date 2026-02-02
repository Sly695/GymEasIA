# 🎓 Cours Pédagogique GymEasIA
## Application Mobile de Musculation avec IA

> **Cours complet en deux sessions pour apprendre à construire une application mobile moderne avec backend**

---

# 📱 SESSION 1 : DÉVELOPPEMENT MOBILE AVEC REACT NATIVE & EXPO

## 🎯 Objectifs de la Session 1

À la fin de cette session, vous serez capable de :
- ✅ Comprendre l'écosystème React Native et Expo
- ✅ Créer une application mobile avec navigation
- ✅ Implémenter l'authentification utilisateur
- ✅ Gérer l'état global avec React Context
- ✅ Intégrer la caméra et l'upload de vidéos
- ✅ Créer une interface utilisateur moderne et responsive
- ✅ Communiquer avec une API REST backend

---

## 📚 Chapitre 1 : Introduction à React Native et Expo

### 1.1 Qu'est-ce que React Native ?

**React Native** est un framework développé par Facebook qui permet de créer des applications mobiles natives en utilisant JavaScript et React. Contrairement aux applications web, React Native compile vers du code natif (Swift/Objective-C pour iOS, Java/Kotlin pour Android).

#### Avantages de React Native :
- **Code unique** : Un seul codebase pour iOS et Android
- **Performance native** : Compilation vers du code natif
- **Hot Reload** : Modifications visibles instantanément
- **Écosystème riche** : Bibliothèques nombreuses et actives
- **Connaissances réutilisables** : Si vous connaissez React, vous connaissez React Native

#### Différences avec React Web :
```javascript
// React Web
<div>Hello</div>
<button onClick={handleClick}>Click me</button>

// React Native
<View>Hello</View>
<TouchableOpacity onPress={handleClick}>
  <Text>Click me</Text>
</TouchableOpacity>
```

**Composants natifs** :
- `<View>` remplace `<div>`
- `<Text>` remplace `<span>`, `<p>`, etc.
- `<TouchableOpacity>` remplace `<button>`
- `<ScrollView>` remplace le scroll natif
- `<Image>` pour les images
- `<TextInput>` pour les champs de saisie

### 1.2 Qu'est-ce qu'Expo ?

**Expo** est un framework et une plateforme qui simplifie le développement React Native. Il fournit :
- **Expo Go** : Application pour tester sans compilation
- **APIs natives** : Camera, SecureStore, FileSystem, etc. déjà intégrées
- **Build service** : Compilation dans le cloud
- **Pas de configuration** : Pas besoin d'Android Studio ou Xcode

#### Architecture Expo :
```
┌─────────────────────────────────┐
│     Votre Application React     │
│         (JavaScript)            │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│      Expo SDK (Bridge)          │
│  - Camera, SecureStore, etc.    │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│   Code Natif (iOS/Android)      │
└─────────────────────────────────┘
```

### 1.3 Installation et Configuration

#### Prérequis :
```bash
# Node.js 18+ (vérifier avec)
node --version

# npm (vient avec Node.js)
npm --version

# Expo CLI (optionnel, mais recommandé)
npm install -g expo-cli
```

#### Création du projet :
```bash
# Méthode 1 : Avec Expo CLI
npx create-expo-app gymeasia-mobile --template blank-typescript

# Méthode 2 : Avec npx directement
npx create-expo-app gymeasia-mobile
```

#### Structure du projet :
```
mobile/
├── App.tsx                 # Point d'entrée
├── package.json           # Dépendances
├── tsconfig.json          # Configuration TypeScript
├── app.json               # Configuration Expo
└── src/
    ├── screens/           # Écrans de l'application
    ├── components/        # Composants réutilisables
    ├── navigation/        # Configuration navigation
    ├── services/          # Services API
    ├── store/             # État global (Context)
    └── theme/             # Thème et styles
```

### 1.4 Premier Composant

Créons notre premier écran :

```typescript
// App.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GymEasIA</Text>
      <Text style={styles.subtitle}>Bienvenue !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D7FF00',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
  },
});
```

**Concepts clés** :
- `StyleSheet.create()` : Création optimisée des styles
- `flex: 1` : Prend tout l'espace disponible
- Styles inline possibles mais moins performants

---

## 📚 Chapitre 2 : Navigation avec React Navigation

### 2.1 Pourquoi React Navigation ?

React Navigation est la bibliothèque standard pour la navigation dans React Native. Elle gère :
- **Stack Navigation** : Pile d'écrans (comme un historique)
- **Tab Navigation** : Onglets en bas ou en haut
- **Drawer Navigation** : Menu latéral

### 2.2 Installation

```bash
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
```

### 2.3 Configuration de Base

```typescript
// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import des écrans
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import CameraScreen from '../screens/CameraScreen';
import HistoryScreen from '../screens/HistoryScreen';
import AnalyzeScreen from '../screens/AnalyzeScreen';

// Types pour TypeScript
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Analyze: { videoId: string };
};

export type MainTabParamList = {
  Dashboard: undefined;
  Camera: undefined;
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Navigation par onglets (après connexion)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#D7FF00',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#333',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Navigation principale (stack)
export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#1a1a1a' },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen
          name="Analyze"
          component={AnalyzeScreen}
          options={{ presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

**Points importants** :
- `NavigationContainer` : Doit envelopper toute la navigation
- Types TypeScript : Pour l'autocomplétion et la sécurité des types
- `screenOptions` : Options par défaut pour tous les écrans

### 2.4 Navigation Programmatique

```typescript
// Dans un composant
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type NavigationProp = StackNavigationProp<RootStackParamList>;

function MyComponent() {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    // Navigation vers un écran
    navigation.navigate('Main');
    
    // Navigation avec paramètres
    navigation.navigate('Analyze', { videoId: '123' });
    
    // Retour en arrière
    navigation.goBack();
  };

  return <Button onPress={handlePress} />;
}
```

---

## 📚 Chapitre 3 : Gestion de l'État Global avec Context API

### 3.1 Pourquoi Context API ?

Pour partager l'état (comme l'utilisateur connecté) entre plusieurs composants sans "prop drilling" (passer les props à travers plusieurs niveaux).

**Sans Context** (prop drilling) :
```typescript
<App>
  <AuthProvider user={user}>
    <Dashboard user={user}>
      <Header user={user} />
    </Dashboard>
  </AuthProvider>
</App>
```

**Avec Context** :
```typescript
<AuthProvider>
  <Dashboard>
    <Header /> {/* Accède directement à user via useAuth() */}
  </Dashboard>
</AuthProvider>
```

### 3.2 Création du Context d'Authentification

```typescript
// src/store/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { api } from '../services/api.service';
import { User } from '../types';

// 1. Définir le type du contexte
interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

// 2. Créer le contexte avec une valeur par défaut
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Créer le Provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Vérifier l'authentification au démarrage
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Récupérer le token depuis le stockage sécurisé
      const storedToken = await SecureStore.getItemAsync('auth_token');
      if (storedToken) {
        setToken(storedToken);
        api.setToken(storedToken); // Configurer l'API avec le token
        const userData = await api.getMe(); // Récupérer les données utilisateur
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await api.login(email, password);
    // Stocker le token de manière sécurisée
    await SecureStore.setItemAsync('auth_token', response.token);
    setToken(response.token);
    setUser(response.user);
    api.setToken(response.token);
  };

  const register = async (email: string, username: string, password: string) => {
    const response = await api.register(email, username, password);
    await SecureStore.setItemAsync('auth_token', response.token);
    setToken(response.token);
    setUser(response.user);
    api.setToken(response.token);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('auth_token');
    setToken(null);
    setUser(null);
    api.setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Créer le hook personnalisé
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

**Concepts clés** :
- `SecureStore` : Stockage sécurisé des données sensibles (tokens)
- `useEffect` : Exécuté au montage du composant
- `useState` : Gestion de l'état local
- Hook personnalisé `useAuth()` : Facilite l'utilisation du contexte

### 3.3 Utilisation dans les Composants

```typescript
// Dans LoginScreen.tsx
import { useAuth } from '../store/AuthContext';

const LoginScreen = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      // Navigation automatique après connexion
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <View>
      <Input value={email} onChangeText={setEmail} />
      <Input value={password} onChangeText={setPassword} secureTextEntry />
      <Button onPress={handleLogin} loading={loading} />
    </View>
  );
};
```

---

## 📚 Chapitre 4 : Communication avec l'API Backend

### 4.1 Configuration Axios

**Axios** est une bibliothèque pour faire des requêtes HTTP. Plus simple que `fetch()`.

```bash
npm install axios
```

```typescript
// src/services/api.service.ts
import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL, // http://192.168.1.153:3000
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Méthode pour définir le token JWT
  setToken(token: string | null) {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common['Authorization'];
    }
  }

  // Méthode de login
  async login(email: string, password: string) {
    try {
      const response = await this.client.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Login failed');
      }
      
      return response.data.data; // { user, token }
    } catch (error: any) {
      if (error.response) {
        // Erreur du serveur (400, 401, 500, etc.)
        throw new Error(error.response.data?.error || 'Login failed');
      } else if (error.request) {
        // Pas de réponse du serveur (connexion impossible)
        throw new Error('Cannot connect to server. Make sure the backend is running.');
      } else {
        // Erreur lors de la configuration
        throw new Error(error.message || 'An error occurred');
      }
    }
  }

  // Méthode de register
  async register(email: string, username: string, password: string) {
    const response = await this.client.post(API_ENDPOINTS.AUTH.REGISTER, {
      email,
      username,
      password,
    });
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Registration failed');
    }
    
    return response.data.data;
  }

  // Méthode pour récupérer l'utilisateur actuel
  async getMe() {
    const response = await this.client.get(API_ENDPOINTS.AUTH.ME);
    return response.data.data.user;
  }
}

export const api = new ApiService();
```

### 4.2 Configuration de l'URL

```typescript
// src/config.ts
export const API_BASE_URL = __DEV__
  ? 'http://192.168.1.153:3000'  // IP locale en développement
  : 'https://your-production-api.com'; // URL de production

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    ME: '/api/auth/me',
  },
  VIDEOS: {
    UPLOAD: '/api/videos/upload',
    LIST: '/api/videos',
    GET: (id: string) => `/api/videos/${id}`,
  },
  INFERENCE: {
    GET: (videoId: string) => `/api/inference/${videoId}`,
  },
};
```

**Important** : En mode tunnel Expo, l'app ne peut pas accéder à l'IP locale. Utilisez le mode LAN.

### 4.3 Upload de Vidéo

```typescript
// Dans api.service.ts
async uploadVideo(uri: string): Promise<Video> {
  const filename = uri.split('/').pop() || 'video.mp4';
  
  // Créer un FormData pour l'upload multipart
  const formData = new FormData();
  formData.append('video', {
    uri,                    // Chemin local du fichier
    type: 'video/mp4',      // Type MIME
    name: filename,         // Nom du fichier
  } as any);

  const response = await this.client.post(
    API_ENDPOINTS.VIDEOS.UPLOAD,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // Suivre la progression de l'upload
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        console.log(`Upload: ${percentCompleted}%`);
      },
    }
  );

  return response.data.data.video;
}
```

---

## 📚 Chapitre 5 : Intégration de la Caméra

### 5.1 Permissions

Expo gère les permissions de manière simple :

```typescript
import { CameraView, useCameraPermissions } from 'expo-camera';

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (permission && !permission.granted && !permission.canAskAgain) {
      // L'utilisateur a refusé définitivement
      Alert.alert(
        'Permission requise',
        'L\'accès à la caméra est nécessaire pour enregistrer vos exercices.'
      );
    }
  }, [permission]);

  if (!permission) {
    return <View />; // En attente
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>Accès à la caméra requis</Text>
        <Button onPress={requestPermission} title="Autoriser" />
      </View>
    );
  }

  return <CameraView />;
};
```

### 5.2 Enregistrement Vidéo

```typescript
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [recording, setRecording] = useState(false);
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const cameraRef = useRef<CameraView>(null);

  const startRecording = async () => {
    if (!cameraRef.current) return;

    setRecording(true);
    try {
      const video = await cameraRef.current.recordAsync({
        maxDuration: 60, // 60 secondes max
        quality: '720p',
      });
      
      console.log('Video recorded:', video.uri);
      // video.uri contient le chemin du fichier vidéo
    } catch (error) {
      console.error('Recording error:', error);
    } finally {
      setRecording(false);
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing={facing}
      >
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
          >
            <Ionicons name="camera-reverse" size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.recordButton, recording && styles.recording]}
            onPress={recording ? stopRecording : startRecording}
          >
            <View style={styles.recordButtonInner} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};
```

### 5.3 Upload après Enregistrement

```typescript
const handleVideoRecorded = async (videoUri: string) => {
  try {
    setUploading(true);
    
    // Upload vers le backend
    const video = await api.uploadVideo(videoUri);
    
    // Navigation vers l'écran d'analyse
    navigation.navigate('Analyze', { videoId: video.id });
  } catch (error) {
    Alert.alert('Erreur', 'Impossible d\'uploader la vidéo');
  } finally {
    setUploading(false);
  }
};
```

---

## 📚 Chapitre 6 : Interface Utilisateur Moderne

### 6.1 Système de Thème

```typescript
// src/theme/index.ts
export const theme = {
  colors: {
    background: '#1a1a1a',
    surface: '#2a2a2a',
    text: '#ffffff',
    textSecondary: '#999999',
    accent: '#D7FF00',
    error: '#ff4444',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    round: 999,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold' as const,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold' as const,
    },
    body: {
      fontSize: 16,
    },
    caption: {
      fontSize: 14,
    },
  },
};
```

### 6.2 Composants Réutilisables

#### Button Component

```typescript
// src/components/Button.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { theme } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  variant = 'primary',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.primary : styles.secondary,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#000' : '#fff'} />
      ) : (
        <Text
          style={[
            styles.text,
            variant === 'primary' ? styles.primaryText : styles.secondaryText,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  primary: {
    backgroundColor: theme.colors.accent,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...theme.typography.body,
    fontWeight: 'bold',
  },
  primaryText: {
    color: theme.colors.background,
  },
  secondaryText: {
    color: theme.colors.text,
  },
});
```

#### Input Component

```typescript
// src/components/Input.tsx
import React from 'react';
import { TextInput, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  style?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  style,
}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.textSecondary}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    ...theme.typography.body,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
  },
});
```

### 6.3 Effets Visuels

#### Gradient Background

```typescript
import { LinearGradient } from 'expo-linear-gradient';

<LinearGradient
  colors={[theme.colors.background, theme.colors.surface]}
  style={styles.container}
>
  {/* Contenu */}
</LinearGradient>
```

#### Glass Morphism

```typescript
const glassStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: theme.borderRadius.md,
  backdropFilter: 'blur(10px)', // Web uniquement
};
```

---

## 📚 Chapitre 7 : Polling et Affichage des Résultats

### 7.1 Polling pour les Résultats d'IA

L'IA prend du temps à traiter. On doit "poll" (interroger régulièrement) le backend pour savoir quand c'est prêt.

```typescript
// src/screens/AnalyzeScreen.tsx
import { useEffect, useState } from 'react';
import { api } from '../services/api.service';
import { POLL_INTERVAL } from '../config';

const AnalyzeScreen = ({ route }: any) => {
  const { videoId } = route.params;
  const [inference, setInference] = useState<InferenceResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const pollInference = async () => {
      try {
        const result = await api.getInference(videoId);
        
        if (result) {
          // Résultat disponible !
          setInference(result);
          setLoading(false);
          clearInterval(intervalId);
        }
        // Sinon, on continue à poller
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    // Poller immédiatement puis toutes les 2 secondes
    pollInference();
    intervalId = setInterval(pollInference, POLL_INTERVAL);

    // Nettoyer l'intervalle au démontage
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [videoId]);

  if (loading) {
    return (
      <View>
        <Text>Analyse en cours...</Text>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <Text>Répétitions : {inference?.reps}</Text>
      <Text>Confiance : {inference?.confidence}%</Text>
    </View>
  );
};
```

---

## 🎯 Exercices Pratiques - Session 1

### Exercice 1 : Créer un Écran de Profil
Créez un écran `ProfileScreen.tsx` qui affiche :
- Le nom d'utilisateur
- L'email
- Un bouton de déconnexion

### Exercice 2 : Améliorer l'UI du Login
Ajoutez :
- Validation des champs (email valide, mot de passe > 6 caractères)
- Messages d'erreur spécifiques
- Animation lors de la soumission

### Exercice 3 : Gestion des Erreurs
Créez un composant `ErrorBoundary` pour capturer les erreurs React et afficher un message convivial.

---

## ✅ Points Clés à Retenir - Session 1

1. **React Native** utilise des composants natifs (`View`, `Text`, etc.)
2. **Expo** simplifie le développement avec des APIs natives intégrées
3. **React Navigation** gère la navigation entre écrans
4. **Context API** permet de partager l'état global sans prop drilling
5. **Axios** facilite les requêtes HTTP vers le backend
6. **SecureStore** stocke de manière sécurisée les tokens
7. **CameraView** d'Expo permet d'enregistrer des vidéos facilement
8. **Polling** est nécessaire pour récupérer les résultats asynchrones de l'IA

---

# 🖥️ SESSION 2 : DÉVELOPPEMENT BACKEND AVEC NODE.JS, EXPRESS & MONGODB

## 🎯 Objectifs de la Session 2

À la fin de cette session, vous serez capable de :
- ✅ Comprendre l'architecture d'une API REST
- ✅ Créer un serveur Express avec TypeScript
- ✅ Implémenter l'authentification JWT
- ✅ Gérer les fichiers uploadés (vidéos)
- ✅ Interagir avec MongoDB via Mongoose
- ✅ Créer des middlewares personnalisés
- ✅ Intégrer un service Python (IA) dans Node.js
- ✅ Tester l'API avec Jest
- ✅ Sécuriser l'API (CORS, rate limiting, validation)

---

## 📚 Chapitre 1 : Introduction à Node.js et Express

### 1.1 Qu'est-ce que Node.js ?

**Node.js** est un runtime JavaScript basé sur le moteur V8 de Chrome. Il permet d'exécuter JavaScript côté serveur.

#### Avantages :
- **JavaScript partout** : Même langage que le frontend
- **Asynchrone** : Gère bien les I/O (fichiers, réseau, base de données)
- **Écosystème** : npm contient des millions de packages
- **Performance** : Event loop efficace

#### Architecture Node.js :
```
┌─────────────────────────────────┐
│      Votre Code JavaScript      │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│      Node.js Runtime             │
│  - Event Loop                   │
│  - V8 Engine                    │
│  - libuv (I/O)                  │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│      Système d'Exploitation      │
└─────────────────────────────────┘
```

### 1.2 Qu'est-ce qu'Express ?

**Express** est le framework web le plus populaire pour Node.js. Il simplifie :
- La création de routes
- La gestion des middlewares
- Le parsing des requêtes
- La gestion des erreurs

### 1.3 Structure d'un Projet Express

```
backend/
├── src/
│   ├── app.ts              # Configuration Express
│   ├── server.ts           # Point d'entrée
│   ├── routes/             # Définition des routes
│   ├── controllers/        # Logique métier
│   ├── services/           # Services réutilisables
│   ├── models/             # Modèles MongoDB
│   ├── middlewares/        # Middlewares personnalisés
│   └── utils/              # Fonctions utilitaires
├── package.json
├── tsconfig.json
└── .env
```

### 1.4 Configuration de Base

```typescript
// src/app.ts
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

// Middlewares globaux
app.use(helmet()); // Sécurité HTTP
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-domain.com']
    : ['http://localhost:19006'], // Expo
  credentials: true,
}));
app.use(morgan('dev')); // Logging des requêtes
app.use(express.json()); // Parser JSON
app.use(express.urlencoded({ extended: true })); // Parser URL-encoded

// Route de santé
app.get('/health', (req: Request, res: Response) => {
  res.json({ success: true, message: 'API is running' });
});

// Routes API
// app.use('/api/auth', authRoutes);
// app.use('/api/videos', videoRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

export default app;
```

```typescript
// src/server.ts
import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gymeasia';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });
```

---

## 📚 Chapitre 2 : MongoDB et Mongoose

### 2.1 Qu'est-ce que MongoDB ?

**MongoDB** est une base de données NoSQL orientée documents. Contrairement aux bases SQL, elle stocke des documents JSON (BSON).

#### Comparaison SQL vs NoSQL :

**SQL (MySQL, PostgreSQL)** :
```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  email VARCHAR(255),
  username VARCHAR(255)
);
```

**NoSQL (MongoDB)** :
```javascript
{
  _id: ObjectId("..."),
  email: "user@example.com",
  username: "user123"
}
```

#### Avantages de MongoDB :
- **Flexible** : Schéma non fixe
- **Scalable** : Horizontal scaling facile
- **JavaScript natif** : JSON partout
- **Rapide** : Pour les applications modernes

### 2.2 Qu'est-ce que Mongoose ?

**Mongoose** est un ODM (Object Document Mapper) pour MongoDB. Il fournit :
- Des schémas typés
- La validation
- Les méthodes de requête
- Les hooks (pre/post save)

### 2.3 Création d'un Modèle

```typescript
// src/models/User.model.ts
import mongoose, { Document, Schema } from 'mongoose';

// Interface TypeScript
export interface IUser extends Document {
  email: string;
  username: string;
  passwordHash: string;
  createdAt: Date;
}

// Schéma Mongoose
const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index pour performance
UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });

// Export du modèle
export default mongoose.model<IUser>('User', UserSchema);
```

### 2.4 Opérations CRUD

```typescript
import User from './models/User.model';

// CREATE
const user = await User.create({
  email: 'user@example.com',
  username: 'user123',
  passwordHash: 'hashed_password',
});

// READ
const user = await User.findById(userId);
const users = await User.find({ email: 'user@example.com' });
const user = await User.findOne({ email: 'user@example.com' });

// UPDATE
await User.findByIdAndUpdate(userId, { username: 'newusername' });
await User.updateOne({ _id: userId }, { username: 'newusername' });

// DELETE
await User.findByIdAndDelete(userId);
await User.deleteOne({ _id: userId });
```

---

## 📚 Chapitre 3 : Authentification JWT

### 3.1 Qu'est-ce que JWT ?

**JWT (JSON Web Token)** est un standard pour transmettre des informations de manière sécurisée entre parties.

#### Structure d'un JWT :
```
header.payload.signature
```

**Header** :
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload** :
```json
{
  "userId": "123",
  "iat": 1234567890,
  "exp": 1234567890
}
```

**Signature** : HMACSHA256(base64(header) + "." + base64(payload), secret)

### 3.2 Installation

```bash
npm install jsonwebtoken bcryptjs
npm install --save-dev @types/jsonwebtoken @types/bcryptjs
```

### 3.3 Service d'Authentification

```typescript
// src/services/auth.service.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';

export interface RegisterData {
  email: string;
  username: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Inscription
export const register = async (data: RegisterData) => {
  const { email, username, password } = data;

  // Vérifier si l'utilisateur existe
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hasher le mot de passe
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Créer l'utilisateur
  const user = await User.create({
    email: email.toLowerCase(),
    username,
    passwordHash,
  });

  // Générer le token JWT
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  return {
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    token,
  };
};

// Connexion
export const login = async (data: LoginData) => {
  const { email, password } = data;

  // Trouver l'utilisateur
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Vérifier le mot de passe
  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  // Générer le token
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  return {
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    token,
  };
};
```

**Concepts clés** :
- `bcrypt.hash()` : Hash le mot de passe (irréversible)
- `bcrypt.compare()` : Compare un mot de passe avec un hash
- `jwt.sign()` : Crée un token JWT
- `saltRounds` : Nombre d'itérations pour le hash (plus = plus sûr mais plus lent)

### 3.4 Middleware d'Authentification

```typescript
// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Étendre l'interface Request pour inclure userId
export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Récupérer le token depuis le header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: 'No token provided',
      });
      return;
    }

    const token = authHeader.substring(7); // Enlever "Bearer "

    // Vérifier et décoder le token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret'
    ) as { userId: string };

    // Ajouter userId à la requête
    req.userId = decoded.userId;

    next(); // Continuer vers le prochain middleware
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid token',
    });
  }
};
```

### 3.5 Utilisation dans les Routes

```typescript
// src/routes/auth.routes.ts
import { Router } from 'express';
import { registerController, loginController, meController } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/me', authenticate, meController); // Route protégée

export default router;
```

---

## 📚 Chapitre 4 : Upload de Fichiers avec Multer

### 4.1 Installation

```bash
npm install multer
npm install --save-dev @types/multer
```

### 4.2 Configuration Multer

```typescript
// src/utils/upload.util.ts
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Créer le dossier uploads s'il n'existe pas
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Générer un nom unique : timestamp-random-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `video-${uniqueSuffix}${ext}`);
  },
});

// Filtre pour n'accepter que les vidéos
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only video files are allowed'));
  }
};

// Configuration multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB max
  },
});
```

### 4.3 Route d'Upload

```typescript
// src/routes/video.routes.ts
import { Router } from 'express';
import { upload } from '../utils/upload.util';
import { authenticate } from '../middlewares/auth.middleware';
import { uploadController } from '../controllers/video.controller';

const router = Router();

// Route protégée : nécessite authentification
router.post(
  '/upload',
  authenticate,
  upload.single('video'), // Middleware multer pour un seul fichier
  uploadController
);

export default router;
```

### 4.4 Controller d'Upload

```typescript
// src/controllers/video.controller.ts
import { Response } from 'express';
import Video from '../models/Video.model';
import { AuthRequest } from '../middlewares/auth.middleware';
import { processVideo } from '../services/video.service';

export const uploadController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: 'No file uploaded',
      });
      return;
    }

    // Créer l'entrée vidéo en base de données
    const video = await Video.create({
      userId: req.userId!,
      filename: req.file.filename,
      path: req.file.path,
      status: 'UPLOADED',
    });

    // Traiter la vidéo de manière asynchrone (ne pas bloquer la réponse)
    processVideo(video._id.toString()).catch(console.error);

    res.status(201).json({
      success: true,
      data: {
        video: {
          id: video._id,
          filename: video.filename,
          status: video.status,
          createdAt: video.createdAt,
        },
      },
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
```

---

## 📚 Chapitre 5 : Validation avec express-validator

### 5.1 Installation

```bash
npm install express-validator
```

### 5.2 Validation dans les Routes

```typescript
// src/routes/auth.routes.ts
import { Router } from 'express';
import { body } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { registerController, loginController } from '../controllers/auth.controller';

const router = Router();

// Rate limiting pour éviter les attaques brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives max
  message: 'Too many attempts, please try again later',
});

// Règles de validation
const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('username')
    .isLength({ min: 3, max: 20 })
    .trim()
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must be 3-20 characters, alphanumeric and underscores only'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

router.post(
  '/register',
  authLimiter,
  registerValidation,
  registerController
);

router.post(
  '/login',
  authLimiter,
  loginValidation,
  loginController
);

export default router;
```

### 5.3 Utilisation dans le Controller

```typescript
// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { register, login } from '../services/auth.service';

export const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Vérifier les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: errors.array()[0].msg, // Premier message d'erreur
      });
      return;
    }

    // Appeler le service
    const result = await register(req.body);

    res.status(201).json({
      success: true,
      data: result,
      error: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
```

---

## 📚 Chapitre 6 : Intégration avec Python (IA)

### 6.1 Architecture

L'IA est isolée dans un script Python. Le backend Node.js l'appelle via un subprocess.

```
Backend Node.js
      │
      │ subprocess.spawn()
      ▼
Script Python (infer.py)
      │
      │ TensorFlow/RepNet
      ▼
Résultat JSON (stdout)
```

### 6.2 Service d'IA

```typescript
// src/services/ai.service.ts
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export interface InferenceResult {
  reps: number;
  confidence: number;
  segments: Array<{ start: number; end: number }>;
}

export const runInference = async (
  videoPath: string
): Promise<InferenceResult> => {
  return new Promise((resolve, reject) => {
    // Chemin vers le script Python
    const pythonScript = path.join(__dirname, '../../ai/infer.py');
    
    // Vérifier que le fichier existe
    if (!fs.existsSync(pythonScript)) {
      throw new Error('Python inference script not found');
    }

    // Lancer le script Python
    const pythonProcess = spawn('python', [
      pythonScript,
      '--video',
      videoPath,
    ]);

    let stdout = '';
    let stderr = '';

    // Collecter la sortie
    pythonProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    // Gérer la fin du processus
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python script failed: ${stderr}`));
        return;
      }

      try {
        // Parser le JSON depuis stdout
        const result: InferenceResult = JSON.parse(stdout);
        resolve(result);
      } catch (error) {
        reject(new Error(`Failed to parse JSON: ${stdout}`));
      }
    });

    // Timeout de sécurité (5 minutes)
    setTimeout(() => {
      pythonProcess.kill();
      reject(new Error('Inference timeout'));
    }, 5 * 60 * 1000);
  });
};
```

### 6.3 Traitement Asynchrone des Vidéos

```typescript
// src/services/video.service.ts
import Video from '../models/Video.model';
import InferenceResult from '../models/InferenceResult.model';
import { runInference } from './ai.service';

export const processVideo = async (videoId: string): Promise<void> => {
  try {
    // Récupérer la vidéo
    const video = await Video.findById(videoId);
    if (!video) {
      throw new Error('Video not found');
    }

    // Mettre à jour le statut
    video.status = 'PROCESSING';
    await video.save();

    // Lancer l'inférence
    const result = await runInference(video.path);

    // Sauvegarder le résultat
    await InferenceResult.create({
      videoId: video._id,
      reps: result.reps,
      confidence: result.confidence,
      segments: result.segments,
    });

    // Mettre à jour le statut
    video.status = 'COMPLETED';
    await video.save();
  } catch (error) {
    // En cas d'erreur, marquer comme FAILED
    const video = await Video.findById(videoId);
    if (video) {
      video.status = 'FAILED';
      await video.save();
    }
    throw error;
  }
};
```

---

## 📚 Chapitre 7 : Gestion des Erreurs

### 7.1 Middleware d'Erreur Global

```typescript
// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  // Erreur de validation Mongoose
  if (err.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      error: 'Validation error',
      details: (err as any).errors,
    });
    return;
  }

  // Erreur de duplication (unique constraint)
  if ((err as any).code === 11000) {
    res.status(400).json({
      success: false,
      error: 'Duplicate entry',
    });
    return;
  }

  // Erreur générique
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  });
};

export default errorHandler;
```

### 7.2 Utilisation

```typescript
// src/app.ts
import errorHandler from './middlewares/error.middleware';

// ... autres middlewares et routes ...

// Error Handler (doit être le dernier)
app.use(errorHandler);
```

---

## 📚 Chapitre 8 : Tests avec Jest

### 8.1 Installation

```bash
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
```

### 8.2 Configuration

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
};
```

### 8.3 Exemple de Test

```typescript
// src/tests/auth.test.ts
import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import User from '../models/User.model';

describe('Auth API', () => {
  beforeAll(async () => {
    // Connexion à une base de test
    await mongoose.connect('mongodb://localhost:27017/gymeasia-test');
  });

  afterAll(async () => {
    // Nettoyer et fermer
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          username: 'testuser',
          password: 'password123',
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe('test@example.com');
      expect(response.body.data.token).toBeDefined();
    });

    it('should reject duplicate email', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          username: 'anotheruser',
          password: 'password123',
        })
        .expect(400);
    });
  });
});
```

---

## 🎯 Exercices Pratiques - Session 2

### Exercice 1 : Créer un Modèle de Commentaires
Créez un modèle `Comment` qui permet aux utilisateurs de commenter leurs vidéos.

### Exercice 2 : Implémenter le Rate Limiting par Utilisateur
Modifiez le rate limiting pour qu'il soit basé sur l'utilisateur plutôt que sur l'IP.

### Exercice 3 : Ajouter la Pagination
Implémentez la pagination pour la liste des vidéos (limite, offset).

---

## ✅ Points Clés à Retenir - Session 2

1. **Express** simplifie la création d'APIs REST
2. **MongoDB** est une base NoSQL flexible pour les applications modernes
3. **Mongoose** fournit des schémas et la validation pour MongoDB
4. **JWT** permet l'authentification sans sessions serveur
5. **bcrypt** hash les mots de passe de manière sécurisée
6. **Multer** gère l'upload de fichiers
7. **express-validator** valide les données d'entrée
8. **Subprocess** permet d'appeler des scripts Python depuis Node.js
9. **Jest** facilite les tests unitaires et d'intégration
10. **Middlewares** permettent de réutiliser la logique (auth, validation, erreurs)

---

## 🔗 Intégration Mobile ↔ Backend

### Flux Complet d'Authentification

```
1. Mobile : POST /api/auth/register
   Body: { email, username, password }
   
2. Backend : 
   - Valide les données
   - Hash le mot de passe
   - Crée l'utilisateur en DB
   - Génère un JWT
   - Retourne { user, token }
   
3. Mobile :
   - Stocke le token dans SecureStore
   - Ajoute le token dans les headers (Authorization: Bearer <token>)
   - Utilise le token pour les requêtes suivantes
```

### Flux Complet Vidéo

```
1. Mobile : Enregistre une vidéo avec CameraView
   
2. Mobile : POST /api/videos/upload
   Headers: { Authorization: Bearer <token> }
   Body: FormData avec le fichier vidéo
   
3. Backend :
   - Vérifie l'authentification
   - Sauvegarde le fichier
   - Crée l'entrée Video en DB (status: UPLOADED)
   - Lance le traitement asynchrone
   - Retourne { video: { id, status } }
   
4. Backend (asynchrone) :
   - Appelle Python: python infer.py --video <path>
   - Reçoit le JSON avec les résultats
   - Crée InferenceResult en DB
   - Met à jour Video (status: COMPLETED)
   
5. Mobile : Poll GET /api/inference/:videoId
   - Toutes les 2 secondes
   - Jusqu'à ce que le résultat soit disponible
   
6. Mobile : Affiche les résultats (reps, confidence)
```

---

## 📝 Conclusion

Félicitations ! Vous avez maintenant les connaissances pour :
- ✅ Créer une application mobile React Native avec Expo
- ✅ Développer une API REST avec Node.js et Express
- ✅ Gérer l'authentification JWT
- ✅ Interagir avec MongoDB
- ✅ Intégrer des services externes (Python/IA)
- ✅ Tester votre code

### Prochaines Étapes

1. **Déploiement** : Heroku, Vercel, AWS, etc.
2. **Optimisation** : Cache, compression, CDN
3. **Monitoring** : Logs, métriques, alertes
4. **Sécurité** : HTTPS, rate limiting avancé, sanitization
5. **Performance** : Index MongoDB, pagination, lazy loading

---

**Bon développement ! 🚀**
