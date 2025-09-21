import React from 'react';
import { ExternalLink, Smartphone, Globe, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { officialLinks } from '../utils/mock';

export const CheckStatusSection = ({ language, translations }) => {
  const t = translations[language];

  const handleUidaiCheck = () => {
    window.open(officialLinks.uidaiSeeding, '_blank', 'noopener,noreferrer');
  };

  const handleNpciCheck = () => {
    window.open(officialLinks.npciPortal, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="check-status" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              {t.checkStatus.title}
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              {t.checkStatus.description}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full mt-6"></div>
          </div>

          {/* Check Options */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* UIDAI Official Method */}
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 hover:shadow-xl transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <Badge className="bg-blue-600 text-white px-3 py-1 font-semibold">
                  RECOMMENDED
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">
                UIDAI Official Portal
              </h3>
              <p className="text-slate-600 text-center mb-6 leading-relaxed">
                Check directly on the official UIDAI website for the most accurate and up-to-date seeding status.
              </p>
              <Button
                onClick={handleUidaiCheck}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                {t.checkStatus.officialBtn}
              </Button>
            </Card>

            {/* NPCI Method */}
            <Card className="p-8 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 hover:shadow-xl transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <Badge className="bg-green-600 text-white px-3 py-1 font-semibold">
                  ALTERNATIVE
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">
                NPCI Portal
              </h3>
              <p className="text-slate-600 text-center mb-6 leading-relaxed">
                Use the National Payments Corporation portal to verify your Aadhaar seeding status.
              </p>
              <Button
                onClick={handleNpciCheck}
                variant="outline"
                className="w-full border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white font-semibold py-3 transition-all duration-300"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                {t.checkStatus.alternateBtn}
              </Button>
            </Card>
          </div>

          {/* SMS Method */}
          <Card className="p-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Smartphone className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                {t.checkStatus.smsMethod}
              </h3>
              <p className="text-slate-600 mb-4 leading-relaxed max-w-2xl mx-auto">
                {t.checkStatus.smsText}
              </p>
              <div className="bg-orange-100 rounded-lg p-4 inline-block">
                <code className="text-orange-800 font-bold text-lg">*99*99*1#</code>
              </div>
              <p className="text-sm text-slate-500 mt-3">
                * Works only from mobile number registered with your bank
              </p>
            </div>
          </Card>

          {/* Status Indicators */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-green-50 border-2 border-green-200">
              <div className="flex items-center gap-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
                <div>
                  <h4 className="font-bold text-green-800 text-lg">Status: Seeded</h4>
                  <p className="text-green-700">Your account can receive DBT payments</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-red-50 border-2 border-red-200">
              <div className="flex items-center gap-4">
                <ExternalLink className="h-10 w-10 text-red-600" />
                <div>
                  <h4 className="font-bold text-red-800 text-lg">Status: Not Found</h4>
                  <p className="text-red-700">Visit your bank branch for seeding</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};