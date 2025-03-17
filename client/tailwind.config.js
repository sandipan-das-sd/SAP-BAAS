/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  // Enable dark mode with class strategy
  darkMode: 'class',
  
  // Scan these files for Tailwind classes to generate styles
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  
  // Extend the default theme with custom configurations
  theme: {
    // Extend default breakpoints
    screens: {
      'xs': '480px',
      ...defaultTheme.screens,
      '3xl': '1920px',
    },
    
    // Extended color palette
    colors: {
      ...colors,
      // Custom color palette
      brand: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      },
      // Semantic colors for better UX
      success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        500: '#22c55e',
        900: '#14532d'
      },
      danger: {
        50: '#fef2f2',
        100: '#fee2e2',
        500: '#ef4444',
        900: '#7f1d1d'
      },
      warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        500: '#f59e0b',
        900: '#78350f'
      }
    },
    
    // Extended typography and font families
    fontFamily: {
      'sans': ['Inter', ...defaultTheme.fontFamily.sans],
      'serif': ['Merriweather', ...defaultTheme.fontFamily.serif],
      'mono': ['Fira Code', ...defaultTheme.fontFamily.mono]
    },
    
    // Custom extensions
    extend: {
      // Advanced animation keyframes
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        bounce: {
          '0%, 100%': { 
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
          },
          '50%': { 
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
          }
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        }
      },
      
      // Custom animations
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
        shimmer: 'shimmer 2s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
      },
      
      // Enhanced box shadows
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'large': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'inner-light': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'dark-lg': '0 15px 30px -5px rgba(0, 0, 0, 0.3), 0 5px 15px -5px rgba(0, 0, 0, 0.2)'
      },
      
      // Background patterns and gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--gradient-color-stops))',
      },
      
      // Transition timing functions
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1)'
      },
      
      // Spacing and sizing
      spacing: {
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
      },
      
      // Border radius variations
      borderRadius: {
        'xlg': '1rem',
        '4xl': '2rem'
      },
      
      // Opacity variations
      opacity: {
        '15': '0.15',
        '85': '0.85'
      }
    },
  },
  
  // Plugins to add additional utilities
  plugins: [
    // Form styling plugin
    require('@tailwindcss/forms')({
      strategy: 'class'
    }),
    
    // Typography plugin for rich text
    require('@tailwindcss/typography'),
    
    // Aspect ratio utilities
    require('@tailwindcss/aspect-ratio'),
    
    // Container queries
    require('@tailwindcss/container-queries'),
    
    // Custom plugin for generating utility classes
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-balance': {
          'text-wrap': 'balance'
        },
        '.debug': {
          'outline': '1px solid red'
        }
      };
      addUtilities(newUtilities);
    },
    
    // Custom scrollbar utilities (works in WebKit browsers)
    function({ addUtilities }) {
      const scrollbarUtilities = {
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': `${theme('colors.brand.500')} ${theme('colors.gray.200')}`
        },
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-track': {
            background: theme('colors.gray.100')
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme('colors.brand.500'),
            borderRadius: '20px',
            border: '3px solid transparent',
            borderColor: theme('colors.gray.100')
          }
        }
      };
      addUtilities(scrollbarUtilities, ['responsive']);
    }
  ],
  
  // Safelist classes that might be dynamically generated
  safelist: [
    {
      pattern: /^(bg|text|border)-(success|danger|warning)-(50|100|500|900)$/,
      variants: ['hover', 'focus']
    },
    'animate-pulse',
    'animate-bounce',
    'animate-spin'
  ]
};