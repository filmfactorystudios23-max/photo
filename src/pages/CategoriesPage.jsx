import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, Camera } from 'lucide-react';
import { categoriesService, photosService } from '../services/database.js';
import '../styles/admin.css';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesWithPhotos, setCategoriesWithPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadCategoriesWithPhotos();
  }, []);

  const loadCategoriesWithPhotos = async () => {
    try {
      setLoading(true);
      const [categoriesData, photosData] = await Promise.all([
        categoriesService.getAll(),
        photosService.getAll()
      ]);

      // Count photos for each category and get first photo as thumbnail
      const categoriesWithCounts = categoriesData.map(category => {
        const categoryPhotos = photosData.filter(photo => photo.category_id === category.id);
        return {
          ...category,
          photoCount: categoryPhotos.length,
          // Use category image if available, otherwise fall back to first photo
          thumbnailUrl: category.image_url || categoryPhotos[0]?.url || null
        };
      });

      setCategoriesWithPhotos(categoriesWithCounts);
    } catch (err) {
      setError('Failed to load categories: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId, categoryName) => {
    navigate(`/category/${categoryId}`, { state: { categoryName } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <Loader className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Photo Categories</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our collection of professional photography across different categories
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid - Product Card Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categoriesWithPhotos.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id, category.name)}
              className="group bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 border border-gray-100"
            >
              {/* Category Image - Premium Product Card Style */}
              <div className="relative h-64 overflow-hidden">
                {category.thumbnailUrl ? (
                  <img
                    src={category.thumbnailUrl}
                    alt={category.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
                    <div className="text-center text-white">
                      <Camera size={48} className="mx-auto mb-3 opacity-90" />
                      <span className="text-lg font-bold tracking-wide">{category.name}</span>
                    </div>
                  </div>
                )}

                {/* Premium Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Elegant Photo Count Badge */}
                <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-lg px-4 py-2 rounded-2xl border border-white/20">
                  <span className="text-sm font-bold text-white">
                    {category.photoCount}
                  </span>
                </div>

                {/* Floating Category Name */}
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-bold text-2xl mb-1 drop-shadow-lg">
                    {category.name}
                  </h3>
                  <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Click to explore gallery →
                  </p>
                </div>
              </div>

              {/* Category Info */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    View Gallery →
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(category.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {categoriesWithPhotos.length === 0 && (
          <div className="text-center py-12">
            <Camera size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Categories Found</h3>
            <p className="text-gray-600">
              Categories will appear here once they are added to the database.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;