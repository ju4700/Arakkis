function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-gray-900 text-white">
            <div className="w-full max-w-[1200px] mx-auto px-5 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img className="w-8 h-8 rounded-full" src="fav.png" alt="AgroBazar Logo" />
                            <h3 className="text-2xl font-bold text-green-500 font-inter">AgroBazar</h3>
                        </div>
                        <p className="text-gray-400 text-sm font-hind-siliguri mb-4">
                            বাংলাদেশের প্রথম ডিজিটাল কৃষি বাজার প্ল্যাটফর্ম। কৃষক থেকে ক্রেতা - সরাসরি সংযোগ।
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors">
                                <span className="text-lg">f</span>
                            </a>
                            <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors">
                                <span className="text-lg">𝕏</span>
                            </a>
                            <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors">
                                <span className="text-lg">in</span>
                            </a>
                            <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors">
                                <span className="text-lg">📧</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 font-hind-siliguri">দ্রুত লিংক</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#home" className="text-gray-400 hover:text-green-500 transition-colors text-sm font-hind-siliguri">
                                    হোম
                                </a>
                            </li>
                            <li>
                                <a href="#market" className="text-gray-400 hover:text-green-500 transition-colors text-sm font-hind-siliguri">
                                    বাজার
                                </a>
                            </li>
                            <li>
                                <a href="#info" className="text-gray-400 hover:text-green-500 transition-colors text-sm font-hind-siliguri">
                                    তথ্য কেন্দ্র
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="text-gray-400 hover:text-green-500 transition-colors text-sm font-hind-siliguri">
                                    আমাদের সম্পর্কে
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-gray-400 hover:text-green-500 transition-colors text-sm font-hind-siliguri">
                                    যোগাযোগ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 font-hind-siliguri">সেবা সমূহ</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#myshop" className="text-gray-400 hover:text-green-500 transition-colors text-sm font-hind-siliguri">
                                    আমার দোকান
                                </a>
                            </li>
                            <li>
                                <a href="#coldstorage" className="text-gray-400 hover:text-green-500 transition-colors text-sm font-hind-siliguri">
                                    হিমাগার সেবা
                                </a>
                            </li>
                            <li>
                                <a href="#global" className="text-gray-400 hover:text-green-500 transition-colors text-sm font-hind-siliguri">
                                    বৈশ্বিক বাজার
                                </a>
                            </li>
                            <li>
                                <a href="#price" className="text-gray-400 hover:text-green-500 transition-colors text-sm font-hind-siliguri">
                                    সরকারি মূল্য তালিকা
                                </a>
                            </li>
                            <li>
                                <a href="#report" className="text-gray-400 hover:text-green-500 transition-colors text-sm font-hind-siliguri">
                                    বাজার রিপোর্ট
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 font-hind-siliguri">যোগাযোগ</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-gray-400 text-sm font-hind-siliguri">
                                    ঢাকা, বাংলাদেশ
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-gray-400 text-sm font-hind-siliguri">
                                    +880 1XXX-XXXXXX
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-gray-400 text-sm">
                                    info@agrobazar.com
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm font-hind-siliguri">
                            © {currentYear} AgroBazar. সর্বস্বত্ব সংরক্ষিত।
                        </p>
                        <div className="flex gap-6">
                            <a href="#privacy" className="text-gray-400 hover:text-green-500 text-sm font-hind-siliguri transition-colors">
                                গোপনীয়তা নীতি
                            </a>
                            <a href="#terms" className="text-gray-400 hover:text-green-500 text-sm font-hind-siliguri transition-colors">
                                শর্তাবলী
                            </a>
                            <a href="#support" className="text-gray-400 hover:text-green-500 text-sm font-hind-siliguri transition-colors">
                                সাপোর্ট
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
