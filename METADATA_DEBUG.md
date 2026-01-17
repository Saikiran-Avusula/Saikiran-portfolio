# Debugging CustomMetadata Issue

## The Problem

The frontend is showing the technical storage name (e.g., `resume-Wn1dYag7WwliO8G1Z9EYBRt9nVqr7I.pdf`) instead of the original uploaded filename.

## Possible Causes

1. **CustomMetadata not supported in list() response**
   - The `list()` method might not return `customMetadata` 
   - We might need to use `head()` method instead to get full metadata

2. **Environment not deployed yet**
   - Changes might not be deployed to Vercel yet
   - Old code might still be running

3. **CustomMetadata not being saved**
   - Upload might be failing silently
   - Metadata might be stored under wrong property

## Solution

Use Vercel Blob's `head()` method to get full metadata for a specific blob:

```typescript
import { list, head } from '@vercel/blob';

// In get-resume.ts
const resumeBlob = resumeBlobs[0];

// Get full metadata using head()
const metadata = await head(resumeBlob.url);
const originalFileName = metadata.customMetadata?.originalFileName || 
                        resumeBlob.pathname.split('/').pop() || 
                        'resume.pdf';
```

Let me implement this fix!
