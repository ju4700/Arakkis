import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = 'https://arakkiss.onrender.com/api';

const shopTypes = ['সবজি', 'ফল', 'মাছ', 'মুরগি', 'দুগ্ধজাত', 'শস্য', 'মসলা', 'মিশ্র'];
const districts = ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'];

interface ShopFormData {
  name: string;
  description: string;
  type: string;
  location: string;
  district: string;
}

export default function AmarDokan({ onShopCreated }: { onShopCreated: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ShopFormData>({
    name: '',
    description: '',
    type: '',
    location: '',
    district: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [nidFront, setNidFront] = useState('');
  const [nidBack, setNidBack] = useState('');
  const { token } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleFileChange = (side: 'front' | 'back', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 10 * 1024 * 1024) {
      setError('ফাইলের আকার ১০ এমবি এর কম হতে হবে');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      if (side === 'front') setNidFront(base64);
      else setNidBack(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleStep1Submit = () => {
    if (!formData.name || !formData.type || !formData.description || !formData.location || !formData.district) {
      setError('সব তথ্য পূরণ করুন');
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = async () => {
    if (!nidFront || !nidBack) {
      setError('পরিচয়পত্রের উভয় দিকের ছবি আপলোড করুন');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const shopResponse = await fetch(`${API_URL}/shops`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const shopData = await shopResponse.json();
      if (!shopResponse.ok) throw new Error(shopData.message || 'দোকান তৈরিতে সমস্যা হয়েছে');

      await fetch(`${API_URL}/shops/${shopData.shop._id}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ nidFront, nidBack })
      });

      setStep(3);
      setTimeout(() => onShopCreated(), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
        <div className="bg-white rounded-2xl shadow-sm p-12 max-w-2xl text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-green-700 mb-4">অভিনন্দন!</h2>
          <p className="text-2xl text-gray-700 mb-8">আপনার দোকান সফলভাবে তৈরি হয়েছে</p>
          <div className="animate-pulse text-gray-500">ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-50 px-6 py-2 rounded-full mb-4">
            <span className="text-2xl">🏪</span>
            <span className="text-green-700 font-medium">কৃষক ড্যাশবোর্ড</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-neutral-800">দোকান </span>
            <span className="text-green-700">{step === 1 ? 'তৈরি করুন' : 'যাচাইকরণ'}</span>
          </h1>
          <p className="text-2xl text-neutral-800">
            {step === 1 ? 'আপনার কৃষিপণ্য বিক্রির জন্য নিজের দোকান শুরু করুন' : 'পরিচয়পত্র যাচাইকরণের জন্য ছবি আপলোড করুন'}
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-300'} font-bold`}>1</div>
            <div className={`w-24 h-1 ${step >= 2 ? 'bg-green-600' : 'bg-gray-300'}`} />
            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-300'} font-bold`}>2</div>
            <div className={`w-24 h-1 ${step >= 3 ? 'bg-green-600' : 'bg-gray-300'}`} />
            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-300'} font-bold`}>3</div>
          </div>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl text-center">
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-green-700">দোকানের তথ্য</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xl font-medium text-gray-700 mb-2">দোকানের নাম *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="যেমন: রহিমের সবজি ভান্ডার"
                    className="w-full px-5 py-4 text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xl font-medium text-gray-700 mb-2">দোকানের ধরন *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">নির্বাচন করুন</option>
                    {shopTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xl font-medium text-gray-700 mb-2">দোকানের বিবরণ *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="আপনার দোকান সম্পর্কে বিস্তারিত..."
                  rows={4}
                  className="w-full px-5 py-4 text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xl font-medium text-gray-700 mb-2">অবস্থান *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="মিরপুর ১০, ঢাকা"
                    className="w-full px-5 py-4 text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xl font-medium text-gray-700 mb-2">জেলা *</label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">নির্বাচন করুন</option>
                    {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  onClick={handleStep1Submit}
                  className="px-12 py-4 bg-green-600 hover:bg-green-700 text-white text-2xl font-medium rounded-full transition-colors"
                >
                  পরবর্তী ধাপ →
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm p-8 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-green-700 text-center">পরিচয়পত্র যাচাইকরণ</h2>
            <p className="text-xl text-gray-600 text-center mb-8">ছবির আকার ১০ এমবি এর কম হতে হবে</p>

            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">🆔</span>
                  <h3 className="text-2xl font-bold">পরিচয়পত্র সামনের দিক</h3>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
                  <label className="cursor-pointer inline-flex flex-col items-center">
                    <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-xl text-gray-600 mb-2">ফাইল নির্বাচন করুন</span>
                    <span className="text-gray-400 text-sm">JPEG, PNG, সর্বোচ্চ ১০ এমবি</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange('front', e)} />
                  </label>
                  {nidFront && <div className="mt-4 text-green-600">✓ ফাইল আপলোড হয়েছে</div>}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">🆔</span>
                  <h3 className="text-2xl font-bold">পরিচয়পত্র পিছনের দিক</h3>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
                  <label className="cursor-pointer inline-flex flex-col items-center">
                    <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-xl text-gray-600 mb-2">ফাইল নির্বাচন করুন</span>
                    <span className="text-gray-400 text-sm">JPEG, PNG, সর্বোচ্চ ১০ এমবি</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange('back', e)} />
                  </label>
                  {nidBack && <div className="mt-4 text-green-600">✓ ফাইল আপলোড হয়েছে</div>}
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button
                  onClick={() => setStep(1)}
                  className="px-12 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 text-2xl font-medium rounded-full transition-colors"
                >
                  ← পূর্ববর্তী
                </button>
                <button
                  onClick={handleFinalSubmit}
                  disabled={loading}
                  className="px-12 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-2xl font-medium rounded-full transition-colors"
                >
                  {loading ? 'অপেক্ষা করুন...' : 'দোকান তৈরি করুন'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
