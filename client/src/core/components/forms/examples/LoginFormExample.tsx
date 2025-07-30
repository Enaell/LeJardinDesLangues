import {
  Form,
  FormTextField,
  FormPasswordField,
  FormSelect,
  FormCheckbox,
  FormRadioGroup,
  FormSubmitButton
} from '../index';

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
  userType: string;
  language: string;
};

export const LoginFormExample = () => {
  return (
    <Form<LoginFormData>
      defaultValues={{
        email: '',
        password: '',
        rememberMe: false,
        userType: 'student',
        language: 'fr',
      }}
      onFormSubmit={async ({ value }) => {
        // Logique de soumission avec React Query
        console.log('Form submitted:', value);
      }}
      className="flex flex-col gap-4 max-w-md mx-auto p-6"
    >
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
            value.length < 6 ? 'Le mot de passe doit contenir au moins 6 caractères' : undefined,
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
        fullWidth
      />

      <FormRadioGroup
        name="userType"
        label="Type d'utilisateur"
        options={[
          { value: 'student', label: 'Étudiant' },
          { value: 'teacher', label: 'Professeur' },
        ]}
        row
      />

      <FormCheckbox
        name="rememberMe"
        label="Se souvenir de moi"
      />

      <FormSubmitButton variant="contained" fullWidth>
        Se connecter
      </FormSubmitButton>
    </Form>
  );
};
