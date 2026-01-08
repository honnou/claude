#!/bin/bash

echo "=================================================="
echo "  Cover Letter Generator - New Repository Setup"
echo "=================================================="
echo ""
echo "This will help you create a new GitHub repository."
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo "Error: GitHub username is required"
    exit 1
fi

REPO_NAME="cover-letter-generator"

echo ""
echo "=================================================="
echo "  Step 1: Create Repository on GitHub"
echo "=================================================="
echo ""
echo "Please open this URL in your browser:"
echo ""
echo "  https://github.com/new"
echo ""
echo "Then:"
echo "  1. Repository name: $REPO_NAME"
echo "  2. Description: AI-powered cover letter generator"
echo "  3. Make it Public or Private (your choice)"
echo "  4. DO NOT check any boxes (no README, no .gitignore, no license)"
echo "  5. Click 'Create repository'"
echo ""
read -p "Press ENTER after you've created the repository..."

echo ""
echo "=================================================="
echo "  Step 2: Pushing Code to GitHub"
echo "=================================================="
echo ""

# Set remote
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

# Rename branch to main
git branch -M main

echo "Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "=================================================="
    echo "  ✅ SUCCESS! Code pushed to GitHub"
    echo "=================================================="
    echo ""
    echo "Your repository: https://github.com/${GITHUB_USER}/${REPO_NAME}"
    echo ""
    echo "=================================================="
    echo "  Step 3: Deploy to Vercel"
    echo "=================================================="
    echo ""
    echo "Option A - Command Line:"
    echo "  npx vercel"
    echo ""
    echo "Option B - Browser:"
    echo "  1. Go to: https://vercel.com/new"
    echo "  2. Import your repository: ${GITHUB_USER}/${REPO_NAME}"
    echo "  3. Click 'Deploy'"
    echo "  4. Done! You'll get your URL"
    echo ""
    echo "=================================================="
    echo "  Optional: Add AI API Key for Better Results"
    echo "=================================================="
    echo ""
    echo "1. Get API key from: https://console.anthropic.com/"
    echo "2. In Vercel: Project Settings → Environment Variables"
    echo "3. Add: ANTHROPIC_API_KEY = your-key"
    echo "4. Redeploy"
    echo ""
    echo "=================================================="
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "  - GitHub repository was created"
    echo "  - Repository name is exactly: $REPO_NAME"
    echo "  - You have push access to the repository"
    echo ""
fi
