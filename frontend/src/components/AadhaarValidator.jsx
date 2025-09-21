import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CheckCircle, XCircle, Info } from 'lucide-react';

export const AadhaarValidator = ({ language, translations }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [error, setError] = useState('');

  // Aadhaar validation using Verhoeff algorithm
  const validateAadhaar = (aadhaar) => {
    if (!aadhaar || aadhaar.length !== 12) {
      return { valid: false, error: 'Aadhaar must be exactly 12 digits' };
    }

    if (!/^\d{12}$/.test(aadhaar)) {
      return { valid: false, error: 'Aadhaar must contain only digits' };
    }

    // Verhoeff algorithm check
    const d = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    ];

    const p = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
    ];

    let c = 0;
    const myArray = aadhaar.split('').map(Number).reverse();

    for (let i = 0; i < myArray.length; i++) {
      c = d[c][p[(i + 1) % 8][myArray[i]]];
    }

    return { valid: c === 0, error: c !== 0 ? 'Invalid Aadhaar number format' : '' };
  };

  const handleValidation = () => {
    const result = validateAadhaar(aadhaarNumber);
    setIsValid(result.valid);
    setError(result.error);
  };

  const formatAadhaar = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.substring(0, 12);
    const formatted = limited.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted;
  };

  const handleInputChange = (e) => {
    const formatted = formatAadhaar(e.target.value);
    setAadhaarNumber(formatted);
    setIsValid(null);
    setError('');
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <CheckCircle className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">
          {language === 'hi' ? 'आधार संख्या सत्यापनकर्ता' : 
           language === 'ta' ? 'ஆதார் எண் சரிபார்ப்பு' : 'Aadhaar Number Validator'}
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-slate-700 font-medium">
            {language === 'hi' ? 'अपनी आधार संख्या दर्ज करें' : 
             language === 'ta' ? 'உங்கள் ஆதார் எண்ணை உள்ளிடுங்கள்' : 'Enter your Aadhaar Number'}
          </Label>
          <Input
            type="text"
            value={aadhaarNumber}
            onChange={handleInputChange}
            placeholder="XXXX XXXX XXXX"
            className="mt-2 text-lg font-mono"
            maxLength={14} // 12 digits + 2 spaces
          />
        </div>

        <Button
          onClick={handleValidation}
          disabled={aadhaarNumber.replace(/\s/g, '').length !== 12}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
        >
          {language === 'hi' ? 'सत्यापित करें' : 
           language === 'ta' ? 'சரிபார்க்கவும்' : 'Validate'}
        </Button>

        {isValid !== null && (
          <div className={`p-4 rounded-lg flex items-center gap-3 ${
            isValid ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
          }`}>
            {isValid ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            <div>
              <p className={`font-semibold ${isValid ? 'text-green-800' : 'text-red-800'}`}>
                {isValid 
                  ? (language === 'hi' ? '✅ वैध आधार संख्या' : 
                     language === 'ta' ? '✅ செல்லுபடியாகும் ஆதார் எண்' : '✅ Valid Aadhaar Number')
                  : (language === 'hi' ? '❌ अवैध आधार संख्या' : 
                     language === 'ta' ? '❌ தவறான ஆதார் எண்' : '❌ Invalid Aadhaar Number')
                }
              </p>
              {error && (
                <p className="text-red-700 text-sm mt-1">{error}</p>
              )}
            </div>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <p className="text-amber-800 text-sm font-medium">
                {language === 'hi' ? 'गोपनीयता नोट' : 
                 language === 'ta' ? 'தனியுரிமை குறிப்பு' : 'Privacy Note'}
              </p>
              <p className="text-amber-700 text-sm mt-1">
                {language === 'hi' ? 'यह केवल प्रारूप सत्यापन है। आपका आधार नंबर संग्रहीत नहीं किया जाता।' : 
                 language === 'ta' ? 'இது வடிவமைப்பு சரிபார்ப்பு மட்டுமே. உங்கள் ஆதார் எண் சேமிக்கப்படவில்லை.' : 'This is format validation only. Your Aadhaar number is not stored.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};