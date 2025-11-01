import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

interface NavbarProps {
    onNavigate: (view: 'home' | 'market' | 'info' | 'contact' | 'myshop') => void;
}

function Navbar({ onNavigate }: NavbarProps) {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
    };

    return (
        <>
            <nav className="w-full max-w-[1200px] mx-auto h-16 px-5 bg-white rounded-[40px] shadow-sm flex justify-between items-center mt-2">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
                    <img className="w-7 h-7 rounded-full object-cover" src="agriculture.png" alt="AgroBazar Logo" />
                    <div className="text-green-600 text-xl font-bold font-inter">AgroBazar</div>
                </div>

                <div className="flex items-center gap-6">
                    <button onClick={() => onNavigate('home')} className="text-black text-lg font-medium font-hind-siliguri hover:text-green-600 transition-colors cursor-pointer">
                        হোম
                    </button>
                    <button onClick={() => onNavigate('market')} className="text-black text-lg font-medium font-hind-siliguri hover:text-green-600 transition-colors cursor-pointer">
                        বাজার
                    </button>
                    <button onClick={() => onNavigate('info')} className="text-black text-lg font-medium font-hind-siliguri hover:text-green-600 transition-colors cursor-pointer">
                        তথ্য
                    </button>
                    <button onClick={() => onNavigate('contact')} className="text-black text-lg font-medium font-hind-siliguri hover:text-green-600 transition-colors cursor-pointer">
                        যোগাযোগ
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors" aria-label="Search">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 px-4 h-10 bg-green-50 hover:bg-green-100 rounded-[32px] transition-colors border border-green-200"
                            >
                                <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-gray-900 text-base font-medium font-hind-siliguri">
                                    {user.name}
                                </span>
                                <svg 
                                    className={`w-4 h-4 text-gray-600 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-gray-900 font-hind-siliguri">{user.name}</p>
                                        <p className="text-xs text-gray-500 font-hind-siliguri mt-1">{user.email}</p>
                                        <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-hind-siliguri">
                                            {user.userType === 'farmer' ? '🌾 কৃষক' : '🛒 ক্রেতা'}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowUserMenu(false);
                                        }}
                                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-green-50 transition-colors font-hind-siliguri flex items-center gap-2"
                                    >
                                        <span>👤</span>
                                        <span>প্রোফাইল</span>
                                    </button>
                                    {user.userType === 'farmer' && (
                                        <button
                                            onClick={() => {
                                                setShowUserMenu(false);
                                                onNavigate('myshop');
                                            }}
                                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-green-50 transition-colors font-hind-siliguri flex items-center gap-2"
                                        >
                                            <span>📊</span>
                                            <span>ড্যাশবোর্ড</span>
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            setShowUserMenu(false);
                                        }}
                                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-green-50 transition-colors font-hind-siliguri flex items-center gap-2"
                                    >
                                        <span>📦</span>
                                        <span>অর্ডার</span>
                                    </button>
                                    <div className="border-t border-gray-100 mt-2 pt-2">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors font-hind-siliguri flex items-center gap-2"
                                        >
                                            <span>🚪</span>
                                            <span>লগআউট</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button 
                            onClick={() => setIsAuthModalOpen(true)}
                            className="px-5 h-10 bg-green-600 hover:bg-green-700 rounded-[32px] flex items-center justify-center transition-colors"
                        >
                            <span className="text-white text-lg font-medium font-hind-siliguri">লগইন করুন</span>
                        </button>
                    )}
                </div>
            </nav>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    )
}

export default Navbar;