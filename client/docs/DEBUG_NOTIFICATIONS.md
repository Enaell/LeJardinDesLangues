# Debug: Snackbars ne s'affichent pas

## Problème rencontré
Les erreurs d'inscription sont bien loggées dans la console via `useAuth` et `RegisterForm`, mais aucune snackbar n'apparaît.

## Solutions mises en place

### ✅ 1. Intégration des notifications dans les hooks auth
- **Modifié** `useRegister` et `useLogin` pour utiliser `notifyApiError`
- **Ajouté** les notifications de succès traduites
- **Importé** `useNotify` et `useTranslation`

### ✅ 2. Amélioration du service API
- **Modifié** `api.ts` pour lancer des erreurs avec `statusCode`
- **Ajouté** gestion des erreurs réseau
- **Configuré** `credentials: 'include'` pour les cookies

### ✅ 3. Traductions complètes
- **Ajouté** `auth.success.registrationSuccess` et `loginSuccess`
- **Traduit** en français, anglais et chinois

### ✅ 4. Configuration App.tsx vérifiée
```tsx
<NotificationProvider>
  <RouterProvider router={router} />
  <GlobalNotifications />
</NotificationProvider>
```

## Comment tester

### 1. Test des notifications de base
- Aller sur `/test-notifications`
- Cliquer sur les boutons de test
- Vérifier que les snackbars apparaissent

### 2. Test avec authentification
- Essayer de s'inscrire avec des données invalides
- Vérifier que l'erreur apparaît en snackbar
- Essayer une inscription valide
- Vérifier que le succès apparaît

### 3. Debug étapes
Si les notifications ne fonctionnent toujours pas :

1. **Vérifier le context** : Les hooks `useNotify` ont-ils accès au context ?
2. **Vérifier les erreurs** : Les erreurs ont-elles la bonne structure ?
3. **Vérifier l'ordre** : `GlobalNotifications` est-il rendu après le provider ?

## Code de debug

```typescript
// Dans le component qui ne fonctionne pas
const { notifySuccess } = useNotify();

// Test direct
const testNotification = () => {
  console.log('Test notification déclenchée');
  notifySuccess('Test direct depuis le composant');
};

// Dans useRegister onError
onError: (error) => {
  console.log('Erreur capturée:', error);
  console.log('Type de l\'erreur:', typeof error);
  console.log('notifyApiError disponible:', typeof notifyApiError);
  notifyApiError(error);
},
```

## Points de vérification

- [ ] `NotificationProvider` wrappé correctement
- [ ] `GlobalNotifications` rendu dans l'arbre
- [ ] `useNotify` fonctionne en mode test
- [ ] Erreurs ont `statusCode` et `message`
- [ ] Console logs montrent l'exécution des callbacks
