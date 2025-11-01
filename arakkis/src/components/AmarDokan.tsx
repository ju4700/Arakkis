import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ShopDashboard from './ShopDashboard';

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
  const { user, token } = useAuth();
  const [step, setStep] = useState(1);
  const [hasShop, setHasShop] = useState(false);
  const [checkingShop, setCheckingShop] = useState(true);
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

  // Check if user is logged in and is a farmer
  useEffect(() => {
    if (!user) {
      setError('দয়া করে লগইন করুন');
      setCheckingShop(false);
    } else if (user.userType !== 'farmer') {
      setError('শুধুমাত্র কৃষক দোকান তৈরি করতে পারবেন');
      setCheckingShop(false);
    } else {
      // Check if farmer already has a shop
      checkExistingShop();
    }
  }, [user]);

  const checkExistingShop = async () => {
    try {
      const response = await fetch(`${API_URL}/shops/my/shop`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (response.ok && data.shop) {
        setHasShop(true);
      }
    } catch (err) {
      // No shop exists, that's fine
    } finally {
      setCheckingShop(false);
    }
  };

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
      setTimeout(() => {
        setHasShop(true); // Show dashboard after shop creation
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Check authorization first
  if (checkingShop) {
    return (
      <div className="w-full max-w-[1200px] mx-auto py-8 px-5">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600 font-hind-siliguri">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full max-w-[1200px] mx-auto py-8 px-5">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-hind-siliguri">দয়া করে লগইন করুন</h2>
          <p className="text-gray-600 font-hind-siliguri">দোকান তৈরি করতে আপনাকে লগইন করতে হবে</p>
        </div>
      </div>
    );
  }

  if (user.userType !== 'farmer') {
    return (
      <div className="w-full max-w-[1200px] mx-auto py-8 px-5">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-hind-siliguri">শুধুমাত্র কৃষকদের জন্য</h2>
          <p className="text-gray-600 font-hind-siliguri">দোকান তৈরি করতে আপনাকে কৃষক অ্যাকাউন্ট থাকতে হবে</p>
        </div>
      </div>
    );
  }

  // If farmer already has a shop, show dashboard
  if (hasShop) {
    return <ShopDashboard />;
  }

  if (step === 3) {
    return (
      <div className="w-full max-w-[1200px] mx-auto py-8 px-5">
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-green-700 mb-3 font-hind-siliguri">অভিনন্দন!</h2>
          <p className="text-lg text-gray-700 mb-4 font-hind-siliguri">আপনার দোকান সফলভাবে তৈরি হয়েছে</p>
          <div className="animate-pulse text-gray-500 font-hind-siliguri">ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto py-8 px-5">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-3">
          <span className="text-xl">🏪</span>
          <span className="text-green-700 font-medium font-hind-siliguri">কৃষক ড্যাশবোর্ড</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 font-hind-siliguri">
          <span className="text-neutral-800">দোকান </span>
          <span className="text-green-700">{step === 1 ? 'তৈরি করুন' : 'যাচাইকরণ'}</span>
        </h1>
        <p className="text-base md:text-lg text-neutral-600 font-hind-siliguri">
          {step === 1 ? 'আপনার কৃষিপণ্য বিক্রির জন্য নিজের দোকান শুরু করুন' : 'পরিচয়পত্র যাচাইকরণের জন্য ছবি আপলোড করুন'}
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-300'} font-bold text-sm`}>1</div>
          <div className={`w-16 h-1 ${step >= 2 ? 'bg-green-600' : 'bg-gray-300'}`} />
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-300'} font-bold text-sm`}>2</div>
          <div className={`w-16 h-1 ${step >= 3 ? 'bg-green-600' : 'bg-gray-300'}`} />
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-300'} font-bold text-sm`}>3</div>
        </div>
      </div>

      {error && !user && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-center font-hind-siliguri">
          {error}
        </div>
      )}

      {step === 1 && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6 text-green-700 font-hind-siliguri">দোকানের তথ্য</h2>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2 font-hind-siliguri">দোকানের নাম *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="যেমন: রহিমের সবজি ভান্ডার"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 font-hind-siliguri"
                />
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2 font-hind-siliguri">দোকানের ধরন *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 font-hind-siliguri"
                >
                  <option value="">নির্বাচন করুন</option>
                  {shopTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-2 font-hind-siliguri">দোকানের বিবরণ *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="আপনার দোকান সম্পর্কে বিস্তারিত..."
                rows={3}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none font-hind-siliguri"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2 font-hind-siliguri">অবস্থান *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="মিরপুর ১০, ঢাকা"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 font-hind-siliguri"
                />
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2 font-hind-siliguri">জেলা *</label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 font-hind-siliguri"
                >
                  <option value="">নির্বাচন করুন</option>
                  {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleStep1Submit}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white text-base font-medium rounded-full transition-colors font-hind-siliguri"
              >
                পরবর্তী ধাপ →
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-2 text-green-700 font-hind-siliguri">পরিচয়পত্র যাচাইকরণ</h2>
          <p className="text-sm text-gray-600 mb-6 font-hind-siliguri">ছবির আকার ১০ এমবি এর কম হতে হবে</p>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🆔</span>
                <h3 className="text-lg font-bold font-hind-siliguri">পরিচয়পত্র সামনের দিক</h3>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center">
                <label className="cursor-pointer inline-flex flex-col items-center">
                  <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-base text-gray-600 mb-1 font-hind-siliguri">ফাইল নির্বাচন করুন</span>
                  <span className="text-gray-400 text-xs font-hind-siliguri">JPEG, PNG, সর্বোচ্চ ১০ এমবি</span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange('front', e)} />
                </label>
                {nidFront && <div className="mt-3 text-green-600 font-hind-siliguri text-sm">✓ ফাইল আপলোড হয়েছে</div>}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🆔</span>
                <h3 className="text-lg font-bold font-hind-siliguri">পরিচয়পত্র পিছনের দিক</h3>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center">
                <label className="cursor-pointer inline-flex flex-col items-center">
                  <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-base text-gray-600 mb-1 font-hind-siliguri">ফাইল নির্বাচন করুন</span>
                  <span className="text-gray-400 text-xs font-hind-siliguri">JPEG, PNG, সর্বোচ্চ ১০ এমবি</span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange('back', e)} />
                </label>
                {nidBack && <div className="mt-3 text-green-600 font-hind-siliguri text-sm">✓ ফাইল আপলোড হয়েছে</div>}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-base font-medium rounded-full transition-colors font-hind-siliguri"
              >
                ← পূর্ববর্তী
              </button>
              <button
                onClick={handleFinalSubmit}
                disabled={loading}
                className="px-8 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-base font-medium rounded-full transition-colors font-hind-siliguri"
              >
                {loading ? 'অপেক্ষা করুন...' : 'দোকান তৈরি করুন'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
