'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  const t = useTranslations('footer');

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
            <div className="inline-block p-6 rounded-3xl bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-2xl">
              <p className="text-lg font-medium text-white leading-relaxed">
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
              <div className="px-6 py-3 rounded-full bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30">
                <p className="text-sm font-medium text-white">
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
