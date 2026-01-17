# Fix 404 Errors - Environment Variables Missing

## The 404 Error Problem

You're getting 404 errors because **Vercel Blob Storage API calls require authentication**, but the `BLOB_READ_WRITE_TOKEN` environment variable isn't set in your Vercel project.

## How to Fix - Step by Step

### Step 1: Get Your Blob Token

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on **Storage** in the left sidebar
3. Click on **Blob** 
4. If you don't have a Blob Store, click **Create Blob Store**
5. Copy the **`BLOB_READ_WRITE_TOKEN`** 

### Step 2: Add Environment Variable to Vercel

1. Go to your project: `Saikiran-portfolio`
2. Click on **Settings** tab
3. Click on **Environment Variables** in the left sidebar
4. Click **Add New**
5. Set:
   - **Name**: `BLOB_READ_WRITE_TOKEN`
   - **Value**: (paste the token you copied)
   - **Environments**: Check all (Production, Preview, Development)
6. Click **Save**

### Step 3: Redeploy

After adding the environment variable:
1. Go to **Deployments** tab
2. Click the **...** menu on the latest deployment
3. Click **Redeploy**

OR

```bash
git commit --allow-empty -m "trigger redeploy"
git push
```

## Why This is Required

Your API routes need the token to:
- Upload files to Vercel Blob Storage
- List files from Vercel Blob Storage
- Delete files from Vercel Blob Storage

Without it, all API calls fail with 401/404 errors.

## How to Verify It Works

After redeploying, test:
1. Navigate to your site `/admin`
2. Upload a resume
3. Check browser console - should see NO 404 errors
4. Resume should appear in preview

## Environment Variable in Local Development

For local development, create a `.env` file:

```env
BLOB_READ_WRITE_TOKEN=your_actual_token_here
```

**IMPORTANT**: Never commit `.env` to Git! It's already in `.gitignore`.

## Common Issues

### Issue: Still getting 404 after adding token
**Solution**: Make sure you redeployed after adding the environment variable

### Issue: Token not working
**Solution**: 
1. Regenerate token in Vercel Blob Storage dashboard
2. Update environment variable with new token
3. Redeploy

### Issue: Works locally but not on Vercel
**Solution**: You have `.env` locally but forgot to add variable in Vercel dashboard

## How to Check if Token is Set

In Vercel dashboard:
1. Settings → Environment Variables
2. You should see `BLOB_READ_WRITE_TOKEN` listed
3. Value should be hidden (shows as `•••••••`)
4. All environments should be checked

## Summary

| Step | Action | Status |
|------|--------|--------|
| 1 | Get Blob Token from Vercel Storage | ⬜ |
| 2 | Add to Vercel Environment Variables | ⬜ |
| 3 | Redeploy project | ⬜ |
| 4 | Test resume upload | ⬜ |

Once all steps are complete, the 404 errors will be gone!
