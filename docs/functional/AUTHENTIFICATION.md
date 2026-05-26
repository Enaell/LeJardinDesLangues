# Authentification

## Vue d'ensemble

L'authentification permet à un utilisateur de créer un compte et de se connecter à l'application. Elle est accessible depuis n'importe quelle page via une modale centralisée.

Deux méthodes sont proposées :
- **Email / mot de passe** (compte créé directement sur l'application)
- **Google** (OAuth 2.0 via popup)

---

## Inscription (email / mot de passe)

### Parcours utilisateur

1. L'utilisateur clique sur « S'inscrire » dans la barre de navigation.
2. Une modale s'ouvre sur l'onglet **Inscription**.
3. Il remplit le formulaire et valide.
4. Un message de succès s'affiche et la modale se ferme — l'utilisateur est immédiatement connecté.

### Champs du formulaire

| Champ | Obligatoire | Contraintes |
|---|---|---|
| Nom d'utilisateur | Oui | 3–50 caractères, lettres/chiffres/tirets/underscores uniquement |
| Email | Oui | Format email valide |
| Mot de passe | Oui | ≥ 8 caractères, au moins 1 majuscule, 1 minuscule, 1 chiffre |
| Nom complet | Non | Max 100 caractères |
| Langue natale | Oui | Sélecteur (code ISO 639-1) — valeur par défaut : `fr` |
| Langue cible | Oui | Sélecteur (code ISO 639-1) — valeur par défaut : `zh` |

### Comportement en cas d'erreur

- Les erreurs de validation s'affichent sous chaque champ dès que l'utilisateur le quitte (`onBlur`).
- Si l'email ou le nom d'utilisateur est déjà utilisé, une notification d'erreur s'affiche (réponse HTTP 409 du serveur).

---

## Connexion (email / mot de passe)

### Parcours utilisateur

1. L'utilisateur clique sur « Se connecter » dans la barre de navigation.
2. Une modale s'ouvre sur l'onglet **Connexion**.
3. Il saisit son email ou nom d'utilisateur et son mot de passe.
4. Un message de succès s'affiche et la modale se ferme.

> L'onglet actif (connexion ou inscription) peut être préselectionné selon le bouton cliqué dans l'interface.

### Champs du formulaire

| Champ | Obligatoire |
|---|---|
| Email ou nom d'utilisateur | Oui |
| Mot de passe | Oui |

### Comportement en cas d'erreur

- Si les identifiants sont incorrects, une notification d'erreur s'affiche (réponse HTTP 401 du serveur).

---

## Connexion via Google

### Parcours utilisateur

1. L'utilisateur clique sur le bouton **Continuer avec Google** (disponible dans les deux onglets de la modale).
2. Une popup s'ouvre vers Google pour l'authentification.
3. Après validation, la popup se ferme automatiquement.

**Si c'est la première connexion Google :**
- Une modale d'**onboarding** s'affiche pour que l'utilisateur confirme ou modifie sa langue natale et choisisse sa langue cible.
- Ces informations sont enregistrées sur son profil via l'API.

**Si l'utilisateur a déjà un compte Google :**
- La modale se ferme directement et l'utilisateur est connecté.

### Comportement en cas d'erreur

- Si l'utilisateur ferme la popup sans s'authentifier, rien ne se passe.
- Si Google renvoie une erreur, une notification s'affiche.
- Si les popups sont bloquées par le navigateur, un message d'erreur spécifique s'affiche.

---

## Déconnexion

L'utilisateur peut se déconnecter depuis le menu de navigation. La session est invalidée côté serveur, les cookies sont supprimés et l'utilisateur est redirigé vers la page d'accueil.

---

## Gestion de la session

### Mécanisme de cookies

| Cookie | Type | Durée | Rôle |
|---|---|---|---|
| `access_token` | httpOnly | 15 minutes | JWT d'accès aux API protégées |
| `refresh_token` | httpOnly | 7 jours | Renouvellement silencieux de la session |
| `is_authenticated` | Lisible par le JS | 7 jours | Indicateur de session active (sans exposer le token) |

### Persistance de la session

- Au chargement de l'application, si le cookie `is_authenticated` est présent, le profil utilisateur est automatiquement récupéré depuis l'API.
- Le cache du profil est conservé 60 minutes côté client (React Query).
- Si l'`access_token` expire, le serveur renouvelle automatiquement la session via le `refresh_token` (intercepteur HTTP 401).

### Profil utilisateur disponible

Une fois connecté, les données suivantes sont accessibles dans toute l'application :

| Propriété | Description |
|---|---|
| `id` | Identifiant unique |
| `username` | Nom d'utilisateur |
| `email` | Adresse email |
| `name` | Nom complet |
| `role` | Rôle (`USER`, `ADMIN`, `MODERATOR`) |
| `avatarUrl` | URL de l'avatar (optionnel) |
| `nativeLanguage` | Langue natale (code ISO) |
| `targetLanguage` | Langue cible (code ISO) |
| `createdAt` | Date de création du compte |
| `updatedAt` | Date de dernière modification |

---

## Accès aux routes protégées

Certaines pages de l'application nécessitent d'être connecté. Si un utilisateur non authentifié tente d'y accéder, un message d'accès refusé s'affiche à la place du contenu.

Le composant `ProtectedRoute` gère ce comportement — il affiche un indicateur de chargement le temps de vérifier la session, puis redirige ou bloque selon l'état d'authentification.

---

## Points techniques (pour les développeurs)

| Élément | Détail |
|---|---|
| Composant modale | `AuthModal` (onglets Login / Register) géré par `AuthModalContext` |
| Hook d'état auth | `useAuth()` — expose `user`, `isAuthenticated`, `isUnauthenticated`, `isLoading` |
| Ouvrir la modale | `useAuthModalContext().openModal('login' \| 'register')` |
| Mutation connexion | `useLogin()` |
| Mutation inscription | `useRegister()` |
| Mutation Google | `useGoogleAuth()` |
| Mutation déconnexion | `useLogout()` |
| Hashage mot de passe | Argon2id (côté serveur) |
| Stratégies auth serveur | JWT + Google OAuth 2.0 (Passport.js) |
