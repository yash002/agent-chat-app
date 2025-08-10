export const theme = {
  colors: {
    background: '#151718',
    surface: '#242627',
    surfaceVariant: '#3a3a3a',
    primary: '#ffffff',
    secondary: '#888888',
    accent: '#4CAF50',
    border: '#404040',
    text: {
      primary: '#ffffff',
      secondary: '#888888',
      tertiary: '#666666',
    },
    activeChip: '#242627',
  },
  typography: {
    h1: {
      fontSize: 24,
      fontWeight: '600' as const,
      color: '#ffffff',
    },
    h2: {
      fontSize: 20,
      fontWeight: '600' as const,
      color: '#ffffff',
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      color: '#ffffff',
    },
    caption: {
      fontSize: 14,
      fontWeight: '400' as const,
      color: '#888888',
    },
    small: {
      fontSize: 12,
      fontWeight: '400' as const,
      color: '#888888',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
};
