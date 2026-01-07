# Dépannage - GymEasIA Mobile

## Problème : Le register ne fonctionne pas

### 1. Vérifier que le backend est démarré

```bash
cd backend
npm run dev
```

Le backend doit être accessible sur `http://localhost:3000`

### 2. Vérifier MongoDB

```bash
docker compose up -d
```

Vérifier que MongoDB est bien démarré :
```bash
docker compose ps
```

### 3. Problème de connexion depuis le téléphone

**IMPORTANT** : `localhost` ne fonctionne pas sur un téléphone physique !

#### Solution A : Utiliser l'émulateur/simulateur
- iOS Simulator : `localhost` fonctionne
- Android Emulator : `localhost` fonctionne OU utilisez `10.0.2.2:3000`

#### Solution B : Utiliser votre IP locale (téléphone physique)

1. Trouvez votre IP locale :
   - Windows : `ipconfig` → cherchez "IPv4 Address"
   - Mac/Linux : `ifconfig` → cherchez "inet"

2. Modifiez `mobile/src/config.ts` :
```typescript
export const API_BASE_URL = __DEV__
  ? 'http://192.168.1.100:3000'  // Remplacez par votre IP
  : 'https://your-production-api.com';
```

3. Assurez-vous que votre téléphone et votre ordinateur sont sur le même réseau WiFi

4. Vérifiez que le firewall n'bloque pas le port 3000

### 4. Vérifier les logs

Dans le terminal du backend, vous devriez voir les requêtes entrantes.

Dans la console Expo (métro bundler), vérifiez les erreurs réseau.

### 5. Tester avec curl/Postman

Testez directement l'API :

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"password123"}'
```

### 6. Vérifier les erreurs dans l'app

L'erreur devrait s'afficher dans le champ d'erreur sous le formulaire. Vérifiez :
- "Cannot connect to server" → Backend non démarré ou problème réseau
- "User already exists" → L'utilisateur existe déjà
- "Invalid email" → Format d'email invalide
- "Password too short" → Le mot de passe doit faire au moins 6 caractères

### 7. Vérifier le fichier .env du backend

Assurez-vous que `backend/.env` existe et contient :
```
MONGODB_URI=mongodb://localhost:27017/gymeasia
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```
