"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeLanguageContext = createContext();

export const ThemeLanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("EN");
  const [darkMode, setDarkMode] = useState(false);

  // 🔥 Load from localStorage once
  useEffect(() => {
    const savedLang = localStorage.getItem("site-lang");
    const savedTheme = localStorage.getItem("site-theme");

    if (savedLang) setLanguage(savedLang);
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  // 🔥 Update HTML class when language or theme changes
  useEffect(() => {
    const html = document.documentElement;

    // Language class
    html.classList.remove("lang-en", "lang-bn");
    html.classList.add(language === "BN" ? "lang-bn" : "lang-en");

    // Dark mode class
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("site-theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("site-theme", "light");
    }

    localStorage.setItem("site-lang", language);
  }, [language, darkMode]);

  return (
    <ThemeLanguageContext.Provider
      value={{ language, setLanguage, darkMode, setDarkMode }}
    >
      {children}
    </ThemeLanguageContext.Provider>
  );
};

export const useThemeLanguage = () => useContext(ThemeLanguageContext);
