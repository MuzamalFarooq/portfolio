export const projects = [
  {
    id: "pizza-ordering",
    title: "Pizza Ordering System",
    description:
      "Full-stack food ordering platform with cart management, Stripe payments, admin dashboard, and real-time order tracking.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    github: "https://github.com",
    live: "https://example.com",
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
    title: "True Love Chat Platform",
    description:
      "Social dating platform with matching algorithms, video calls, and end-to-end encrypted messaging.",
    technologies: ["Next.js", "MongoDB", "WebRTC", "Framer Motion"],
    image: "/projects/true-love-chat.jpg",
    github: "https://github.com",
    live: "https://example.com",
    category: "realtime",
  },
];

export const projectFilters = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full Stack" },
  { id: "realtime", label: "Real-time" },
];
