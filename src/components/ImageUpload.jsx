import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image, Loader } from 'lucide-react';
import { uploadToCloudinary } from '../lib/cloudinary.js';
import '../styles/admin.css';

const ImageUpload = ({ onUploadComplete, onCancel, categoryId, categories }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [photoDetails, setPhotoDetails] = useState({
    title: '',
    category_id: categoryId || '',
  });

  const onDrop = useCallback((acceptedFiles) => {
    const files = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
      title: file.name.split('.')[0].replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    }));
    setSelectedFiles(files);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (id) => {
    setSelectedFiles(files => files.filter(file => file.id !== id));
  };

  const updateFileTitle = (id, title) => {
    setSelectedFiles(files =>
      files.map(file =>
        file.id === id ? { ...file, title } : file
      )
    );
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !photoDetails.category_id) {
      alert('Please select files and choose a category');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const uploadPromises = selectedFiles.map(async (fileData, index) => {
        const cloudinaryResult = await uploadToCloudinary(fileData.file);

        setUploadProgress(((index + 1) / selectedFiles.length) * 100);

        return {
          title: fileData.title,
          url: cloudinaryResult.url,
          category_id: parseInt(photoDetails.category_id),
          public_id: cloudinaryResult.publicId,
        };
      });

      const uploadedPhotos = await Promise.all(uploadPromises);

      // Call the callback with uploaded photos
      onUploadComplete(uploadedPhotos);

      // Reset form
      setSelectedFiles([]);
      setPhotoDetails({ title: '', category_id: categoryId || '' });

    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Upload Photos</h3>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Category
        </label>
        <select
          value={photoDetails.category_id}
          onChange={(e) => setPhotoDetails({ ...photoDetails, category_id: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Choose a category...</option>
          {categories.filter(cat => cat.id !== 'all').map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <Upload size={48} className="mx-auto text-gray-400 mb-4" />
        {isDragActive ? (
          <p className="text-blue-600 font-medium">Drop the images here...</p>
        ) : (
          <div>
            <p className="text-gray-600 font-medium mb-2">
              Drag & drop images here, or click to select
            </p>
            <p className="text-sm text-gray-500">
              Supports: JPG, PNG, GIF, WebP (max 10MB each)
            </p>
          </div>
        )}
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-4">
            Selected Files ({selectedFiles.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto">
            {selectedFiles.map((fileData) => (
              <div key={fileData.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <img
                  src={fileData.preview}
                  alt="Preview"
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={fileData.title}
                    onChange={(e) => updateFileTitle(fileData.id, e.target.value)}
                    className="w-full text-sm border-none outline-none font-medium text-gray-900"
                    placeholder="Photo title..."
                  />
                  <p className="text-xs text-gray-500 truncate">
                    {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => removeFile(fileData.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-2">
            <Loader className="animate-spin h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-600">
              Uploading... {Math.round(uploadProgress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleUpload}
          disabled={uploading || selectedFiles.length === 0 || !photoDetails.category_id}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <Loader className="animate-spin h-4 w-4" />
              Uploading...
            </>
          ) : (
            <>
              <Image size={16} />
              Upload {selectedFiles.length} {selectedFiles.length === 1 ? 'Photo' : 'Photos'}
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
  );
};

export default ImageUpload;