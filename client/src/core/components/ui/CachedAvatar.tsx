import { Avatar, CircularProgress, type AvatarProps } from '@mui/material';
import { useEffect } from 'react';
import { useImageCache, useImageCleanup } from '../../hooks';

export type CachedAvatarProps = Omit<AvatarProps, 'src'> & {
  /**
   * URL de l'image source (peut être une URL Google ou autre)
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
  /**
   * Durée de mise en cache en millisecondes
   * @default 3600000 (1 heure)
   */
  cacheTime?: number;
};

/**
 * Composant Avatar avec mise en cache automatique des images
 * 
 * Utilise TanStack Query pour mettre en cache les images et URL.createObjectURL
 * pour optimiser la gestion mémoire. Résout les problèmes de rate limiting 
 * (erreur 429) en mettant en cache les images efficacement.
 * 
 * @example
 * ```tsx
 * <CachedAvatar 
 *   src="https://lh3.googleusercontent.com/..." 
 *   alt="John Doe"
 *   fallbackText="JD"
 *   sx={{ width: 32, height: 32 }}
 * />
 * ```
 */
export const CachedAvatar = ({
  src,
  alt,
  fallbackText,
  cacheTime = 60 * 60 * 1000, // 1 heure par défaut
  ...props
}: CachedAvatarProps) => {
  // Utiliser TanStack Query pour charger et mettre en cache l'image
  const {
    data: cachedObjectUrl,
    isLoading,
    error,
  } = useImageCache(src, {
    staleTime: cacheTime,
    gcTime: cacheTime * 2, // Garder en cache 2x plus longtemps
    enabled: !!src,
  });

  // Cleanup automatique de l'Object URL
  const cleanup = useImageCleanup(cachedObjectUrl);

  useEffect(() => {
    // Nettoyer l'Object URL quand le composant se démonte
    return cleanup;
  }, [cleanup]);

  // Afficher un loader pendant le chargement
  if (isLoading && src) {
    return (
      <Avatar {...props} alt={alt}>
        <CircularProgress size={24} />
      </Avatar>
    );
  }

  // Si on a une image en cache et pas d'erreur, l'utiliser
  if (cachedObjectUrl && !error) {
    return (
      <Avatar
        {...props}
        src={cachedObjectUrl}
        alt={alt}
      />
    );
  }

  // Fallback avec initiales ou icône par défaut
  return (
    <Avatar {...props} alt={alt}>
      {fallbackText || (alt ? alt.charAt(0).toUpperCase() : '?')}
    </Avatar>
  );
};
