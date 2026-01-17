import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Trash2, LogOut, Download, Check, X, Image as ImageIcon } from 'lucide-react';
import { authService } from '../services/authService';
import { resumeService } from '../services/resumeService';
import { imageService } from '../services/imageService';

interface AdminPanelProps {
    onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [error, setError] = useState('');
    const [currentResume, setCurrentResume] = useState<{ url: string; fileName: string; fileSize: number; uploadDate: string } | null>(null);

    // Profile Image State
    const [isImageDragging, setIsImageDragging] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [imageUploadSuccess, setImageUploadSuccess] = useState(false);
    const [imageError, setImageError] = useState('');
    const [currentImage, setCurrentImage] = useState<any>(null);

    useEffect(() => {
        loadCurrentResume();
        loadCurrentImage();
    }, []);

    const loadCurrentResume = async () => {
        const resume = await resumeService.getResume();
        setCurrentResume(resume);
    };

    const loadCurrentImage = async () => {
        const image = await imageService.getImage();
        setCurrentImage(image);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFileUpload(file);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleFileUpload = async (file: File) => {
        setError('');
        setUploadSuccess(false);

        // Validate file type
        if (file.type !== 'application/pdf') {
            setError('Only PDF files are allowed');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError('File size must be less than 10MB');
            return;
        }

        try {
            setUploading(true);
            const resumeData = await resumeService.uploadResume(file);
            setCurrentResume(resumeData);
            setUploadSuccess(true);
            setTimeout(() => setUploadSuccess(false), 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to upload resume. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleDownload = () => {
        if (currentResume) {
            const link = document.createElement('a');
            link.href = currentResume.url;
            link.download = currentResume.fileName;
            link.click();
        }
    };

    const handleDelete = async () => {
        if (currentResume && confirm('Are you sure you want to delete the current resume?')) {
            try {
                await resumeService.deleteResume(currentResume.url);
                setCurrentResume(null);
            } catch (err: any) {
                setError(err.message || 'Failed to delete resume');
            }
        }
    };

    const handleLogout = () => {
        authService.logout();
        onLogout();
    };

    // Image Upload Handlers
    const handleImageDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsImageDragging(true);
    };

    const handleImageDragLeave = () => {
        setIsImageDragging(false);
    };

    const handleImageDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsImageDragging(false);
        const file = e.dataTransfer.files[0];
        handleImageUpload(file);
    };

    const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleImageUpload = async (file: File) => {
        setImageError('');
        setImageUploadSuccess(false);

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setImageError('Only image files are allowed');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setImageError('Image size must be less than 5MB');
            return;
        }

        try {
            setImageUploading(true);
            await imageService.uploadImage(file);
            await loadCurrentImage();
            setImageUploadSuccess(true);
            setTimeout(() => setImageUploadSuccess(false), 3000);
        } catch (err) {
            setImageError('Failed to upload image. Please try again.');
        } finally {
            setImageUploading(false);
        }
    };

    const handleImageDelete = async () => {
        if (confirm('Are you sure you want to delete the current profile image?')) {
            try {
                await imageService.deleteImage();
                setCurrentImage(null);
            } catch (err) {
                setImageError('Failed to delete image');
            }
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
                        <p className="text-slate-400">Manage your portfolio resume</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>

                {/* Profile Image Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel rounded-2xl p-8 mb-8"
                >
                    <h2 className="text-xl font-semibold text-white mb-6">Profile Image</h2>

                    {/* Current Image Preview */}
                    {currentImage && (
                        <div className="mb-6 flex items-center gap-4">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-800">
                                <img
                                    src={URL.createObjectURL(currentImage.file)}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-medium">{currentImage.fileName}</p>
                                <p className="text-slate-400 text-sm">
                                    {formatFileSize(currentImage.fileSize)} • Uploaded {formatDate(currentImage.uploadDate)}
                                </p>
                                <button
                                    onClick={handleImageDelete}
                                    className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors text-sm"
                                >
                                    <Trash2 size={16} />
                                    Delete Image
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Upload Zone */}
                    <div
                        onDragOver={handleImageDragOver}
                        onDragLeave={handleImageDragLeave}
                        onDrop={handleImageDrop}
                        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${isImageDragging
                            ? 'border-primary-500 bg-primary-500/10'
                            : 'border-slate-700 hover:border-slate-600'
                            }`}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageInput}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            disabled={imageUploading}
                        />

                        {imageUploading ? (
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                                <p className="text-white font-medium">Uploading...</p>
                            </div>
                        ) : imageUploadSuccess ? (
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-3">
                                    <Check className="text-green-400" size={24} />
                                </div>
                                <p className="text-green-400 font-medium">Image uploaded!</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center mb-3">
                                    <ImageIcon className="text-primary-400" size={24} />
                                </div>
                                <p className="text-white font-medium mb-1">
                                    {currentImage ? 'Upload New Profile Image' : 'Upload Profile Image'}
                                </p>
                                <p className="text-slate-400 text-sm mb-2">Drag and drop or click to browse</p>
                                <p className="text-slate-500 text-xs">
                                    JPG, PNG • Max 5MB
                                    {currentImage && ' • Will replace current image'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Error Message */}
                    {imageError && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3"
                        >
                            <X className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                            <p className="text-red-400 text-sm">{imageError}</p>
                        </motion.div>
                    )}
                </motion.div>

                {/* Current Resume Status */}
                {currentResume && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-panel rounded-2xl p-6 mb-8"
                    >
                        <h2 className="text-xl font-semibold text-white mb-4">Current Resume</h2>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
                                    <FileText className="text-primary-400" size={24} />
                                </div>
                                <div>
                                    <p className="text-white font-medium">{currentResume.fileName}</p>
                                    <p className="text-slate-400 text-sm">
                                        {formatFileSize(currentResume.fileSize)} • Uploaded {formatDate(currentResume.uploadDate)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleDownload}
                                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                                    title="Download"
                                >
                                    <Download size={20} />
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* PDF Preview */}
                {currentResume && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="glass-panel rounded-2xl p-6 mb-8"
                    >
                        <h2 className="text-xl font-semibold text-white mb-4">Resume Preview</h2>
                        <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
                            <iframe
                                src={currentResume.url}
                                className="w-full h-[600px] rounded-lg"
                                title="Resume Preview"
                            />
                        </div>
                    </motion.div>
                )}

                {/* Upload Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-panel rounded-2xl p-8"
                >
                    <h2 className="text-xl font-semibold text-white mb-6">
                        {currentResume ? 'Upload New Resume' : 'Upload Resume'}
                    </h2>

                    {/* Drag and Drop Zone */}
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${isDragging
                            ? 'border-primary-500 bg-primary-500/10'
                            : 'border-slate-700 hover:border-slate-600'
                            }`}
                    >
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileInput}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            disabled={uploading}
                        />

                        {uploading ? (
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                <p className="text-white font-medium">Uploading...</p>
                            </div>
                        ) : uploadSuccess ? (
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                                    <Check className="text-green-400" size={32} />
                                </div>
                                <p className="text-green-400 font-medium">Resume uploaded successfully!</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mb-4">
                                    <Upload className="text-primary-400" size={32} />
                                </div>
                                <p className="text-white font-medium mb-2">
                                    Drag and drop your resume here
                                </p>
                                <p className="text-slate-400 text-sm mb-4">or click to browse files</p>
                                <p className="text-slate-500 text-xs">
                                    PDF only • Max 10MB
                                    {currentResume && ' • Will replace current resume'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3"
                        >
                            <X className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                            <p className="text-red-400 text-sm">{error}</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default AdminPanel;
