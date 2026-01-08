# Deployment Guide

## Deploy to Vercel (Recommended for iPhone Usage)

This guide shows you how to deploy the app to Vercel's free tier so you can access it from your iPhone anywhere, anytime!

### Prerequisites

- A [Vercel account](https://vercel.com/signup) (free)
- Git installed on your computer
- This repository cloned to your computer

### Option 1: Deploy via Vercel CLI (Command Line)

1. **Install Vercel CLI globally**:
   ```bash
   npm install -g vercel
   ```

2. **Navigate to the project directory**:
   ```bash
   cd claude
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Login to Vercel (it will open a browser)
   - Select "Continue with GitHub" (or your preferred method)
   - For "Set up and deploy?", press Enter (Yes)
   - For "Which scope?", select your account
   - For "Link to existing project?", press Enter (No)
   - For "What's your project's name?", press Enter (use default) or type a name
   - For "In which directory is your code?", press Enter (current directory)
   - For "Want to override settings?", press Enter (No)

5. **Wait for deployment**:
   - Vercel will build and deploy your app
   - You'll get a URL like: `https://historical-facts-music-playlist.vercel.app`

6. **Open on your iPhone**:
   - Open Safari on your iPhone
   - Go to the URL Vercel gave you
   - Tap "Generate Today's Playlist"
   - Add to home screen for quick access!

### Option 2: Deploy via GitHub (Web Interface)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push
   ```

2. **Go to [Vercel](https://vercel.com)**:
   - Log in to your account
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the settings
   - Click "Deploy"

3. **Wait for deployment**:
   - Vercel will build and deploy automatically
   - You'll get a live URL

### Update Your Deployment

Whenever you make changes:

```bash
git add .
git commit -m "Your changes"
git push
```

If using GitHub integration, Vercel will auto-deploy. If using CLI, run:
```bash
vercel --prod
```

### Custom Domain (Optional)

You can add a custom domain in Vercel's dashboard:
1. Go to your project settings
2. Click "Domains"
3. Add your domain
4. Follow DNS setup instructions

### Troubleshooting

**Build fails?**
- Make sure all dependencies are in package.json
- Check that tsconfig.json is committed
- Verify vercel.json exists

**App doesn't load?**
- Check the Vercel deployment logs
- Make sure `dist/server.js` exists after build
- Verify the build command is `tsc`

**iPhone can't access?**
- Use the full HTTPS URL from Vercel
- Make sure you're not using localhost
- Try Safari (recommended for iOS)

### Environment Variables

If you want to add Apple Music API credentials:
1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add your variables:
   - `APPLE_DEVELOPER_TOKEN`
   - `APPLE_USER_TOKEN` (optional)
4. Redeploy for changes to take effect

### Cost

Vercel's free tier includes:
- Unlimited deployments
- Automatic HTTPS
- Global CDN
- 100GB bandwidth/month
- Perfect for personal projects!

Enjoy your historical music playlists on the go! 🎵
