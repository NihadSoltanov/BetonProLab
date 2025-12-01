import { normalizeFontSize } from './normalizeFontSize';

export const FONT_SIZES = {
  xsmall: normalizeFontSize(12),
  small: normalizeFontSize(16),
  medium: normalizeFontSize(18),
  large: normalizeFontSize(20),
  xlarge: normalizeFontSize(24),
  xxlarge: normalizeFontSize(36),
};

export type FONT_FAMILES_KEY_TYPE =
  | 'poppinsBlack';

export type FONT_FAMILES_VALUE_TYPE =
  | 'Poppins-Black';

export const FONT_FAMILIES: Record<
FONT_FAMILES_KEY_TYPE,
FONT_FAMILES_VALUE_TYPE
> = {
  poppinsBlack: 'Poppins-Black',
};
