// Resume Storage Service using Vercel Blob Storage
// This service handles resume uploads, retrieval, and deletion via Vercel serverless functions

interface ResumeData {
    url: string;
    downloadUrl: string;
    fileName: string;
    fileSize: number;
    uploadDate: string;
}

export const resumeService = {
    uploadResume: async (file: File): Promise<ResumeData> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload-resume', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to upload resume');
        }

        return await response.json();
    },

    getResume: async (): Promise<ResumeData | null> => {
        const response = await fetch('/api/get-resume');

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch resume');
        }

        const data = await response.json();
        return data.resume;
    },

    deleteResume: async (url: string): Promise<void> => {
        const response = await fetch(`/api/delete-resume?url=${encodeURIComponent(url)}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete resume');
        }
    },

    hasResume: async (): Promise<boolean> => {
        const resume = await resumeService.getResume();
        return resume !== null;
    }
};

