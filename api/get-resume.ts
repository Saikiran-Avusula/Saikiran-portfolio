import { list } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Prevent caching of this API response
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // List all blobs and find the resume
        const { blobs } = await list();

        // Find the resume.pdf file
        const resumeBlob = blobs.find(blob => blob.pathname === 'resume.pdf');

        if (!resumeBlob) {
            return res.status(200).json({ resume: null });
        }

        // Add cache-busting timestamp to URLs
        const timestamp = Date.now();
        const urlWithCacheBust = `${resumeBlob.url}?v=${timestamp}`;
        const downloadUrlWithCacheBust = `${resumeBlob.downloadUrl}?v=${timestamp}`;

        return res.status(200).json({
            resume: {
                url: urlWithCacheBust,
                downloadUrl: downloadUrlWithCacheBust,
                fileName: 'resume.pdf',
                fileSize: resumeBlob.size,
                uploadDate: resumeBlob.uploadedAt,
            },
        });
    } catch (error) {
        console.error('Get resume error:', error);
        return res.status(500).json({ error: 'Failed to fetch resume' });
    }
}
