"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          label="Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind? I'd love to hear from you"
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 flex items-start gap-4">
              <MapPin className="w-5 h-5 text-accent shrink-0 mt-1" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-[var(--text-secondary)]">{siteConfig.location}</p>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 flex items-start gap-4">
              <Mail className="w-5 h-5 text-accent shrink-0 mt-1" />
              <div>
                <p className="font-medium">Email</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-accent hover:underline"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
            {siteConfig.phone && (
              <div className="glass rounded-2xl p-6 flex items-start gap-4">
                <Phone className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
                    className="text-accent hover:underline"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
            )}
            <div className="flex gap-3">
              {siteConfig.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 glass rounded-full text-sm hover:border-accent/40 transition-colors"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
            {[
              { id: "name", label: "Name", type: "text" },
              { id: "email", label: "Email", type: "email" },
            ].map((field) => (
              <div key={field.id} className="relative group">
                <label htmlFor={field.id} className="sr-only">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  required
                  value={form[field.id]}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [field.id]: e.target.value }))
                  }
                  placeholder={field.label}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] outline-none focus:border-accent/50 focus:shadow-glow-sm transition-all peer"
                />
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-accent to-accent-secondary group-focus-within:w-full transition-all duration-500" />
              </div>
            ))}
            <div className="relative group">
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                placeholder="Message"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] outline-none focus:border-accent/50 resize-none transition-all"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent to-accent-secondary text-white font-medium shadow-glow-sm hover:shadow-glow disabled:opacity-60 transition-all"
            >
              <Send className="w-4 h-4" />
              {loading ? "Sending..." : "Send Message"}
            </motion.button>

            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-emerald-400 text-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  Your message has been sent successfully!
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-rose-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  Could not send message. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}
