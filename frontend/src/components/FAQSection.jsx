import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Card } from './ui/card';

export const FAQSection = ({ language, translations }) => {
  const t = translations[language];

  return (
    <section id="faq" className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              {t.faq.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
          </div>

          {/* FAQ Accordion */}
          <Card className="p-6 lg:p-8 bg-white border border-slate-200 shadow-lg">
            <Accordion type="single" collapsible className="space-y-4">
              {t.faq.items.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-slate-200 rounded-lg px-6 hover:border-blue-300 transition-colors duration-200"
                >
                  <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-blue-600 py-4 text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-4 pt-2 text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          {/* Additional Help */}
          <div className="mt-12 text-center">
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200">
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Still Have Questions?
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Contact the UIDAI helpline for personalized assistance with your Aadhaar seeding queries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-sm">
                  <span className="text-2xl">📞</span>
                  <div className="text-left">
                    <p className="font-bold text-blue-600 text-lg">1947</p>
                    <p className="text-sm text-slate-600">24x7 Helpline</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-sm">
                  <span className="text-2xl">✉️</span>
                  <div className="text-left">
                    <p className="font-bold text-green-600">help@uidai.gov.in</p>
                    <p className="text-sm text-slate-600">Email Support</p>
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