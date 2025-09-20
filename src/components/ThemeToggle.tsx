'use client';

import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  isMobile?: boolean;
}

export default function ThemeToggle({ isMobile = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  // Mobile compact version
  if (isMobile) {
    return (
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="p-2 rounded-[20px] liquid-glass-light text-white/80 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <span className="text-lg">
          {theme === 'light' ? '☀️' : '🌙'}
        </span>
      </button>
    );
  }

  // Desktop toggle version (original)
  return (
    <div className="ios-toggle-container">
      {/* Toggle Track */}
      <div className="ios-toggle-track">
        {/* Background Icons */}
        <div className="ios-toggle-icons">
          <span className="ios-toggle-icon-left">☀️</span>
          <span className="ios-toggle-icon-right">🌙</span>
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
