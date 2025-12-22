#!/bin/bash
# Script to commit and push QuestMD updates

cd "/Users/wesleytullos/Documents/Laptop Sync Folder/Wes's Vault/Wes Health/QuestMD"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
    git branch -M main
    git remote add origin https://github.com/wtullos/questmd.git
fi

# Add all changes
git add -A

# Commit changes
git commit -m "Update branding to QuestMD and remove health plan questionnaire references"

# Push to GitHub
git push -u origin main

echo "✅ Updates pushed to GitHub!"

