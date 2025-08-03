import { useQuery } from '@tanstack/react-query';

/**
 * Clés de cache pour les images
 */
export const imageKeys = {
  all: ['images'] as const,
  image: (url: string) => ['images', url] as const,
};

/**
 * Options pour la mise en cache des images
 */
export type ImageCacheOptions = {
  /**
   * Durée de mise en cache en millisecondes
   * @default 3600000 (1 heure)
   */
  staleTime?: number;
  /**
   * Durée de conservation en cache en millisecondes
   * @default 7200000 (2 heures)
   */
  gcTime?: number;
  /**
   * Activer/désactiver la query
   * @default true
   */
  enabled?: boolean;
};

/**
 * Fonction pour charger une image et créer un Object URL
 */
const loadImage = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url, {
      mode: 'cors',
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const blob = await response.blob();

    // Créer un Object URL à partir du blob
    const objectUrl = URL.createObjectURL(blob);

    return objectUrl;
  } catch (error) {
    console.warn('Erreur lors du chargement de l\'image:', url, error);
    throw error;
  }
};

/**
 * Hook pour charger et mettre en cache une image avec TanStack Query
 * 
 * Utilise URL.createObjectURL pour créer une URL optimisée à partir du blob.
 * La mise en cache est gérée automatiquement par TanStack Query.
 * 
 * @param url - URL de l'image à charger
 * @param options - Options de configuration
 * @returns Query result avec l'Object URL de l'image
 * 
 * @example
 * ```tsx
 * const { data: cachedImageUrl, isLoading, error } = useImageCache(
 *   'https://example.com/image.jpg',
 *   { staleTime: 30 * 60 * 1000 } // 30 minutes
 * );
 * ```
 */
export const useImageCache = (
  url: string | undefined,
  options: ImageCacheOptions = {}
) => {
  const {
    staleTime = 60 * 60 * 1000, // 1 heure par défaut
    gcTime = 2 * 60 * 60 * 1000, // 2 heures par défaut
    enabled = true,
  } = options;

  return useQuery({
    queryKey: url ? imageKeys.image(url) : [],
    queryFn: () => loadImage(url!),
    enabled: enabled && !!url,
    staleTime,
    gcTime,
    // Ne pas refetch automatiquement - les images ne changent généralement pas
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    // Retry en cas d'erreur réseau
    retry: (failureCount, error) => {
      // Ne pas retry pour les erreurs 404 ou 403
      if (error && typeof error === 'object' && 'message' in error) {
        const message = error.message as string;
        if (message.includes('404') || message.includes('403')) {
          return false;
        }
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
};

/**
 * Hook pour nettoyer les Object URLs non utilisées
 * Utilise un cleanup automatique quand le composant se démonte
 */
export const useImageCleanup = (objectUrl: string | undefined) => {
  return () => {
    if (objectUrl && objectUrl.startsWith('blob:')) {
      URL.revokeObjectURL(objectUrl);
    }
  };
};
