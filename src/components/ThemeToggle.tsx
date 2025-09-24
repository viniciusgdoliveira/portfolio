'use client';

import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  isMobile?: boolean;
}

export default function ThemeToggle({ isMobile = false }: ThemeToggleProps) {
  const { theme, style, setTheme } = useTheme();

  // Mobile compact version
  if (isMobile) {
    return (
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className={`p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          style === 'dos-style' 
            ? 'bg-[var(--dos-bg)] border border-dashed border-[var(--dos-border)] text-[var(--dos-fg)] hover:bg-[var(--dos-fg)] hover:text-[var(--dos-bg)] focus:ring-[var(--dos-accent)]'
            : 'rounded-[20px] liquid-glass-light text-white/80 hover:text-white focus:ring-white'
        }`}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <span className="text-lg">
          {style === 'dos-style' 
            ? (theme === 'light' ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            )) 
            : (theme === 'light' ? '☀️' : '🌙')
          }
        </span>
      </button>
    );
  }

  // Desktop toggle version
  if (style === 'dos-style') {
    return (
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="relative w-20 h-10 bg-[var(--dos-bg)] border border-dashed border-[var(--dos-border)] flex items-center justify-between px-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--dos-accent)] focus:ring-offset-2"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {/* Background Icons */}
        <span className="text-sm opacity-60">
          <svg className="w-4 h-4 fill-current text-[var(--dos-fg)]" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </span>
        <span className="text-sm opacity-60">
          <svg className="w-4 h-4 fill-current text-[var(--dos-fg)]" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        </span>
        
        {/* DOS Style Sliding Knob */}
        <div className={`absolute top-1 w-8 h-8 bg-[var(--dos-fg)] border border-dashed border-[var(--dos-border)] transition-all duration-300 ${
          theme === 'dark' ? 'left-11' : 'left-1'
        }`}>
          <div className="flex items-center justify-center h-full">
            {theme === 'light' ? (
              <svg className="w-4 h-4 fill-current text-[var(--dos-bg)]" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4 fill-current text-[var(--dos-bg)]" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            )}
          </div>
        </div>
      </button>
    );
  }

  // Liquid Glass Style Toggle (original)
  return (
    <div className="ios-toggle-container">
      {/* Toggle Track */}
      <div className="ios-toggle-track">
        {/* Background Icons */}
        <div className="ios-toggle-icons">
          <span className="ios-toggle-icon-left">
            ☀️
          </span>
          <span className="ios-toggle-icon-right">
            🌙
          </span>
        </div>
        
        {/* Sliding Knob */}
        <div className={`ios-toggle-knob ${theme === 'dark' ? 'dark' : ''}`}>
          <span className="ios-toggle-knob-icon">
            {theme === 'light' ? '☀️' : '🌙'}
          </span>
        </div>
      </div>
      
      {/* Invisible clickable area */}
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="ios-toggle-button"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      />
    </div>
  );
}
