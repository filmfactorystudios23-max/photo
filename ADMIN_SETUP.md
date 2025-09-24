# Admin Panel Setup Guide

## Overview
An admin panel has been created for managing photo categories and photos with Supabase integration. The system is designed to work with Cloudinary for image storage while using Supabase for database operations.

## Files Created/Modified

### 1. Database Configuration
- `src/lib/supabase.js` - Supabase client configuration
- `src/services/database.js` - Service functions for categories and photos CRUD operations
- `supabase-schema.sql` - Database schema with sample data

### 2. Admin Panel
- `src/pages/AdminDashboard.jsx` - Complete admin interface with categories and photos management
- Updated `src/App.jsx` - Added `/admin` route

## Features Implemented

### Categories Management
- ✅ View all categories in a table format
- ✅ Add new categories with name and description
- ✅ Edit existing categories inline
- ✅ Delete categories (with confirmation)
- ✅ Real-time CRUD operations with Supabase

### Photos Management
- ✅ View all photos in a grid layout
- ✅ Filter photos by category
- ✅ Delete photos (with confirmation)
- ✅ Display photo details (title, category, date)
- ✅ Real-time data from Supabase

### UI Features
- ✅ Loading states with spinners
- ✅ Error handling and display
- ✅ Responsive design with Tailwind CSS
- ✅ Clean, professional interface
- ✅ Tab-based navigation between categories and photos

## Setup Instructions

### 1. Configure Supabase
1. Create a new Supabase project
2. Update `src/lib/supabase.js` with your:
   - Project URL (`supabaseUrl`)
   - Anon key (`supabaseAnonKey`)
3. Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor

### 2. Access Admin Panel
- Start the development server: `npm run dev`
- Navigate to `http://localhost:5174/admin`

### 3. Database Schema
The schema includes:
- `categories` table: id, name, description, created_at, updated_at
- `photos` table: id, title, url, category_id, created_at, updated_at
- Sample data with dummy Cloudinary URLs

## Next Steps for Photo Upload
When you're ready to implement photo upload functionality:
1. Install Cloudinary SDK: `npm install cloudinary`
2. Create upload component with drag-and-drop
3. Integrate Cloudinary upload in photo creation
4. Update photo URLs in Supabase after upload

## Current Functionality
The admin panel is fully functional with dummy data. You can:
1. Create, edit, and delete categories
2. View and delete photos
3. Filter photos by category
4. All operations sync with Supabase in real-time

The system is ready for integration with your actual Supabase project and Cloudinary configuration.