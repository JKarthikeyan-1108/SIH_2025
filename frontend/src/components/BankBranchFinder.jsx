import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MapPin, Phone, Clock, Navigation, ExternalLink } from 'lucide-react';

export const BankBranchFinder = ({ language, translations }) => {
  const [searchParams, setSearchParams] = useState({
    bank: '',
    location: '',
    pincode: ''
  });
  const [branches, setBranches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock bank branch data (in real app, this would come from an API)
  const mockBranches = {
    'State Bank of India': [
      {
        name: 'SBI Main Branch',
        address: 'MG Road, Bangalore - 560001',
        phone: '+91-80-2558-1234',
        timings: 'Mon-Fri: 10:00 AM - 4:00 PM, Sat: 10:00 AM - 2:00 PM',
        services: ['Aadhaar Seeding', 'Account Opening', 'Loan Services'],
        distance: '2.3 km'
      },
      {
        name: 'SBI Koramangala Branch',
        address: '100 Feet Road, Koramangala, Bangalore - 560034',
        phone: '+91-80-4135-2000',
        timings: 'Mon-Fri: 10:00 AM - 4:00 PM, Sat: 10:00 AM - 2:00 PM',
        services: ['Aadhaar Seeding', 'Digital Banking', 'SME Services'],
        distance: '5.7 km'
      }
    ],
    'HDFC Bank': [
      {
        name: 'HDFC Bank Commercial Street',
        address: 'Commercial Street, Bangalore - 560001',
        phone: '+91-80-2559-8765',
        timings: 'Mon-Fri: 9:30 AM - 6:00 PM, Sat: 9:30 AM - 4:00 PM',
        services: ['Aadhaar Seeding', 'Net Banking', 'Credit Cards'],
        distance: '1.8 km'
      },
      {
        name: 'HDFC Bank Indiranagar',
        address: '100 Feet Road, Indiranagar, Bangalore - 560008',
        phone: '+91-80-2521-4567',
        timings: 'Mon-Fri: 9:30 AM - 6:00 PM, Sat: 9:30 AM - 4:00 PM',
        services: ['Aadhaar Seeding', 'Personal Banking', 'Investment Services'],
        distance: '4.2 km'
      }
    ],
    'ICICI Bank': [
      {
        name: 'ICICI Bank Brigade Road',
        address: 'Brigade Road, Bangalore - 560001',
        phone: '+91-80-2559-1234',
        timings: 'Mon-Fri: 10:00 AM - 5:00 PM, Sat: 10:00 AM - 2:00 PM',
        services: ['Aadhaar Seeding', 'Mobile Banking', 'Insurance'],
        distance: '2.1 km'
      }
    ]
  };

  const bankList = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank',
    'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank of India'
  ];

  const searchBranches = () => {
    if (!searchParams.bank) {
      return;
    }

    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const bankBranches = mockBranches[searchParams.bank] || [];
      setBranches(bankBranches);
      setIsSearching(false);
    }, 1000);
  };

  const openInMaps = (address) => {
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <MapPin className="h-6 w-6 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">
          {language === 'hi' ? 'निकटतम बैंक शाखा खोजक' : 
           language === 'ta' ? 'அருகிலுள்ள வங்கி கிளை கண்டுபிடிப்பு' : 'Nearest Bank Branch Finder'}
        </h3>
      </div>

      {/* Search Form */}
      <div className="space-y-4 mb-6">
        <div>
          <Label className="text-slate-700 font-medium">
            {language === 'hi' ? 'बैंक चुनें' : 
             language === 'ta' ? 'வங்கியைத் தேர்ந்தெடுக்கவும்' : 'Select Bank'}
          </Label>
          <Select 
            value={searchParams.bank} 
            onValueChange={(value) => setSearchParams(prev => ({ ...prev, bank: value }))}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder={
                language === 'hi' ? 'बैंक चुनें' : 
                language === 'ta' ? 'வங்கியைத் தேர்ந்தெடுக்கவும்' : 'Choose your bank'
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

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-slate-700 font-medium">
              {language === 'hi' ? 'स्थान/शहर' : 
               language === 'ta' ? 'இடம்/நகரம்' : 'Location/City'}
            </Label>
            <Input
              type="text"
              value={searchParams.location}
              onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
              placeholder={language === 'hi' ? 'उदा. बैंगलोर' : 
                          language === 'ta' ? 'எ.கா. பெங்களூர்' : 'e.g. Bangalore'}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-slate-700 font-medium">
              {language === 'hi' ? 'पिन कोड (वैकल्पिक)' : 
               language === 'ta' ? 'பின் குறியீடு (விருப்பம்)' : 'PIN Code (Optional)'}
            </Label>
            <Input
              type="text"
              value={searchParams.pincode}
              onChange={(e) => setSearchParams(prev => ({ ...prev, pincode: e.target.value }))}
              placeholder="560001"
              className="mt-2"
              maxLength={6}
            />
          </div>
        </div>

        <Button
          onClick={searchBranches}
          disabled={!searchParams.bank || isSearching}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2"
        >
          {isSearching ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              {language === 'hi' ? 'खोज रहे हैं...' : 
               language === 'ta' ? 'தேடுகிறது...' : 'Searching...'}
            </>
          ) : (
            <>
              <MapPin className="h-4 w-4 mr-2" />
              {language === 'hi' ? 'शाखाएं खोजें' : 
               language === 'ta' ? 'கிளைகளைக் கண்டறியவும்' : 'Find Branches'}
            </>
          )}
        </Button>
      </div>

      {/* Search Results */}
      {branches.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-800 flex items-center gap-2">
            <Navigation className="h-4 w-4" />
            {language === 'hi' ? `${branches.length} शाखाएं मिलीं` : 
             language === 'ta' ? `${branches.length} கிளைகள் கிடைத்தன` : `${branches.length} branches found`}
          </h4>

          {branches.map((branch, index) => (
            <div key={index} className="bg-white rounded-lg border border-emerald-200 p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-semibold text-slate-800 text-lg">{branch.name}</h5>
                  <p className="text-emerald-600 font-medium">{branch.distance} away</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openInMaps(branch.address)}
                  className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  {language === 'hi' ? 'मैप्स' : language === 'ta' ? 'வரைபடம்' : 'Maps'}
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-slate-500 mt-0.5" />
                  <p className="text-slate-700">{branch.address}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <a href={`tel:${branch.phone}`} className="text-blue-600 hover:underline">
                    {branch.phone}
                  </a>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-slate-500 mt-0.5" />
                  <p className="text-slate-700">{branch.timings}</p>
                </div>

                <div className="pt-2">
                  <p className="text-sm font-medium text-slate-800 mb-2">
                    {language === 'hi' ? 'उपलब्ध सेवाएं:' : 
                     language === 'ta' ? 'கிடைக்கும் சேவைகள்:' : 'Available Services:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {branch.services.map((service, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          service === 'Aadhaar Seeding' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>
                {language === 'hi' ? 'सुझाव:' : 
                 language === 'ta' ? 'பரிந்துரை:' : 'Tip:'}
              </strong>{' '}
              {language === 'hi' ? 'जाने से पहले शाखा से संपर्क करके उनके कार्य घंटे और आधार सीडिंग सेवा की उपलब्धता की पुष्टि करें।' : 
               language === 'ta' ? 'செல்வதற்கு முன் கிளையைத் தொடர்பு கொண்டு அவர்களின் வணிக மணிநேரம் மற்றும் ஆதார் விதைப்பு சேவை கிடைக்கும் தன்மையை உறுதிப்படுத்துங்கள்.' : 'Contact the branch before visiting to confirm their working hours and Aadhaar seeding service availability.'}
            </p>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {branches.length === 0 && searchParams.bank && !isSearching && (
        <div className="text-center py-8 text-slate-500">
          <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>
            {language === 'hi' ? 'इस क्षेत्र में कोई शाखा नहीं मिली' : 
             language === 'ta' ? 'இந்தப் பகுதியில் கிளைகள் எதுவும் கிடைக்கவில்லை' : 'No branches found in this area'}
          </p>
          <p className="text-sm">
            {language === 'hi' ? 'कृपया अलग स्थान या पिन कोड आज़माएं' : 
             language === 'ta' ? 'வேறு இடம் அல்லது பின் குறியீட்டை முயற்சி செய்யுங்கள்' : 'Try a different location or PIN code'}
          </p>
        </div>
      )}
    </Card>
  );
};