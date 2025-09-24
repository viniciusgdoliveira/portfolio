'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/contexts/ThemeContext';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  const t = useTranslations('footer');
  const { style, setStyle } = useTheme();
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleSecretClick = () => {
    const now = Date.now();
    
    // Reset click count if more than 2 seconds have passed
    if (now - lastClickTime > 2000) {
      setClickCount(1);
    } else {
      setClickCount(prev => prev + 1);
    }
    
    setLastClickTime(now);

    // Toggle style after 3 clicks within 2 seconds
    if (clickCount >= 2) {
      const newStyle = style === 'liquid-glass' ? 'dos-style' : 'liquid-glass';
      setStyle(newStyle);
      setClickCount(0);
      
      // Add temporary class for smooth transition
      document.body.classList.add('theme-switching');
      
      // Show console notification
      console.log(`🎮 Secret theme activated: ${newStyle === 'dos-style' ? 'DOS Mode' : 'Liquid Glass Mode'}`);
      
      // Remove transition class after animation
      setTimeout(() => {
        document.body.classList.remove('theme-switching');
      }, 300);
    }
  };

  return (
    <footer className={`relative overflow-hidden ${className}`}>
      {/* Liquid glass background with theme-aware colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-900/10 dark:via-gray-800/5 dark:to-transparent backdrop-blur-xl border-t border-white/20 dark:border-gray-700/30" />
      
      {/* Animated liquid background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 dark:from-blue-500/10 dark:to-purple-700/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-cyan-600/20 dark:from-pink-500/10 dark:to-cyan-700/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-600/10 dark:from-emerald-500/5 dark:to-blue-700/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Main message with glass effect */}
          <div className="mb-8">
            <div 
              className="inline-block p-6 rounded-3xl bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-2xl cursor-pointer hover:bg-white/15 dark:hover:bg-gray-900/15 hover:border-white/30 dark:hover:border-gray-700/40 transition-all duration-300 select-none"
              onClick={handleSecretClick}
              title={style === 'dos-style' ? "Click 3 times to return to Liquid Glass! 🎮" : "Click me 3 times quickly for a surprise! 🎮"}
            >
              <p className="text-lg font-medium text-white leading-relaxed hover:text-blue-200 transition-colors duration-300">
                {t('mainMessage')}
              </p>
            </div>
          </div>

          {/* Divider with glass effect */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 dark:via-gray-600/30 to-transparent" />
            </div>
            <div className="relative flex justify-center">
              <div 
                className="px-6 py-3 rounded-full bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30 cursor-pointer hover:bg-white/15 dark:hover:bg-gray-900/15 hover:border-white/30 dark:hover:border-gray-700/40 transition-all duration-300 select-none"
                onClick={handleSecretClick}
                title={style === 'dos-style' ? "Click 3 times to return to Liquid Glass! 🎮" : "Click me 3 times quickly for a surprise! 🎮"}
              >
                <p className="text-sm font-medium text-white hover:text-blue-200 transition-colors duration-300">
                  {t('developedBy')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glass border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-gray-500/40 to-transparent" />
    </footer>
  );
}
