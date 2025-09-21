import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { BenefitsSection } from "./components/BenefitsSection";
import { HowToSection } from "./components/HowToSection";
import { CheckStatusSection } from "./components/CheckStatusSection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { translations } from "./utils/mock";

const AadhaarAwarenessPage = () => {
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-white">
      <Header 
        language={language}
        onLanguageChange={setLanguage}
        translations={translations}
      />
      <HeroSection language={language} translations={translations} />
      <AboutSection language={language} translations={translations} />
      <BenefitsSection language={language} translations={translations} />
      <HowToSection language={language} translations={translations} />
      <CheckStatusSection language={language} translations={translations} />
      <FAQSection language={language} translations={translations} />
      <Footer language={language} translations={translations} />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AadhaarAwarenessPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
