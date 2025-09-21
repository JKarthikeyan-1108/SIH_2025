import React from 'react';
import { MapPin, FileText, CheckCircle, Award } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export const HowToSection = ({ language, translations }) => {
  const t = translations[language];

  const stepIcons = [MapPin, FileText, CheckCircle, Award];
  const stepColors = [
    { bg: 'bg-blue-50', icon: 'text-blue-600', badge: 'bg-blue-600', border: 'border-blue-200' },
    { bg: 'bg-green-50', icon: 'text-green-600', badge: 'bg-green-600', border: 'border-green-200' },
    { bg: 'bg-orange-50', icon: 'text-orange-600', badge: 'bg-orange-600', border: 'border-orange-200' },
    { bg: 'bg-purple-50', icon: 'text-purple-600', badge: 'bg-purple-600', border: 'border-purple-200' }
  ];

  return (
    <section id="how-to" className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              {t.howTo.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {t.howTo.steps.map((step, index) => {
              const IconComponent = stepIcons[index];
              const color = stepColors[index];

              return (
                <Card key={index} className={`p-6 lg:p-8 bg-white ${color.border} border-2 hover:shadow-lg transition-all duration-300 group`}>
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                    {/* Step Number and Icon */}
                    <div className="flex items-center gap-4">
                      <Badge className={`${color.badge} text-white text-lg font-bold px-4 py-2 rounded-full`}>
                        {index + 1}
                      </Badge>
                      <div className={`w-16 h-16 ${color.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`h-8 w-8 ${color.icon}`} />
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Important Note */}
          <div className="mt-12">
            <Card className="p-8 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">Important Note</h4>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Make sure to specifically ask for "Aadhaar Seeding" and not just "Aadhaar Linking". 
                    Seeding ensures your account is registered in the NPCI mapper for DBT payments.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-green-700 border-green-700">
                      ✓ Say: "Please seed my Aadhaar"
                    </Badge>
                    <Badge variant="outline" className="text-red-700 border-red-700">
                      ✗ Don't just say: "Link Aadhaar"
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};