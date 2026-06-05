# The Bag — Golf Course Tracker

## Deploy to Vercel (5 minutes)

### 1. Push to GitHub
- Go to github.com → New repository → name it `the-bag` → Create
- Open Terminal in this folder and run:
```
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/the-bag.git
git push -u origin main
```

### 2. Deploy on Vercel
- Go to vercel.com → Add New Project → Import your `the-bag` repo
- Click Deploy (no settings to change)

### 3. Add your Anthropic API key
- In Vercel dashboard → your project → Settings → Environment Variables
- Add: `ANTHROPIC_API_KEY` = your key from console.anthropic.com
- Go to Deployments → click the 3 dots on latest → Redeploy

### 4. Install on your phone
- Open your Vercel URL in Safari (iPhone) or Chrome (Android)
- iPhone: tap the Share button → "Add to Home Screen"
- Android: tap the 3-dot menu → "Add to Home Screen"

That's it — it'll appear on your home screen like a native app.
