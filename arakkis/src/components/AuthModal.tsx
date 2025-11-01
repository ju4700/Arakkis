import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [formError, setFormError] = useState('');

    const { login, register, isLoading, error } = useAuth();

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setFormError('');
    };

    const validateForm = () => {
        if (!formData.phone.trim()) {
            setFormError('ফোন নম্বর প্রয়োজন');
            return false;
        }

        if (!isLogin && !formData.name.trim()) {
            setFormError('নাম প্রয়োজন');
            return false;
        }

        if (!formData.password.trim()) {
            setFormError('পাসওয়ার্ড প্রয়োজন');
            return false;
        }

        if (formData.password.length < 6) {
            setFormError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
            return false;
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            setFormError('পাসওয়ার্ড মিলছে না');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');

        if (!validateForm()) return;

        try {
            if (isLogin) {
                await login(formData.phone, formData.password);
            } else {
                await register(
                    formData.name,
                    formData.phone,
                    formData.password
                );
            }
            // Close modal on success
            onClose();
            // Reset form
            setFormData({
                name: '',
                phone: '',
                password: '',
                confirmPassword: ''
            });
        } catch (err) {
            // Error is already set in context
            console.error('Auth error:', err);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormError('');
        setFormData({
            name: '',
            phone: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-t-2xl relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                    >
                        ✕
                    </button>
                    <h2 className="text-2xl font-bold text-white font-hind-siliguri">
                        {isLogin ? 'লগইন করুন' : 'রেজিস্ট্রেশন করুন'}
                    </h2>
                    <p className="text-green-100 font-hind-siliguri mt-1">
                        {isLogin ? 'আপনার অ্যাকাউন্টে প্রবেश করুন' : 'নতুন অ্যাকাউন্ট তৈরি করুন'}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Error Message */}
                    {(formError || error) && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl font-hind-siliguri">
                            {formError || error}
                        </div>
                    )}

                    {/* Registration Fields */}
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 font-hind-siliguri mb-2">
                                পূর্ণ নাম *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="আপনার নাম লিখুন"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-hind-siliguri transition-all"
                            />
                        </div>
                    )}

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 font-hind-siliguri mb-2">
                            ফোন নম্বর *
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+880 1XXX-XXXXXX"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-hind-siliguri transition-all"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 font-hind-siliguri mb-2">
                            পাসওয়ার্ড *
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="কমপক্ষে ৬ অক্ষর"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-hind-siliguri transition-all"
                        />
                    </div>

                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 font-hind-siliguri mb-2">
                                পাসওয়ার্ড নিশ্চিত করুন *
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="পাসওয়ার্ড আবার লিখুন"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-hind-siliguri transition-all"
                            />
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl font-hind-siliguri text-lg transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? 'অপেক্ষা করুন...' : (isLogin ? 'লগইন করুন' : 'রেজিস্টার করুন')}
                    </button>

                    {/* Toggle Mode */}
                    <div className="text-center pt-4 border-t border-gray-200">
                        <p className="text-gray-600 font-hind-siliguri">
                            {isLogin ? 'নতুন ইউজার?' : 'ইতিমধ্যে অ্যাকাউন্ট আছে?'}
                            <button
                                type="button"
                                onClick={toggleMode}
                                className="ml-2 text-green-600 font-bold hover:text-green-700 transition-colors"
                            >
                                {isLogin ? 'রেজিস্টার করুন' : 'লগইন করুন'}
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AuthModal;
