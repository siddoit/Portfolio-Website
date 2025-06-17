/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // For JS-controlled theme switching
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "var(--font-outfit)", "sans-serif"], 
        ovo: ["Ovo", "var(--font-ovo)", "serif"],      
      },
      colors: {
        // Light Theme (Customize these to your branding)
        'light-background': '#f8f9fa', // Slightly off-white for less glare
        'light-card': '#FFFFFF',      // For cards and prominent sections
        'light-text': '#212529',      // Dark gray for primary text
        'light-text-secondary': '#6c757d', // Medium gray for secondary text
        'light-primary': '#0d6efd',     // Example: Bootstrap blue for links/accents
        'light-primary-hover': '#0b5ed7', // Darker shade for primary hover
        'light-border': '#dee2e6',     // Light gray for borders
        'light-hover-subtle': '#e9ecef', // Very subtle hover for list items etc.
        'your-light-accent': '#yourColor', // Your brand's light accent color

        // Dark Theme (Customize these to your branding - your darkTheme and darkHover are good starts)
        'darkTheme': '#11001F',                 // Your main dark background
        'darkHover': '#2a004a',                 // For card backgrounds or hover states
        'dark-card': '#1c0b2a',                 // Slightly lighter than darkTheme for cards
        'dark-text': '#f8f9fa',                 // Off-white for primary text on dark
        'dark-text-secondary': '#adb5bd',       // Lighter gray for secondary text
        'dark-primary': '#3b82f6',              // Example: A vibrant blue for dark mode accents
        'dark-primary-hover': '#2563eb',          // Darker shade for dark primary hover
        'dark-border': '#495057',              // Medium-dark gray for borders
        'dark-hover-subtle': '#2c1d3e',         // Subtle dark hover
        'your-dark-accent': '#yourDarkColor',   // Your brand's dark accent color
      },
      boxShadow:{
        'custom-light': '0 6px 16px rgba(0, 0, 0, 0.08)', // Softer, slightly more prominent
        'custom-dark': '0 6px 16px rgba(0, 0, 0, 0.25)', // More visible dark shadow
        'card-hover-light': '0 8px 20px rgba(0, 0, 0, 0.1)',
        'card-hover-dark': '0 8px 20px rgba(0, 0, 0, 0.3)',
      },
      gridTemplateColumns:{
        'auto-fill-cards': 'repeat(auto-fill, minmax(280px, 1fr))',
        'auto-fit-cards': 'repeat(auto-fit, minmax(280px, 1fr))',  
      },
      transitionTimingFunction: {
        'custom-ease': 'cubic-bezier(0.4, 0, 0.2, 1)', 
      },
      // Keyframes for more complex animations (can be expanded)
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideInUp: { '0%': { transform: 'translateY(20px)', opacity: '0'}, '100%': { transform: 'translateY(0)', opacity: '1'} },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0px var(--glow-color, rgba(96,165,250,0.3))' }, /* Default glow, e.g. blue */
          '50%': { boxShadow: '0 0 15px 3px var(--glow-color, rgba(96,165,250,0.5))' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards', // `forwards` keeps the final state
        slideInUp: 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        pulseGlow: 'pulseGlow 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Useful if you ever have rich text content (e.g., blog, detailed project descriptions from MDX)
    require('@tailwindcss/forms'),    // Provides better default styling for form elements, can be customized
  ],
};
export default config;