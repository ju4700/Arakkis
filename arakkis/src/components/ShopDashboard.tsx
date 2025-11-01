import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = 'https://arakkiss.onrender.com/api';

const productCategories = ['সবজি', 'ফল', 'মাছ', 'মুরগি', 'ডিম', 'দুগ্ধজাত', 'শস্য', 'ডাল', 'তেল', 'মসলা', 'অন্যান্য'];
const productUnits = ['কেজি', 'লিটার', 'পিস', 'ডজন', 'বান্ডিল', 'কুইন্টাল'];

interface Shop {
  _id: string;
  name: string;
  description: string;
  type: string;
  location: string;
  district: string;
  verificationStatus: string;
  rating: number;
  totalReviews: number;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  images: string[];
  isAvailable: boolean;
}

export default function ShopDashboard() {
  const { token } = useAuth();
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    unit: '',
    stock: '',
    images: [] as string[]
  });

  useEffect(() => {
    fetchShopAndProducts();
  }, []);

  const fetchShopAndProducts = async () => {
    try {
      setLoading(true);
      
      const shopResponse = await fetch(`${API_URL}/shops/my/shop`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const shopData = await shopResponse.json();
      
      if (shopResponse.ok && shopData.shop) {
        setShop(shopData.shop);
      }

      const productsResponse = await fetch(`${API_URL}/products/my/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const productsData = await productsResponse.json();
      
      if (productsResponse.ok) {
        setProducts(productsData.products || []);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        setError('ছবির আকার ৫ এমবি এর কম হতে হবে');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProductForm(prev => ({
          ...prev,
          images: [...prev.images, reader.result as string]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productForm.name || !productForm.category || !productForm.price || !productForm.unit || !productForm.stock) {
      setError('সব তথ্য পূরণ করুন');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const url = editingProduct 
        ? `${API_URL}/products/${editingProduct._id}`
        : `${API_URL}/products`;
      
      const method = editingProduct ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...productForm,
          price: Number(productForm.price),
          stock: Number(productForm.stock)
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'পণ্য যোগ করতে সমস্যা হয়েছে');
      }

      setProductForm({
        name: '',
        description: '',
        category: '',
        price: '',
        unit: '',
        stock: '',
        images: []
      });
      setShowAddProduct(false);
      setEditingProduct(null);
      fetchShopAndProducts();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price.toString(),
      unit: product.unit,
      stock: product.stock.toString(),
      images: product.images
    });
    setShowAddProduct(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('আপনি কি নিশ্চিত এই পণ্যটি মুছে ফেলতে চান?')) return;

    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        fetchShopAndProducts();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleToggleAvailability = async (product: Product) => {
    try {
      const response = await fetch(`${API_URL}/products/${product._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          isAvailable: !product.isAvailable
        })
      });

      if (response.ok) {
        fetchShopAndProducts();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading && !shop) {
    return (
      <div className="w-full max-w-[1200px] mx-auto py-8 px-5">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600 font-hind-siliguri">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto py-8 px-5">
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-3">
              <span className="text-xl">🏪</span>
              <span className="text-green-700 font-medium font-hind-siliguri">আমার দোকান</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 font-hind-siliguri">{shop?.name}</h1>
            <p className="text-gray-600 font-hind-siliguri">{shop?.description}</p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              shop?.verificationStatus === 'verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              <span>{shop?.verificationStatus === 'verified' ? '✓' : '⏳'}</span>
              <span className="font-medium font-hind-siliguri">
                {shop?.verificationStatus === 'verified' ? 'যাচাইকৃত' : 'যাচাইকরণ চলছে'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm text-gray-600 font-hind-siliguri">দোকানের ধরন</div>
            <div className="text-lg font-bold text-gray-800 font-hind-siliguri">{shop?.type}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm text-gray-600 font-hind-siliguri">অবস্থান</div>
            <div className="text-lg font-bold text-gray-800 font-hind-siliguri">{shop?.location}, {shop?.district}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm text-gray-600 font-hind-siliguri">মোট পণ্য</div>
            <div className="text-lg font-bold text-gray-800">{products.length}</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6 font-hind-siliguri">
          {error}
        </div>
      )}

      <div className="mb-6">
        <button
          onClick={() => {
            setShowAddProduct(!showAddProduct);
            setEditingProduct(null);
            setProductForm({
              name: '',
              description: '',
              category: '',
              price: '',
              unit: '',
              stock: '',
              images: []
            });
          }}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-colors font-hind-siliguri inline-flex items-center gap-2"
        >
          <span className="text-xl">{showAddProduct ? '✕' : '+'}</span>
          {showAddProduct ? 'বাতিল করুন' : 'নতুন পণ্য যোগ করুন'}
        </button>
      </div>

      {showAddProduct && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-green-700 font-hind-siliguri">
            {editingProduct ? 'পণ্য সম্পাদনা করুন' : 'নতুন পণ্য যোগ করুন'}
          </h2>
          <form onSubmit={handleSubmitProduct} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2 font-hind-siliguri">পণ্যের নাম *</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="যেমন: তাজা টমেটো"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 font-hind-siliguri"
                />
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2 font-hind-siliguri">বিভাগ *</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 font-hind-siliguri"
                >
                  <option value="">নির্বাচন করুন</option>
                  {productCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-2 font-hind-siliguri">বিবরণ</label>
              <textarea
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                placeholder="পণ্য সম্পর্কে বিস্তারিত..."
                rows={3}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none font-hind-siliguri"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2 font-hind-siliguri">দাম (টাকা) *</label>
                <input
                  type="number"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  placeholder="০"
                  min="0"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2 font-hind-siliguri">একক *</label>
                <select
                  value={productForm.unit}
                  onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 font-hind-siliguri"
                >
                  <option value="">নির্বাচন করুন</option>
                  {productUnits.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2 font-hind-siliguri">স্টক *</label>
                <input
                  type="number"
                  value={productForm.stock}
                  onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                  placeholder="০"
                  min="0"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-2 font-hind-siliguri">পণ্যের ছবি</label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center">
                <label className="cursor-pointer inline-flex flex-col items-center">
                  <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-base text-gray-600 mb-1 font-hind-siliguri">ছবি নির্বাচন করুন</span>
                  <span className="text-gray-400 text-xs font-hind-siliguri">JPEG, PNG, সর্বোচ্চ ৫ এমবি</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                {productForm.images.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {productForm.images.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img src={img} alt="" className="w-20 h-20 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => setProductForm({
                            ...productForm,
                            images: productForm.images.filter((_, i) => i !== idx)
                          })}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowAddProduct(false);
                  setEditingProduct(null);
                  setProductForm({
                    name: '',
                    description: '',
                    category: '',
                    price: '',
                    unit: '',
                    stock: '',
                    images: []
                  });
                }}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full font-medium transition-colors font-hind-siliguri"
              >
                বাতিল
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-full font-medium transition-colors font-hind-siliguri"
              >
                {loading ? 'সংরক্ষণ হচ্ছে...' : editingProduct ? 'আপডেট করুন' : 'পণ্য যোগ করুন'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 font-hind-siliguri">আমার পণ্য</h2>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-600 font-hind-siliguri">এখনও কোন পণ্য যোগ করা হয়নি</p>
            <p className="text-sm text-gray-500 mt-2 font-hind-siliguri">উপরের বাটনে ক্লিক করে পণ্য যোগ করুন</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow"
              >
                {product.images[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-xl mb-3"
                  />
                )}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-800 font-hind-siliguri">{product.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  } font-hind-siliguri`}>
                    {product.isAvailable ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 font-hind-siliguri line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xl font-bold text-green-700">৳{product.price}</div>
                    <div className="text-sm text-gray-600 font-hind-siliguri">প্রতি {product.unit}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 font-hind-siliguri">স্টক</div>
                    <div className="text-lg font-bold text-gray-800">{product.stock}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleAvailability(product)}
                    className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors font-hind-siliguri"
                  >
                    {product.isAvailable ? 'নিষ্ক্রিয় করুন' : 'সক্রিয় করুন'}
                  </button>
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full text-sm font-medium transition-colors"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-full text-sm font-medium transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
