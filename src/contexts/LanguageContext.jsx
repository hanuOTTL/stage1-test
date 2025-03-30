import React, { createContext, useState, useEffect } from "react";

// Create the Context
export const LanguageContext = createContext();

const languageMap = {
  java: 91,
  javascript: 102,
  python: 71,
};


export const LanguageProvider = ({ children }) => {
  const getInitialLanguage = () => {
    const savedLanguageName = localStorage.getItem("appLanguageName");
    const savedLanguageId = localStorage.getItem("appLanguageId");

    if (savedLanguageName && savedLanguageId) {
      return {
        name: savedLanguageName,
        id: parseInt(savedLanguageId, 10),
      };
    }

    return {
      name: "",
      id: null,
    };
  };
  const [language, setLanguage] = useState(getInitialLanguage().name);
  const [languageId, setLanguageId] = useState(getInitialLanguage().id);

  const setInitialLanguage = (languageName) => {
    const lowerCaseLanguage = languageName.toLowerCase();
    const newLanguageId = languageMap[lowerCaseLanguage];

    setLanguage(lowerCaseLanguage);
    setLanguageId(newLanguageId);

    localStorage.setItem("appLanguageName", lowerCaseLanguage);
    localStorage.setItem("appLanguageId", newLanguageId);
  };


  return (
    <LanguageContext.Provider value={{ language, languageId, setInitialLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
