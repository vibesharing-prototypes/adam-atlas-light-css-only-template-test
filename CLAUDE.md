# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 App Router prototype project hosted on VibeSharing with automatic GitHub-to-Vercel deployment pipeline.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

**CRITICAL:** This project uses GitHub-to-Vercel auto-deployment. The ONLY way to deploy is:

```bash
git add .
git commit -m "Describe what changed"
git push origin main
```

**NEVER:**
- Run `vercel`, `vercel --yes`, or `vercel deploy`
- Zip files or use deploy APIs
- Create new Vercel projects
- Use curl to call vibesharing.app/api endpoints

Changes are live ~30 seconds after pushing to main.

## Architecture

Next.js 14 App Router structure:

- **app/page.tsx** — Main page component. Primary file for prototype development.
- **app/layout.tsx** — Root layout wrapper
- **public/** — Static assets (images, fonts, standalone HTML files)

### File Placement Rules

**NEVER put HTML files in the repo root.** Next.js does not serve files from root.

| Content Type | Correct Location |
|--------------|------------------|
| React component | app/page.tsx |
| Standalone HTML | public/filename.html |
| Images, fonts, assets | public/ |

### Serving Standalone HTML

If the prototype needs to serve a standalone HTML file, place it in `public/` and redirect from `app/page.tsx`:

```tsx
import { redirect } from "next/navigation";
export default function Page() { redirect("/prototype.html"); }
```

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript 5
