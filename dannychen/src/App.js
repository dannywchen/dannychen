import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Lenis from '@studio-freight/lenis';
import GlobalStyle from './styles/GlobalStyle';
import HomePage from './views/HomePage';
import CustomCursor from './components/CustomCursor';

const theme = {
  colors: {
    background: '#0a0a0a',
    text: '#f0f0f0',
    accent: '#ff6b6b',
  },
  fonts: {
    main: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    heading: 'Georgia, serif',
  },
};

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CustomCursor />
      <HomePage />
    </ThemeProvider>
  );
};

export default App;