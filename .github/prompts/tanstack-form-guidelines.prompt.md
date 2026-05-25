# 📝 Guide TanStack Form - Le Jardin des Langues

## 🎯 Philosophie

Ce guide définit les bonnes pratiques pour l'utilisation de TanStack Form dans le projet Le Jardin des Langues. L'approche est **vanilla** : utiliser directement `useForm` et `form.Field` sans couche d'abstraction supplémentaire.

---

## 🧱 Approche vanilla

### Principes
- **Pas de wrapper** : Utiliser `form.Field` directement dans les composants formulaire
- **`useForm` + render prop** : Accès direct à l'état du champ via `field`
- **Type-safety** : Typer les `defaultValues` pour inférer automatiquement les types de champs
- **shadcn/ui** : Associer les composants `Input`, `Select`, `Checkbox` (via `@/components/ui/`) avec les champs TanStack Form

### Pattern de base
```typescript
import { useForm } from '@tanstack/react-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type LoginFormData = {
  emailOrUsername: string;
  password: string;
};

export const LoginForm = ({ onSubmit }: { onSubmit: (data: LoginFormData) => void }) => {
  const form = useForm({
    defaultValues: {
      emailOrUsername: '',
      password: '',
    } satisfies LoginFormData,
    onSubmit: ({ value }) => onSubmit(value),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4"
    >
      <form.Field
        name="emailOrUsername"
        validators={{
          onChange: ({ value }) =>
            !value ? 'Ce champ est requis' : undefined,
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={field.name}>Email ou nom d'utilisateur</Label>
            <Input
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            {field.state.meta.errors.length > 0 && (
              <span className="text-sm text-destructive">
                {field.state.meta.errors.join(', ')}
              </span>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={field.name}>Mot de passe</Label>
            <Input
              id={field.name}
              type="password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          </div>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.canSubmit}>
        {(canSubmit) => (
          <Button type="submit" disabled={!canSubmit}>
            Se connecter
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};
```

---

## ✅ Validation

### Validation par champ
```typescript
<form.Field
  name="email"
  validators={{
    onChange: ({ value }) => {
      if (!value) return 'Email requis';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email invalide';
      return undefined;
    },
    onBlur: ({ value }) =>
      !value ? 'Email requis' : undefined,
  }}
>
  {(field) => (/* ... */)}
</form.Field>
```

### Validation asynchrone
```typescript
<form.Field
  name="username"
  validators={{
    onChangeAsync: async ({ value }) => {
      // ex: vérifier la disponibilité du nom d'utilisateur
      const taken = await checkUsername(value);
      return taken ? 'Nom d\'utilisateur déjà pris' : undefined;
    },
    onChangeAsyncDebounceMs: 300,
  }}
>
  {(field) => (/* ... */)}
</form.Field>
```

---

## 🔄 Intégration avec React Query

```typescript
import { useLogin } from '@features/auth/hooks/useAuth';

export const LoginForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const loginMutation = useLogin();

  const form = useForm({
    defaultValues: { emailOrUsername: '', password: '' },
    onSubmit: async ({ value }) => {
      await loginMutation.mutateAsync(value);
      onSuccess?.();
    },
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
      {/* fields */}
      <form.Subscribe selector={(s) => ({ canSubmit: s.canSubmit, isSubmitting: s.isSubmitting })}>
        {({ canSubmit, isSubmitting }) => (
          <Button type="submit" disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? 'Connexion…' : 'Se connecter'}
          </Button>
        )}
      </form.Subscribe>
      {loginMutation.isError && (
        <p className="text-sm text-destructive">{loginMutation.error?.message}</p>
      )}
    </form>
  );
};
```

---

## 📋 Composants shadcn/ui disponibles

| Composant | Import | Usage dans form.Field |
|-----------|--------|----------------------|
| `Input` | `@/components/ui/input` | Texte, email, password, number |
| `Select` | `@/components/ui/select` | Listes déroulantes |
| `Checkbox` | `@/components/ui/checkbox` | Cases à cocher |
| `Label` | `@/components/ui/label` | Labels accessibles |
| `Button` | `@/components/ui/button` | Submit, action |

---

## ⚠️ À éviter

```typescript
// ❌ Ne pas faire — ancienne approche avec wrapper
import { Form, FormTextField, FormSubmitButton } from '@core/components/forms';
<Form defaultValues={...} onFormSubmit={...}>
  <FormTextField name="email" />
</Form>

// ✅ Faire — approche vanilla directe
import { useForm } from '@tanstack/react-form';
const form = useForm({ defaultValues: { email: '' }, onSubmit: ... });
<form.Field name="email">{(field) => <Input {...} />}</form.Field>
```
