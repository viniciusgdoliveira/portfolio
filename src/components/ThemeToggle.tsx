'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

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
