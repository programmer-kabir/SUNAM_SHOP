"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("EN");

  // 🔥 Load once from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("site-lang");
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  // 🔥 Update html class + save when language changes
  useEffect(() => {
    const html = document.documentElement;

    html.classList.remove("lang-en", "lang-bn");

    if (language === "BN") {
      html.classList.add("lang-bn");
    } else {
      html.classList.add("lang-en");
    }

    localStorage.setItem("site-lang", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
