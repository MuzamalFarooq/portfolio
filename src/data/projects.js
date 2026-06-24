export const projects = [
  {
    id: "pizza-ordering",
    title: "Pizza Ordering System",
    description:
      "Full-stack food ordering platform with cart management, Stripe payments, admin dashboard, and real-time order tracking.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Express", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    github: "https://github.com/MuzamalFarooq/pizza-logist",
    live: "https://pizza-logist.vercel.app/",
    category: "fullstack",
  },
  {
    id: "hotel-management",
    title: "Hotel Management System",
    description:
      "Enterprise booking system with room inventory, staff management, billing, and analytics dashboards.",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    github: "https://github.com",
    live: "https://example.com",
    category: "fullstack",
  },
  {
    id: "realtime-chat",
    title: "Real-time Chat Application",
    description:
      "Instant messaging app with WebSockets, typing indicators, read receipts, and media sharing.",
    technologies: ["React", "Socket.io", "Node.js", "Redis"],
    image: "/projects/realtime-chat.jpg",
    github: "https://github.com",
    live: "https://example.com",
    category: "realtime",
  },
  {
    id: "true-love-chat",
    title: "Soul-Bridge Dating App",
    description:
      "Social dating platform with matching algorithms, video calls, and end-to-end encrypted messaging.",
    technologies: ["Next.js", "MongoDB", "WebRTC", "Framer Motion"],
    image: "/projects/true-love-chat.jpg",
    github: "https://github.com/MuzamalFarooq/Soul-Bridge-Dating-App",
    live: "https://example.com",
    category: "realtime",
  },
  {
    id: "quran-academy",
    title: "Quran Academy",
    description:
      "Islamic e-learning platform featuring Quran recitation lessons, Tajweed courses, progress tracking, and a student-teacher portal with live session scheduling.",
    technologies: ["Next.js", "MongoDB", "Tailwind", "Node.js", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80",
    github: "https://github.com/MuzamalFarooq/Quran-Academy",
    live: "https://quran-academy-inky.vercel.app/",
    category: "education",
  },
];

export const projectFilters = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full Stack" },
  { id: "realtime", label: "Real-time" },
  { id: "education", label: "Education" },
];
