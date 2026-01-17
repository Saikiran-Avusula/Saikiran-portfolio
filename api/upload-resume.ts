import { put, list, del } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import formidable from 'formidable';
import { readFileSync } from 'fs';

// Disable body parsing for file uploads
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Parse the multipart form data
        const form = formidable({});

        const [fields, files] = await form.parse(req);

        const file = files.file?.[0];

        if (!file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        // Validate file type
        if (file.mimetype !== 'application/pdf') {
            return res.status(400).json({ error: 'Only PDF files are allowed' });
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            return res.status(400).json({ error: 'File size must be less than 10MB' });
        }

        // Delete existing resume before uploading new one
        try {
            const { blobs } = await list();
            const existingResume = blobs.find(blob => blob.pathname === 'resume.pdf');
            if (existingResume) {
                await del(existingResume.url);
            }
        } catch (deleteError) {
            console.error('Error deleting old resume:', deleteError);
            // Continue with upload even if delete fails
        }

        // Read the file and upload to Vercel Blob
        const fileBuffer = readFileSync(file.filepath);

        const blob = await put('resume.pdf', fileBuffer, {
            access: 'public',
            addRandomSuffix: false,
        });

        // Add cache-busting timestamp to URLs
        const timestamp = Date.now();
        const urlWithCacheBust = `${blob.url}?v=${timestamp}`;
        const downloadUrlWithCacheBust = `${blob.downloadUrl}?v=${timestamp}`;

        return res.status(200).json({
            url: urlWithCacheBust,
            downloadUrl: downloadUrlWithCacheBust,
            fileName: file.originalFilename || 'resume.pdf',
            fileSize: file.size,
            uploadDate: new Date().toISOString(),
        });

    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ error: 'Failed to upload resume' });
    }
}
