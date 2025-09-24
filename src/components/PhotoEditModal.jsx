import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Save, Loader, Image as ImageIcon } from 'lucide-react';
import { uploadToCloudinary, deleteFromCloudinary } from '../lib/cloudinary.js';
import '../styles/admin.css';

const PhotoEditModal = ({ photo, categories, onSave, onCancel }) => {
  const [editedPhoto, setEditedPhoto] = useState({
    title: photo.title,
    category_id: photo.category_id,
    url: photo.url,
    public_id: photo.public_id
  });
  const [newImage, setNewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setNewImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleSave = async () => {
    setUploading(true);

    try {
      let finalPhotoData = { ...editedPhoto };

      // If new image is selected, upload it and delete old one
      if (newImage) {
        // Upload new image to Cloudinary
        const uploadResult = await uploadToCloudinary(newImage);

        // Delete old image from Cloudinary if it exists
        if (photo.public_id && photo.public_id !== 'demo') {
          try {
            await deleteFromCloudinary(photo.public_id);
          } catch (deleteError) {
            console.warn('Failed to delete old image:', deleteError);
            // Continue anyway, as the new image upload succeeded
          }
        }

        // Update photo data with new image info
        finalPhotoData = {
          ...finalPhotoData,
          url: uploadResult.url,
          public_id: uploadResult.publicId
        };
      }

      // Save updated photo
      await onSave(photo.id, finalPhotoData);

    } catch (error) {
      console.error('Failed to update photo:', error);
      alert('Failed to update photo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeNewImage = () => {
    setNewImage(null);
    setPreview(null);
  };

  const currentImageUrl = preview || editedPhoto.url;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Edit Photo</h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Current/Preview Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Photo {newImage && '(New Image Selected)'}
            </label>
            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={currentImageUrl}
                alt={editedPhoto.title}
                className="w-full h-64 object-cover"
              />
              {newImage && (
                <div className="absolute top-2 right-2">
                  <button
                    onClick={removeNewImage}
                    className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Image Upload/Replace */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Replace Image (Optional)
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input {...getInputProps()} />
              <Upload size={32} className="mx-auto text-gray-400 mb-2" />
              {isDragActive ? (
                <p className="text-blue-600 font-medium">Drop the image here...</p>
              ) : (
                <div>
                  <p className="text-gray-600 font-medium">
                    Drag & drop a new image, or click to select
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    This will replace the current image
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Photo Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo Title
              </label>
              <input
                type="text"
                value={editedPhoto.title}
                onChange={(e) => setEditedPhoto({ ...editedPhoto, title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter photo title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={editedPhoto.category_id}
                onChange={(e) => setEditedPhoto({ ...editedPhoto, category_id: parseInt(e.target.value) })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.filter(cat => cat.id !== 'all').map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={handleSave}
            disabled={uploading || !editedPhoto.title.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader className="animate-spin h-4 w-4" />
                {newImage ? 'Uploading & Saving...' : 'Saving...'}
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
          <button
            onClick={onCancel}
            disabled={uploading}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoEditModal;