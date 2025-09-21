import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Bell, Calendar, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export const NotificationReminder = ({ language, translations }) => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({
    type: '',
    date: '',
    time: '',
    message: ''
  });

  const reminderTypes = [
    {
      value: 'status-check',
      label: {
        en: 'Check Seeding Status',
        hi: 'सीडिंग स्थिति जांचें',
        ta: 'விதைப்பு நிலையைச் சரிபார்க்கவும்'
      },
      defaultMessage: {
        en: 'Reminder: Check your Aadhaar seeding status today',
        hi: 'अनुस्मारक: आज अपनी आधार सीडिंग स्थिति जांचें',
        ta: 'நினைவூட்டல்: இன்று உங்கள் ஆதார் விதைப்பு நிலையைச் சரிபார்க்கவும்'
      }
    },
    {
      value: 'bank-visit',
      label: {
        en: 'Bank Branch Visit',
        hi: 'बैंक शाखा की यात्रा',
        ta: 'வங்கி கிளை வருகை'
      },
      defaultMessage: {
        en: 'Reminder: Visit bank branch for Aadhaar seeding',
        hi: 'अनुस्मारक: आधार सीडिंग के लिए बैंक शाखा जाएं',
        ta: 'நினைவூட்டல்: ஆதார் விதைப்புக்காக வங்கி கிளைக்குச் செல்லுங்கள்'
      }
    },
    {
      value: 'document-prepare',
      label: {
        en: 'Prepare Documents',
        hi: 'दस्तावेज़ तैयार करें',
        ta: 'ஆவணங்களை தயார் செய்யுங்கள்'
      },
      defaultMessage: {
        en: 'Reminder: Prepare all required documents for seeding',
        hi: 'अनुस्मारक: सीडिंग के लिए सभी आवश्यक दस्तावेज़ तैयार करें',
        ta: 'நினைவூட்டல்: விதைப்புக்கு தேவையான அனைத்து ஆவணங்களையும் தயார் செய்யுங்கள்'
      }
    },
    {
      value: 'follow-up',
      label: {
        en: 'Follow-up Call',
        hi: 'फॉलो-अप कॉल',
        ta: 'பின்தொடர்தல் அழைப்பு'
      },
      defaultMessage: {
        en: 'Reminder: Call bank to follow up on seeding status',
        hi: 'अनुस्मारक: सीडिंग स्थिति के लिए बैंक को फॉलो-अप कॉल करें',
        ta: 'நினைவூட்டல்: விதைப்பு நிலையைப் பின்தொடர வங்கியை அழைக்கவும்'
      }
    }
  ];

  // Load reminders from localStorage on component mount
  useEffect(() => {
    const savedReminders = localStorage.getItem('aadhaar_reminders');
    if (savedReminders) {
      try {
        setReminders(JSON.parse(savedReminders));
      } catch (error) {
        console.error('Error loading reminders:', error);
      }
    }
  }, []);

  // Save reminders to localStorage whenever reminders change
  useEffect(() => {
    localStorage.setItem('aadhaar_reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Check for due reminders
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentTime = now.getTime();

      reminders.forEach((reminder) => {
        const reminderDateTime = new Date(`${reminder.date}T${reminder.time}`);
        const timeDiff = reminderDateTime.getTime() - currentTime;

        // Show notification if reminder is due (within 1 minute)
        if (timeDiff > 0 && timeDiff <= 60000 && !reminder.notified) {
          toast.info(reminder.message, {
            description: `${reminder.date} at ${reminder.time}`,
            duration: 5000
          });

          // Mark as notified
          setReminders(prev => 
            prev.map(r => 
              r.id === reminder.id ? { ...r, notified: true } : r
            )
          );
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    checkReminders(); // Check immediately

    return () => clearInterval(interval);
  }, [reminders]);

  const addReminder = () => {
    if (!newReminder.type || !newReminder.date || !newReminder.time) {
      toast.error(language === 'hi' ? 'कृपया सभी फ़ील्ड भरें' : 
                  language === 'ta' ? 'அனைத்து புலங்களையும் நிரப்பவும்' : 'Please fill all fields');
      return;
    }

    const selectedType = reminderTypes.find(t => t.value === newReminder.type);
    const reminder = {
      id: Date.now(),
      type: newReminder.type,
      date: newReminder.date,
      time: newReminder.time,
      message: newReminder.message || selectedType.defaultMessage[language],
      typeLabel: selectedType.label[language],
      notified: false,
      created: new Date().toISOString()
    };

    setReminders(prev => [...prev, reminder]);
    setNewReminder({ type: '', date: '', time: '', message: '' });
    
    toast.success(language === 'hi' ? 'रिमाइंडर जोड़ा गया' : 
                  language === 'ta' ? 'நினைவூட்டல் சேர்க்கப்பட்டது' : 'Reminder added successfully');
  };

  const deleteReminder = (id) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    toast.success(language === 'hi' ? 'रिमाइंडर हटाया गया' : 
                  language === 'ta' ? 'நினைவூட்டல் அகற்றப்பட்டது' : 'Reminder deleted');
  };

  const handleTypeChange = (type) => {
    const selectedType = reminderTypes.find(t => t.value === type);
    setNewReminder(prev => ({
      ...prev,
      type,
      message: selectedType ? selectedType.defaultMessage[language] : ''
    }));
  };

  const formatDateTime = (date, time) => {
    try {
      const dt = new Date(`${date}T${time}`);
      return dt.toLocaleString(language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : 'en-IN');
    } catch {
      return `${date} ${time}`;
    }
  };

  const isOverdue = (date, time) => {
    const reminderDateTime = new Date(`${date}T${time}`);
    return reminderDateTime.getTime() < new Date().getTime();
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Bell className="h-6 w-6 text-orange-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">
          {language === 'hi' ? 'सूचना रिमाइंडर' : 
           language === 'ta' ? 'அறிவிப்பு நினைவூட்டல்' : 'Notification Reminders'}
        </h3>
      </div>

      {/* Add New Reminder Form */}
      <div className="space-y-4 mb-6 p-4 bg-white rounded-lg border border-orange-200">
        <h4 className="font-semibold text-slate-800">
          {language === 'hi' ? 'नया रिमाइंडर जोड़ें' : 
           language === 'ta' ? 'புதிய நினைவூட்டல் சேர்க்கவும்' : 'Add New Reminder'}
        </h4>

        <div>
          <Label className="text-slate-700 font-medium">
            {language === 'hi' ? 'रिमाइंडर प्रकार' : 
             language === 'ta' ? 'நினைவூட்டல் வகை' : 'Reminder Type'}
          </Label>
          <Select value={newReminder.type} onValueChange={handleTypeChange}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder={
                language === 'hi' ? 'प्रकार चुनें' : 
                language === 'ta' ? 'வகையைத் தேர்ந்தெடுக்கவும்' : 'Select Type'
              } />
            </SelectTrigger>
            <SelectContent>
              {reminderTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label[language]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-slate-700 font-medium">
              {language === 'hi' ? 'तारीख' : language === 'ta' ? 'தேதி' : 'Date'}
            </Label>
            <Input
              type="date"
              value={newReminder.date}
              onChange={(e) => setNewReminder(prev => ({ ...prev, date: e.target.value }))}
              className="mt-2"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <Label className="text-slate-700 font-medium">
              {language === 'hi' ? 'समय' : language === 'ta' ? 'நேரம்' : 'Time'}
            </Label>
            <Input
              type="time"
              value={newReminder.time}
              onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <Label className="text-slate-700 font-medium">
            {language === 'hi' ? 'कस्टम संदेश (वैकल्पिक)' : 
             language === 'ta' ? 'தனிப்பயன் செய்தி (விருப்பம்)' : 'Custom Message (Optional)'}
          </Label>
          <Input
            value={newReminder.message}
            onChange={(e) => setNewReminder(prev => ({ ...prev, message: e.target.value }))}
            placeholder={language === 'hi' ? 'अपना संदेश दर्ज करें...' : 
                        language === 'ta' ? 'உங்கள் செய்தியை உள்ளிடுங்கள்...' : 'Enter your message...'}
            className="mt-2"
          />
        </div>

        <Button
          onClick={addReminder}
          disabled={!newReminder.type || !newReminder.date || !newReminder.time}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          {language === 'hi' ? 'रिमाइंडर जोड़ें' : 
           language === 'ta' ? 'நினைவூட்டல் சேர்க்கவும்' : 'Add Reminder'}
        </Button>
      </div>

      {/* Existing Reminders */}
      <div className="space-y-3">
        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {language === 'hi' ? 'आपके रिमाइंडर' : 
           language === 'ta' ? 'உங்கள் நினைவூட்டல்கள்' : 'Your Reminders'}
          {reminders.length > 0 && (
            <span className="text-sm text-slate-600">({reminders.length})</span>
          )}
        </h4>

        {reminders.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>
              {language === 'hi' ? 'कोई रिमाइंडर नहीं मिला' : 
               language === 'ta' ? 'நினைவூட்டல் எதுவும் இல்லை' : 'No reminders found'}
            </p>
            <p className="text-sm">
              {language === 'hi' ? 'अपना पहला रिमाइंडर जोड़ें' : 
               language === 'ta' ? 'உங்கள் முதல் நினைவூட்டலைச் சேர்க்கவும்' : 'Add your first reminder above'}
            </p>
          </div>
        ) : (
          reminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                isOverdue(reminder.date, reminder.time)
                  ? 'bg-red-50 border-red-200'
                  : reminder.notified
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white border-orange-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-slate-800">
                      {reminder.typeLabel}
                    </span>
                    {isOverdue(reminder.date, reminder.time) && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                        {language === 'hi' ? 'अतिदेय' : language === 'ta' ? 'காலாவதி' : 'Overdue'}
                      </span>
                    )}
                    {reminder.notified && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {language === 'hi' ? 'सूचित' : language === 'ta' ? 'அறிவிக்கப்பட்டது' : 'Notified'}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 mb-2">{reminder.message}</p>
                  <p className="text-sm text-slate-500">
                    {formatDateTime(reminder.date, reminder.time)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteReminder(reminder.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};