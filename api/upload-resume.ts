import { put } from '@vercel/blob';

// Uses Node.js runtime (default) - required for @vercel/blob

export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return new Response(JSON.stringify({ error: 'No file provided' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Validate file type
        if (file.type !== 'application/pdf') {
            return new Response(JSON.stringify({ error: 'Only PDF files are allowed' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            return new Response(JSON.stringify({ error: 'File size must be less than 10MB' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Upload to Vercel Blob with a fixed name to always replace the previous resume
        const blob = await put('resume.pdf', file, {
            access: 'public',
            addRandomSuffix: false, // Always use the same name to replace
        });

        return new Response(
            JSON.stringify({
                url: blob.url,
                downloadUrl: blob.downloadUrl,
                fileName: file.name,
                fileSize: file.size,
                uploadDate: new Date().toISOString(),
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Upload error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to upload resume' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
