function Hero({ onQuickLinkClick }: { onQuickLinkClick?: (linkId: number) => void }) {
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
        <section className="w-full max-w-[1200px] mx-auto py-12 px-5 relative">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full opacity-20 blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full opacity-10 blur-3xl -z-10"></div>
            
            {/* Hero Header */}
            <div className="text-center mb-10">
                <div className="inline-block mb-4">
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium font-hind-siliguri">
                        🌾 বাংলাদেশের প্রথম কৃষি বাজার প্ল্যাটফর্ম
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-hind-siliguri mb-4 leading-tight">
                    স্বাগতম{' '}
                    <span className="text-green-600 relative inline-block">
                        এগ্রোবাজারে
                        <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                            <path d="M0 4C50 1 150 1 200 4" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round"/>
                        </svg>
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 font-hind-siliguri max-w-2xl mx-auto">
                    কৃষি পণ্যের সঠিক মূল্য, বাজার তথ্য এবং ব্যবসায়িক সেবা এক জায়গায়
                </p>
            </div>

            {/* Quick Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickLinks.map((link, index) => (
                    <div
                        key={link.id}
                        onClick={() => onQuickLinkClick?.(link.id)}
                        className="bg-white hover:bg-gray-50 rounded-2xl p-6 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-1 border border-gray-100 group relative overflow-hidden"
                        style={{
                            animationDelay: `${index * 100}ms`
                        }}
                    >
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        
                        <div className="flex items-start gap-4">
                            {/* Icon with pulse effect */}
                            <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300 relative">
                                <div className="absolute inset-0 bg-green-200 rounded-xl opacity-0 group-hover:opacity-20 animate-pulse"></div>
                                {link.icon}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-800 font-hind-siliguri mb-1 group-hover:text-green-600 transition-colors">
                                    {link.title}
                                </h3>
                                <p className="text-sm text-gray-600 font-hind-siliguri">
                                    {link.description}
                                </p>
                            </div>

                            {/* Arrow Icon with animation */}
                            <div className="text-gray-400 group-hover:text-green-600 transition-all duration-300 group-hover:translate-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>

                        {/* Bottom accent line */}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-green-500 to-green-600 group-hover:w-full transition-all duration-500"></div>
                    </div>
                ))}
            </div>

            {/* Call to Action */}
            <div className="mt-10 text-center relative">
                <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-[32px] font-hind-siliguri text-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 relative overflow-hidden group">
                    <span className="relative z-10">আজই শুরু করুন</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:right-3">
                        →
                    </span>
                </button>
                
                {/* Stats or trust indicators */}
                <div className="mt-8 flex justify-center gap-8 text-sm text-gray-600 font-hind-siliguri">
                    <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xl">✓</span>
                        <span>১০,০০০+ কৃষক</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xl">✓</span>
                        <span>৫০০+ বাজার</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xl">✓</span>
                        <span>নির্ভরযোগ্য তথ্য</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
