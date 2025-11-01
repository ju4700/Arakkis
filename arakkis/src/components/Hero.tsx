function Hero() {
    const quickLinks = [
        {
            id: 1,
            title: "আমার দোকান",
            description: "নিজের দোকান পরিচালনা করুন",
            icon: "🏪"
        },
        {
            id: 2,
            title: "হিমাগার",
            description: "হিমাগার সেবা ও তথ্য",
            icon: "❄️"
        },
        {
            id: 3,
            title: "তথ্য কেন্দ্র",
            description: "কৃষি বিষয়ক সকল তথ্য",
            icon: "📚"
        },
        {
            id: 4,
            title: "বৈশ্বিক",
            description: "আন্তর্জাতিক বাজার দর",
            icon: "🌍"
        },
        {
            id: 5,
            title: "সরকারি মূল্য তালিকা",
            description: "সরকার নির্ধারিত মূল্য",
            icon: "📋"
        },
        {
            id: 6,
            title: "রিপোর্ট",
            description: "বাজার বিশ্লেষণ ও রিপোর্ট",
            icon: "📊"
        }
    ];

    return (
        <section className="w-full max-w-[1200px] mx-auto py-12 px-5">
            {/* Hero Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-hind-siliguri mb-4">
                    স্বাগতম <span className="text-green-600">এগ্রোবাজারে</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 font-hind-siliguri max-w-2xl mx-auto">
                    কৃষি পণ্যের সঠিক মূল্য, বাজার তথ্য এবং ব্যবসায়িক সেবা এক জায়গায়
                </p>
            </div>

            {/* Quick Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickLinks.map((link) => (
                    <div
                        key={link.id}
                        className="bg-white hover:bg-gray-50 rounded-2xl p-6 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-1 border border-gray-100"
                    >
                        <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                                {link.icon}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-800 font-hind-siliguri mb-1">
                                    {link.title}
                                </h3>
                                <p className="text-sm text-gray-600 font-hind-siliguri">
                                    {link.description}
                                </p>
                            </div>

                            {/* Arrow Icon */}
                            <div className="text-gray-400 hover:text-green-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Call to Action */}
            <div className="mt-10 text-center">
                <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-[32px] font-hind-siliguri text-lg font-medium transition-colors shadow-md hover:shadow-lg">
                    আজই শুরু করুন
                </button>
            </div>
        </section>
    );
}

export default Hero;
