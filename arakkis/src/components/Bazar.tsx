import { useState } from "react";

interface BazarProps {
  showAll: boolean;
  onShowMore: () => void;
}

function Bazar({ showAll, onShowMore }: BazarProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("সব ক্যাটাগরি");
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
      location: "ঢাকা",
    },
    {
      id: 2,
      name: "রুই মাছ",
      category: "মাছ",
      price: 380,
      unit: "কেজি",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Rohu_at_Giant_Hypermarket_Kota_Damansara_20230203_105829.jpg/1200px-Rohu_at_Giant_Hypermarket_Kota_Damansara_20230203_105829.jpg",
      seller: "করিম ফিশারি",
      rating: 4.8,
      reviews: 45,
      stock: "স্টকে আছে",
      location: "চট্টগ্রাম",
    },
    {
      id: 3,
      name: "দেশি মুরগি",
      category: "মাংস",
      price: 320,
      unit: "কেজি",
      image: "https://api.freshtoday.com.bd/media/65362b23a1ddd.jpg",
      seller: "আলম পোল্ট্রি",
      rating: 4.3,
      reviews: 28,
      stock: "স্টকে আছে",
      location: "সিলেট",
    },
    {
      id: 4,
      name: "বাসমতি চাল",
      category: "চাল ও ডাল",
      price: 85,
      unit: "কেজি",
      image:
        "data:image/jpeg;base64,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",
      seller: "সালাম ট্রেডার্স",
      rating: 4.6,
      reviews: 67,
      stock: "স্টকে আছে",
      location: "রাজশাহী",
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
      location: "খুলনা",
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
      location: "বগুড়া",
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
      location: "ময়মনসিংহ",
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
      location: "পাবনা",
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
      location: "চাঁদপুর",
    },
    // Additional products for expanded view
    {
      id: 10,
      name: "কাঁচা মরিচ",
      category: "সবজি",
      price: 60,
      unit: "কেজি",
      image: "images/chilli.jpeg",
      seller: "হক ভেজিটেবল",
      rating: 4.1,
      reviews: 25,
      stock: "স্টকে আছে",
      location: "যশোর",
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
      location: "কুমিল্লা",
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
      location: "ময়মনসিংহ",
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
      location: "নারায়ণগঞ্জ",
    },
    {
      id: 14,
      name: "শসা",
      category: "সবজি",
      price: 40,
      unit: "কেজি",
      image: "images/sosha.jpeg",
      seller: "রহমান ভেজিটেবল",
      rating: 4.3,
      reviews: 31,
      stock: "স্টকে আছে",
      location: "নাটোর",
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
      location: "ফরিদপুর",
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
      location: "রংপুর",
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
      location: "গাজীপুর",
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
      location: "খুলনা",
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
      location: "যশোর",
    },
    {
      id: 20,
      name: "ফুলকপি",
      category: "সবজি",
      price: 38,
      unit: "কেজি",
      image: "images/fulkopi.jpeg",
      seller: "কামাল ভেজিটেবল",
      rating: 4.1,
      reviews: 22,
      stock: "স্টকে আছে",
      location: "বরিশাল",
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
      location: "সিলেট",
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
      location: "কুষ্টিয়া",
    },
    {
      id: 23,
      name: "বাঁধাকপি",
      category: "সবজি",
      price: 30,
      unit: "কেজি",
      image: "images/badhakopi.jpeg",
      seller: "তাজ ভেজিটেবল",
      rating: 4.0,
      reviews: 19,
      stock: "স্টকে আছে",
      location: "ঢাকা",
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
      location: "চট্টগ্রাম",
    },
  ];

  // Filter and search logic
  const filteredProducts = allProducts.filter((product) => {
    // Category filter
    const categoryMatch =
      selectedCategory === "সব ক্যাটাগরি" ||
      product.category === selectedCategory;

    // Search filter
    const searchMatch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.location.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  // Pagination logic
  const totalProducts = showAll ? filteredProducts.length : 9;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Calculate products to display
  let displayProducts;
  if (showAll) {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    displayProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
  } else {
    displayProducts = filteredProducts.slice(0, 9);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of bazar section
    const bazarElement = document.getElementById("bazar-section");
    if (bazarElement) {
      bazarElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setCurrentPage(1);
    // Scroll to products
    setTimeout(() => {
      const productsGrid = document.querySelector(".grid");
      if (productsGrid) {
        productsGrid.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ★
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <section
      id="bazar-section"
      className="w-full bg-white rounded-t-[40px] shadow-lg"
    >
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
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl font-hind-siliguri text-sm focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              >
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
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="flex-1 bg-transparent text-gray-900 text-base font-hind-siliguri leading-4 outline-none placeholder:text-gray-400"
              />
              <div className="flex items-center gap-2">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Clear search"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
                <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Popular Search Tags */}
            <div className="flex flex-wrap justify-center items-center gap-3">
              {[
                "দেশি আলু",
                "তাজা টমেটো",
                "কাতলা মাছ",
                "ইলিশ মাছ",
                "দেশি মুরগি",
              ].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
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
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group cursor-pointer transform hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 50}ms`,
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
                  <div
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium font-hind-siliguri ${
                      product.stock === "সীমিত স্টক"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-green-600 group-hover:text-white transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-800 font-hind-siliguri mb-2">
              কোনো পণ্য পাওয়া যায়নি
            </h3>
            <p className="text-gray-600 font-hind-siliguri mb-6">
              আপনার সার্চ "{searchQuery}" এর জন্য কোনো পণ্য খুঁজে পাওয়া যায়নি
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("সব ক্যাটাগরি");
              }}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-[32px] font-hind-siliguri text-sm font-medium transition-colors"
            >
              সব পণ্য দেখুন
            </button>
          </div>
        )}

        {/* Load More Button - Only show if not showing all products */}
        {!showAll && displayProducts.length > 0 && (
          <div className="mt-10 text-center pb-4">
            <button
              onClick={onShowMore}
              className="px-8 py-3 bg-white hover:bg-green-600 text-gray-800 hover:text-white border-2 border-green-600 rounded-[32px] font-hind-siliguri text-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
            >
              আরো পণ্য দেখুন
            </button>
          </div>
        )}

        {/* Pagination - Only show when viewing all products and have results */}
        {showAll && totalPages > 1 && displayProducts.length > 0 && (
          <div className="mt-10 pb-4">
            <div className="flex justify-center items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-xl font-hind-siliguri text-sm font-medium transition-all duration-300 ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-800 hover:bg-green-600 hover:text-white border border-gray-200"
                }`}
              >
                ← পূর্ববর্তী
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-xl font-hind-siliguri text-sm font-medium transition-all duration-300 ${
                        currentPage === pageNum
                          ? "bg-green-600 text-white shadow-md"
                          : "bg-white text-gray-800 hover:bg-green-100 border border-gray-200"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-xl font-hind-siliguri text-sm font-medium transition-all duration-300 ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-800 hover:bg-green-600 hover:text-white border border-gray-200"
                }`}
              >
                পরবর্তী →
              </button>
            </div>

            {/* Page Info */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 font-hind-siliguri">
                পৃষ্ঠা {currentPage} এর {totalPages} | মোট {totalProducts} টি
                পণ্য
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Bazar;
