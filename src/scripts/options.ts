const options: Record<string, any> = {
  initText: 'App init',
  DEBUG: import.meta.env.DEV,
  sliders: {
    base: {
      type: 'slide',
      gap: '1.25rem',
      arrows: false,
      mediaQuery: 'min',
      pagination: false,
    },
  },
};

export default options;
