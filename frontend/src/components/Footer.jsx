import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, AlertTriangle } from 'lucide-react';
import { Card } from './ui/card';
import { supportNumbers } from '../utils/mock';

export const Footer = ({ language, translations }) => {
  const t = translations[language];

  return (
    <footer id="contact" className="py-16 lg:py-20 bg-slate-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Contact Section */}
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
              {t.contact.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto rounded-full mb-12"></div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* UIDAI Helpline */}
              <Card className="p-6 bg-slate-700 border-slate-600 text-white">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-blue-400">{t.contact.helpdesk}</h3>
                  <p className="text-2xl font-bold text-white mb-2">{supportNumbers.uidai.tollFree}</p>
                  <p className="text-slate-300 text-sm">{supportNumbers.uidai.description}</p>
                </div>
              </Card>

              {/* Email Support */}
              <Card className="p-6 bg-slate-700 border-slate-600 text-white">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-green-400">Email Support</h3>
                  <p className="text-lg font-semibold text-white mb-2">{supportNumbers.uidai.email}</p>
                  <p className="text-slate-300 text-sm">Official UIDAI Email</p>
                </div>
              </Card>

              {/* Regional Offices */}
              <Card className="p-6 bg-slate-700 border-slate-600 text-white md:col-span-2 lg:col-span-1">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-4 text-orange-400">Regional Offices</h3>
                  <div className="space-y-2 text-sm">
                    {supportNumbers.regional.slice(0, 3).map((office, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-slate-300">{office.city}:</span>
                        <span className="font-semibold text-white">{office.number}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mb-12">
            <Card className="p-6 bg-red-50 border-red-200 text-red-800 border-2">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Emergency Help</h4>
                  <p className="leading-relaxed">
                    {t.contact.emergencyText}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Disclaimer */}
          <div className="mb-8">
            <Card className="p-6 bg-slate-700 border-slate-600">
              <h4 className="font-bold text-lg mb-3 text-orange-400 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                {t.contact.disclaimer}
              </h4>
              <p className="text-slate-300 leading-relaxed">
                {t.contact.disclaimerText}
              </p>
            </Card>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-slate-600 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400">
                {t.footer.rights}
              </p>
              <p className="text-slate-400">
                {t.footer.lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};