import { del } from '@vercel/blob';

export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    if (request.method !== 'DELETE') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { searchParams } = new URL(request.url);
        const url = searchParams.get('url');

        if (!url) {
            return new Response(JSON.stringify({ error: 'No URL provided' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Delete the blob
        await del(url);

        return new Response(
            JSON.stringify({ success: true, message: 'Resume deleted successfully' }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Delete error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to delete resume' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
