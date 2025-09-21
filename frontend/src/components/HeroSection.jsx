import React from 'react';
import { ArrowRight, ExternalLink, Smartphone } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { officialLinks } from '../utils/mock';

export const HeroSection = ({ language, translations }) => {
  const t = translations[language];

  const handleCheckStatus = () => {
    window.open(officialLinks.uidaiSeeding, '_blank', 'noopener,noreferrer');
  };

  const scrollToLearnMore = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-orange-400 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border-2 border-green-400 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6">
              {t.hero.headline}
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 font-medium leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={handleCheckStatus}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              {t.hero.checkStatusBtn}
            </Button>
            
            <Button
              variant="outline"
              onClick={scrollToLearnMore}
              className="border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {t.hero.learnMoreBtn}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Quick Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Free Service</h3>
              <p className="text-slate-600 text-sm">Aadhaar seeding is completely free at all banks</p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm border-orange-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Instant Benefits</h3>
              <p className="text-slate-600 text-sm">Receive scholarships and subsidies directly</p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm border-green-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">24-48 Hours</h3>
              <p className="text-slate-600 text-sm">Seeding typically completes within 1-2 days</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};