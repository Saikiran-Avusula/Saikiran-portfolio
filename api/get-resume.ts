import { list } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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
