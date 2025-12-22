# 🚀 Deploy to GitHub Pages

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `questmd` (or any name you prefer)
4. Description: "Turn markdown questionnaires into interactive forms"
5. Make it **Public** (required for free GitHub Pages)
6. **Don't** initialize with README, .gitignore, or license (we already have them)
7. Click **"Create repository"**

## Step 2: Push Your Code

Run these commands in your terminal (from the app directory):

```bash
cd "/Users/wesleytullos/Documents/Laptop Sync Folder/Wes's Vault/Wes Health/QuestMD"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/questmd.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select **"Deploy from a branch"**
5. Select branch: **main**
6. Select folder: **/ (root)**
7. Click **Save**

## Step 4: Access Your Live Site

Your app will be live at:
```
https://wtullos.github.io/questmd/
```

**Live example**: [https://wtullos.github.io/questmd/](https://wtullos.github.io/questmd/)

It may take a few minutes for GitHub to build and deploy your site.

---

**Note**: If you prefer a custom domain, you can add a `CNAME` file with your domain name.

