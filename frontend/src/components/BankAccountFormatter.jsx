import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

export const BankAccountFormatter = ({ language, translations }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [isValid, setIsValid] = useState(null);

  const bankList = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank',
    'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank of India',
    'Bank of India', 'Central Bank of India', 'Indian Bank', 'Indian Overseas Bank',
    'UCO Bank', 'IDFC First Bank', 'Yes Bank', 'IndusInd Bank', 'Federal Bank'
  ];

  const accountTypes = [
    { value: 'savings', label: { en: 'Savings Account', hi: 'बचत खाता', ta: 'சேமிப்பு கணக்கு' } },
    { value: 'current', label: { en: 'Current Account', hi: 'चालू खाता', ta: 'நடப்பு கணக்கு' } },
    { value: 'salary', label: { en: 'Salary Account', hi: 'वेतन खाता', ta: 'சம்பள கணக்கு' } }
  ];

  const validateAccountNumber = (accNum, bank) => {
    if (!accNum) {
      return { valid: false, error: 'Account number is required' };
    }

    const cleaned = accNum.replace(/\s/g, '');

    // Basic validation
    if (cleaned.length < 9 || cleaned.length > 20) {
      return { valid: false, error: 'Account number should be 9-20 digits' };
    }

    if (!/^\d+$/.test(cleaned)) {
      return { valid: false, error: 'Account number should contain only digits' };
    }

    // Bank-specific validation (simplified)
    const bankValidation = {
      'State Bank of India': { minLength: 11, maxLength: 17 },
      'HDFC Bank': { minLength: 14, maxLength: 14 },
      'ICICI Bank': { minLength: 12, maxLength: 12 },
      'Axis Bank': { minLength: 12, maxLength: 18 },
      'Punjab National Bank': { minLength: 13, maxLength: 16 }
    };

    if (bank && bankValidation[bank]) {
      const { minLength, maxLength } = bankValidation[bank];
      if (cleaned.length < minLength || cleaned.length > maxLength) {
        return { 
          valid: false, 
          error: `${bank} account numbers are typically ${minLength}-${maxLength} digits` 
        };
      }
    }

    return { valid: true, error: '' };
  };

  const formatAccountNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const handleValidation = () => {
    const result = validateAccountNumber(accountNumber, bankName);
    setIsValid(result.valid);
  };

  const handleAccountChange = (e) => {
    const formatted = formatAccountNumber(e.target.value);
    setAccountNumber(formatted);
    setIsValid(null);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-100 rounded-lg">
          <CreditCard className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">
          {language === 'hi' ? 'बैंक खाता प्रारूपकर्ता' : 
           language === 'ta' ? 'வங்கி கணக்கு வடிவமைப்பு' : 'Bank Account Formatter'}
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-slate-700 font-medium">
            {language === 'hi' ? 'बैंक का नाम चुनें' : 
             language === 'ta' ? 'வங்கியின் பெயரைத் தேர்ந்தெடுக்கவும்' : 'Select Bank Name'}
          </Label>
          <Select value={bankName} onValueChange={setBankName}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder={
                language === 'hi' ? 'बैंक चुनें' : 
                language === 'ta' ? 'வங்கியைத் தேர்ந்தெடுக்கவும்' : 'Choose Bank'
              } />
            </SelectTrigger>
            <SelectContent>
              {bankList.map((bank) => (
                <SelectItem key={bank} value={bank}>
                  {bank}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-slate-700 font-medium">
            {language === 'hi' ? 'खाता प्रकार' : 
             language === 'ta' ? 'கணக்கு வகை' : 'Account Type'}
          </Label>
          <Select value={accountType} onValueChange={setAccountType}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder={
                language === 'hi' ? 'खाता प्रकार चुनें' : 
                language === 'ta' ? 'கணக்கு வகையைத் தேர்ந்தெடுக்கவும்' : 'Select Account Type'
              } />
            </SelectTrigger>
            <SelectContent>
              {accountTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label[language]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-slate-700 font-medium">
            {language === 'hi' ? 'खाता संख्या दर्ज करें' : 
             language === 'ta' ? 'கணக்கு எண்ணை உள்ளிடுங்கள்' : 'Enter Account Number'}
          </Label>
          <Input
            type="text"
            value={accountNumber}
            onChange={handleAccountChange}
            placeholder="1234 5678 9012 3456"
            className="mt-2 text-lg font-mono"
          />
        </div>

        <Button
          onClick={handleValidation}
          disabled={!accountNumber || !bankName}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2"
        >
          {language === 'hi' ? 'प्रारूप जांचें' : 
           language === 'ta' ? 'வடிவமைப்பைச் சரிபார்க்கவும்' : 'Check Format'}
        </Button>

        {isValid !== null && (
          <div className={`p-4 rounded-lg flex items-center gap-3 ${
            isValid ? 'bg-green-100 border border-green-300' : 'bg-orange-100 border border-orange-300'
          }`}>
            {isValid ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-orange-600" />
            )}
            <div>
              <p className={`font-semibold ${isValid ? 'text-green-800' : 'text-orange-800'}`}>
                {isValid 
                  ? (language === 'hi' ? '✅ वैध खाता प्रारूप' : 
                     language === 'ta' ? '✅ செல்லுபடியாகும் கணக்கு வடிவமைப்பு' : '✅ Valid Account Format')
                  : (language === 'hi' ? '⚠️ प्रारूप जांचें' : 
                     language === 'ta' ? '⚠️ வடிவமைப்பைச் சரிபார்க்கவும்' : '⚠️ Check Format')
                }
              </p>
              <p className={`text-sm mt-1 ${isValid ? 'text-green-700' : 'text-orange-700'}`}>
                {isValid 
                  ? (language === 'hi' ? 'खाता संख्या सही प्रारूप में है' : 
                     language === 'ta' ? 'கணக்கு எண் சரியான வடிவத்தில் உள்ளது' : 'Account number is in correct format')
                  : (language === 'hi' ? 'कृपया सभी फ़ील्ड भरें और प्रारूप जांचें' : 
                     language === 'ta' ? 'அனைத்து புலங்களையும் நிரப்பி வடிவமைப்பைச் சரிபார்க்கவும்' : 'Please fill all fields and check format')
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};