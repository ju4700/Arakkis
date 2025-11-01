function Contact() {
    const contactInfo = [
        {
            icon: '📍',
            title: 'ঠিকানা',
            details: 'ঢাকা, বাংলাদেশ',
            subtitle: 'আমাদের অফিস'
        },
        {
            icon: '📧',
            title: 'ইমেইল',
            details: 'info@agrobazar.com',
            subtitle: 'সাধারণ জিজ্ঞাসা'
        },
        {
            icon: '📞',
            title: 'ফোন',
            details: '+880 1XXX-XXXXXX',
            subtitle: 'সাপোর্ট হটলাইন'
        },
        {
            icon: '⏰',
            title: 'সময়',
            details: 'সকাল ৯টা - রাত ৯টা',
            subtitle: 'সাত দিন খোলা'
        }
    ];

    const socialLinks = [
        { name: 'Facebook', icon: '📘', url: '#', color: 'hover:text-blue-600' },
        { name: 'Twitter', icon: '🐦', url: '#', color: 'hover:text-sky-500' },
        { name: 'Instagram', icon: '📸', url: '#', color: 'hover:text-pink-600' },
        { name: 'LinkedIn', icon: '💼', url: '#', color: 'hover:text-blue-700' },
        { name: 'YouTube', icon: '📺', url: '#', color: 'hover:text-red-600' }
    ];

    return (
        <div className="w-full max-w-[1200px] mx-auto px-5 py-12">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium font-hind-siliguri mb-4">
                    যোগাযোগ করুন
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-hind-siliguri mb-4">
                    আমাদের সাথে যোগাযোগ
                </h1>
                <p className="text-lg text-gray-600 font-hind-siliguri max-w-2xl mx-auto">
                    আপনার যেকোনো প্রশ্ন বা পরামর্শ আমাদের সাথে শেয়ার করুন। আমরা সবসময় আপনাকে সাহায্য করতে প্রস্তুত।
                </p>
            </div>

            {/* Contact Info Cards - Bazar Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {contactInfo.map((info, index) => (
                    <div 
                        key={index}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group transform hover:-translate-y-1"
                    >
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors">
                                <span className="text-3xl group-hover:scale-110 transition-transform">{info.icon}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 font-hind-siliguri mb-2">{info.title}</h3>
                            <p className="text-green-600 font-semibold font-hind-siliguri mb-1">{info.details}</p>
                            <p className="text-sm text-gray-500 font-hind-siliguri">{info.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content - Form and Map */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {/* Contact Form - Bazar Card Style */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-8">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 -m-8 mb-6 p-6">
                        <h2 className="text-2xl font-bold text-white font-hind-siliguri">আপনার বার্তা পাঠান</h2>
                        <p className="text-green-100 font-hind-siliguri">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব</p>
                    </div>

                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 font-hind-siliguri mb-2">
                                আপনার নাম
                            </label>
                            <input
                                type="text"
                                placeholder="নাম লিখুন"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-hind-siliguri transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 font-hind-siliguri mb-2">
                                ইমেইল
                            </label>
                            <input
                                type="email"
                                placeholder="আপনার ইমেইল"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-hind-siliguri transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 font-hind-siliguri mb-2">
                                ফোন নম্বর
                            </label>
                            <input
                                type="tel"
                                placeholder="+880 1XXX-XXXXXX"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-hind-siliguri transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 font-hind-siliguri mb-2">
                                বিষয়
                            </label>
                            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-hind-siliguri transition-all">
                                <option>বিষয় নির্বাচন করুন</option>
                                <option>সাধারণ জিজ্ঞাসা</option>
                                <option>প্রযুক্তিগত সহায়তা</option>
                                <option>পণ্য সম্পর্কিত</option>
                                <option>অন্যান্য</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 font-hind-siliguri mb-2">
                                আপনার বার্তা
                            </label>
                            <textarea
                                rows={5}
                                placeholder="আপনার বার্তা লিখুন..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-hind-siliguri transition-all resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl font-hind-siliguri text-lg transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                        >
                            বার্তা পাঠান →
                        </button>
                    </form>
                </div>

                {/* Map & Additional Info */}
                <div className="space-y-6">
                    {/* Map Card */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                            <h3 className="text-xl font-bold text-white font-hind-siliguri">আমাদের অবস্থান</h3>
                        </div>
                        <div className="aspect-video bg-gray-100 relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703692693!2d90.25487337469203!3d23.780573258035957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1699999999999!5m2!1sen!2sbd"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0"
                            ></iframe>
                        </div>
                    </div>

                    {/* FAQ Quick Links */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-6">
                        <h3 className="text-xl font-bold text-gray-900 font-hind-siliguri mb-4">দ্রুত সহায়তা</h3>
                        <div className="space-y-3">
                            {[
                                { q: 'কিভাবে অর্ডার করবো?', icon: '🛒' },
                                { q: 'পেমেন্ট পদ্ধতি কি কি?', icon: '💳' },
                                { q: 'ডেলিভারি কত সময়ে?', icon: '🚚' },
                                { q: 'রিফান্ড পলিসি কি?', icon: '↩️' }
                            ].map((faq, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-green-50 transition-colors group border border-transparent hover:border-green-200"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{faq.icon}</span>
                                        <span className="text-gray-700 font-hind-siliguri group-hover:text-green-600 transition-colors">{faq.q}</span>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl overflow-hidden shadow-lg p-8 text-center">
                <h2 className="text-3xl font-bold text-white font-hind-siliguri mb-3">সোশ্যাল মিডিয়ায় আমরা</h2>
                <p className="text-green-100 font-hind-siliguri mb-6">আমাদের সাথে সংযুক্ত থাকুন</p>
                
                <div className="flex justify-center gap-4 flex-wrap">
                    {socialLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.url}
                            className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl hover:scale-110 transition-transform shadow-md hover:shadow-lg"
                            title={social.name}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>

            {/* Support Section */}
            <div className="mt-12 text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 font-hind-siliguri mb-3">সাহায্য প্রয়োজন?</h3>
                <p className="text-gray-600 font-hind-siliguri mb-6">
                    আমাদের সাপোর্ট টিম সবসময় আপনাকে সাহায্য করতে প্রস্তুত। যেকোনো সমস্যার জন্য আমাদের সাথে যোগাযোগ করুন।
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                    <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full font-hind-siliguri transition-all shadow-md hover:shadow-lg transform hover:scale-105">
                        লাইভ চ্যাট শুরু করুন 💬
                    </button>
                    <button className="px-8 py-3 bg-white hover:bg-gray-50 text-green-600 font-bold rounded-full font-hind-siliguri border-2 border-green-600 transition-all transform hover:scale-105">
                        FAQ দেখুন 📖
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Contact;
