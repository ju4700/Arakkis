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
                    AgroBazar সম্পর্কে
                </h1>
                <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
                <p className="text-xl text-gray-600 font-hind-siliguri max-w-3xl mx-auto leading-relaxed">
                    বাংলাদেশের প্রথম ডিজিটাল কৃষি বাজার প্ল্যাটফর্ম যা কৃষক এবং ক্রেতাদের সরাসরি সংযুক্ত করে। 
                    আমরা কৃষি পণ্যের ন্যায্য মূল্য নিশ্চিত করি এবং মধ্যস্থতাকারী ছাড়াই ব্যবসা সহজ করি।
                </p>
            </div>

            {/* Mission & Vision - Simple Layout */}
            <div className="grid md:grid-cols-2 gap-12 mb-20">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 font-hind-siliguri">আমাদের লক্ষ্য</h2>
                    </div>
                    <p className="text-gray-700 font-hind-siliguri leading-relaxed pl-15">
                        কৃষকদের তাদের পণ্যের সঠিক মূল্য প্রদান এবং ক্রেতাদের জন্য তাজা, মানসম্মত কৃষি পণ্য সহজলভ্য করা। 
                        ডিজিটাল প্রযুক্তির মাধ্যমে কৃষি খাতে বিপ্লব আনা।
                    </p>
                </div>

                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 font-hind-siliguri">আমাদের দৃষ্টিভঙ্গি</h2>
                    </div>
                    <p className="text-gray-700 font-hind-siliguri leading-relaxed pl-15">
                        বাংলাদেশের প্রতিটি কৃষক ও ক্রেতাকে ডিজিটাল প্ল্যাটফর্মের মাধ্যমে সংযুক্ত করে একটি স্বচ্ছ, 
                        দক্ষ এবং লাভজনক কৃষি বাজার গড়ে তোলা।
                    </p>
                </div>
            </div>

            {/* Key Features */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center text-gray-900 font-hind-siliguri mb-12">মূল বৈশিষ্ট্য</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ),
                            title: 'ন্যায্য মূল্য',
                            description: 'মধ্যস্থতাকারী ছাড়াই সরাসরি লেনদেন'
                        },
                        {
                            icon: (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            ),
                            title: 'গুণমান নিশ্চিতকরণ',
                            description: 'প্রতিটি পণ্যের মান যাচাই ও সতেজতা'
                        },
                        {
                            icon: (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            ),
                            title: 'দ্রুত ডেলিভারি',
                            description: 'দেশব্যাপী নিরাপদ সরবরাহ'
                        },
                        {
                            icon: (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            ),
                            title: 'নিরাপদ পেমেন্ট',
                            description: 'একাধিক পেমেন্ট অপশন'
                        },
                        {
                            icon: (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            ),
                            title: 'হিমাগার সুবিধা',
                            description: 'আধুনিক কোল্ড স্টোরেজ'
                        },
                        {
                            icon: (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            ),
                            title: 'মার্কেট ইনসাইট',
                            description: 'রিয়েল-টাইম মূল্য তথ্য'
                        }
                    ].map((feature, index) => (
                        <div key={index} className="text-center group">
                            <div className="w-16 h-16 bg-green-600 text-white rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 font-hind-siliguri mb-2">{feature.title}</h3>
                            <p className="text-gray-600 font-hind-siliguri">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Partners Section with Sliding Animation */}
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

            {/* Cold Storage Partners */}
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

            {/* Statistics */}
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

            {/* CTA Section */}
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

            {/* CSS for animation */}
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
