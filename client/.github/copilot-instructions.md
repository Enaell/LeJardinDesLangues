<SYSTEM>
You are an AI programming assistant specialized in applying code changes to existing or new documents.
Follow Microsoft content policies.
Avoid content that violates copyrights.
If you are asked to generate content that is harmful, hateful, racist, sexist, lewd, or violent, only respond with "Sorry, I can't assist with that."
Keep your answers short and impersonal.

When provided with a code block and an instructions file, follow these steps:
1. Analyze the code block and the existing document to decide if the code block should replace existing code or be inserted.
2. If necessary, break up the code block into multiple parts and insert each part at the appropriate location.
3. Preserve whitespace and newlines right after the parts of the file that you modify.
4. Ensure the final result is syntactically valid, properly formatted, and correctly indented. Do not include `...existing code...` comments.
5. Provide the fully rewritten file as the final output.
</SYSTEM>

# Le Jardin des Langues - Frontend Client

**Le Jardin des Langues** est une application web d'apprentissage des langues, spécialisée dans le chinois et le français. Le frontend est développé en React avec TypeScript et suit une architecture orientée fonctionnalités.

## 🎯 Contexte du projet

### Vision globale
- **Dictionnaire interactif** français-chinois avec recherche dynamique
- **Flashcards personnalisées** avec synchronisation multi-appareils
- **Exercices gamifiés** adaptés au niveau utilisateur
- **Communauté d'apprentissage** avec partage et interactions sociales
- **Interface responsive** optimisée pour web et mobile

### API Backend
Le frontend consomme une API REST NestJS hébergée sur le serveur backend avec les endpoints principaux :
- `/auth/*` - Authentification JWT et OAuth
- `/dictionary/*` - Recherche et consultation du dictionnaire
- `/flashcards/*` - Gestion des cartes mémoire
- `/exercises/*` - Exercices et jeux
- `/community/*` - Fonctionnalités sociales
- `/users/*` - Gestion des profils utilisateur

---

## 🧱 Stack technique Frontend

### Core Technologies
- **React 19** avec TypeScript pour l'interface utilisateur
- **Vite** comme bundler et outil de développement
- **Node.js 22** pour l'environnement d'exécution

### UI & Styling
- **Material-UI (MUI)** comme système de composants de base
- **Tailwind CSS** pour la personnalisation avancée et le responsive design
- **Thème personnalisé** inspiré de la nature (vert jardin comme couleur primaire)

### Routing & Data Management
- **TanStack Router** pour la navigation et gestion des routes
- **TanStack Query (React Query)** pour la gestion des données API et le cache
- **TanStack Form** pour la gestion des formulaires

### Testing & Quality
- **Cypress** pour les tests end-to-end
- **ESLint** avec configuration TypeScript
- **Mock Service Worker (MSW)** pour simuler les API en développement

---

## 🏗️ Architecture Frontend

### Structure orientée fonctionnalités

```
src/
├── features/           # 🎯 Fonctionnalités métier
│   ├── auth/          # Authentification et autorisation
│   ├── dictionary/    # Recherche et consultation du dictionnaire
│   ├── flashcards/    # Gestion et étude des cartes mémoire
│   ├── exercises/     # Exercices et jeux d'apprentissage
│   ├── community/     # Fonctionnalités sociales et communautaires
│   └── profile/       # Gestion du profil utilisateur
├── core/              # 🔧 Code partagé et fondations
│   ├── components/    # Composants UI réutilisables
│   │   ├── ui/        # Composants de base (Button, Input, etc.)
│   │   ├── layout/    # Composants de mise en page (Header, Sidebar)
│   │   └── forms/     # Composants de formulaires avec TanStack Form
│   ├── hooks/         # Hooks personnalisés partagés
│   ├── services/      # Services et configuration API
│   ├── utils/         # Fonctions utilitaires
│   ├── types/         # Types TypeScript globaux
│   ├── theme/         # Configuration du thème Material-UI
│   └── i18n/          # Configuration et traductions
├── routes/            # 🛣️ Configuration du routage TanStack Router
└── store/             # 📦 Gestion d'état globale (si nécessaire)
```

### Organisation des features
Chaque feature est autonome et contient :
- `components/` - Composants spécifiques à la fonctionnalité
- `hooks/` - Hooks métier pour la fonctionnalité  
- `services/` - Services API spécifiques
- `types/` - Types TypeScript pour la fonctionnalité
- `index.ts` - Exports publics de la fonctionnalité

---

## 📝 Conventions de codage Frontend

### Composants React
- **Déclaration** : Utiliser la syntaxe `const` avec arrow functions :
  ```typescript
  export const MyComponent = (props: MyComponentProps) => {
    // logique du composant
    return <Container>...</Container>;
  };
  ```
- **Éviter** : Les déclarations `function` et `export default`
- **Props** : Toujours typer les props avec un type dédié suffixé par `Props`

### Types vs Interfaces
- **Préférer** : Les `type` plutôt que les `interface`
- **Convention** : Suffixer les types de props avec `Props`
  ```typescript
  type MyComponentProps = {
    title: string;
    isVisible: boolean;
  };
  ```

### Exports et Imports
- **Préférer** : Les exports nommés plutôt que les exports par défaut
- **Éviter** : `export default` sauf pour les cas spécifiques (routes, configuration)
- **Organiser** : Regrouper les exports dans des fichiers `index.ts`
- **Alias de chemin** : Utiliser les alias configurés :
  ```typescript
  import { Layout } from '@core/components/layout';
  import { useAuth } from '@features/auth/hooks/useAuth';
  import { Button } from '@core/components/ui';
  ```

### Alias de chemin configurés
| Alias | Chemin | Usage |
|-------|--------|-------|
| `@` | `src/` | Racine du code source |
| `@core` | `src/core` | Point d'entrée core |
| `@core/*` | `src/core/*` | Sous-modules core |
| `@features/*` | `src/features/*` | Fonctionnalités métier |
| `@routes/*` | `src/routes/*` | Pages/routes |
| `@store/*` | `src/store/*` | État global |

---

## 🎨 Styles et Design System

### Approche hybride Material-UI + Tailwind
- **Utiliser Tailwind CSS pour** :
  - Responsive design : `hidden md:flex`, `flex md:hidden`
  - Layouts et spacing : `flex`, `flex-col`, `min-h-screen`, `ml-2`
  - Couleurs et backgrounds : `bg-gray-100`, `text-inherit`
- **Utiliser Material-UI pour** :
  - Composants complexes : `Autocomplete`, `DataGrid`, `DatePicker`
  - États interactifs : focus, hover, disabled
- **Éviter** : La prop `sx` de Material-UI quand Tailwind peut faire l'équivalent
- **Utiliser `sx` uniquement pour** :
  - Styles dynamiques complexes liés au thème Material-UI
  - Intégrations spécifiques avec le système de thème MUI

### Hiérarchie des composants
- **1. Composants Core** (`@core/components`) : Toujours en priorité
  - Composants UI de base : `Button`, `Input`, `Card`, `Container`
  - Composants layout : `Header`, `Sidebar`, `Layout`, `AppBar`
  - Composants formulaires : `FormTextField`, `FormSelect`, `FormCheckbox`
- **2. Composants Material-UI** : Pour les fonctionnalités complexes
  - Composants avancés : `Autocomplete`, `DataGrid`, `DatePicker`
  - Composants spécialisés : `Stepper`, `Timeline`, `SpeedDial`
- **3. Balises HTML natives** : Uniquement si aucune alternative composant n'existe
  - Éviter : `<div>`, `<span>`, `<button>`, `<input>`, `<form>`
  - Préférer : Composants équivalents du système de design

### Exemples de bonnes pratiques
```typescript
// ✅ Bon : Utilisation de composants Core
import { Container, Button, Card } from '@core/components/ui';

export const GoodExample = () => (
  <Container>
    <Card>
      <Button variant="primary">Action</Button>
    </Card>
  </Container>
);

// ❌ Mauvais : Utilisation de balises HTML natives
export const BadExample = () => (
  <div className="container">
    <div className="card">
      <button className="btn-primary">Action</button>
    </div>
  </div>
);

### Thème et couleurs
- **Couleur primaire** : `#4a9d4a` (Vert Jardin)
- **Couleur secondaire** : `#6b7f6b` (Vert Sauge)
- **Couleur accent** : `#ee7a44` (Orange Doux)
- **Bords arrondis** : 12px par défaut, 16px pour les cartes
- **Spacing** : Système basé sur 8px

---

## 🔄 Gestion des données avec TanStack Query

### Configuration et bonnes pratiques
- **QueryClient** global configuré dans `main.tsx`
- **Clés de requêtes** structurées pour éviter les conflits :
  ```typescript
  const queryKeys = {
    dictionary: {
      all: ['dictionary'] as const,
      search: (term: string) => [...queryKeys.dictionary.all, 'search', term] as const,
      word: (id: string) => [...queryKeys.dictionary.all, 'word', id] as const,
    },
  };
  ```
- **Optimisations** : Utiliser `staleTime` et `cacheTime` appropriés
- **Mutations** : Invalidation automatique des requêtes liées

### Structure des services API
```typescript
// features/dictionary/services/dictionaryApi.ts
export const dictionaryApi = {
  searchWords: (query: string) => 
    fetch(`/api/dictionary/search?q=${query}`).then(res => res.json()),
  
  getWord: (id: string) =>
    fetch(`/api/dictionary/words/${id}`).then(res => res.json()),
};

// features/dictionary/hooks/useDictionary.ts
export const useSearchWords = (query: string) => {
  return useQuery({
    queryKey: queryKeys.dictionary.search(query),
    queryFn: () => dictionaryApi.searchWords(query),
    enabled: query.length > 2,
  });
};
```

---

## 🚦 Routing avec TanStack Router

### Configuration et structure
- **Routeur** configuré dans `src/routes/`
- **Route tree** généré automatiquement
- **Préchargement** des données via les loaders de route
- **Type-safety** complète pour les paramètres et search params

### Bonnes pratiques
- **Structure modulaire** : Une route par fichier
- **Loaders** : Précharger les données nécessaires
- **Error boundaries** : Gestion d'erreur au niveau des routes
- **Navigation** : Utiliser les hooks fournis par TanStack Router

---

## 📝 Gestion des formulaires avec TanStack Form

### Philosophie des composants wrapper
- **Éviter les render props** : Ne pas utiliser `form.Field` directement
- **Composants déclaratifs** : Créer des wrappers réutilisables
- **Logique centralisée** : Encapsuler la complexité TanStack Form + Material-UI

### Structure des composants de formulaire
```
src/core/components/forms/
├── FormTextField.tsx      # Champs texte avec validation
├── FormPasswordField.tsx  # Mots de passe avec visibilité
├── FormSelect.tsx         # Listes déroulantes
├── FormCheckbox.tsx       # Cases à cocher
├── FormProvider.tsx       # Contexte pour les formulaires
├── Form.tsx              # Composant Form principal
└── hooks/
    └── useFormContext.ts  # Hook pour accéder au contexte
```

### Exemple d'utilisation
```typescript
// Définition du formulaire
type LoginFormData = {
  email: string;
  password: string;
};

// Utilisation dans un composant
export const LoginForm = () => {
  return (
    <Form<LoginFormData>
      defaultValues={{ email: '', password: '' }}
      onSubmit={handleSubmit}
    >
      <FormTextField
        name="email"
        label="Email"
        type="email"
        required
      />
      <FormPasswordField
        name="password"
        label="Mot de passe"
        required
      />
      <FormSubmitButton>Se connecter</FormSubmitButton>
    </Form>
  );
};
```

---

## 🌍 Internationalisation (i18n)

### Configuration react-i18next
- **Fichiers de traduction** organisés par langue et feature
- **Chargement dynamique** des traductions
- **Sélecteur de langue** dans l'interface
- **Hooks** : `useTranslation`, `useI18n`

### Organisation des traductions
```
src/core/i18n/locales/
├── fr/
│   ├── common.json
│   ├── auth.json
│   ├── dictionary.json
│   └── ...
├── en/
└── zh/
```

---

## 🧪 Tests Frontend

### Tests end-to-end avec Cypress
- **Configuration** dans `cypress.config.ts`
- **Tests** organisés par feature
- **Sélecteurs** utilisant `data-testid`
- **Mock API** avec MSW pour les tests isolés

### Stratégie de test
- **Scénarios utilisateur** complets
- **Parcours critiques** : authentification, recherche, création de flashcards
- **Tests responsive** sur différentes tailles d'écran

---

## 🔧 Configuration et outils

### Développement
- **Vite** avec hot reload
- **TypeScript** strict mode activé
- **ESLint** avec règles TypeScript et React
- **Prettier** pour le formatage automatique

### Build et déploiement
- **Build optimisé** avec Vite
- **Chunking automatique** pour les performances
- **Assets optimization** (images, fonts)
- **Docker** pour la containerisation

### Variables d'environnement
- `VITE_API_BASE_URL` - URL de base de l'API backend
- `VITE_APP_ENV` - Environnement (dev, staging, prod)

---

## 🚀 Commandes utiles

```bash
# Développement
npm run dev              # Démarrer le serveur de développement
npm run build           # Build de production
npm run preview         # Prévisualiser le build

# Tests
npm run test:e2e        # Tests Cypress
npm run test:e2e:headed # Tests Cypress avec interface

# Code quality
npm run lint            # Linter ESLint
npm run lint:fix        # Correction automatique ESLint
npm run migrate-imports # Migration des imports vers les alias
```

---

## 💡 Bonnes pratiques Frontend

### Performance
- **Lazy loading** des routes et composants
- **Memoization** appropriée avec `useMemo` et `useCallback`
- **Optimisation des images** (formats modernes, tailles adaptées)
- **Bundle splitting** automatique

### Accessibilité
- **Aria labels** sur les éléments interactifs
- **Navigation au clavier** fonctionnelle
- **Contraste** conforme aux standards WCAG
- **Lecteurs d'écran** pris en compte

### SEO et Meta
- **Meta tags** dynamiques par route
- **Open Graph** pour le partage social
- **Structured data** pour les moteurs de recherche

### Sécurité Frontend
- **Validation côté client** avec TanStack Form
- **Sanitization** des inputs utilisateur
- **HTTPS** obligatoire en production
- **CSP headers** appropriés
