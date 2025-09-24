'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type Style = 'liquid-glass' | 'dos-style';

interface ThemeContextType {
  theme: Theme;
  style: Style;
  setTheme: (theme: Theme) => void;
  setStyle: (style: Style) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [style, setStyle] = useState<Style>('liquid-glass');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Get theme from localStorage or default to system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      // Default to system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
    }

    // Get style from localStorage or default to liquid-glass
    const savedStyle = localStorage.getItem('style') as Style;
    if (savedStyle && ['liquid-glass', 'dos-style'].includes(savedStyle)) {
      setStyle(savedStyle);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const applyTheme = (newTheme: Theme) => {
      setResolvedTheme(newTheme);

      // Apply theme to document
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Save to localStorage
      localStorage.setItem('theme', newTheme);
    };

    const applyStyle = (newStyle: Style) => {
      // Apply style to document
      if (newStyle === 'dos-style') {
        document.documentElement.classList.add('dos-style');
      } else {
        document.documentElement.classList.remove('dos-style');
      }

      // Save to localStorage
      localStorage.setItem('style', newStyle);
    };

    applyTheme(theme);
    applyStyle(style);
  }, [theme, style, mounted]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const handleSetStyle = (newStyle: Style) => {
    setStyle(newStyle);
  };

  if (!mounted) {
    // Return a placeholder to avoid hydration mismatch
    return (
      <ThemeContext.Provider value={{ 
        theme: 'light', 
        style: 'liquid-glass',
        setTheme: handleSetTheme, 
        setStyle: handleSetStyle,
        resolvedTheme: 'light' 
      }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      style,
      setTheme: handleSetTheme, 
      setStyle: handleSetStyle,
      resolvedTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
