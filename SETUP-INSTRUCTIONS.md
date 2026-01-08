# 🚀 Setup Instructions - New Repository

This is a **completely separate** Cover Letter Generator repository, ready to deploy!

## 📦 What You Have

A clean repository with ONLY the Cover Letter Generator - no other projects mixed in.

Location on server: `/tmp/cover-letter-generator-deploy/`

## 🎯 Quick Setup (3 Steps)

### Step 1: Copy to Your Computer

**On your computer, run:**

```bash
# Create a directory
mkdir ~/cover-letter-generator
cd ~/cover-letter-generator

# Copy files from the server
# (You'll need to use scp, rsync, or download as zip)
```

**OR download the files directly from GitHub after pushing (see below)**

### Step 2: Push to GitHub

**A) Using the automated script:**

```bash
cd /tmp/cover-letter-generator-deploy
./PUSH-TO-GITHUB.sh
```

The script will guide you through:
1. Creating the GitHub repository
2. Pushing the code
3. Deploying to Vercel

**B) Manual method:**

1. **Create new GitHub repository:**
   - Go to: https://github.com/new
   - Name: `cover-letter-generator`
   - Description: AI-powered cover letter generator
   - Public or Private (your choice)
   - **Don't** check any boxes
   - Click "Create repository"

2. **Push the code:**
   ```bash
   cd /tmp/cover-letter-generator-deploy
   git remote add origin https://github.com/YOUR_USERNAME/cover-letter-generator.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Deploy to Vercel

**Option A - Command Line:**

```bash
# Clone to your local computer first
git clone https://github.com/YOUR_USERNAME/cover-letter-generator.git
cd cover-letter-generator

# Deploy
npx vercel
```

Follow prompts (press Enter for defaults) and you'll get your URL!

**Option B - Via Browser (Easier!):**

1. Go to: https://vercel.com/new
2. Click "Import" next to your `cover-letter-generator` repository
3. Click "Deploy"
4. Done! You'll get your URL: `https://cover-letter-generator-xyz.vercel.app`

## 🔑 Optional: Add AI API Key

For AI-powered cover letter generation:

1. Get API key: https://console.anthropic.com/
2. In Vercel: **Project Settings** → **Environment Variables**
3. Add: `ANTHROPIC_API_KEY` = your key
4. Redeploy

**Cost:** ~$0.003 per cover letter (~33 cents for 100)

## 📱 Save to Home Screen

Once deployed, open your Vercel URL on your phone:

**iPhone:**
1. Open in Safari
2. Share → "Add to Home Screen"

**Android:**
1. Open in Chrome
2. Menu → "Add to Home Screen"

## ✅ What's Included

```
cover-letter-generator/
├── api/                    # Vercel serverless functions
│   ├── _utils.py          # Shared utilities
│   ├── generate.py        # Generate cover letter endpoint
│   ├── download.py        # Download endpoint
│   ├── health.py          # Health check
│   └── requirements.txt   # Python dependencies
├── index.html             # Web interface
├── server.py              # Local development server
├── vercel.json            # Vercel configuration
├── requirements.txt       # Python dependencies
├── start.sh / start.bat   # Local startup scripts
├── README.md              # Documentation
├── DEPLOYMENT.md          # Deployment guide
└── .gitignore            # Git ignore rules
```

## 🆘 Need Help?

- Check `README.md` for full documentation
- Check `DEPLOYMENT.md` for detailed deployment info
- Check `QUICK-START.md` for quick reference

## 🎉 You're Ready!

This repository is completely independent and ready to deploy. No conflicts with other projects!

---

**Next step:** Run `./PUSH-TO-GITHUB.sh` to get started!
