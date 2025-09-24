import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Loader } from "lucide-react";
import { categoriesService, photosService } from "../services/database.js";
import ImageUpload from "../components/ImageUpload.jsx";
import PhotoEditModal from "../components/PhotoEditModal.jsx";
import CategoryImageUpload from "../components/CategoryImageUpload.jsx";
import { deleteFromCloudinary } from "../lib/cloudinary.js";
import "../styles/admin.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("categories");

  return (
    <div className=" min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("categories")}
                className={`px-3 py-2 text-sm font-medium ${
                  activeTab === "categories"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => setActiveTab("photos")}
                className={`px-3 py-2 text-sm font-medium ${
                  activeTab === "photos"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Photos
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "categories" && <CategoriesManager />}
        {activeTab === "photos" && <PhotosManager />}
      </div>
    </div>
  );
};

const CategoriesManager = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image_url: "",
    image_public_id: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoriesService.getAll();
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.name.trim()) {
      try {
        const category = await categoriesService.create({
          name: newCategory.name,
          description: newCategory.description,
          image_url: newCategory.image_url,
          image_public_id: newCategory.image_public_id,
        });
        setCategories([category, ...categories]);
        setNewCategory({
          name: "",
          description: "",
          image_url: "",
          image_public_id: "",
        });
        setShowAddForm(false);
      } catch (err) {
        setError("Failed to add category: " + err.message);
      }
    }
  };

  const handleCategoryImageUpload = (imageData) => {
    setNewCategory({
      ...newCategory,
      image_url: imageData.url,
      image_public_id: imageData.public_id,
    });
  };

  const handleEditCategory = (category) => {
    setEditingCategory({ ...category });
  };

  const handleUpdateCategory = async () => {
    try {
      const updated = await categoriesService.update(editingCategory.id, {
        name: editingCategory.name,
        description: editingCategory.description,
      });
      setCategories(
        categories.map((cat) => (cat.id === editingCategory.id ? updated : cat))
      );
      setEditingCategory(null);
    } catch (err) {
      setError("Failed to update category: " + err.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        // Find the category to get its image public_id for Cloudinary deletion
        const categoryToDelete = categories.find((cat) => cat.id === id);

        // Delete from database first
        await categoriesService.delete(id);

        // Delete category image from Cloudinary if it exists
        if (
          categoryToDelete?.image_public_id &&
          !categoryToDelete.image_public_id.startsWith("demo")
        ) {
          try {
            await deleteFromCloudinary(categoryToDelete.image_public_id);
            console.log("Successfully deleted category image from Cloudinary");
          } catch (cloudinaryError) {
            console.warn(
              "Failed to delete category image from Cloudinary:",
              cloudinaryError
            );
          }
        }

        setCategories(categories.filter((cat) => cat.id !== id));
      } catch (err) {
        setError("Failed to delete category: " + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Categories</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-medium mb-6">Add New Category</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="Enter category name"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter category description"
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <CategoryImageUpload
                currentImageUrl={newCategory.image_url}
                onImageUpload={handleCategoryImageUpload}
              />
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={handleAddCategory}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Save size={20} />
              Save Category
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewCategory({
                  name: "",
                  description: "",
                  image_url: "",
                  image_public_id: "",
                });
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <X size={20} />
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                {/* Category Image */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                    {category.image_url ? (
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>
                </td>

                {/* Category Name */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingCategory?.id === category.id ? (
                    <input
                      type="text"
                      value={editingCategory.name}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          name: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    <div className="text-sm font-medium text-gray-900">
                      {category.name}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingCategory?.id === category.id ? (
                    <input
                      type="text"
                      value={editingCategory.description}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          description: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    <div className="text-sm text-gray-500">
                      {category.description}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(category.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editingCategory?.id === category.id ? (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={handleUpdateCategory}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Save size={16} />
                      </button>
                      <button
                        onClick={() => setEditingCategory(null)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PhotosManager = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [selectedCategory]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [photosData, categoriesData] = await Promise.all([
        photosService.getAll(),
        categoriesService.getAll(),
      ]);
      setPhotos(photosData);
      setCategories([{ id: "all", name: "All Categories" }, ...categoriesData]);
    } catch (err) {
      setError("Failed to load data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadPhotos = async () => {
    try {
      const categoryId = selectedCategory === "all" ? null : selectedCategory;
      const data = await photosService.getAll(categoryId);
      setPhotos(data);
    } catch (err) {
      setError("Failed to load photos: " + err.message);
    }
  };

  const handleDeletePhoto = async (id) => {
    if (confirm("Are you sure you want to delete this photo?")) {
      try {
        // Find the photo to get its public_id for Cloudinary deletion
        const photoToDelete = photos.find((photo) => photo.id === id);

        // Delete from database first
        await photosService.delete(id);

        // Delete from Cloudinary if public_id exists
        if (photoToDelete?.public_id && photoToDelete.public_id !== "demo") {
          try {
            await deleteFromCloudinary(photoToDelete.public_id);
            console.log("Successfully deleted photo from Cloudinary");
          } catch (cloudinaryError) {
            console.warn(
              "Failed to delete from Cloudinary, but database deletion succeeded:",
              cloudinaryError
            );
          }
        }

        // Update local state
        setPhotos(photos.filter((photo) => photo.id !== id));
      } catch (err) {
        setError("Failed to delete photo: " + err.message);
      }
    }
  };

  const handleUploadComplete = async (uploadedPhotos) => {
    try {
      // Save each photo to database
      const savedPhotos = [];
      for (const photoData of uploadedPhotos) {
        const savedPhoto = await photosService.create(photoData);
        savedPhotos.push(savedPhoto);
      }

      // Add to photos list
      setPhotos([...savedPhotos, ...photos]);
      setShowUpload(false);
      setError(null);
    } catch (err) {
      setError("Failed to save photos: " + err.message);
    }
  };

  const handleEditPhoto = (photo) => {
    setEditingPhoto(photo);
  };

  const handleSaveEditedPhoto = async (photoId, updatedData) => {
    try {
      const updatedPhoto = await photosService.updateWithImageReplace(
        photoId,
        updatedData
      );

      // Update the photo in the local state
      setPhotos(
        photos.map((photo) => (photo.id === photoId ? updatedPhoto : photo))
      );

      setEditingPhoto(null);
      setError(null);
    } catch (err) {
      setError("Failed to update photo: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Photos</h2>
        <div className="flex gap-4">
          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value === "all" ? "all" : Number(e.target.value)
              )
            }
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowUpload(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            Upload Photos
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showUpload && (
        <div className="mb-6">
          <ImageUpload
            categories={categories}
            categoryId={selectedCategory === "all" ? null : selectedCategory}
            onUploadComplete={handleUploadComplete}
            onCancel={() => setShowUpload(false)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2">{photo.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                Category: {photo.categories?.name}
              </p>
              <p className="text-xs text-gray-400 mb-3">
                {new Date(photo.created_at).toLocaleDateString()}
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEditPhoto(photo)}
                  className="text-blue-600 hover:text-blue-900"
                  title="Edit Photo"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="text-red-600 hover:text-red-900"
                  title="Delete Photo"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Edit Modal */}
      {editingPhoto && (
        <PhotoEditModal
          photo={editingPhoto}
          categories={categories}
          onSave={handleSaveEditedPhoto}
          onCancel={() => setEditingPhoto(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
