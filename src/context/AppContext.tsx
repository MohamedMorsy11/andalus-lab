import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { SiteContent } from '../types';

type Language = 'ar' | 'en';
type Theme = 'light' | 'dark';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  content: SiteContent | null;
  updateContent: (newContent: SiteContent) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('ar');
  const [theme, setThemeState] = useState<Theme>('light');
  const [contentData, setContentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    localStorage.setItem('lang', newLang);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const updateContent = (newContent: any) => {
    setContentData(newContent);
    localStorage.setItem('andalus_content', JSON.stringify(newContent));
  };

  useEffect(() => {
    // Initial setup from localStorage or defaults
    const savedLang = (localStorage.getItem('lang') as Language) || 'ar';
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
    
    setLang(savedLang);
    setTheme(savedTheme);

    // Try to load from localStorage first
    const localContent = localStorage.getItem('andalus_content');
    if (localContent) {
      try {
        setContentData(JSON.parse(localContent));
        setIsLoading(false);
      } catch (e) {
        console.error("Failed to parse local content", e);
      }
    }

    // Always fetch fresh content to merge or fallback
    if (!localContent) {
      fetch('/data/content.json')
        .then((res) => res.json())
        .then((data) => {
          setContentData(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load content", err);
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        theme,
        setTheme,
        content: contentData ? contentData[lang] : null,
        updateContent,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
