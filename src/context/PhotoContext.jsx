import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const PhotoContext = createContext();

export const usePhoto = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhoto must be used within a PhotoProvider');
  }
  return context;
};

export const PhotoProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [groupedCategories, setGroupedCategories] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch categories first
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*');

        if (categoriesError) {
          console.error('Categories error:', categoriesError);
        } else {
          setCategories(categoriesData);
        }

        // Fetch photos with category information
        const { data: photosData, error: photosError } = await supabase
          .from('photos')
          .select(`
            *,
            categories (
              id,
              name,
              description
            )
          `);

        if (photosError) {
          console.error('Photos error:', photosError);
        } else {
          console.log('Photos with categories:', photosData);
          setPhotos(photosData);

          // Group photos by category
          const photosByCategory = photosData.reduce((acc, photo) => {
            const categoryName = photo.categories?.name;
            if (categoryName) {
              if (!acc[categoryName]) {
                acc[categoryName] = [];
              }
              acc[categoryName].push(photo);
            }
            return acc;
          }, {});

          // Create the expected format - use categories table for category_image
          const groupedCategoriesArray = categoriesData.map(category => {
            const categoryPhotos = photosByCategory[category.name] || [];
            return {
              category_name: category.name,
              category_image: category.image_url,
              images: categoryPhotos.map(photo => ({
                id: photo.id,
                title: photo.title,
                url: photo.url
              }))
            };
          });

          // Separate slider images - use Slider for desktop, MobileSlider for mobile
          const desktopSliderImages = photosByCategory.Slider || [];
          const mobileSliderImages = photosByCategory.MobileSlider || [];

          setGroupedCategories(groupedCategoriesArray);
          setSliderImages({ desktop: desktopSliderImages, mobile: mobileSliderImages });

          console.log('Grouped Categories:', groupedCategoriesArray);
          console.log('Desktop Slider Images:', desktopSliderImages);
          console.log('Mobile Slider Images:', mobileSliderImages);
        }
      } catch (err) {
        console.error('Connection error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const value = {
    photos,
    categories,
    groupedCategories,
    sliderImages,
    loading,
    setPhotos,
    setCategories,
    setGroupedCategories,
    setSliderImages
  };

  return (
    <PhotoContext.Provider value={value}>
      {children}
    </PhotoContext.Provider>
  );
};