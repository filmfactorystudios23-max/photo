import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';
import { uploadToCloudinary } from '../lib/cloudinary.js';

const CategoryImageUpload = ({ currentImageUrl, onImageUpload, onCancel }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
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

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const result = await uploadToCloudinary(selectedFile);

      // Call parent callback with image data
      onImageUpload({
        url: result.url,
        public_id: result.publicId
      });

      // Clean up
      setSelectedFile(null);
      setPreview(null);
    } catch (error) {
      console.error('Category image upload failed:', error);
      alert('Failed to upload category image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removePreview = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const displayImage = preview || currentImageUrl;

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Category Cover Image
      </label>

      {/* Current/Preview Image */}
      {displayImage && (
        <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={displayImage}
            alt="Category cover"
            className="w-full h-full object-cover"
          />
          {preview && (
            <div className="absolute top-2 right-2">
              <button
                onClick={removePreview}
                className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
              >
                <X size={16} />
              </button>
            </div>
          )}
          {preview && (
            <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                New Image Selected
              </span>
            </div>
          )}
        </div>
      )}

      {/* Upload Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <ImageIcon size={24} className="mx-auto text-gray-400 mb-2" />
        {isDragActive ? (
          <p className="text-blue-600 text-sm font-medium">Drop the image here...</p>
        ) : (
          <div>
            <p className="text-gray-600 text-sm font-medium">
              {currentImageUrl ? 'Replace cover image' : 'Upload cover image'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Drag & drop or click to select
            </p>
          </div>
        )}
      </div>

      {/* Upload Actions */}
      {selectedFile && (
        <div className="flex gap-2">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader className="animate-spin h-4 w-4" />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={16} />
                Upload Image
              </>
            )}
          </button>
          <button
            onClick={removePreview}
            disabled={uploading}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {/* File info */}
      {selectedFile && (
        <div className="text-xs text-gray-500">
          Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
        </div>
      )}
    </div>
  );
};

export default CategoryImageUpload;