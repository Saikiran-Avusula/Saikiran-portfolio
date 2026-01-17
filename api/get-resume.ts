import { list } from '@vercel/blob';

export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    if (request.method !== 'GET') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        // List all blobs and find the resume
        const { blobs } = await list();

        // Find the resume.pdf file
        const resumeBlob = blobs.find(blob => blob.pathname === 'resume.pdf');

        if (!resumeBlob) {
            return new Response(
                JSON.stringify({ resume: null }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        return new Response(
            JSON.stringify({
                resume: {
                    url: resumeBlob.url,
                    downloadUrl: resumeBlob.downloadUrl,
                    fileName: 'resume.pdf',
                    fileSize: resumeBlob.size,
                    uploadDate: resumeBlob.uploadedAt,
                },
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Get resume error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch resume' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
