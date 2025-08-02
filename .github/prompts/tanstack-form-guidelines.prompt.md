# 📝 Guide TanStack Form - Le Jardin des Langues

## 🎯 Philosophie

Ce guide définit les bonnes pratiques pour l'utilisation de TanStack Form dans le projet Le Jardin des Langues. L'approche privilégiée est celle des **composants wrapper** pour encapsuler la logique TanStack Form et maintenir un code propre et réutilisable.

---

## 🧱 Architecture des formulaires

### Principes fondamentaux
- **Éviter les render props** : Ne pas utiliser `form.Field` directement dans les formulaires
- **Composants déclaratifs** : Privilégier une approche composant plutôt que fonctionnelle
- **Logique centralisée** : Encapsuler la complexité dans des wrappers réutilisables
- **Type-safety** : Typage complet des formulaires avec TypeScript

### Structure recommandée
```
src/core/components/forms/
├── FormTextField.tsx      # Champs texte classiques
├── FormPasswordField.tsx  # Mots de passe avec visibilité
├── FormSelect.tsx         # Listes déroulantes
├── FormCheckbox.tsx       # Cases à cocher
├── FormRadioGroup.tsx     # Boutons radio
├── FormDatePicker.tsx     # Sélecteurs de date
├── FormAutocomplete.tsx   # Champs avec autocomplétion
├── FormProvider.tsx       # Contexte pour les formulaires
├── Form.tsx               # Composant Form avec initialisation automatique
├── hooks/
│   └── useFormContext.ts  # Hook pour accéder au contexte
└── index.ts              # Exports centralisés
```

---

## 🎯 Contexte de formulaire

### Provider de contexte
```typescript
// core/components/forms/FormProvider.tsx
import { createContext, useContext, ReactNode } from 'react';
import { FormApi } from '@tanstack/react-form';

type FormContextType = {
  form: FormApi<any, any>;
} | null;

const FormContext = createContext<FormContextType>(null);

type FormProviderProps = {
  form: FormApi<any, any>;
  children: ReactNode;
};

export const FormProvider = ({ form, children }: FormProviderProps) => {
  return (
    <FormContext.Provider value={{ form }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
```

### Hook personnalisé
```typescript
// core/components/forms/hooks/useFormContext.ts
import { useContext } from 'react';
import { FormContext } from '../FormProvider';

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
```

### Composant Form avec initialisation automatique
```typescript
// core/components/forms/Form.tsx
import { ReactNode } from 'react';
import { useForm, FormOptions } from '@tanstack/react-form';
import { FormProvider } from './FormProvider';

type FormProps<TFormData = any> = {
  children: ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
} & FormOptions<TFormData>;

export const Form = <TFormData = any>({ 
  children, 
  className,
  onSubmit,
  ...formOptions 
}: FormProps<TFormData>) => {
  const form = useForm<TFormData>(formOptions);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    } else {
      form.handleSubmit();
    }
  };

  return (
    <FormProvider form={form}>
      <form onSubmit={handleSubmit} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};
```

---

## 🔧 Implémentation des wrappers

### Template de base avec contexte
```typescript
// core/components/forms/FormTextField.tsx
import { FieldApi } from '@tanstack/react-form';
import { TextField, TextFieldProps } from '@mui/material';
import { useFormContext } from './hooks/useFormContext';

type FormTextFieldProps = {
  name: string;
  validators?: any;
} & Omit<TextFieldProps, 'value' | 'onChange' | 'error' | 'helperText'>;

export const FormTextField = ({ name, validators, ...textFieldProps }: FormTextFieldProps) => {
  const { form } = useFormContext();
  
  return (
    <form.Field name={name} validators={validators}>
      {(field: FieldApi<any, any, any, any>) => (
        <TextField
          {...textFieldProps}
          value={field.state.value || ''}
          onChange={(e) => field.handleChange(e.target.value)}
          error={!!field.state.meta.errors.length}
          helperText={field.state.meta.errors.join(', ')}
          onBlur={field.handleBlur}
        />
      )}
    </form.Field>
  );
};
```

### Template de base sans contexte (fallback)
```typescript
// core/components/forms/FormTextField.tsx - Version complète avec support contexte + props
import { FieldApi } from '@tanstack/react-form';
import { TextField, TextFieldProps } from '@mui/material';
import { useFormContext } from './hooks/useFormContext';

type FormTextFieldProps = {
  name: string;
  form?: any; // Optionnel si utilisé avec contexte
  validators?: any;
} & Omit<TextFieldProps, 'value' | 'onChange' | 'error' | 'helperText'>;

export const FormTextField = ({ name, form: formProp, validators, ...textFieldProps }: FormTextFieldProps) => {
  // Utilise le contexte si disponible, sinon la prop form
  const contextForm = useFormContext()?.form;
  const form = formProp || contextForm;
  
  if (!form) {
    throw new Error('FormTextField must be used within a FormProvider or receive a form prop');
  }
  
  return (
    <form.Field name={name} validators={validators}>
      {(field: FieldApi<any, any, any, any>) => (
        <TextField
          {...textFieldProps}
          value={field.state.value || ''}
          onChange={(e) => field.handleChange(e.target.value)}
          error={!!field.state.meta.errors.length}
          helperText={field.state.meta.errors.join(', ')}
          onBlur={field.handleBlur}
        />
      )}
    </form.Field>
  );
};
```

### Wrapper pour champ mot de passe avec contexte
```typescript
// core/components/forms/FormPasswordField.tsx
import { useState } from 'react';
import { FieldApi } from '@tanstack/react-form';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormContext } from './hooks/useFormContext';

type FormPasswordFieldProps = {
  name: string;
  form?: any; // Optionnel si utilisé avec contexte
  validators?: any;
  label?: string;
  placeholder?: string;
};

export const FormPasswordField = ({ name, form: formProp, validators, ...props }: FormPasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const contextForm = useFormContext()?.form;
  const form = formProp || contextForm;

  if (!form) {
    throw new Error('FormPasswordField must be used within a FormProvider or receive a form prop');
  }

  return (
    <form.Field name={name} validators={validators}>
      {(field: FieldApi<any, any, any, any>) => (
        <TextField
          {...props}
          type={showPassword ? 'text' : 'password'}
          value={field.state.value || ''}
          onChange={(e) => field.handleChange(e.target.value)}
          error={!!field.state.meta.errors.length}
          helperText={field.state.meta.errors.join(', ')}
          onBlur={field.handleBlur}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    </form.Field>
  );
};
```

### Wrapper pour Select avec contexte
```typescript
// core/components/forms/FormSelect.tsx
import { FieldApi } from '@tanstack/react-form';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, SelectProps } from '@mui/material';
import { useFormContext } from './hooks/useFormContext';

type FormSelectProps = {
  name: string;
  label: string;
  options: Array<{ value: string | number; label: string }>;
  form?: any; // Optionnel si utilisé avec contexte
  validators?: any;
} & Omit<SelectProps, 'value' | 'onChange' | 'error'>;

export const FormSelect = ({ name, label, options, form: formProp, validators, ...selectProps }: FormSelectProps) => {
  const contextForm = useFormContext()?.form;
  const form = formProp || contextForm;

  if (!form) {
    throw new Error('FormSelect must be used within a FormProvider or receive a form prop');
  }

  return (
    <form.Field name={name} validators={validators}>
      {(field: FieldApi<any, any, any, any>) => (
        <FormControl fullWidth error={!!field.state.meta.errors.length}>
          <InputLabel>{label}</InputLabel>
          <Select
            {...selectProps}
            value={field.state.value || ''}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            label={label}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {field.state.meta.errors.length > 0 && (
            <FormHelperText>{field.state.meta.errors.join(', ')}</FormHelperText>
          )}
        </FormControl>
      )}
    </form.Field>
  );
};
```

---

## 💡 Utilisation dans les formulaires

### Approche avec le composant Form (recommandée)
```typescript
// features/auth/components/LoginForm.tsx
import { Button } from '@mui/material';
import { Form, FormTextField, FormPasswordField } from '@/core/components/forms';

type LoginFormData = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  return (
    <Form<LoginFormData>
      defaultValues={{
        email: '',
        password: '',
      }}
      onSubmit={async ({ value }) => {
        // Logique de soumission avec React Query
        console.log('Form submitted:', value);
      }}
      className="flex flex-col gap-4"
    >
      <FormTextField
        name="email"
        label="Adresse email"
        type="email"
        fullWidth
        validators={{
          onChange: ({ value }) => 
            !value.includes('@') ? 'Veuillez entrer un email valide' : undefined,
        }}
      />
      
      <FormPasswordField
        name="password"
        label="Mot de passe"
        fullWidth
        validators={{
          onChange: ({ value }) => 
            value.length < 6 ? 'Le mot de passe doit contenir au moins 6 caractères' : undefined,
        }}
      />
      
      <FormSubmitButton variant="contained" fullWidth>
        Se connecter
      </FormSubmitButton>
    </Form>
  );
};
```

### Approche avec FormProvider (si plus de contrôle nécessaire)
```typescript
// features/auth/components/LoginFormAdvanced.tsx
import { useForm } from '@tanstack/react-form';
import { Button, Box } from '@mui/material';
import { FormProvider, FormTextField, FormPasswordField } from '@/core/components/forms';

type LoginFormData = {
  email: string;
  password: string;
};

export const LoginFormAdvanced = () => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as LoginFormData,
    onSubmit: async ({ value }) => {
      // Logique de soumission avec React Query
      console.log('Form submitted:', value);
    },
  });

  return (
    <FormProvider form={form}>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <FormTextField
          name="email"
          label="Adresse email"
          type="email"
          fullWidth
          validators={{
            onChange: ({ value }) => 
              !value.includes('@') ? 'Veuillez entrer un email valide' : undefined,
          }}
        />
        
        <FormPasswordField
          name="password"
          label="Mot de passe"
          fullWidth
          validators={{
            onChange: ({ value }) => 
              value.length < 6 ? 'Le mot de passe doit contenir au moins 6 caractères' : undefined,
          }}
        />
        
        <Button 
          type="submit" 
          variant="contained" 
          disabled={!form.state.canSubmit}
          fullWidth
        >
          Se connecter
        </Button>
      </Box>
    </FormProvider>
  );
};
```

### Approche sans contexte (si nécessaire)
```typescript
// features/auth/components/LoginFormLegacy.tsx
import { useForm } from '@tanstack/react-form';
import { Button, Box } from '@mui/material';
import { FormTextField, FormPasswordField } from '@/core/components/forms';

export const LoginFormLegacy = () => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      console.log('Form submitted:', value);
    },
  });

  return (
    <Box component="form" onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
      <FormTextField
        form={form} // Passage explicite du form
        name="email"
        label="Adresse email"
        type="email"
      />
      
      <FormPasswordField
        form={form} // Passage explicite du form
        name="password"
        label="Mot de passe"
      />
      
      <Button type="submit" disabled={!form.state.canSubmit}>
        Se connecter
      </Button>
    </Box>
  );
};
```

### Formulaire avec validation avancée et le composant Form
```typescript
// features/profile/components/ProfileForm.tsx
import { Form, FormTextField, FormSelect } from '@/core/components/forms';

type ProfileFormData = {
  firstName: string;
  lastName: string;
  language: string;
  level: string;
};

export const ProfileForm = () => {
  return (
    <Form<ProfileFormData>
      defaultValues={{
        firstName: '',
        lastName: '',
        language: 'fr',
        level: 'beginner',
      }}
      validators={{
        onChange: ({ value }) => {
          // Validation globale du formulaire
          if (value.firstName && value.lastName && value.firstName === value.lastName) {
            return {
              form: 'Le prénom et le nom ne peuvent pas être identiques',
            };
          }
          return undefined;
        },
      }}
      onSubmit={async ({ value }) => {
        // Intégration avec React Query mutation
        console.log('Profile updated:', value);
      }}
      className="flex flex-col gap-4"
    >
      <FormTextField
        name="firstName"
        label="Prénom"
        validators={{
          onChange: ({ value }) => 
            value.length < 2 ? 'Le prénom doit contenir au moins 2 caractères' : undefined,
        }}
      />
      
      <FormTextField
        name="lastName"
        label="Nom"
        validators={{
          onChange: ({ value }) => 
            value.length < 2 ? 'Le nom doit contenir au moins 2 caractères' : undefined,
        }}
      />
      
      <FormSelect
        name="language"
        label="Langue d'apprentissage"
        options={[
          { value: 'fr', label: 'Français' },
          { value: 'zh', label: 'Chinois' },
          { value: 'en', label: 'Anglais' },
        ]}
      />
      
      <FormSelect
        name="level"
        label="Niveau"
        options={[
          { value: 'beginner', label: 'Débutant' },
          { value: 'intermediate', label: 'Intermédiaire' },
          { value: 'advanced', label: 'Avancé' },
        ]}
      />
      
      <FormSubmitButton variant="contained">
        Sauvegarder
      </FormSubmitButton>
    </Form>
  );
};
```

---

## 🚀 Bonnes pratiques

### Types et validation
- **Typer les données** : Créer un type dédié pour chaque formulaire
- **Validation granulaire** : Utiliser `onChange`, `onBlur`, `onSubmit` selon les besoins
- **Messages d'erreur clairs** : Fournir des messages explicites et traduits
- **Validation asynchrone** : Pour les vérifications serveur (email unique, etc.)

### Contexte de formulaire
- **Utiliser FormProvider** : Encapsuler les formulaires dans le contexte pour éviter le prop drilling
- **Fallback optionnel** : Supporter les props `form` pour la rétrocompatibilité
- **Gestion d'erreurs** : Vérifier la présence du contexte ou de la prop form
- **Portée du contexte** : Limiter le contexte au niveau du formulaire, pas de l'application entière

### Performance
- **Optimisation des re-rendus** : TanStack Form optimise automatiquement
- **Validation différée** : Utiliser `onBlur` pour la validation non-critique
- **Soumission conditionnelle** : Désactiver le bouton submit avec `!form.state.canSubmit`
- **Contexte léger** : Le contexte ne contient que la référence au formulaire

### Intégration
- **React Query** : Utiliser les mutations pour la soumission
- **i18n** : Internationaliser les labels et messages d'erreur
- **Tailwind CSS** : Utiliser les classes Tailwind pour le styling des formulaires
- **Material-UI** : Respecter les patterns Material-UI pour l'UX

### Accessibilité
- **Labels appropriés** : Toujours fournir des labels explicites
- **Messages d'erreur** : Associer les erreurs aux champs concernés
- **Navigation clavier** : Respecter l'ordre de tabulation
- **ARIA** : Utiliser les attributs ARIA quand nécessaire

---

## 🔍 Exemples avancés

### Formulaire avec champs conditionnels et le composant Form
```typescript
export const ConditionalForm = () => {
  return (
    <Form
      defaultValues={{
        userType: '',
        studentId: '',
        teacherId: '',
      }}
      onSubmit={async ({ value }) => {
        console.log('Form submitted:', value);
      }}
    >
      <ConditionalFields />
    </Form>
  );
};

// Composant séparé pour les champs conditionnels
const ConditionalFields = () => {
  const values = useFormValues<{ userType: string; studentId: string; teacherId: string }>();

  return (
    <>
      <FormSelect
        name="userType"
        label="Type d'utilisateur"
        options={[
          { value: 'student', label: 'Étudiant' },
          { value: 'teacher', label: 'Professeur' },
        ]}
      />
      
      {values.userType === 'student' && (
        <FormTextField
          name="studentId"
          label="Numéro étudiant"
        />
      )}
      
      {values.userType === 'teacher' && (
        <FormTextField
          name="teacherId"
          label="Identifiant enseignant"
        />
      )}
      
      <FormSubmitButton variant="contained">
        Valider
      </FormSubmitButton>
    </>
  );
};
```

### Hook personnalisé pour accéder aux valeurs du formulaire
```typescript
// core/components/forms/hooks/useFormValues.ts
import { useFormContext } from './useFormContext';

export const useFormValues = <T = any>(): T => {
  const { form } = useFormContext();
  return form.useStore((state) => state.values) as T;
};

// Utilisation dans un composant
export const FormSummary = () => {
  const values = useFormValues<LoginFormData>();
  
  return (
    <div>
      <p>Email: {values.email}</p>
      <p>Password: {'*'.repeat(values.password?.length || 0)}</p>
    </div>
  );
};
```

### Composant de soumission réutilisable
```typescript
// core/components/forms/FormSubmitButton.tsx
import { Button, ButtonProps } from '@mui/material';
import { useFormContext } from './hooks/useFormContext';

type FormSubmitButtonProps = {
  children: React.ReactNode;
} & Omit<ButtonProps, 'type' | 'disabled'>;

export const FormSubmitButton = ({ children, ...buttonProps }: FormSubmitButtonProps) => {
  const { form } = useFormContext();
  
  return (
    <Button
      {...buttonProps}
      type="submit"
      disabled={!form.state.canSubmit}
    >
      {children}
    </Button>
  );
};

// Utilisation avec le composant Form
export const MyForm = () => {
  return (
    <Form
      defaultValues={{ email: '' }}
      onSubmit={async ({ value }) => {
        console.log('Form submitted:', value);
      }}
    >
      <FormTextField name="email" label="Email" />
      <FormSubmitButton variant="contained">
        Se connecter
      </FormSubmitButton>
    </Form>
  );
};
```

### Validation asynchrone
```typescript
const form = useForm({
  defaultValues: { email: '' },
  validators: {
    onChangeAsync: async ({ value }) => {
      // Vérification côté serveur
      const isEmailTaken = await checkEmailAvailability(value.email);
      return isEmailTaken ? { fields: { email: 'Cette adresse email est déjà utilisée' } } : undefined;
    },
  },
});
```

---

## 📚 Ressources

- [Documentation TanStack Form](https://tanstack.com/form/latest)
- [Material-UI Components](https://mui.com/material-ui/getting-started/)
- [React Query Integration](https://tanstack.com/query/latest)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
