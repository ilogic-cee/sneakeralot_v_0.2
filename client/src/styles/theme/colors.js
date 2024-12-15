export const colors = {
  // Brand Colors
  primary: {
    light: '#4dabf7',
    main: '#3498db',
    dark: '#2980b9',
    contrastText: '#ffffff',
  },
  secondary: {
    light: '#82e9de',
    main: '#2ecc71',
    dark: '#27ae60',
    contrastText: '#ffffff',
  },
  
  // Neutral Colors
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  
  // Semantic Colors
  success: {
    light: '#86efac',
    main: '#22c55e',
    dark: '#16a34a',
  },
  warning: {
    light: '#fde047',
    main: '#eab308',
    dark: '#ca8a04',
  },
  error: {
    light: '#fca5a5',
    main: '#ef4444',
    dark: '#dc2626',
  },
  info: {
    light: '#93c5fd',
    main: '#3b82f6',
    dark: '#2563eb',
  },
  
  // Background Colors
  background: {
    default: '#ffffff',
    paper: '#f8fafc',
    dark: '#1e293b',
  },
  
  // Text Colors
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    disabled: '#94a3b8',
    hint: '#94a3b8',
  },
  
  // Action Colors
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(0, 0, 0, 0.08)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
  },
  
  // Border Colors
  border: {
    light: '#e2e8f0',
    main: '#cbd5e1',
    dark: '#94a3b8',
  },
  
  // Gradient Colors
  gradients: {
    primary: 'linear-gradient(45deg, #3498db 30%, #4dabf7 90%)',
    secondary: 'linear-gradient(45deg, #2ecc71 30%, #82e9de 90%)',
  },
};

// CSS Custom Properties
export const cssColors = `
  :root {
    --color-primary-light: ${colors.primary.light};
    --color-primary: ${colors.primary.main};
    --color-primary-dark: ${colors.primary.dark};
    
    --color-secondary-light: ${colors.secondary.light};
    --color-secondary: ${colors.secondary.main};
    --color-secondary-dark: ${colors.secondary.dark};
    
    --color-text-primary: ${colors.text.primary};
    --color-text-secondary: ${colors.text.secondary};
    --color-text-disabled: ${colors.text.disabled};
    
    --color-background-default: ${colors.background.default};
    --color-background-paper: ${colors.background.paper};
    --color-background-dark: ${colors.background.dark};
    
    --color-border-light: ${colors.border.light};
    --color-border: ${colors.border.main};
    --color-border-dark: ${colors.border.dark};
  }
`; 