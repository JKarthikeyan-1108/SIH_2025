import React, { useState } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { LanguageSelector } from './LanguageSelector';

export const Header = ({ language, onLanguageChange, translations }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language];

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'benefits', href: '#benefits' },
    { key: 'howTo', href: '#how-to' },
    { key: 'faq', href: '#faq' },
    { key: 'contact', href: '#contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-tight">
                {t.title}
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav items-center gap-6" style={{ display: 'none' }}>
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors duration-200 hover:scale-105"
              >
                {t.nav[item.key]}
              </a>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Desktop Language Selector */}
            <div className="desktop-lang-selector" style={{ display: 'none' }}>
              <LanguageSelector 
                currentLanguage={language} 
                onLanguageChange={onLanguageChange}
              />
            </div>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="mobile-menu-btn p-2"
              style={{ display: 'block' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-orange-100 bg-white">
            <div className="flex flex-col gap-3 mt-4">
              {/* Mobile Language Selector */}
              <div className="px-3 py-2 sm:hidden">
                <LanguageSelector 
                  currentLanguage={language} 
                  onLanguageChange={onLanguageChange}
                />
              </div>
              
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-slate-600 hover:text-blue-600 font-medium py-2 px-3 rounded-md hover:bg-orange-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.nav[item.key]}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};