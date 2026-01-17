# Resume Caching Issue - Diagnostic Guide

## Problem
Even after implementing the fix, the old resume is still showing. The database is returning the same old initial PDF URL.

## Root Causes Identified

### 1. **Get-Resume API Was Also Cached**
The `get-resume.ts` API was returning URLs without cache-busting timestamps, and the API response itself could be cached by the browser.

**Fix Applied:**
- Added `Cache-Control: no-store, no-cache` headers to the API response
- Added cache-busting timestamps to URLs returned by get-resume API

### 2. **Vercel Blob Storage Keeps Old Blobs**
Even though we're deleting the old blob in the upload API, if the delete fails or doesn't complete, the old blob persists.

## How to Verify the Issue

### Step 1: Check Vercel Deployment Status
1. Go to your Vercel dashboard
2. Navigate to your project
3. Check if the latest deployment is complete
4. Click on the deployment and check the Functions tab to see if APIs are updated

### Step 2: Manually Check Vercel Blob Storage
1. Go to Vercel Dashboard → Your Project → Storage
2. Click on your Blob Store
3. Look for entries with `resume.pdf` pathname
4. **If you see multiple `resume.pdf` entries, that's the problem!**
5. Manually delete all old resume.pdf blobs

### Step 3: Clear All Caches
After deploying the fix:

1. **Clear Browser Cache:**
   - Chrome: Ctrl+Shift+Del → Clear cached images and files
   - Or use Incognito/Private mode

2. **Clear Vercel Edge Cache (if using):**
   - Run: `vercel env pull` (if you have Vercel CLI)
   - Or redeploy: `git commit --allow-empty -m "Force redeploy" && git push`

3. **Hard Refresh the Page:**
   - Windows: Ctrl+Shift+R
   - Mac: Cmd+Shift+R

## Updated Fix

I've now updated **all three API files** to ensure proper cache-busting:

### Files Changed:

1. ✅ `api/upload-resume.ts` - Deletes old blob + adds timestamps
2. ✅ `api/get-resume.ts` - Adds cache-control headers + timestamps
3. ✅ `components/AdminPanel.tsx` - Auto-reloads + iframe key
4. ✅ `components/ResumeViewer.tsx` - Iframe key

## What to Do Next

### Option A: Deploy and Test (Recommended)
```bash
git add .
git commit -m "fix: add cache-busting to get-resume API"
git push
```

Wait 2-3 minutes for Vercel to deploy, then:
1. Clear browser cache completely
2. Open admin panel in Incognito mode
3. Upload a new resume
4. Verify it shows in preview
5. Go to homepage and click "View Resume"

### Option B: Manual Blob Cleanup
If Option A doesn't work:
1. Go to Vercel Dashboard → Storage → Blob
2. Delete ALL resume.pdf entries manually
3. Upload a fresh resume through the admin panel
4. Test again

## Why This Happens

The issue occurs because:
1. **Browser caches the API response** from `/api/get-resume`
2. **Browser caches the PDF iframe** content
3. **Vercel Blob Storage** might have multiple versions if delete fails
4. **Deployment lag** - New API code takes a few minutes to deploy

## Debugging Commands

If you want to check the actual blob contents:

```javascript
// In browser console, run this on your admin page:
fetch('/api/get-resume')
  .then(r => r.json())
  .then(data => console.log('Resume URL:', data.resume?.url));

// Then check Vercel Blob Storage dashboard to see if that URL exists
```

## Expected Behavior After Fix

1. **Upload Resume A** → URL ends with `?v=1234567890`
2. **Upload Resume B** → URL ends with `?v=1234567891` (different timestamp)
3. **Get Resume API** → Always returns URL with fresh timestamp
4. **Iframe** → Re-renders because key changed
5. **Browser** → Fetches new file because URL is unique

## Still Not Working?

If the issue persists after deploying:

1. Check Vercel deployment logs for errors
2. Check browser Network tab to see what URL is being fetched
3. Verify the blob was actually deleted (check Vercel Blob Storage dashboard)
4. Contact me with:
   - The URL returned by `/api/get-resume`
   - Screenshot of Vercel Blob Storage showing resume.pdf entries
   - Browser console errors (if any)
