import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { authControllerGetProfile } from '@core/api/authentification/authentification';
import { Typography } from '@core/components/ui/typography';

const GoogleAuthCallbackPage = () => {
  useEffect(() => {
    const handle = async () => {
      const params = new URLSearchParams(window.location.search);
      const status = params.get('status');
      const isNewUser = params.get('isNewUser') === 'true';
      const channel = new BroadcastChannel('google_auth');

      try {
        if (status === 'error') {
          channel.postMessage({ type: 'GOOGLE_AUTH_ERROR', error: "Erreur lors de l'authentification Google" });
          return;
        }

        const response = await authControllerGetProfile();
        channel.postMessage({
          type: 'GOOGLE_AUTH_SUCCESS',
          payload: { user: response.data, isNewUser },
        });
      } catch {
        channel.postMessage({ type: 'GOOGLE_AUTH_ERROR', error: 'Impossible de récupérer le profil' });
      } finally {
        channel.close();
        window.close();
      }
    };

    handle();
  }, []);

  return <Typography variant="p">Authentification en cours...</Typography>;
};

export const Route = createFileRoute('/auth/google/callback')({
  component: GoogleAuthCallbackPage,
});