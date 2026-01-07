# Installation - GymEasIA Mobile

## Résolution des problèmes d'installation

Si vous rencontrez des erreurs lors de `npm install`, utilisez :

```bash
npm install --legacy-peer-deps
```

Un fichier `.npmrc` a été créé pour automatiser cela lors des futures installations.

## Note sur Node.js

Expo SDK 54 recommande Node.js >= 20.19.4. Si vous avez une version antérieure, vous pouvez :
- Mettre à jour Node.js vers la dernière version LTS
- Ou continuer avec votre version actuelle (des avertissements peuvent apparaître mais l'application devrait fonctionner)

## Installation complète

```bash
cd mobile
npm install --legacy-peer-deps
npx expo start
```
