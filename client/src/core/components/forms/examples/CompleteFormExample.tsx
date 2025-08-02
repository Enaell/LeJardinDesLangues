import { useFieldValue } from '../hooks/useFormValues';
import {
  Form,
  FormTextField,
  FormPasswordField,
  FormSelect,
  FormCheckbox,
  FormRadioGroup,
  FormDatePicker,
  FormAutocomplete,
  FormSubmitButton,
  useFormValues
} from '../index';

type CompleteFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  language: string;
  level: string;
  interests: Array<{ value: string; label: string; }>;
  newsletter: boolean;
  userType: string;
};

const ConditionalFields = () => {
  const values = useFormValues<CompleteFormData>();
  console.log('ConditionalFields values:', values);
  const value = useFieldValue<string>('userType');
  console.log('ConditionalFields userType value:', value);

  

  return (
    <>
      {values.userType === 'teacher' && (
        <FormTextField
          name="teacherCode"
          label="Code enseignant"
          fullWidth
          validators={{
            onChange: ({ value }: { value: string; }) =>
              value.length < 6 ? 'Le code doit contenir au moins 6 caractères' : undefined,
          }}
        />
      )}
    </>
  );
};

export const CompleteFormExample = () => {
  return (
    <Form<CompleteFormData>
      defaultValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDate: '',
        language: 'fr',
        level: 'beginner',
        interests: [],
        newsletter: false,
        userType: 'student',
      }}
      validators={{
        onChange: ({ value }: { value: CompleteFormData; }) => {
          // Validation globale du formulaire
          if (value.password && value.confirmPassword && value.password !== value.confirmPassword) {
            console.log('Passwords do not match');
            return {
              form: 'Les mots de passe ne correspondent pas',
            };
          }
          console.log('CompleteFormExample value:', value);
          return undefined;
        },
      }}
      onFormSubmit={async ({ value }) => {
        // Intégration avec React Query mutation
        console.log('Complete form submitted:', value);
      }}
      className="flex flex-col gap-4 max-w-md mx-auto p-6"
    >
      <FormTextField
        name="firstName"
        label="Prénom"
        fullWidth
        validators={{
          onChange: ({ value }: { value: string; }) =>
            value.length < 2 ? 'Le prénom doit contenir au moins 2 caractères' : undefined,
        }}
      />

      <FormTextField
        name="lastName"
        label="Nom"
        fullWidth
        validators={{
          onChange: ({ value }: { value: string; }) =>
            value.length < 2 ? 'Le nom doit contenir au moins 2 caractères' : undefined,
        }}
      />

      <FormTextField
        name="email"
        label="Adresse email"
        type="email"
        fullWidth
        validators={{
          onChange: ({ value }: { value: string; }) =>
            !value.includes('@') ? 'Veuillez entrer un email valide' : undefined,
        }}
      />

      <FormPasswordField
        name="password"
        label="Mot de passe"
        fullWidth
        validators={{
          onChange: ({ value }: { value: string; }) =>
            value.length < 8 ? 'Le mot de passe doit contenir au moins 8 caractères' : undefined,
        }}
      />

      <FormPasswordField
        name="confirmPassword"
        label="Confirmer le mot de passe"
        fullWidth
      />

      <FormDatePicker
        name="birthDate"
        label="Date de naissance"
      />

      <FormSelect
        name="language"
        label="Langue d'apprentissage"
        options={[
          { value: 'fr', label: 'Français' },
          { value: 'zh', label: 'Chinois' },
          { value: 'en', label: 'Anglais' },
          { value: 'es', label: 'Espagnol' },
        ]}
        fullWidth
      />

      <FormSelect
        name="level"
        label="Niveau"
        options={[
          { value: 'beginner', label: 'Débutant' },
          { value: 'intermediate', label: 'Intermédiaire' },
          { value: 'advanced', label: 'Avancé' },
          { value: 'native', label: 'Natif' },
        ]}
        fullWidth
      />

      <FormAutocomplete
        name="interests"
        label="Centres d'intérêt"
        options={[
          { value: 'culture', label: 'Culture' },
          { value: 'business', label: 'Business' },
          { value: 'travel', label: 'Voyage' },
          { value: 'technology', label: 'Technologie' },
          { value: 'arts', label: 'Arts' },
          { value: 'sports', label: 'Sports' },
        ]}
        multiple
      />

      <FormRadioGroup
        name="userType"
        label="Type d'utilisateur"
        options={[
          { value: 'student', label: 'Étudiant' },
          { value: 'teacher', label: 'Professeur' },
          { value: 'parent', label: 'Parent' },
        ]}
        row
      />

      <ConditionalFields />

      <FormCheckbox
        name="newsletter"
        label="Je souhaite recevoir la newsletter"
      />

      <FormSubmitButton variant="contained" fullWidth>
        Créer mon compte
      </FormSubmitButton>
    </Form>
  );
};
