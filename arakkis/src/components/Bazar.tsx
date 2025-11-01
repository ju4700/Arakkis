import { useState } from 'react';

interface BazarProps {
    showAll: boolean;
    onShowMore: () => void;
}

function Bazar({ showAll, onShowMore }: BazarProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = showAll ? 12 : 9; // 12 for market view (3x4), 9 for home view (3x3)

    const allProducts = [
        {
            id: 1,
            name: "তাজা টমেটো",
            category: "সবজি",
            price: 45,
            unit: "কেজি",
            image: "images/tomato.jpeg",
            seller: "রহিম স্টোর",
            rating: 4.5,
            reviews: 32,
            stock: "স্টকে আছে",
            location: "ঢাকা"
        },
        {
            id: 2,
            name: "রুই মাছ",
            category: "মাছ",
            price: 380,
            unit: "কেজি",
            image: "https://placehold.co/300x300/87CEEB/FFFFFF?text=রুই+মাছ",
            seller: "করিম ফিশারি",
            rating: 4.8,
            reviews: 45,
            stock: "স্টকে আছে",
            location: "চট্টগ্রাম"
        },
        {
            id: 3,
            name: "দেশি মুরগি",
            category: "মাংস",
            price: 320,
            unit: "কেজি",
            image: "https://placehold.co/300x300/FFB6C1/FFFFFF?text=মুরগি",
            seller: "আলম পোল্ট্রি",
            rating: 4.3,
            reviews: 28,
            stock: "স্টকে আছে",
            location: "সিলেট"
        },
        {
            id: 4,
            name: "বাসমতি চাল",
            category: "চাল ও ডাল",
            price: 85,
            unit: "কেজি",
            image: "https://placehold.co/300x300/F5DEB3/FFFFFF?text=চাল",
            seller: "সালাম ট্রেডার্স",
            rating: 4.6,
            reviews: 67,
            stock: "স্টকে আছে",
            location: "রাজশাহী"
        },
        {
            id: 5,
            name: "কাতলা মাছ",
            category: "মাছ",
            price: 420,
            unit: "কেজি",
            image: "https://placehold.co/300x300/87CEEB/FFFFFF?text=কাতলা",
            seller: "হাসান ফিশ সেন্টার",
            rating: 4.7,
            reviews: 53,
            stock: "সীমিত স্টক",
            location: "খুলনা"
        },
        {
            id: 6,
            name: "আলু",
            category: "সবজি",
            price: 35,
            unit: "কেজি",
            image: "images/alu.jpeg",
            seller: "মিজান ভেজিটেবল",
            rating: 4.2,
            reviews: 41,
            stock: "স্টকে আছে",
            location: "বগুড়া"
        },
        {
            id: 7,
            name: "খাসি মাংস",
            category: "মাংস",
            price: 750,
            unit: "কেজি",
            image: "https://placehold.co/300x300/FFB6C1/FFFFFF?text=খাসি",
            seller: "জামাল মিট শপ",
            rating: 4.9,
            reviews: 38,
            stock: "স্টকে আছে",
            location: "ময়মনসিংহ"
        },
        {
            id: 8,
            name: "পেঁয়াজ",
            category: "সবজি",
            price: 55,
            unit: "কেজি",
            image: "images/peyaj.jpeg",
            seller: "রফিক এন্টারপ্রাইজ",
            rating: 4.4,
            reviews: 29,
            stock: "স্টকে আছে",
            location: "পাবনা"
        },
        {
            id: 9,
            name: "ইলিশ মাছ",
            category: "মাছ",
            price: 1200,
            unit: "কেজি",
            image: "images/elish.jpeg",
            seller: "বাবলু ফিশ মার্কেট",
            rating: 5.0,
            reviews: 89,
            stock: "সীমিত স্টক",
            location: "চাঁদপুর"
        },
        // Additional products for expanded view
        {
            id: 10,
            name: "কাঁচা মরিচ",
            category: "সবজি",
            price: 60,
            unit: "কেজি",
            image: "https://placehold.co/300x300/90EE90/FFFFFF?text=কাঁচা+মরিচ",
            seller: "হক ভেজিটেবল",
            rating: 4.1,
            reviews: 25,
            stock: "স্টকে আছে",
            location: "যশোর"
        },
        {
            id: 11,
            name: "গরুর মাংস",
            category: "মাংস",
            price: 650,
            unit: "কেজি",
            image: "https://placehold.co/300x300/FFB6C1/FFFFFF?text=গরুর+মাংস",
            seller: "কবির মিট শপ",
            rating: 4.7,
            reviews: 52,
            stock: "স্টকে আছে",
            location: "কুমিল্লা"
        },
        {
            id: 12,
            name: "পাঙ্গাশ মাছ",
            category: "মাছ",
            price: 220,
            unit: "কেজি",
            image: "https://placehold.co/300x300/87CEEB/FFFFFF?text=পাঙ্গাশ",
            seller: "সুমন ফিশারি",
            rating: 4.0,
            reviews: 36,
            stock: "স্টকে আছে",
            location: "ময়মনসিংহ"
        },
        {
            id: 13,
            name: "মিনিকেট চাল",
            category: "চাল ও ডাল",
            price: 65,
            unit: "কেজি",
            image: "https://placehold.co/300x300/F5DEB3/FFFFFF?text=মিনিকেট",
            seller: "আলী ট্রেডার্স",
            rating: 4.5,
            reviews: 74,
            stock: "স্টকে আছে",
            location: "নারায়ণগঞ্জ"
        },
        {
            id: 14,
            name: "শসা",
            category: "সবজি",
            price: 40,
            unit: "কেজি",
            image: "https://placehold.co/300x300/90EE90/FFFFFF?text=শসা",
            seller: "রহমান ভেজিটেবল",
            rating: 4.3,
            reviews: 31,
            stock: "স্টকে আছে",
            location: "নাটোর"
        },
        {
            id: 15,
            name: "মুগ ডাল",
            category: "চাল ও ডাল",
            price: 120,
            unit: "কেজি",
            image: "https://placehold.co/300x300/F5DEB3/FFFFFF?text=মুগ+ডাল",
            seller: "হোসেন ট্রেডার্স",
            rating: 4.8,
            reviews: 63,
            stock: "স্টকে আছে",
            location: "ফরিদপুর"
        },
        {
            id: 16,
            name: "গাজর",
            category: "সবজি",
            price: 50,
            unit: "কেজি",
            image: "https://placehold.co/300x300/FFA500/FFFFFF?text=গাজর",
            seller: "নূর ভেজিটেবল",
            rating: 4.4,
            reviews: 27,
            stock: "স্টকে আছে",
            location: "রংপুর"
        },
        {
            id: 17,
            name: "ব্রয়লার মুরগি",
            category: "মাংস",
            price: 180,
            unit: "কেজি",
            image: "https://placehold.co/300x300/FFB6C1/FFFFFF?text=ব্রয়লার",
            seller: "শাহ পোল্ট্রি",
            rating: 4.2,
            reviews: 44,
            stock: "স্টকে আছে",
            location: "গাজীপুর"
        },
        {
            id: 18,
            name: "চিংড়ি মাছ",
            category: "মাছ",
            price: 850,
            unit: "কেজি",
            image: "https://placehold.co/300x300/87CEEB/FFFFFF?text=চিংড়ি",
            seller: "রাজ ফিশারি",
            rating: 4.9,
            reviews: 71,
            stock: "সীমিত স্টক",
            location: "খুলনা"
        },
        {
            id: 19,
            name: "মসুর ডাল",
            category: "চাল ও ডাল",
            price: 110,
            unit: "কেজি",
            image: "https://placehold.co/300x300/F5DEB3/FFFFFF?text=মসুর+ডাল",
            seller: "বশির ট্রেডার্স",
            rating: 4.6,
            reviews: 58,
            stock: "স্টকে আছে",
            location: "যশোর"
        },
        {
            id: 20,
            name: "ফুলকপি",
            category: "সবজি",
            price: 38,
            unit: "কেজি",
            image: "https://placehold.co/300x300/F5F5DC/FFFFFF?text=ফুলকপি",
            seller: "কামাল ভেজিটেবল",
            rating: 4.1,
            reviews: 22,
            stock: "স্টকে আছে",
            location: "বরিশাল"
        },
        {
            id: 21,
            name: "বোয়াল মাছ",
            category: "মাছ",
            price: 520,
            unit: "কেজি",
            image: "https://placehold.co/300x300/87CEEB/FFFFFF?text=বোয়াল",
            seller: "মান্নান ফিশ সেন্টার",
            rating: 4.5,
            reviews: 39,
            stock: "স্টকে আছে",
            location: "সিলেট"
        },
        {
            id: 22,
            name: "ছোলা",
            category: "চাল ও ডাল",
            price: 95,
            unit: "কেজি",
            image: "https://placehold.co/300x300/F5DEB3/FFFFFF?text=ছোলা",
            seller: "ইসলাম ট্রেডার্স",
            rating: 4.3,
            reviews: 46,
            stock: "স্টকে আছে",
            location: "কুষ্টিয়া"
        },
        {
            id: 23,
            name: "বাঁধাকপি",
            category: "সবজি",
            price: 30,
            unit: "কেজি",
            image: "https://placehold.co/300x300/90EE90/FFFFFF?text=বাঁধাকপি",
            seller: "তাজ ভেজিটেবল",
            rating: 4.0,
            reviews: 19,
            stock: "স্টকে আছে",
            location: "ঢাকা"
        },
        {
            id: 24,
            name: "ভেড়ার মাংস",
            category: "মাংস",
            price: 900,
            unit: "কেজি",
            image: "https://placehold.co/300x300/FFB6C1/FFFFFF?text=ভেড়া",
            seller: "হাফিজ মিট শপ",
            rating: 4.8,
            reviews: 34,
            stock: "সীমিত স্টক",
            location: "চট্টগ্রাম"
        }
    ];

    // Pagination logic
    const totalProducts = showAll ? allProducts.length : 9;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    
    // Calculate products to display
    let displayProducts;
    if (showAll) {
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        displayProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    } else {
        displayProducts = allProducts.slice(0, 9);
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        // Scroll to top of bazar section
        const bazarElement = document.getElementById('bazar-section');
        if (bazarElement) {
            bazarElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <span key={`full-${i}`} className="text-yellow-400">★</span>
            );
        }

        if (hasHalfStar) {
            stars.push(
                <span key="half" className="text-yellow-400">★</span>
            );
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <span key={`empty-${i}`} className="text-gray-300">★</span>
            );
        }

        return stars;
    };

    return (
        <section id="bazar-section" className="w-full bg-white rounded-t-[40px] shadow-lg">
            <div className="w-full max-w-[1200px] mx-auto py-12 px-5">
                {/* Section Header */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-hind-siliguri mb-2">
                                আজকের <span className="text-green-600">বাজার</span>
                            </h2>
                            <p className="text-gray-600 font-hind-siliguri">
                                তাজা পণ্য, সেরা দাম - সরাসরি বিক্রেতার কাছ থেকে
                            </p>
                        </div>
                        
                        {/* Filter/Sort options */}
                        <div className="flex gap-3">
                            <select className="px-4 py-2 bg-white border border-gray-200 rounded-xl font-hind-siliguri text-sm focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer">
                                <option>সব ক্যাটাগরি</option>
                                <option>সবজি</option>
                                <option>মাছ</option>
                                <option>মাংস</option>
                                <option>চাল ও ডাল</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Bar with Popular Tags */}
                    <div className="flex flex-col items-center gap-3.5">
                        {/* Search Input */}
                        <div className="w-full max-w-[685px] h-12 px-5 bg-white rounded-[41px] shadow-sm border border-gray-200 flex justify-between items-center group hover:border-green-500 transition-colors">
                            <input 
                                type="text" 
                                placeholder="সন্ধান করুন"
                                className="flex-1 bg-transparent text-gray-900 text-base font-hind-siliguri leading-4 outline-none placeholder:text-gray-400"
                            />
                            <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* Popular Search Tags */}
                        <div className="flex flex-wrap justify-center items-center gap-3">
                            {['দেশি আলু', 'তাজা টমেটো', 'কাতলা মাছ', 'ইলিশ মাছ', 'দেশি মুরগি'].map((tag) => (
                                <button
                                    key={tag}
                                    className="px-4 py-1.5 bg-white rounded-full shadow-sm border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all duration-300 cursor-pointer group"
                                >
                                    <span className="text-black group-hover:text-green-600 text-xs font-hind-siliguri leading-3 transition-colors">
                                        {tag}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProducts.map((product, index) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group cursor-pointer transform hover:-translate-y-1"
                        style={{
                            animationDelay: `${index * 50}ms`
                        }}
                    >
                        {/* Product Image */}
                        <div className="relative overflow-hidden bg-gray-50 h-48">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            {/* Stock Badge */}
                            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium font-hind-siliguri ${
                                product.stock === "সীমিত স্টক" 
                                    ? "bg-orange-100 text-orange-700" 
                                    : "bg-green-100 text-green-700"
                            }`}>
                                {product.stock}
                            </div>
                            {/* Category Badge */}
                            <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium font-hind-siliguri text-gray-700">
                                {product.category}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-5">
                            {/* Product Name & Price */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-800 font-hind-siliguri mb-1 group-hover:text-green-600 transition-colors">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 font-hind-siliguri">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {product.location}
                                    </div>
                                </div>
                                
                                {/* Price */}
                                <div className="text-right">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-green-600 font-hind-siliguri">
                                            ৳{product.price}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500 font-hind-siliguri">
                                        / {product.unit}
                                    </span>
                                </div>
                            </div>

                            {/* Seller Info & Rating */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">
                                        {product.seller.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 font-hind-siliguri">
                                            {product.seller}
                                        </p>
                                        <div className="flex items-center gap-1">
                                            <div className="flex text-xs">
                                                {renderStars(product.rating)}
                                            </div>
                                            <span className="text-xs text-gray-500 font-hind-siliguri">
                                                ({product.reviews})
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button className="w-9 h-9 bg-green-50 hover:bg-green-600 rounded-xl flex items-center justify-center transition-colors group-hover:scale-110 duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More Button - Only show if not showing all products */}
            {!showAll && (
                <div className="mt-10 text-center pb-4">
                    <button 
                        onClick={onShowMore}
                        className="px-8 py-3 bg-white hover:bg-green-600 text-gray-800 hover:text-white border-2 border-green-600 rounded-[32px] font-hind-siliguri text-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                    >
                        আরো পণ্য দেখুন
                    </button>
                </div>
            )}

            {/* Pagination - Only show when viewing all products */}
            {showAll && totalPages > 1 && (
                <div className="mt-10 pb-4">
                    <div className="flex justify-center items-center gap-2">
                        {/* Previous Button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-xl font-hind-siliguri text-sm font-medium transition-all duration-300 ${
                                currentPage === 1
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-800 hover:bg-green-600 hover:text-white border border-gray-200'
                            }`}
                        >
                            ← পূর্ববর্তী
                        </button>

                        {/* Page Numbers */}
                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`w-10 h-10 rounded-xl font-hind-siliguri text-sm font-medium transition-all duration-300 ${
                                        currentPage === pageNum
                                            ? 'bg-green-600 text-white shadow-md'
                                            : 'bg-white text-gray-800 hover:bg-green-100 border border-gray-200'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-xl font-hind-siliguri text-sm font-medium transition-all duration-300 ${
                                currentPage === totalPages
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-800 hover:bg-green-600 hover:text-white border border-gray-200'
                            }`}
                        >
                            পরবর্তী →
                        </button>
                    </div>

                    {/* Page Info */}
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600 font-hind-siliguri">
                            পৃষ্ঠা {currentPage} এর {totalPages} | মোট {totalProducts} টি পণ্য
                        </p>
                    </div>
                </div>
            )}
        </div>
        </section>
    );
}

export default Bazar;
