import { colors } from './colors';

export const theme = {
  colors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  borderRadius: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    round: 9999
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold' as const,
      color: colors.text
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      color: colors.text
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      color: colors.text
    },
    body: {
      fontSize: 16,
      color: colors.text
    },
    caption: {
      fontSize: 14,
      color: colors.textSecondary
    }
  }
};
