# Système de notifications — référence

## Architecture

```tsx
// App.tsx
<NotificationProvider>
  <RouterProvider router={router} />
  <GlobalNotifications />
</NotificationProvider>
```

Le `NotificationProvider` expose le contexte. `GlobalNotifications` rend les toasts dans le DOM. Les deux doivent être présents.

## Utilisation

```typescript
import { useNotify } from '@core/hooks';

const { notifySuccess, notifyError, notifyApiError } = useNotify();

notifySuccess('Connexion réussie');
notifyError('Une erreur est survenue');
notifyApiError(error); // extrait automatiquement message + statusCode
```

## Debug — notifications qui n'apparaissent pas

1. **Vérifier que `NotificationProvider` wrappe le composant** — un composant rendu en dehors du provider ne peut pas accéder au contexte
2. **Vérifier que `GlobalNotifications` est rendu** — il doit être enfant du provider
3. **Vérifier la structure de l'erreur** — `notifyApiError` attend un objet avec `message` et optionnellement `statusCode`

```typescript
// Test rapide dans un composant
const { notifySuccess } = useNotify();
<button onClick={() => notifySuccess('Test direct')}>Test</button>
```

## Structure interne

- `NotificationContext.tsx` — contexte + `NotificationProvider`, gère l'auto-suppression (défaut : 5 s)
- `GlobalNotifications.tsx` — rendu des toasts
- `useNotify` (dans `@core/hooks`) — API publique avec helpers typés
