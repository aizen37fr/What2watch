# How to Deploy "What to Watch"

## Option 1: Vercel (Recommended)

### Method A: Git Integration (Easiest & Automatic) 🚀
1.  Push your latest code to GitHub.
2.  Go to [Vercel Dashboard](https://vercel.com/new).
3.  Click **"Import"** next to your GitHub repository (`what-to-watch`).
4.  **Before clicking Deploy:**
    - Open the **Environment Variables** section.
    - Add the variables below (Supabase Config).
5.  Click **Deploy**.
    - *Vercel will now auto-redeploy every time you save changes!*

### Method B: Vercel CLI (Manual)
1.  Install Vercel CLI:
    ```bash
    npm install -g vercel
    ```
2.  Run deploy command:
    ```bash
    vercel
    ```
3.  Follow prompts (Keep defaults).

### 🔑 Environment Variables (Required)
Add these in Vercel Project Settings > Environment Variables:
- `VITE_SUPABASE_URL`: `https://mlgwkrkipbarmrohwdon.supabase.co`
- `VITE_SUPABASE_ANON_KEY`: (Use the key from your `.env` file)

## Option 2: Netlify
1.  Drag and drop the `dist/` folder (created after `npm run build`) to [Netlify Drop](https://app.netlify.com/drop).
2.  Or use CLI: `npx netlify-cli deploy --prod`.
3.  **Live Site:** [https://getkino.netlify.app](https://getkino.netlify.app)

## Option 3: GitHub Pages
1.  Update `vite.config.ts`: Set `base: '/repo-name/'`.
2.  Run `npm run build`.
3.  Push `dist` folder to `gh-pages` branch.
