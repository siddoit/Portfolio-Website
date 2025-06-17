// postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'tailwindcss': {}, // You can use quotes around 'tailwindcss' or not
    'autoprefixer': {}, // Same for 'autoprefixer'
  },
};

export default config;