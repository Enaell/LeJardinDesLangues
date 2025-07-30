import {
  Form,
  FormTextField,
  useFormValues,
  useFieldValue
} from '../index';

// Composant pour afficher les valeurs en temps réel
const FormDebugger = () => {
  const values = useFormValues<{ name: string; email: string; }>();
  const nameValue = useFieldValue<string>('name');

  return (
    <div className="p-4 bg-gray-100 rounded-lg mt-4">
      <h3 className="font-bold mb-2">État du formulaire (temps réel) :</h3>
      <div className="space-y-1">
        <p><strong>Toutes les valeurs :</strong> {JSON.stringify(values, null, 2)}</p>
        <p><strong>Nom uniquement :</strong> {nameValue || '(vide)'}</p>
      </div>
    </div>
  );
};

// Exemple principal pour tester la réactivité
export const ReactiveFormExample = () => {
  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Test de réactivité</h2>

      <Form<{ name: string; email: string; }>
        defaultValues={{
          name: '',
          email: '',
        }}
        onFormSubmit={async ({ value }) => {
          alert(`Formulaire soumis avec: ${JSON.stringify(value, null, 2)}`);
        }}
        className="space-y-4"
      >
        <FormTextField
          name="name"
          label="Nom"
          fullWidth
          placeholder="Tapez quelque chose et voyez la mise à jour en temps réel ci-dessous"
        />

        <FormTextField
          name="email"
          label="Email"
          type="email"
          fullWidth
        />

        {/* Ce composant devrait se mettre à jour automatiquement */}
        <FormDebugger />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Soumettre
        </button>
      </Form>
    </div>
  );
};
