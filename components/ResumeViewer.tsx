import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';

interface ResumeViewerProps {
    isOpen: boolean;
    onClose: () => void;
    resumeUrl: string;
    downloadUrl: string;
    fileName: string;
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({
    isOpen,
    onClose,
    resumeUrl,
    downloadUrl,
    fileName,
}) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        link.click();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-4 md:inset-8 lg:inset-16 bg-slate-900 rounded-2xl shadow-2xl z-[201] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                            <h2 className="text-xl font-semibold text-white">Resume</h2>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors"
                                >
                                    <Download size={18} />
                                    Download
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* PDF Viewer */}
                        <div className="flex-1 overflow-hidden bg-slate-950">
                            <iframe
                                src={resumeUrl}
                                className="w-full h-full"
                                title="Resume"
                            />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ResumeViewer;
