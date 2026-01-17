import { put } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

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
        // Handle multipart form data differently in Vercel
        const contentType = req.headers['content-type'] || '';

        if (!contentType.includes('multipart/form-data')) {
            return res.status(400).json({ error: 'Content-Type must be multipart/form-data' });
        }

        // In Vercel, req.body will have the file if properly parsed
        // We need to use a different approach for file handling

        // For now, return a helpful error
        return res.status(501).json({
            error: 'File upload needs to be implemented with proper multipart parsing',
            message: 'This endpoint is under construction'
        });

    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ error: 'Failed to upload resume' });
    }
}
