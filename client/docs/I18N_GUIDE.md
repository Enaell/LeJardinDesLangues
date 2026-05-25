# Internationalisation avec React i18next

Ce guide explique comment utiliser et étendre le système d'internationalisation de l'application.

## Configuration

L'i18n est automatiquement initialisé au démarrage de l'application dans `main.tsx`.

### Langues supportées
- **Français (fr)** - Langue par défaut
- **Anglais (en)**
- **Chinois (zh)**

## Utilisation

### Hook useTranslation

```typescript
import { useTranslation } from '@core/hooks';

export const MonComposant = () => {
  const { t, changeLanguage, currentLanguage } = useTranslation();

  return (
    <div>
      <h1>{t('app.title')}</h1>
      <p>{t('navigation.home')}</p>
      <button onClick={() => changeLanguage('en')}>
        English
      </button>
    </div>
  );
};
```

### Traductions avec paramètres

```typescript
// Dans les fichiers de traduction (.json)
{
  "welcome": "Bienvenue {{name}} !",
  "itemCount": "{{count}} élément",
  "itemCount_plural": "{{count}} éléments"
}

// Dans les composants
const { t } = useTranslation();

// Avec variables
t('welcome', { name: 'Jean' }) // "Bienvenue Jean !"

// Avec pluralisation
t('itemCount', { count: 1 }) // "1 élément"
t('itemCount', { count: 5 }) // "5 éléments"
```

## Structure des traductions

```
src/core/i18n/locales/
├── fr.json      # Français
├── en.json      # Anglais
└── zh.json      # Chinois
```

### Organisation des clés

```json
{
  "app": {
    "title": "Le Jardin des Langues"
  },
  "navigation": {
    "home": "Accueil",
    "dictionary": "Dictionnaire"
  },
  "auth": {
    "login": {
      "title": "Connexion",
      "submitButton": "Se connecter"
    },
    "validation": {
      "required": "Ce champ est requis"
    }
  },
  "common": {
    "loading": "Chargement...",
    "save": "Sauvegarder"
  }
}
```

## Composants

### LanguageSelector

Le composant `LanguageSelector` est disponible dans `@core/components/ui/language-selector` et ré-exporté via `@core`.

```typescript
import { LanguageSelector } from '@core/components/ui/language-selector';

// Taille par défaut (h-8)
<LanguageSelector />

// Compact pour l'AppBar (h-7)
<LanguageSelector size="sm" />
```

**Props :** `{ size?: 'sm' | 'default'; className?: string }`

Utilise `LANGUAGE_OPTIONS` de `@core/i18n/languages` et `useTranslation` de `@core/hooks` en interne.

### LANGUAGE_OPTIONS

La liste des langues supportées est centralisée dans `@core/i18n/languages.ts`. Les labels utilisent le nom **en langue native** (endonyme) :

```typescript
import { LANGUAGE_OPTIONS, type LanguageCode } from '@core/i18n/languages';
// [{ value: 'fr', label: 'Français' }, { value: 'en', label: 'English' }, { value: 'zh', label: '中文' }]
```

Toujours importer `LANGUAGE_OPTIONS` depuis `@core/i18n/languages` plutôt que de redéfinir un tableau local.

```typescript
import { LANGUAGE_OPTIONS } from '@core/i18n/languages';
import { Button } from '@core/components/ui/button';

export const LanguageSwitcher = () => {
  const { changeLanguage, currentLanguage } = useTranslation();
  return (
    <div className="flex gap-2">
      {LANGUAGE_OPTIONS.map((lang) => (
        <Button
          key={lang.value}
          variant={currentLanguage === lang.value ? 'default' : 'outline'}
          onClick={() => changeLanguage(lang.value)}
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
};
```

## Bonnes pratiques

### 1. Nommage des clés
- Utilisez des noms descriptifs et hiérarchiques
- Préférez `auth.login.title` à `loginTitle`
- Groupez les traductions par feature/contexte

### 2. Gestion des formulaires
- Séparez les labels, placeholders et messages d'erreur
- Utilisez `auth.validation.*` pour les messages d'erreur

### 3. Composants réutilisables
- Passez les clés de traduction en props plutôt que les textes
- Permettez la surchage des traductions

### 4. Ajout de nouvelles langues
1. Créer le fichier JSON dans `locales/`
2. L'ajouter dans `config.ts`
3. Mettre à jour le `LanguageSelector`

## Exemple complet

```typescript
import { useTranslation } from '@core/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const ExempleFormulaire = () => {
  const { t } = useTranslation();

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">{t('auth.login.email')}</Label>
        <Input
          id="email"
          placeholder={t('auth.login.emailPlaceholder')}
        />
        {hasError && <p className="text-sm text-destructive">{t('auth.validation.emailInvalid')}</p>}
      </div>
      <Button type="submit">
        {t('auth.login.submitButton')}
      </Button>
    </form>
  );
};
```

## Débogage

Pour voir les clés de traduction manquantes, ouvrez la console du navigateur. react-i18next affichera des warnings pour les clés non trouvées.
