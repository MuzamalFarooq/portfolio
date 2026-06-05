# MERN Stack Developer Portfolio

A premium, cinematic personal portfolio built with **Next.js 15**, **Tailwind CSS**, **Framer Motion**, **GSAP**, **Three.js**, and **Lenis** smooth scrolling.

## Features

- Full-screen animated hero with 3D sphere & particle network
- Glassmorphism UI, gradient lighting, magnetic buttons
- Scroll-triggered GSAP animations & Lenis smooth scroll
- Skills with progress bars & 3D tilt cards
- Project filtering, testimonials slider, education timeline
- Contact form with Resend email integration
- Dark/light mode, accent theme picker, command palette (⌘K)
- Custom cursor, loading screen, Konami easter egg
- SEO metadata, responsive layout, accessible patterns

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize

Edit **`src/data/site.js`** for your name, bio, stats, education, and social links.

Edit **`src/data/projects.js`**, **`skills.js`**, and **`testimonials.js`** for portfolio content.

Replace **`public/resume.pdf`** with your actual resume.

## Contact Form (MongoDB)

Messages are saved to **MongoDB on localhost** when you submit the contact form.

1. Install and start [MongoDB Community](https://www.mongodb.com/try/download/community) locally.
2. Copy `.env.example` to `.env.local` (defaults: `mongodb://127.0.0.1:27017/portfolio`).
3. Run the app and submit the contact form — documents go to the `contact_messages` collection in the `portfolio` database.

Optional: add Resend keys in `.env.local` for email notifications when a message is saved.

```bash
# View saved messages in mongosh
mongosh portfolio
db.contact_messages.find().sort({ createdAt: -1 })
```

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js App Router | Framework & SSR |
| Tailwind CSS | Styling |
| Framer Motion | UI animations |
| GSAP + ScrollTrigger | Scroll reveals |
| Three.js / R3F | 3D hero background |
| Lenis | Smooth scrolling |

## Build

```bash
npm run build
npm start
```

## Easter Egg

Enter the Konami code on the homepage: ↑ ↑ ↓ ↓ ← → ← → B A

## License

MIT — customize freely for your personal brand.
