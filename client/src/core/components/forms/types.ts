/**
 * Type pour l'API de formulaire TanStack Form
 * 
 * TanStack Form v1.15.0 utilise des types génériques très complexes (10 paramètres).
 * Pour simplifier l'usage dans notre application, nous utilisons 'any' avec de la documentation.
 * 
 * Les propriétés principales disponibles sont :
 * - handleSubmit(): void - Soumet le formulaire
 * - state.canSubmit: boolean - Indique si le formulaire peut être soumis
 * - state.values: TFormData - Les valeurs actuelles du formulaire
 * - Field - Composant pour créer des champs de formulaire
 * - useStore() - Hook pour écouter les changements d'état
 */
export type FormApi<TFormData = unknown> = any;

// Type pour le contexte de formulaire
export type FormContextType<TFormData = unknown> = {
  form: FormApi<TFormData>;
} | null;
