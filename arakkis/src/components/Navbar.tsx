interface NavbarProps {
    onNavigate: (view: 'home' | 'market') => void;
}

function Navbar({ onNavigate }: NavbarProps) {
    return (
        <nav className="w-full max-w-[1200px] mx-auto h-16 px-5 bg-white rounded-[40px] shadow-sm flex justify-between items-center mt-2">
            {/* Logo Section */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
                <img className="w-7 h-7 rounded-full object-cover" src="fav.png" alt="AgroBazar Logo" />
                <div className="text-green-600 text-xl font-bold font-inter">AgroBazar</div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
                <button onClick={() => onNavigate('home')} className="text-black text-lg font-medium font-hind-siliguri hover:text-green-600 transition-colors cursor-pointer">
                    হোম
                </button>
                <button onClick={() => onNavigate('market')} className="text-black text-lg font-medium font-hind-siliguri hover:text-green-600 transition-colors cursor-pointer">
                    বাজার
                </button>
                <a href="#info" className="text-black text-lg font-medium font-hind-siliguri hover:text-green-600 transition-colors cursor-pointer">
                    তথ্য
                </a>
                <a href="#contact" className="text-black text-lg font-medium font-hind-siliguri hover:text-green-600 transition-colors cursor-pointer">
                    যোগাযোগ
                </a>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
                {/* Search/Notification Icon */}
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors" aria-label="Search">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>

                {/* Login Button */}
                <button className="px-5 h-10 bg-green-600 hover:bg-green-700 rounded-[32px] flex items-center justify-center transition-colors">
                    <span className="text-white text-lg font-medium font-hind-siliguri">লগইন করুন</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar;