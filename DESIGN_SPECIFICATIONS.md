# Spécifications de Design - GymEasIA

## Vue d'ensemble
Application mobile de suivi de performance de gym avec IA (RepNet). Design dark mode avec accent lime/vert.

---

## Système de Design

### Palette de Couleurs

#### Couleurs de Base
- **Background**: `#000000` (Noir pur)
- **Surface**: `#1A1A1A` (Gris très foncé)
- **Surface Light**: `#2A2A2A` (Gris foncé)

#### Couleurs d'Accent
- **Accent Principal**: `#D7FF00` (Lime/vert clair)
- **Accent Secondaire**: `#CFFF00` (Lime plus clair)

#### Couleurs de Texte
- **Texte Principal**: `#FFFFFF` (Blanc)
- **Texte Secondaire**: `#AAAAAA` (Gris clair)
- **Texte Muted**: `#666666` (Gris moyen)

#### Couleurs de Statut
- **Success**: `#00FF88` (Vert)
- **Error**: `#FF4444` (Rouge)
- **Warning**: `#FFAA00` (Orange)

#### Effet Glass
- **Glass**: `rgba(255, 255, 255, 0.1)` (Blanc 10% opacité)
- **Glass Border**: `rgba(255, 255, 255, 0.2)` (Blanc 20% opacité)

### Typographie

#### Hiérarchie
- **H1**: 32px, Bold, `#FFFFFF`
- **H2**: 24px, Bold, `#FFFFFF`
- **H3**: 20px, Semi-bold (600), `#FFFFFF`
- **Body**: 16px, Regular, `#FFFFFF`
- **Caption**: 14px, Regular, `#AAAAAA`

### Espacements
- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px

### Bordures
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **Round**: 9999px (cercle parfait)

---

## Composants

### Button (Bouton)
- **Hauteur**: 56px
- **Border Radius**: 16px
- **Variantes**:
  - **Primary**: Gradient de `#D7FF00` à `#CFFF00`, texte blanc bold
  - **Secondary**: Fond transparent, texte accent
  - **Outline**: Fond transparent, bordure accent 2px

### Input (Champ de saisie)
- **Hauteur**: 56px
- **Border Radius**: 16px
- **Fond**: `#1A1A1A`
- **Bordure**: 1px `rgba(255, 255, 255, 0.2)`
- **Padding Horizontal**: 16px
- **Texte**: 16px, `#FFFFFF`
- **Placeholder**: `#666666`

### Card (Carte)
- **Border Radius**: 24px
- **Padding**: 16px
- **Fond**: `#1A1A1A`
- **Bordure**: 1px `rgba(255, 255, 255, 0.2)`
- **Variante Glass**: Fond `rgba(255, 255, 255, 0.1)` avec blur

### MetricCard (Carte de métrique)
- Structure: Icône en haut, valeur au centre, label en bas
- Valeur: H2 (24px), couleur accent
- Label: Caption (14px), centré

---

## Écrans

### 1. Login Screen (Écran de Connexion)

#### Layout
- **Fond**: Gradient de `#000000` à `#1A1A1A`
- **Padding**: 24px
- **Centré verticalement**

#### Éléments
1. **Header** (centré)
   - Logo "GymEasIA": 48px, Bold, couleur accent
   - Slogan "AI-Powered Performance Tracking": 16px, caption

2. **Tabs** (sélecteur Login/Sign Up)
   - Container: Fond `#1A1A1A`, border radius 8px, padding 4px
   - Tab actif: Fond accent, texte blanc bold
   - Tab inactif: Fond transparent, texte `#AAAAAA`
   - Chaque tab: flex 1, padding vertical 8px

3. **Formulaire**
   - Input Email: 56px hauteur, margin bottom 16px
   - Input Username (si Sign Up): 56px hauteur, margin bottom 16px
   - Input Password: 56px hauteur, margin bottom 16px
   - Lien "Forgot?": Aligné à droite, couleur accent, margin bottom 16px
   - Bouton "START TRAINING": Primary, margin bottom 24px

4. **Social Buttons**
   - Container: Row, centré, gap 16px
   - Boutons: 56x56px, cercle, fond glass, bordure glass
   - Icônes Google/Facebook: 24px

#### États
- **Erreur**: Texte rouge sous les inputs
- **Loading**: Spinner dans le bouton

---

### 2. Dashboard Screen (Tableau de Bord)

#### Layout
- **Fond**: Gradient de `#000000` à `#1A1A1A`
- **ScrollView** avec pull-to-refresh

#### Éléments
1. **Header** (padding 24px, padding top 60px)
   - Titre "GymEasIA": H1 (32px)
   - Message "Welcome back, [Username]": Body (16px), couleur secondaire

2. **Metrics Row** (padding horizontal 24px, margin bottom 24px)
   - 3 MetricCards en row, gap 16px
   - **Calories burned**: Icône flame, valeur "1250"
   - **Workouts this week**: Icône barbell, valeur "5"
   - **Total reps**: Icône repeat, valeur "60"

3. **Section "Recent History"** (padding 24px)
   - Titre section: H3 (20px), margin bottom 16px
   - **État vide**: Card centrée, padding 32px
     - Texte "No workouts yet": H3
     - Sous-texte "Start recording to see your history": Caption
   - **Liste de vidéos**: Cards avec margin bottom 16px
     - Exercice: H3 (20px)
     - Type: Caption (14px) "Full Body • High Intensity"
     - Cercle avec nombre de reps: 60x60px, fond accent, texte blanc bold

---

### 3. Camera Screen (Écran Caméra)

#### Layout
- **Fond**: Noir (`#000000`)
- **CameraView**: Plein écran
- **Overlay**: Gradient avec positionnement absolu

#### Éléments Overlay

1. **Top Overlay** (padding top 50px, padding horizontal 16px)
   - **Header Row**:
     - Bouton retour: 40x40px, cercle, fond glass, bordure glass
     - Centre: Badge "RepNet AI - Auto Detection"
       - Fond glass, padding horizontal 16px, padding vertical 4px
       - Bordure accent 1px
       - Icône pulse 16px + texte caption accent
     - Bouton flip caméra: 40x40px, cercle, fond glass
   
   - **Recording Indicator** (si enregistrement):
     - Fond rouge 40% opacité, padding 16px horizontal
     - Point rouge 8x8px + texte "0:45 / 1:00"
     - Bordure rouge
   
   - **Instruction Text**: Caption, centré, couleur secondaire
     - "Position your full body in frame\nAI will detect your exercise automatically"

2. **Bottom Overlay** (padding bottom 40px, padding horizontal 24px)
   - **Row** avec 3 éléments:
     - Bouton galerie: 50x50px, cercle, fond glass, bordure 2px
     - **Bouton enregistrement** (centré):
       - Container externe: 90x90px, cercle, fond blanc 30% opacité
       - Bouton interne: 70x70px, cercle, fond accent, bordure 4px blanc
       - **État actif**: 50x50px, border radius 8px, fond rouge
       - **État disabled**: Opacité 60%, fond gris
     - Placeholder: 50x50px (pour équilibrer)

#### État Preview (après enregistrement)
- **Vidéo**: Plein écran avec contrôles natifs
- **Overlay**: Gradient de transparent à noir 90%
- **Header**: Row avec bouton close, titre "Review Video", placeholder
- **Bottom**: Row avec 2 boutons
  - **Retry**: Fond glass, bordure glass, row avec icône refresh + texte
  - **Analyze with AI**: Fond accent, row avec icône checkmark + texte blanc bold

#### États
- **Uploading**: Overlay noir 90%, spinner + texte "Uploading to RepNet AI..."
- **Permission**: Centré, texte erreur + bouton "Grant Permission"

---

### 4. Analyze Screen (Écran d'Analyse)

#### Layout
- **Fond**: Gradient de `#000000` à `#1A1A1A`
- **ScrollView** avec padding 24px

#### Éléments

1. **Header** (padding 24px, padding top 60px)
   - Row: Bouton retour, titre "Analysis" (H2), placeholder 24px

2. **État Processing** (Card centrée, padding 32px)
   - Spinner large, couleur accent
   - Texte "AI is analyzing your video...": H3, margin top 16px
   - Sous-texte "This may take a few seconds": Caption

3. **État Results** (si analyse terminée)
   - **Results Row** (flex row, gap 16px, margin bottom 24px)
     - 3 Cards flex 1, padding 16px, centré
     - **Reps**: Label "Reps", valeur "12" (H1, accent)
     - **Load**: Label "Load", valeur "--", note "Mock data" (10px)
     - **Score**: Label "Score", valeur "85%" (H1, accent)
   
   - **Analysis Card** (variant glass, margin bottom 24px, padding 24px)
     - Titre "AI Analysis": H3, margin bottom 16px
     - Texte analyse: Body, line height 24px, margin bottom 16px
     - **Tags Row** (flex row, wrap, gap 8px)
       - Tags: Padding horizontal 16px, vertical 4px, border radius round
       - Fond accent 20% opacité, bordure accent 1px
       - Texte caption, couleur accent
       - Exemples: "Hypertrophy", "Tempo", "Form Check"
   
   - **Progress Card** (margin bottom 24px)
     - Titre "Progression": H3, margin bottom 16px
     - **Progress Bar**: Hauteur 8px, fond `#2A2A2A`, border radius round
       - Fill: Hauteur 100%, fond accent, largeur selon confidence
     - Texte "Confidence: 85%": Caption

4. **État Error** (Card centrée, padding 32px)
   - Icône alert-circle 48px, couleur erreur
   - Texte "Analysis not available": Body, couleur erreur, margin top 16px

---

### 5. History Screen (Écran Historique)

#### Layout
- **Fond**: Gradient de `#000000` à `#1A1A1A`
- **ScrollView** avec pull-to-refresh, padding 24px

#### Éléments

1. **Header** (padding 24px, padding top 60px)
   - Titre "History": H1 (32px)

2. **État Vide** (Card centrée, padding 32px, margin top 32px)
   - Icône time-outline 64px, couleur muted
   - Texte "No workouts yet": H3, margin top 16px
   - Sous-texte "Start recording to see your history": Caption

3. **Liste de Vidéos** (si vidéos existantes)
   - Cards avec margin bottom 16px
   - **Content Row**:
     - **Left**: Row avec icône videocam 24px (accent) + info
       - Nom vidéo: Body, margin bottom 4px
       - Date: Caption
     - **Right**: Row avec badge status + chevron
       - **Status Badge**: Padding horizontal 8px, vertical 4px, border radius 8px
         - **DONE**: Fond success 20%, texte success
         - **PROCESSING**: Fond warning 20%, texte warning
         - **FAILED**: Fond error 20%, texte error
       - Icône chevron-forward 20px, couleur secondaire

---

## Navigation

### Bottom Tab Bar
- **Fond**: `#1A1A1A`
- **Bordure top**: 1px `rgba(255, 255, 255, 0.2)`
- **Hauteur**: 70px
- **Padding**: 10px top/bottom
- **Couleur active**: Accent (`#D7FF00`)
- **Couleur inactive**: Muted (`#666666`)

#### Tabs
1. **Dashboard**: Icône home
2. **Camera**: Icône camera (sans label)
3. **History**: Icône time

---

## Dimensions d'Écran

### Format Mobile Standard
- **Largeur**: 375px (iPhone standard)
- **Hauteur**: 812px (iPhone X/11/12 standard)
- **Safe Area Top**: 44px (notch)
- **Safe Area Bottom**: 34px (home indicator)

---

## États et Interactions

### États de Boutons
- **Default**: Couleur normale
- **Pressed**: Opacité 0.8
- **Disabled**: Opacité 0.5
- **Loading**: Spinner au lieu du texte

### Animations
- **Recording Button**: Scale 1.0 → 1.2 → 1.0 (loop 500ms)
- **Pulse Effect**: Scale 1.0 → 1.3 → 1.0 (loop 1000ms)
- **Pull to Refresh**: Spinner avec couleur accent

---

## Notes de Design

1. **Glass Morphism**: Utilisé pour les overlays et certains composants (blur + transparence)
2. **Gradients**: Utilisés pour les fonds d'écran (noir → gris foncé)
3. **Accent Color**: Utilisé stratégiquement pour les éléments importants (CTA, valeurs, indicateurs)
4. **Dark Mode**: Design entièrement dark pour réduire la fatigue oculaire
5. **Accessibility**: Contraste élevé entre texte et fond, tailles de texte lisibles

---

## Export Figma

### Structure Recommandée
1. **Page: Design System**
   - Couleurs (style de couleur)
   - Typographie (style de texte)
   - Composants (Button, Input, Card, etc.)

2. **Page: Screens**
   - Login Screen
   - Dashboard Screen
   - Camera Screen (avec états)
   - Analyze Screen (avec états)
   - History Screen

3. **Page: Components**
   - Tous les composants réutilisables
   - Variantes et états

### Format d'Export
- **Format**: PNG ou SVG
- **Résolution**: 2x ou 3x pour mobile
- **Dimensions**: 375x812px (ou 750x1624px @2x)
