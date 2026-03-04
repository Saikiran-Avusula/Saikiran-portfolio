import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Trash2, Download, Check, X, Image as ImageIcon } from 'lucide-react';
import { authService } from '../services/authService';
import { resumeService } from '../services/resumeService';
import { imageService } from '../services/imageService';

interface AdminPanelProps {
    onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [error, setError] = useState('');
    const [currentResume, setCurrentResume] = useState<{ url: string; fileName: string; fileSize: number; uploadDate: string } | null>(null);

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

        if (file.type !== 'application/pdf') {
            setError('Only PDF files are allowed');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setError('File size must be less than 10MB');
            return;
        }

        try {
            setUploading(true);
            setUploadProgress(0);

            const formData = new FormData();
            formData.append('file', file);

            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const percentage = Math.round((e.loaded / e.total) * 100);
                    setUploadProgress(percentage);
                }
            });

            xhr.addEventListener('load', async () => {
                if (xhr.status === 200) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    await loadCurrentResume();
                    setUploadSuccess(true);
                    setTimeout(() => setUploadSuccess(false), 3000);
                } else {
                    throw new Error('Upload failed');
                }
                setUploading(false);
            });

            xhr.addEventListener('error', () => {
                setError('Upload failed. Please try again.');
                setUploading(false);
            });

            xhr.open('POST', '/api/upload-resume');
            xhr.send(formData);

        } catch (err: any) {
            setError(err.message || 'Failed to upload resume. Please try again.');
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

        if (!file.type.startsWith('image/')) {
            setImageError('Only image files are allowed');
            return;
        }

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
        <div className="min-h-screen bg-black pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-6">
                <div className="mb-12">
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tight">
                        Admin <span className="gradient-text">Panel</span>
                    </h1>
                    <p className="text-slate-400 font-semibold">Manage your portfolio content</p>
                </div>

                {/* Profile Image Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bento-card rounded-3xl p-8 mb-8"
                >
                    <h2 className="text-2xl font-black text-white mb-6">Profile Image</h2>

                    {currentImage && (
                        <div className="mb-6 flex items-center gap-4">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20">
                                <img
                                    src={URL.createObjectURL(currentImage.file)}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-bold">{currentImage.fileName}</p>
                                <p className="text-slate-400 text-sm">
                                    {formatFileSize(currentImage.fileSize)} • Uploaded {formatDate(currentImage.uploadDate)}
                                </p>
                                <button
                                    onClick={handleImageDelete}
                                    className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl transition-colors text-sm font-bold border border-red-500/30"
                                >
                                    <Trash2 size={16} />
                                    Delete Image
                                </button>
                            </div>
                        </div>
                    )}

                    <div
                        onDragOver={handleImageDragOver}
                        onDragLeave={handleImageDragLeave}
                        onDrop={handleImageDrop}
                        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${isImageDragging
                            ? 'border-indigo-500 bg-indigo-500/10'
                            : 'border-white/20 hover:border-white/30'
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
                                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                                <p className="text-white font-bold">Uploading...</p>
                            </div>
                        ) : imageUploadSuccess ? (
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-3">
                                    <Check className="text-green-400" size={24} />
                                </div>
                                <p className="text-green-400 font-bold">Image uploaded!</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-3">
                                    <ImageIcon className="text-white" size={24} />
                                </div>
                                <p className="text-white font-bold mb-1">
                                    {currentImage ? 'Upload New Profile Image' : 'Upload Profile Image'}
                                </p>
                                <p className="text-slate-400 text-sm mb-2 font-semibold">Drag and drop or click to browse</p>
                                <p className="text-slate-500 text-xs font-semibold">
                                    JPG, PNG • Max 5MB
                                    {currentImage && ' • Will replace current image'}
                                </p>
                            </div>
                        )}
                    </div>

                    {imageError && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-3 bg-red-500/10 border-2 border-red-500/50 rounded-2xl flex items-start gap-3"
                        >
                            <X className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                            <p className="text-red-400 text-sm font-bold">{imageError}</p>
                        </motion.div>
                    )}
                </motion.div>

                {/* Current Resume */}
                {currentResume && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bento-card rounded-3xl p-6 mb-8"
                    >
                        <h2 className="text-2xl font-black text-white mb-4">Current Resume</h2>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                                    <FileText className="text-white" size={24} />
                                </div>
                                <div>
                                    <p className="text-white font-bold">{currentResume.fileName}</p>
                                    <p className="text-slate-400 text-sm font-semibold">
                                        {formatFileSize(currentResume.fileSize)} • Uploaded {formatDate(currentResume.uploadDate)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleDownload}
                                    className="p-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl transition-colors border border-white/10"
                                    title="Download"
                                >
                                    <Download size={20} />
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl transition-colors border border-red-500/30"
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
                        className="bento-card rounded-3xl p-6 mb-8"
                    >
                        <h2 className="text-2xl font-black text-white mb-4">Resume Preview</h2>
                        <div className="bg-black rounded-2xl overflow-hidden border-2 border-white/10">
                            <iframe
                                src={`${currentResume.url}#toolbar=0&view=FitH`}
                                className="w-full h-[600px] rounded-2xl"
                                title="Resume Preview"
                                key={currentResume.uploadDate}
                            />
                        </div>
                    </motion.div>
                )}

                {/* Upload Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bento-card rounded-3xl p-8"
                >
                    <h2 className="text-2xl font-black text-white mb-6">
                        {currentResume ? 'Upload New Resume' : 'Upload Resume'}
                    </h2>

                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${isDragging
                            ? 'border-indigo-500 bg-indigo-500/10'
                            : 'border-white/20 hover:border-white/30'
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
                                <div className="relative w-24 h-24 mb-4">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="48"
                                            cy="48"
                                            r="40"
                                            stroke="currentColor"
                                            strokeWidth="6"
                                            fill="none"
                                            className="text-white/10"
                                        />
                                        <circle
                                            cx="48"
                                            cy="48"
                                            r="40"
                                            stroke="currentColor"
                                            strokeWidth="6"
                                            fill="none"
                                            strokeDasharray={`${2 * Math.PI * 40}`}
                                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - uploadProgress / 100)}`}
                                            className="text-indigo-500 transition-all duration-300"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-2xl font-black text-white">{uploadProgress}%</span>
                                    </div>
                                </div>
                                <p className="text-white font-bold">Uploading resume...</p>
                                <p className="text-slate-400 text-sm mt-1 font-semibold">{uploadProgress}% complete</p>
                            </div>
                        ) : uploadSuccess ? (
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                                    <Check className="text-green-400" size={32} />
                                </div>
                                <p className="text-green-400 font-black">Resume uploaded successfully!</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                                    <Upload className="text-white" size={32} />
                                </div>
                                <p className="text-white font-bold mb-2">
                                    Drag and drop your resume here
                                </p>
                                <p className="text-slate-400 text-sm mb-4 font-semibold">or click to browse files</p>
                                <p className="text-slate-500 text-xs font-semibold">
                                    PDF only • Max 10MB
                                    {currentResume && ' • Will replace current resume'}
                                </p>
                            </div>
                        )}
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-red-500/10 border-2 border-red-500/50 rounded-2xl flex items-start gap-3"
                        >
                            <X className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                            <p className="text-red-400 text-sm font-bold">{error}</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default AdminPanel;
