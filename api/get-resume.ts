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
        // List all blobs and find the most recent resume
        const { blobs } = await list();

        // Find all resume files (pathname starts with 'resume')
        const resumeBlobs = blobs.filter(blob => blob.pathname.startsWith('resume'));

        if (resumeBlobs.length === 0) {
            return res.status(200).json({ resume: null });
        }

        // Get the most recently uploaded resume
        const resumeBlob = resumeBlobs.sort((a, b) =>
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        )[0];

        return res.status(200).json({
            resume: {
                url: resumeBlob.url,
                downloadUrl: resumeBlob.downloadUrl,
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
