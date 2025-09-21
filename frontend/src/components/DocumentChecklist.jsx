import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { FileText, CheckCircle, AlertCircle, Download } from 'lucide-react';

export const DocumentChecklist = ({ language, translations }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const documents = [
    {
      id: 'aadhaar-card',
      name: {
        en: 'Original Aadhaar Card',
        hi: 'मूल आधार कार्ड',
        ta: 'அசல் ஆதார் அட்டை'
      },
      description: {
        en: 'Physical or e-Aadhaar with valid QR code',
        hi: 'वैध QR कोड के साथ भौतिक या ई-आधार',
        ta: 'செல்லுபடியாகும் QR குறியீட்டுடன் கூடிய உடல் அல்லது மின்-ஆதார்'
      },
      required: true
    },
    {
      id: 'bank-passbook',
      name: {
        en: 'Bank Passbook/Statement',
        hi: 'बैंक पासबुक/स्टेटमेंट',
        ta: 'வங்கி பாஸ் புத்தகம்/அறிக்கை'
      },
      description: {
        en: 'Recent bank statement or updated passbook',
        hi: 'हाल की बैंक स्टेटमेंट या अद्यतन पासबुक',
        ta: 'சமீபத்திய வங்கி அறிக்கை அல்லது புதுப்பிக்கப்பட்ட பாஸ் புத்தகம்'
      },
      required: true
    },
    {
      id: 'mobile-number',
      name: {
        en: 'Registered Mobile Number',
        hi: 'पंजीकृत मोबाइल नंबर',
        ta: 'பதிவு செய்யப்பட்ட மொபைல் எண்'
      },
      description: {
        en: 'Mobile number linked with both Aadhaar and bank account',
        hi: 'आधार और बैंक खाते दोनों से जुड़ा मोबाइल नंबर',
        ta: 'ஆதார் மற்றும் வங்கி கணக்கு இரண்டுடனும் இணைக்கப்பட்ட மொபைல் எண்'
      },
      required: true
    },
    {
      id: 'pan-card',
      name: {
        en: 'PAN Card (if available)',
        hi: 'पैन कार्ड (यदि उपलब्ध हो)',
        ta: 'பான் அட்டை (கிடைத்தால்)'
      },
      description: {
        en: 'Permanent Account Number card for additional verification',
        hi: 'अतिरिक्त सत्यापन के लिए स्थायी खाता संख्या कार्ड',
        ta: 'கூடுतल சரிபார்ப்புக்கான நிரந்தர கணக்கு எண் அட்டை'
      },
      required: false
    },
    {
      id: 'address-proof',
      name: {
        en: 'Address Proof',
        hi: 'पता प्रमाण',
        ta: 'முகவரி சான்று'
      },
      description: {
        en: 'Voter ID, Driving License, or Utility Bill',
        hi: 'वोटर आईडी, ड्राइविंग लाइसेंस, या उपयोगिता बिल',
        ta: 'வாக்காளர் அடையாள அட்டை, ஓட்டுனர் உரிமம், அல்லது பயன்பாட்டு கட்டணம்'
      },
      required: false
    },
    {
      id: 'photos',
      name: {
        en: 'Passport Size Photos (2)',
        hi: 'पासपोर्ट साइज़ फोटो (2)',
        ta: 'பாஸ்போர்ட் அளவு புகைப்படங்கள் (2)'
      },
      description: {
        en: 'Recent passport size photographs',
        hi: 'हाल की पासपोर्ट साइज़ फोटो',
        ta: 'சமீபத்திய பாஸ்போர்ட் அளவு புகைப்படங்கள்'
      },
      required: false
    }
  ];

  const handleCheckChange = (documentId, checked) => {
    setCheckedItems(prev => ({
      ...prev,
      [documentId]: checked
    }));
  };

  const requiredDocs = documents.filter(doc => doc.required);
  const optionalDocs = documents.filter(doc => !doc.required);
  const completedRequired = requiredDocs.filter(doc => checkedItems[doc.id]).length;
  const completedOptional = optionalDocs.filter(doc => checkedItems[doc.id]).length;
  const totalCompleted = Object.values(checkedItems).filter(Boolean).length;

  const generateChecklist = () => {
    const checklistText = `
AADHAAR SEEDING DOCUMENT CHECKLIST
===================================

Required Documents:
${requiredDocs.map(doc => 
  `${checkedItems[doc.id] ? '✅' : '❌'} ${doc.name[language]}
     ${doc.description[language]}`
).join('\n')}

Optional Documents:
${optionalDocs.map(doc => 
  `${checkedItems[doc.id] ? '✅' : '⚪'} ${doc.name[language]}
     ${doc.description[language]}`
).join('\n')}

Progress: ${completedRequired}/${requiredDocs.length} required documents ready
Generated on: ${new Date().toLocaleDateString()}
    `;

    const element = document.createElement('a');
    const file = new Blob([checklistText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'aadhaar-seeding-checklist.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <FileText className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">
            {language === 'hi' ? 'दस्तावेज़ चेकलिस्ट' : 
             language === 'ta' ? 'ஆவண சரிபார்ப்பு பட்டியல்' : 'Document Checklist'}
          </h3>
        </div>
        <Badge variant="outline" className="text-purple-700 border-purple-300">
          {totalCompleted}/{documents.length} 
          {language === 'hi' ? ' पूर्ण' : language === 'ta' ? ' முடிந்தது' : ' Complete'}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span>
            {language === 'hi' ? 'आवश्यक दस्तावेज़' : 
             language === 'ta' ? 'தேவையான ஆவணங்கள்' : 'Required Documents'}
          </span>
          <span>{completedRequired}/{requiredDocs.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedRequired / requiredDocs.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Required Documents */}
      <div className="space-y-4 mb-6">
        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-500" />
          {language === 'hi' ? 'आवश्यक दस्तावेज़' : 
           language === 'ta' ? 'தேவையான ஆவணங்கள்' : 'Required Documents'}
        </h4>
        {requiredDocs.map((doc) => (
          <div key={doc.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <Checkbox
              id={doc.id}
              checked={checkedItems[doc.id] || false}
              onCheckedChange={(checked) => handleCheckChange(doc.id, checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <label htmlFor={doc.id} className="font-medium text-slate-800 cursor-pointer">
                {doc.name[language]}
                <Badge className="ml-2 bg-red-100 text-red-700">
                  {language === 'hi' ? 'आवश्यक' : language === 'ta' ? 'தேவை' : 'Required'}
                </Badge>
              </label>
              <p className="text-sm text-slate-600 mt-1">
                {doc.description[language]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Optional Documents */}
      <div className="space-y-4 mb-6">
        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-blue-500" />
          {language === 'hi' ? 'वैकल्पिक दस्तावेज़' : 
           language === 'ta' ? 'விருப்ப ஆவணங்கள்' : 'Optional Documents'}
        </h4>
        {optionalDocs.map((doc) => (
          <div key={doc.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <Checkbox
              id={doc.id}
              checked={checkedItems[doc.id] || false}
              onCheckedChange={(checked) => handleCheckChange(doc.id, checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <label htmlFor={doc.id} className="font-medium text-slate-800 cursor-pointer">
                {doc.name[language]}
                <Badge variant="outline" className="ml-2 text-blue-600 border-blue-300">
                  {language === 'hi' ? 'वैकल्पिक' : language === 'ta' ? 'விருப்பம்' : 'Optional'}
                </Badge>
              </label>
              <p className="text-sm text-slate-600 mt-1">
                {doc.description[language]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={generateChecklist}
          disabled={completedRequired !== requiredDocs.length}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          {language === 'hi' ? 'चेकलिस्ट डाउनलोड करें' : 
           language === 'ta' ? 'சரிபார்ப்பு பட்டியலை பதிவிறக்கவும்' : 'Download Checklist'}
        </Button>
      </div>

      {completedRequired === requiredDocs.length && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="font-semibold text-green-800">
              {language === 'hi' ? '✅ सभी आवश्यक दस्तावेज़ तैयार हैं!' : 
               language === 'ta' ? '✅ அனைத்து தேவையான ஆவணங்களும் தயார்!' : '✅ All required documents ready!'}
            </p>
          </div>
          <p className="text-green-700 text-sm mt-1">
            {language === 'hi' ? 'अब आप अपनी बैंक शाखा में आधार सीडिंग के लिए जा सकते हैं।' : 
             language === 'ta' ? 'இப்போது நீங்கள் ஆதார் விதைப்புக்காக உங்கள் வங்கி கிளைக்குச் செல்லலாம்.' : 'You can now visit your bank branch for Aadhaar seeding.'}
          </p>
        </div>
      )}
    </Card>
  );
};