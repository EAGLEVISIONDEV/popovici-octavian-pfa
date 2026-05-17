# Popovici Octavian PFA - Portfolio Website

Professional portfolio website for **Popovici Octavian PFA** — Software Development Services.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel

## ✨ Features

- ⚡ Modern, responsive design with dark theme
- 🔄 Dynamic GitHub project fetching via API
- 🎨 Smooth animations and transitions
- 📱 Mobile-first responsive layout
- 🔍 SEO optimized with meta tags
- 📧 Contact form with mailto integration
- 🌐 Romanian language (ro-RO)

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles & Tailwind
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main page (server component)
├── components/
│   ├── Navbar.tsx        # Navigation bar
│   ├── Hero.tsx          # Hero section
│   ├── About.tsx         # About & skills
│   ├── Services.tsx      # Services offered
│   ├── Projects.tsx      # GitHub projects (dynamic)
│   ├── Contact.tsx       # Contact form & info
│   └── Footer.tsx        # Footer
└── lib/
    └── github.ts         # GitHub API integration
```

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🌐 Deployment

This project is configured for automatic deployment on **Vercel**. Simply connect the GitHub repository to Vercel for continuous deployment.

### Environment Variables (optional)

- `GITHUB_TOKEN` — GitHub personal access token for higher API rate limits

## 📄 License

© 2024 Popovici Octavian PFA. All rights reserved.
