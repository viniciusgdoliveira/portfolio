'use client';

import { useLocale, useTranslations } from 'next-intl';
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

const languages = [
  {
    code: 'en',
    name: 'English',
    flag: '/flags/us.svg',
    nativeName: 'English'
  },
  {
    code: 'pt-BR',
    name: 'Portuguese',
    flag: '/flags/br.svg',
    nativeName: 'Português'
  },
  {
    code: 'es',
    name: 'Spanish',
    flag: '/flags/es.svg',
    nativeName: 'Español'
  },
  {
    code: 'fr',
    name: 'French',
    flag: '/flags/fr.svg',
    nativeName: 'Français'
  }
];

interface LanguageSwitcherProps {
  isMobile?: boolean;
}

export default function LanguageSwitcher({ isMobile = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const t = useTranslations('language');
  const { currentLanguage, setLanguage, isChangingLanguage } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use the context language or fall back to the URL locale
  const activeLanguage = currentLanguage || locale;
  
  // Find the current language index for positioning the knob
  const currentLanguageIndex = languages.findIndex(lang => lang.code === activeLanguage);
  const activeIndex = currentLanguageIndex >= 0 ? currentLanguageIndex : 0;
  
  // Get the active language data
  const activeLanguageData = languages[activeIndex];

  const handleLanguageChange = (newLocale: string) => {
    // Don't do anything if the locale is already selected
    if (newLocale === activeLanguage) {
      setIsDropdownOpen(false);
      return;
    }

    // Use the context method to handle language change
    setLanguage(newLocale);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  // Mobile dropdown version
  if (isMobile) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="p-2 rounded-[20px] liquid-glass-light text-white/80 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          aria-label={`Current language: ${activeLanguageData.nativeName}`}
          disabled={isChangingLanguage}
        >
          <Image
            src={activeLanguageData.flag}
            alt={`${activeLanguageData.nativeName} flag`}
            width={20}
            height={20}
            className="flag-icon"
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 py-2 w-32 liquid-glass-light rounded-[20px] shadow-lg z-50">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full px-4 py-2 text-left text-sm transition-all duration-300 hover:liquid-glass-light flex items-center ${
                  language.code === activeLanguage
                    ? 'text-white'
                    : 'text-white/80 hover:text-white'
                }`}
                disabled={isChangingLanguage}
              >
                <Image
                  src={language.flag}
                  alt={`${language.nativeName} flag`}
                  width={16}
                  height={16}
                  className="mr-2 flag-icon"
                />
                {language.nativeName}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop toggle version with circular highlights
  return (
    <div className="language-selector-container">
      <div className="language-selector-track">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`language-selector-button ${
              language.code === activeLanguage ? 'active' : ''
            }`}
            aria-label={`${t('switch')} - ${language.nativeName}`}
            disabled={isChangingLanguage}
            title={language.nativeName}
          >
            <Image
              src={language.flag}
              alt={`${language.nativeName} flag`}
              width={16}
              height={16}
              className="flag-icon"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
