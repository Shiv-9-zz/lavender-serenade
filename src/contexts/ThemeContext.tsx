import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeMode = 'lavender' | 'valentine';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    // Check localStorage for saved theme
    const saved = localStorage.getItem('romantic-theme');
    return (saved as ThemeMode) || 'lavender';
  });

  useEffect(() => {
    localStorage.setItem('romantic-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'lavender' ? 'valentine' : 'lavender');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
