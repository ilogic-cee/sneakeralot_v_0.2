// Breakpoint values in pixels
export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

// Media Query Helpers
export const mediaQueries = {
  up: (breakpoint) => `@media (min-width: ${breakpoints[breakpoint]}px)`,
  down: (breakpoint) => `@media (max-width: ${breakpoints[breakpoint] - 0.02}px)`,
  between: (start, end) =>
    `@media (min-width: ${breakpoints[start]}px) and (max-width: ${
      breakpoints[end] - 0.02
    }px)`,
  only: (breakpoint) => {
    const keys = Object.keys(breakpoints);
    const index = keys.indexOf(breakpoint);
    const nextBreakpoint = keys[index + 1];

    return nextBreakpoint
      ? mediaQueries.between(breakpoint, nextBreakpoint)
      : mediaQueries.up(breakpoint);
  },
};

// Container widths
export const containers = {
  sm: 540,
  md: 720,
  lg: 960,
  xl: 1140,
  xxl: 1320,
};

// Grid system configuration
export const grid = {
  columns: 12,
  gutter: 24, // in pixels
  container: {
    padding: 16, // in pixels
  },
};

// Common device breakpoints
export const devices = {
  mobile: mediaQueries.down('sm'),
  tablet: mediaQueries.between('sm', 'lg'),
  desktop: mediaQueries.up('lg'),
  landscape: '@media (orientation: landscape)',
  portrait: '@media (orientation: portrait)',
};

// CSS Custom Properties
export const cssBreakpoints = `
  :root {
    --breakpoint-xs: ${breakpoints.xs}px;
    --breakpoint-sm: ${breakpoints.sm}px;
    --breakpoint-md: ${breakpoints.md}px;
    --breakpoint-lg: ${breakpoints.lg}px;
    --breakpoint-xl: ${breakpoints.xl}px;
    --breakpoint-xxl: ${breakpoints.xxl}px;

    --container-padding: ${grid.container.padding}px;
    --grid-gutter: ${grid.gutter}px;
    --grid-columns: ${grid.columns};
  }
`;

// Helper function to generate responsive styles
export const responsive = (styles) => {
  return Object.keys(styles).reduce((acc, breakpoint) => {
    if (breakpoint === 'base') {
      return { ...acc, ...styles[breakpoint] };
    }
    return {
      ...acc,
      [mediaQueries.up(breakpoint)]: styles[breakpoint],
    };
  }, {});
}; 