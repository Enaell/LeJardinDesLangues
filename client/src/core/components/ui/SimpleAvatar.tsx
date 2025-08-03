import { Avatar, type AvatarProps } from '@mui/material';
import { useState } from 'react';

export type SimpleAvatarProps = Omit<AvatarProps, 'src'> & {
  /**
   * URL de l'image source
   */
  src?: string;
  /**
   * Nom alternatif pour l'image
   */
  alt?: string;
  /**
   * Texte de fallback si l'image ne peut pas être chargée
   */
  fallbackText?: string;
};

/**
 * Composant Avatar simple avec gestion d'erreur et fallback
 * 
 * Version simplifiée sans cache pour éviter les problèmes de sécurité.
 * Utilise un crossOrigin="anonymous" pour éviter les erreurs CORS.
 * 
 * @example
 * ```tsx
 * <SimpleAvatar 
 *   src="https://lh3.googleusercontent.com/..." 
 *   alt="John Doe"
 *   fallbackText="JD"
 *   sx={{ width: 32, height: 32 }}
 * />
 * ```
 */
export const SimpleAvatar = ({
  src,
  alt,
  fallbackText,
  ...props
}: SimpleAvatarProps) => {
  const [hasError, setHasError] = useState(false);

  // Si l'image a échoué ou n'existe pas, afficher le fallback
  if (!src || hasError) {
    return (
      <Avatar {...props} alt={alt}>
        {fallbackText || (alt ? alt.charAt(0).toUpperCase() : '?')}
      </Avatar>
    );
  }

  return (
    <Avatar
      {...props}
      src={src}
      alt={alt}
      onError={() => {
        setHasError(true);
      }}
      // Ajout de crossOrigin pour éviter les erreurs CORS
      slotProps={{
        img: {
          crossOrigin: 'anonymous',
          referrerPolicy: 'no-referrer'
        }
      }}
    />
  );
};
