# Guide d'Import Figma - GymEasIA

Ce guide vous explique comment utiliser les spécifications pour créer les maquettes dans Figma.

## 📋 Fichiers Fournis

1. **DESIGN_SPECIFICATIONS.md** - Documentation complète du design system
2. **figma-specifications.json** - Spécifications structurées en JSON
3. **FIGMA_IMPORT_GUIDE.md** - Ce guide

## 🎨 Étapes pour Créer les Maquettes dans Figma

### Étape 1: Créer le Design System

1. **Créer une nouvelle page "Design System"**

2. **Créer les Styles de Couleur**
   - Sélectionnez un rectangle
   - Dans le panneau de droite, cliquez sur le "+" à côté de "Fill"
   - Créez un style de couleur pour chaque couleur du système:
     - `Background` (#000000)
     - `Surface` (#1A1A1A)
     - `Surface Light` (#2A2A2A)
     - `Accent` (#D7FF00)
     - `Accent Secondary` (#CFFF00)
     - `Text` (#FFFFFF)
     - `Text Secondary` (#AAAAAA)
     - `Text Muted` (#666666)
     - `Success` (#00FF88)
     - `Error` (#FF4444)
     - `Warning` (#FFAA00)
     - `Glass` (rgba(255, 255, 255, 0.1))
     - `Glass Border` (rgba(255, 255, 255, 0.2))

3. **Créer les Styles de Texte**
   - Créez un texte
   - Configurez les propriétés selon la typographie:
     - **H1**: 32px, Bold, #FFFFFF
     - **H2**: 24px, Bold, #FFFFFF
     - **H3**: 20px, SemiBold (600), #FFFFFF
     - **Body**: 16px, Regular, #FFFFFF
     - **Caption**: 14px, Regular, #AAAAAA
   - Créez un style de texte pour chacun

4. **Créer les Composants**
   - **Button** (Primary, Secondary, Outline)
   - **Input**
   - **Card** (Default, Glass)
   - **MetricCard**

### Étape 2: Créer les Écrans

#### Frame de Base
- Créez un Frame de **375x812px** (iPhone standard)
- Nommez-le selon l'écran (ex: "Login Screen")

#### 1. Login Screen

**Structure:**
```
Frame (375x812)
├── Background Gradient (noir → gris foncé)
├── Header (centré, y: 200)
│   ├── Logo "GymEasIA" (48px, accent)
│   └── Slogan (16px, caption)
├── Tabs Container (327x48, x: 24, y: 320)
│   ├── Tab "Log In" (actif, fond accent)
│   └── Tab "Sign Up" (inactif)
├── Form (x: 24, y: 400)
│   ├── Input Email (327x56)
│   ├── Input Password (327x56)
│   ├── Link "Forgot?" (aligné droite)
│   └── Button "START TRAINING" (327x56)
└── Social Buttons (centré, y: 680)
    ├── Button Google (56x56, cercle)
    └── Button Facebook (56x56, cercle)
```

**Détails:**
- Fond: Gradient de #000000 à #1A1A1A
- Tabs: Fond #1A1A1A, border radius 8px, padding 4px
- Tab actif: Fond #D7FF00, texte noir
- Inputs: 56px hauteur, fond #1A1A1A, bordure rgba(255,255,255,0.2)
- Button: Gradient accent, texte noir bold

#### 2. Dashboard Screen

**Structure:**
```
Frame (375x812)
├── Background Gradient
├── Header (x: 24, y: 60)
│   ├── Title "GymEasIA" (H1)
│   └── Welcome text (Body, secondary)
├── Metrics Row (x: 24, y: 180)
│   ├── MetricCard Calories (103px largeur)
│   ├── MetricCard Workouts (103px largeur)
│   └── MetricCard Reps (103px largeur)
└── Section "Recent History" (x: 24, y: 300)
    ├── Section Title (H3)
    └── History Cards
        └── Card (exercise, type, reps circle)
```

**Détails:**
- MetricCards: Fond #1A1A1A, border radius 24px, padding 16px
- Cercle reps: 60x60px, fond accent, texte blanc bold

#### 3. Camera Screen

**Structure:**
```
Frame (375x812)
├── Camera View (plein écran, fond noir)
└── Overlay (position absolue)
    ├── Top Overlay (y: 50)
    │   ├── Header Row
    │   │   ├── Button Back (40x40, cercle, glass)
    │   │   ├── Badge "RepNet AI" (glass, bordure accent)
    │   │   └── Button Flip (40x40, cercle, glass)
    │   ├── Recording Indicator (si recording)
    │   └── Instruction Text (centré)
    └── Bottom Overlay (y: 738)
        ├── Button Gallery (50x50, cercle, glass)
        ├── Record Button (90x90 externe, 70x70 interne)
        └── Placeholder (50x50)
```

**États à créer:**
- **Default**: Bouton accent, cercle
- **Recording**: Bouton rouge 50x50, border radius 8px
- **Preview**: Overlay avec vidéo + boutons Retry/Analyze

**Détails:**
- Overlay: Gradient rgba(0,0,0,0.3) → transparent → rgba(0,0,0,0.7)
- Glass effect: Fond rgba(255,255,255,0.1), bordure rgba(255,255,255,0.2)
- Record button externe: 90x90px, fond blanc 30% opacité
- Record button interne: 70x70px, fond accent, bordure 4px blanc

#### 4. Analyze Screen

**Structure:**
```
Frame (375x812)
├── Background Gradient
├── Header (x: 24, y: 60)
│   ├── Button Back
│   ├── Title "Analysis" (H2)
│   └── Placeholder
└── Content (ScrollView, x: 24, y: 140)
    ├── Results Row
    │   ├── ResultCard "Reps" (103px)
    │   ├── ResultCard "Load" (103px)
    │   └── ResultCard "Score" (103px)
    ├── Analysis Card (glass variant)
    │   ├── Title "AI Analysis" (H3)
    │   ├── Analysis Text (Body)
    │   └── Tags Row
    └── Progress Card
        ├── Title "Progression" (H3)
        ├── Progress Bar (327x8)
        └── Confidence Text (Caption)
```

**États à créer:**
- **Processing**: Card centrée avec spinner + texte
- **Results**: Affichage complet des résultats
- **Error**: Card avec icône erreur + texte

**Détails:**
- Progress bar: Fond #2A2A2A, fill accent, hauteur 8px
- Tags: Fond accent 20%, bordure accent, border radius round

#### 5. History Screen

**Structure:**
```
Frame (375x812)
├── Background Gradient
├── Header (x: 24, y: 60)
│   └── Title "History" (H1)
└── Video List (x: 24, y: 140)
    └── Video Cards
        └── Card
            ├── Left (icon + info)
            │   ├── Icon videocam (24px, accent)
            │   └── Info (name + date)
            └── Right (status + chevron)
                ├── Status Badge
                └── Icon chevron-forward
```

**États à créer:**
- **Empty**: Card centrée avec icône + texte
- **List**: Liste de vidéos avec statuts

**Détails:**
- Status badges:
  - DONE: Fond success 20%, texte success
  - PROCESSING: Fond warning 20%, texte warning
  - FAILED: Fond error 20%, texte error

### Étape 3: Créer la Navigation

**Bottom Tab Bar:**
- Créez un Frame de 375x70px
- Fond: #1A1A1A
- Bordure top: 1px rgba(255,255,255,0.2)
- 3 tabs: Dashboard (home), Camera (camera, sans label), History (time)
- Couleur active: #D7FF00
- Couleur inactive: #666666

### Étape 4: Organiser les Pages

**Structure recommandée:**
```
📄 Design System
  ├── Colors
  ├── Typography
  └── Components

📄 Screens
  ├── Login Screen
  ├── Dashboard Screen
  ├── Camera Screen
  │   ├── Default
  │   ├── Recording
  │   └── Preview
  ├── Analyze Screen
  │   ├── Processing
  │   ├── Results
  │   └── Error
  └── History Screen
      ├── Empty
      └── List

📄 Navigation
  └── Bottom Tab Bar
```

## 🎯 Astuces Figma

### Gradients
- Pour créer un gradient: Sélectionnez l'objet → Fill → Linear Gradient
- Gradient Login/Dashboard: De #000000 (0%) à #1A1A1A (100%)

### Glass Effect
- Fond: rgba(255, 255, 255, 0.1)
- Effet: Background Blur (20px)
- Bordure: 1px rgba(255, 255, 255, 0.2)

### Bordures Arrondies
- Utilisez les valeurs du design system:
  - SM: 8px
  - MD: 16px
  - LG: 24px
  - Round: 9999px (pour les cercles)

### Auto Layout
- Utilisez Auto Layout pour les rows et columns
- Gap: Utilisez les valeurs d'espacement (4, 8, 16, 24, 32px)

### Composants et Variantes
- Créez des composants pour les éléments réutilisables
- Utilisez les Variantes pour les états (default, pressed, disabled)

## 📤 Export

### Pour le Développement
- Exportez en **PNG @2x** ou **SVG**
- Dimensions: 750x1624px (@2x) ou 1125x2436px (@3x)

### Pour la Présentation
- Créez un prototype interactif dans Figma
- Ajoutez des transitions entre les écrans
- Exportez en PDF ou partagez le lien Figma

## 🔗 Ressources

- **Couleurs**: Voir `figma-specifications.json` → `designSystem.colors`
- **Typographie**: Voir `figma-specifications.json` → `designSystem.typography`
- **Spacing**: Voir `figma-specifications.json` → `designSystem.spacing`
- **Détails écrans**: Voir `DESIGN_SPECIFICATIONS.md`

## ✅ Checklist

- [ ] Design System créé (couleurs, typographie, composants)
- [ ] Login Screen créé
- [ ] Dashboard Screen créé
- [ ] Camera Screen créé (avec tous les états)
- [ ] Analyze Screen créé (avec tous les états)
- [ ] History Screen créé (avec état vide et liste)
- [ ] Bottom Tab Bar créé
- [ ] Tous les écrans organisés dans des pages
- [ ] Prototype interactif créé (optionnel)
- [ ] Export préparé pour le développement

---

**Note**: Ce guide est basé sur les spécifications du code React Native. Les dimensions et couleurs correspondent exactement à l'implémentation actuelle.
