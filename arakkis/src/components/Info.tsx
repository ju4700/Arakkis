function Info() {
    const partners = [
        { name: 'bKash', logo: 'https://images.seeklogo.com/logo-png/27/1/bkash-logo-png_seeklogo-273684.png' },
        { name: 'Nagad', logo: 'https://images.seeklogo.com/logo-png/35/1/nagad-logo-png_seeklogo-355240.png' },
        { name: 'SSLCommerz', logo: 'https://sslcommerz.com/wp-content/uploads/2021/11/logo.png' },
        { name: 'DHL', logo: 'https://images.seeklogo.com/logo-png/19/1/dhl-express-logo-png_seeklogo-192034.png' },
        { name: 'Sundarban', logo: 'https://images.seeklogo.com/logo-png/45/1/sundarban-express-logo-png_seeklogo-451065.png' },
        { name: 'Pathao', logo: 'https://images.seeklogo.com/logo-png/35/1/pathao-logo-png_seeklogo-350277.png' },
        { name: 'Sohoz', logo: 'https://images.seeklogo.com/logo-png/43/1/shohoz-logo-png_seeklogo-431327.png' }
    ];

    const coldStorages = [
        { name: 'ATEL Bangladesh', url: 'https://atelbd.com/cold-storage-solution' },
        { name: 'BCL Group BD', url: 'https://bclgroupbd.com/cold-storage/' },
        { name: 'AK Cold Storage', url: 'https://akcoldstoragebd.com/' },
        { name: 'Ruzave Bangladesh', url: 'https://ruzave.com/bangladesh/warehousing-centres/cold-storage' }
    ];

    return (
        <div className="w-full max-w-[1200px] mx-auto px-5 py-12">
            {/* Hero Section */}
            <div className="text-center mb-20">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 font-hind-siliguri mb-6">
                    AgroBazar - কৃষি বিপ্লবের নতুন অধ্যায়
                </h1>
                <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
                <p className="text-xl text-gray-600 font-hind-siliguri max-w-3xl mx-auto leading-relaxed">
                    বাংলাদেশের কৃষি খাতে ডিজিটাল রূপান্তরের পথিকৃৎ
                </p>
            </div>

            {/* Introduction - Educational Content */}
            <div className="mb-20 bg-green-50 p-8 rounded-lg border-l-4 border-green-600">
                <h2 className="text-3xl font-bold text-gray-900 font-hind-siliguri mb-6">আমরা কারা?</h2>
                <div className="space-y-4 text-gray-700 font-hind-siliguri leading-relaxed text-lg">
                    <p>
                        AgroBazar হলো বাংলাদেশের প্রথম সম্পূর্ণ ডিজিটাল কৃষি বাজার প্ল্যাটফর্ম যা কৃষক এবং ক্রেতাদের সরাসরি সংযুক্ত করে। 
                        ঐতিহ্যগত কৃষি বাজার ব্যবস্থায় কৃষকরা তাদের উৎপাদিত পণ্যের ন্যায্য মূল্য পান না এবং ক্রেতারাও অতিরিক্ত দামে পণ্য কিনতে বাধ্য হন। 
                        মধ্যস্থতাকারীদের বহুস্তরীয় চেইনের কারণে কৃষকের আয় কম থাকে এবং ক্রেতাদের খরচ বেশি হয়।
                    </p>
                    <p>
                        আমাদের প্ল্যাটফর্ম এই সমস্যার সমাধান করে। কৃষকরা সরাসরি তাদের পণ্য তালিকাভুক্ত করতে পারেন এবং ক্রেতারা সরাসরি কৃষকের কাছ থেকে 
                        তাজা পণ্য কিনতে পারেন। এতে কৃষক তার শ্রমের ন্যায্য মূল্য পান এবং ক্রেতারা সাশ্রয়ী দামে মানসম্মত পণ্য পান। 
                        প্রযুক্তির সাহায্যে আমরা স্বচ্ছতা, বিশ্বাস এবং দক্ষতা নিশ্চিত করি।
                    </p>
                </div>
            </div>

            {/* The Problem Section */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-gray-900 font-hind-siliguri mb-6 text-center">বর্তমান কৃষি বাজারের সমস্যা</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 border-l-4 border-red-500">
                        <h3 className="text-xl font-bold text-gray-900 font-hind-siliguri mb-3 flex items-center gap-2">
                            <span className="text-red-500">⚠️</span> কৃষকদের সমস্যা
                        </h3>
                        <ul className="space-y-3 text-gray-700 font-hind-siliguri">
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">•</span>
                                <span>মধ্যস্থতাকারীদের কারণে উৎপাদন খরচের চেয়ে কম দামে পণ্য বিক্রয়</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">•</span>
                                <span>সঠিক বাজার তথ্য ও মূল্য নির্ধারণের জ্ঞানের অভাব</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">•</span>
                                <span>পণ্য সংরক্ষণের সুবিধা না থাকায় দ্রুত বিক্রয়ের চাপ</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">•</span>
                                <span>সরাসরি ক্রেতাদের সাথে যোগাযোগের মাধ্যম না থাকা</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">•</span>
                                <span>মৌসুমি পণ্যের ক্ষেত্রে অতিরিক্ত উৎপাদনে দাম পতন</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 border-l-4 border-orange-500">
                        <h3 className="text-xl font-bold text-gray-900 font-hind-siliguri mb-3 flex items-center gap-2">
                            <span className="text-orange-500">⚠️</span> ক্রেতাদের সমস্যা
                        </h3>
                        <ul className="space-y-3 text-gray-700 font-hind-siliguri">
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">•</span>
                                <span>একাধিক মধ্যস্থতাকারীর কারণে পণ্যের অতিরিক্ত মূল্য</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">•</span>
                                <span>পণ্যের মান ও সতেজতা সম্পর্কে অনিশ্চয়তা</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">•</span>
                                <span>কৃষকদের সাথে সরাসরি লেনদেনের সুযোগ না থাকা</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">•</span>
                                <span>পণ্যের উৎস ও উৎপাদন প্রক্রিয়া সম্পর্কে তথ্যের অভাব</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">•</span>
                                <span>তাজা ও জৈব পণ্য খুঁজে পেতে অসুবিধা</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Our Solution */}
            <div className="mb-20 bg-gradient-to-br from-green-50 to-white p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-gray-900 font-hind-siliguri mb-6 text-center">আমাদের সমাধান</h2>
                <div className="space-y-6 text-gray-700 font-hind-siliguri leading-relaxed text-lg">
                    <p>
                        AgroBazar একটি স্বচ্ছ, নিরাপদ এবং দক্ষ ডিজিটাল প্ল্যাটফর্ম যা কৃষি পণ্যের সাপ্লাই চেইনকে সরলীকরণ করে। 
                        আমাদের প্ল্যাটফর্মে কৃষকরা নিজেরাই তাদের পণ্যের দাম নির্ধারণ করতে পারেন এবং ক্রেতারা সরাসরি অর্ডার দিতে পারেন।
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-4">
                            <div className="text-4xl font-bold text-green-600 mb-2">০%</div>
                            <p className="font-semibold">মধ্যস্থতাকারী কমিশন</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-4xl font-bold text-green-600 mb-2">১০০%</div>
                            <p className="font-semibold">স্বচ্ছ লেনদেন</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-4xl font-bold text-green-600 mb-2">২৪/৭</div>
                            <p className="font-semibold">সেবা প্রদান</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-20">
                <h2 className="text-3xl font-bold text-gray-900 font-hind-siliguri mb-8 text-center">কিভাবে কাজ করে?</h2>
                
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold text-green-600 font-hind-siliguri mb-4 flex items-center gap-3">
                            <span className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-lg">১</span>
                            কৃষকদের জন্য
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6 pl-13">
                            <div className="bg-white p-5 rounded-lg border border-green-200">
                                <h4 className="font-bold text-lg text-gray-900 font-hind-siliguri mb-2">রেজিস্ট্রেশন</h4>
                                <p className="text-gray-700 font-hind-siliguri">
                                    কৃষক হিসেবে অ্যাকাউন্ট তৈরি করুন। আপনার জমির তথ্য, উৎপাদিত পণ্যের ধরন এবং যোগাযোগের তথ্য প্রদান করুন।
                                    একবার যাচাই হয়ে গেলে আপনি পণ্য বিক্রয় শুরু করতে পারবেন।
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-lg border border-green-200">
                                <h4 className="font-bold text-lg text-gray-900 font-hind-siliguri mb-2">পণ্য তালিকাভুক্ত করুন</h4>
                                <p className="text-gray-700 font-hind-siliguri">
                                    আপনার উৎপাদিত পণ্যের ছবি, বিবরণ, পরিমাণ এবং দাম যোগ করুন। পণ্যের মান, জৈব কিনা, 
                                    সংগ্রহের সময় ইত্যাদি তথ্য দিন যাতে ক্রেতারা সঠিক সিদ্ধান্ত নিতে পারে।
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-lg border border-green-200">
                                <h4 className="font-bold text-lg text-gray-900 font-hind-siliguri mb-2">অর্ডার গ্রহণ</h4>
                                <p className="text-gray-700 font-hind-siliguri">
                                    ক্রেতারা যখন আপনার পণ্য অর্ডার করবে, আপনি তাৎক্ষণিক নোটিফিকেশন পাবেন। 
                                    অর্ডার কনফার্ম করুন এবং পণ্য সরবরাহের জন্য প্রস্তুত করুন।
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-lg border border-green-200">
                                <h4 className="font-bold text-lg text-gray-900 font-hind-siliguri mb-2">পেমেন্ট গ্রহণ</h4>
                                <p className="text-gray-700 font-hind-siliguri">
                                    পণ্য সরবরাহের পর সরাসরি আপনার অ্যাকাউন্টে পেমেন্ট পাবেন। bKash, Nagad, ব্যাংক ট্রান্সফার - 
                                    যেকোনো মাধ্যমে নিরাপদভাবে অর্থ গ্রহণ করুন।
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-green-600 font-hind-siliguri mb-4 flex items-center gap-3">
                            <span className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-lg">২</span>
                            ক্রেতাদের জন্য
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6 pl-13">
                            <div className="bg-white p-5 rounded-lg border border-green-200">
                                <h4 className="font-bold text-lg text-gray-900 font-hind-siliguri mb-2">রেজিস্ট্রেশন</h4>
                                <p className="text-gray-700 font-hind-siliguri">
                                    ক্রেতা হিসেবে অ্যাকাউন্ট তৈরি করুন। আপনার ডেলিভারি ঠিকানা এবং পছন্দের পেমেন্ট পদ্ধতি সংরক্ষণ করুন।
                                    সহজেই পণ্য ব্রাউজ করা এবং অর্ডার করা শুরু করুন।
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-lg border border-green-200">
                                <h4 className="font-bold text-lg text-gray-900 font-hind-siliguri mb-2">পণ্য খুঁজুন</h4>
                                <p className="text-gray-700 font-hind-siliguri">
                                    আমাদের সার্চ এবং ফিল্টার সিস্টেম ব্যবহার করে আপনার পছন্দের পণ্য খুঁজুন। জেলা, পণ্যের ধরন, 
                                    দাম রেঞ্জ, জৈব পণ্য ইত্যাদি অনুযায়ী ফিল্টার করুন।
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-lg border border-green-200">
                                <h4 className="font-bold text-lg text-gray-900 font-hind-siliguri mb-2">অর্ডার করুন</h4>
                                <p className="text-gray-700 font-hind-siliguri">
                                    পছন্দের পণ্য কার্টে যোগ করুন এবং অর্ডার সম্পন্ন করুন। কৃষকের সাথে সরাসরি যোগাযোগ করতে পারবেন 
                                    এবং পণ্য সম্পর্কে বিস্তারিত জানতে পারবেন।
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-lg border border-green-200">
                                <h4 className="font-bold text-lg text-gray-900 font-hind-siliguri mb-2">ডেলিভারি পান</h4>
                                <p className="text-gray-700 font-hind-siliguri">
                                    আমাদের লজিস্টিক পার্টনাররা আপনার দোরগোড়ায় তাজা পণ্য পৌঁছে দেবে। 
                                    রিয়েল-টাইম ট্র্যাকিং সিস্টেমে আপনার অর্ডারের অবস্থান জানুন।
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center text-gray-900 font-hind-siliguri mb-3">আমাদের পার্টনার</h2>
                <p className="text-center text-gray-600 font-hind-siliguri mb-10">বিশ্বস্ত সংস্থাগুলির সাথে আমাদের অংশীদারিত্ব</p>
                
                <div className="relative overflow-hidden bg-white py-8 rounded-lg">
                    <div className="flex animate-scroll gap-12 items-center">
                        {[...partners, ...partners, ...partners].map((partner, index) => (
                            <div key={index} className="flex-shrink-0 w-40 h-24 flex items-center justify-center">
                                <img 
                                    src={partner.logo} 
                                    alt={partner.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center text-gray-900 font-hind-siliguri mb-3">হিমাগার পার্টনার</h2>
                <p className="text-center text-gray-600 font-hind-siliguri mb-10">আধুনিক কোল্ড স্টোরেজ সুবিধা প্রদানকারী</p>
                
                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {coldStorages.map((storage, index) => (
                        <a 
                            key={index}
                            href={storage.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-5 border-l-4 border-green-600 hover:bg-green-50 transition-colors group"
                        >
                            <span className="text-lg font-semibold text-gray-900 font-hind-siliguri">{storage.name}</span>
                            <svg className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    ))}
                </div>
            </div>
            <div className="bg-green-600 rounded-xl p-10 text-white mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { value: '5000+', label: 'কৃষক' },
                        { value: '10000+', label: 'ক্রেতা' },
                        { value: '500+', label: 'পণ্য' },
                        { value: '64', label: 'জেলা' }
                    ].map((stat, index) => (
                        <div key={index}>
                            <div className="text-4xl font-bold mb-2">{stat.value}</div>
                            <div className="text-green-100 font-hind-siliguri">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center py-16">
                <h2 className="text-4xl font-bold text-gray-900 font-hind-siliguri mb-4">আজই যুক্ত হন</h2>
                <p className="text-gray-600 font-hind-siliguri mb-8 max-w-2xl mx-auto">
                    কৃষক হন অথবা ক্রেতা - AgroBazar এ আপনার জন্য সুবিধা রয়েছে। আজই রেজিস্ট্রেশন করুন এবং 
                    ডিজিটাল কৃষি বিপ্লবের অংশীদার হন।
                </p>
                <button className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg font-hind-siliguri text-lg transition-all shadow-lg hover:shadow-xl">
                    এখনই শুরু করুন
                </button>
            </div>

            <style>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-160px * ${partners.length} - 3rem * ${partners.length}));
                    }
                }
                
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }
                
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}

export default Info;