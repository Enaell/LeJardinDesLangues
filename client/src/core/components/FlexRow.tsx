import { Stack, type StackProps } from '@mui/material';

export type FlexRowProps = Omit<StackProps, 'direction'> & {
  /**
   * Espacement entre les éléments enfants
   * @default 1
   */
  spacing?: StackProps['spacing'];
  /**
   * Alignement des éléments le long de l'axe principal (horizontal)
   * @default 'flex-start'
   */
  justifyContent?: StackProps['justifyContent'];
  /**
   * Alignement des éléments le long de l'axe transversal (vertical)
   * @default 'stretch'
   */
  alignItems?: StackProps['alignItems'];
  /**
   * Permet aux éléments de passer à la ligne suivante
   * @default false
   */
  wrap?: boolean;
};

/**
 * Composant FlexRow - Un conteneur flex horizontal basé sur Material-UI Stack
 * 
 * Utilise automatiquement `direction="row"` pour un layout horizontal.
 * Simplifie l'utilisation des propriétés flex les plus courantes.
 * 
 * @example
 * ```tsx
 * <FlexRow spacing={2} justifyContent="space-between" alignItems="center">
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 * </FlexRow>
 * ```
 */
export const FlexRow = ({
  spacing = 1,
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  wrap = false,
  children,
  ...props
}: FlexRowProps) => {
  return (
    <Stack
      direction="row"
      spacing={spacing}
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexWrap={wrap ? 'wrap' : 'nowrap'}
      {...props}
    >
      {children}
    </Stack>
  );
};
