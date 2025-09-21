import React from 'react';
import { GraduationCap, DollarSign, Heart, Briefcase, Shield, Users } from 'lucide-react';
import { Card } from './ui/card';

export const BenefitsSection = ({ language, translations }) => {
  const t = translations[language];

  const benefitIcons = [
    GraduationCap, DollarSign, Heart, Briefcase, Shield, Users
  ];

  return (
    <section id="benefits" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              {t.benefits.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-green-500 mx-auto rounded-full"></div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.benefits.items.map((benefit, index) => {
              const IconComponent = benefitIcons[index];
              const colors = [
                { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-200' },
                { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-200' },
                { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-200' },
                { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-200' },
                { bg: 'bg-red-50', icon: 'text-red-600', border: 'border-red-200' },
                { bg: 'bg-indigo-50', icon: 'text-indigo-600', border: 'border-indigo-200' }
              ];
              const color = colors[index % colors.length];

              return (
                <Card key={index} className={`p-6 ${color.bg} ${color.border} border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}>
                  <div className={`w-14 h-14 ${color.bg.replace('50', '100')} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-7 w-7 ${color.icon}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Don't Miss Out on Your Benefits!
              </h3>
              <p className="text-lg text-slate-600 mb-6">
                Ensure your bank account is Aadhaar-seeded to receive all government benefits directly.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  No Processing Delays
                </span>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Instant Transfers
                </span>
                <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                  Secure Payments
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};