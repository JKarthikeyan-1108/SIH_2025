import React from 'react';
import { Link, Unlink, AlertCircle, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export const AboutSection = ({ language, translations }) => {
  const t = translations[language];

  return (
    <section id="about" className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              {t.about.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
          </div>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Aadhaar Seeded */}
            <Card className="p-8 bg-white border-2 border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 px-3 py-1 text-sm font-semibold">
                  SEEDED ✓
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">
                {t.about.seeding.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-center">
                {t.about.seeding.description}
              </p>
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 font-medium text-sm text-center">
                  ✅ DBT Payments Enabled
                </p>
              </div>
            </Card>

            {/* Aadhaar Linked Only */}
            <Card className="p-8 bg-white border-2 border-orange-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-8 w-8 text-orange-600" />
                </div>
                <Badge className="bg-orange-100 text-orange-700 px-3 py-1 text-sm font-semibold">
                  LINKED ONLY
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">
                {t.about.linking.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-center">
                {t.about.linking.description}
              </p>
              <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                <p className="text-orange-800 font-medium text-sm text-center">
                  ⚠️ DBT May Not Work
                </p>
              </div>
            </Card>
          </div>

          {/* Key Difference */}
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Link className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                {t.about.difference}
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
                {t.about.differenceText}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};