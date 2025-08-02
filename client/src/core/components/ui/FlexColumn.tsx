import { Stack, type StackProps } from '@mui/material';

export type FlexColumnProps = Omit<StackProps, 'direction'> & {
  /**
   * Espacement entre les éléments enfants
   * @default 1
   */
  spacing?: StackProps['spacing'];
  /**
   * Alignement des éléments le long de l'axe principal (vertical)
   * @default 'flex-start'
   */
  justifyContent?: StackProps['justifyContent'];
  /**
   * Alignement des éléments le long de l'axe transversal (horizontal)
   * @default 'stretch'
   */
  alignItems?: StackProps['alignItems'];
  /**
   * Hauteur minimale du conteneur
   */
  minHeight?: StackProps['minHeight'];
};

/**
 * Composant FlexColumn - Un conteneur flex vertical basé sur Material-UI Stack
 * 
 * Utilise automatiquement `direction="column"` pour un layout vertical.
 * Simplifie l'utilisation des propriétés flex les plus courantes.
 * 
 * @example
 * ```tsx
 * <FlexColumn spacing={2} alignItems="center" minHeight="100vh">
 *   <Typography variant="h1">Titre</Typography>
 *   <Typography variant="body1">Contenu</Typography>
 *   <Button>Action</Button>
 * </FlexColumn>
 * ```
 */
export const FlexColumn = ({
  spacing = 1,
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  minHeight,
  children,
  ...props
}: FlexColumnProps) => {
  return (
    <Stack
      direction="column"
      spacing={spacing}
      justifyContent={justifyContent}
      alignItems={alignItems}
      minHeight={minHeight}
      {...props}
    >
      {children}
    </Stack>
  );
};
