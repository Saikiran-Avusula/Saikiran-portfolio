# Vercel API Routes Fix

## Problem
Getting 404 errors when trying to upload resumes via `/api/upload-resume` endpoint.

## Root Cause
The Vercel configuration was incorrectly set up. For a Vite + React SPA with serverless API routes, Vercel needs proper configuration to:
1. Recognize TypeScript files in `/api` folder as serverless functions
2. Route API requests to serverless functions
3. Route all other requests to the React SPA

## Solution

Updated `vercel.json` with:

```json
{
    "functions": {
        "api/**/*.ts": {
            "runtime": "@vercel/node@3.0.0"
        }
    },
    "rewrites": [
        {
            "source": "/((?!api/).*)",
            "destination": "/index.html"
        }
    ]
}
```

### What This Does:

1. **`functions` section**: Tells Vercel to treat all `.ts` files in the `/api` directory as serverless functions using the Node.js runtime
2. **`rewrites` section**: Routes all non-API requests to `/index.html` (for React SPA), while letting API routes go directly to serverless functions

## How Vercel Handles This

When you deploy:
- Files in `/api/*.ts` → Converted to serverless functions at `/api/*`
- Client requests `/api/upload-resume` → Routed to serverless function
- Client requests `/admin` → Rewritten to `/index.html` (React handles routing)

## After Deploying

1. Wait for Vercel deployment to complete
2. Check deployment logs to ensure API functions are built
3. Test the upload functionality

## Verifying API Routes Work

You can test the API directly:

```bash
# Test get-resume endpoint
curl https://your-domain.vercel.app/api/get-resume

# Should return JSON with resume data or { resume: null }
```

Or in browser console:
```javascript
fetch('/api/get-resume')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

## Common Issues

### Issue: Still getting 404
**Solution**: 
- Ensure deployment completed successfully
- Check Vercel dashboard → Deployments → Functions tab
- Verify `api/upload-resume.ts` shows as a function

### Issue: TypeScript compilation errors
**Solution**:
- Ensure `@vercel/node` is in dependencies
- Ensure `@types/node` is in devDependencies
- Check Vercel build logs for specific errors

### Issue: CORS errors instead of 404
**Good sign!** This means the function is running but CORS headers might need adjustment.
