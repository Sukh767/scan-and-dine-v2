import { Star, MessageSquare, Quote } from "lucide-react";
import { FadeUp } from "@/components/motion";
import { cn } from "@/lib/utils";

// Base testimonials
const baseTestimonials = [
  {
    quote:
      "Scan & Dine transformed our entire operation. Table turnover is up 30%, staff are happier, and guests keep coming back for the experience.",
    author: "Marcus Webb",
    role: "Owner, Ember & Oak",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
  },
  {
    quote:
      "The onboarding was shockingly smooth. Within 24 hours we had QR codes on every table. The kitchen dashboard is a game changer for our team.",
    author: "Yuki Tanaka",
    role: "Head Chef, Sakura Garden",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
  },
  {
    quote:
      "Our customers constantly comment on the seamless ordering experience. The session flow is genuinely delightful — no friction whatsoever.",
    author: "Giuseppe Romano",
    role: "Director, La Piazza",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
  },
];

// Duplicate for seamless infinite marquee loop
const testimonials = [
  ...baseTestimonials,
  ...baseTestimonials,
  ...baseTestimonials,
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden select-none">
      {/* ─── Ambient Lighting (Soft, cinematic glow) ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 blur-[150px] rounded-md pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* ─── Header Block ─── */}
        <FadeUp className="text-center flex flex-col items-center mb-20">
          <span className="inline-flex items-center justify-center gap-2 px-3 py-1 border border-border bg-card/50 backdrop-blur-sm text-brand font-ui text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-6 rounded-none-force shadow-sm">
            <MessageSquare size={13} className="text-brand animate-pulse" />
            Partner Stories
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-[0.95] tracking-tight">
            Loved by
            <br />
            <em className="not-italic text-gradient drop-shadow-sm">
              restaurant owners.
            </em>
          </h2>
        </FadeUp>

        {/* ─── Marquee Container ─── */}
        <div
          className="relative group w-full flex overflow-hidden py-4"
          style={{
            // CSS Mask for incredibly smooth fade-out on the left and right edges
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          {/* Marquee Track */}
          <div className="flex gap-6 animate-marquee group-hover:[animation-play-state:paused] w-max">
            {/* First Set */}
            <div className="flex gap-6 px-3">
              {testimonials.map((t, idx) => (
                <TestimonialCard key={`set1-${idx}`} t={t} />
              ))}
            </div>

            {/* Second Set (Exact duplicate for perfect loop) */}
            <div className="flex gap-6 px-3">
              {testimonials.map((t, idx) => (
                <TestimonialCard key={`set2-${idx}`} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Sub-Component for Clean Code ─────────────────────────────
function TestimonialCard({ t }) {
  return (
    <div className="w-[320px] sm:w-[400px] flex-shrink-0 group/card p-8 bg-card rounded-none border border-border/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative flex flex-col overflow-hidden cursor-default">
      {/* Soft Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

      {/* Decorative Quote Mark */}
      <Quote
        size={80}
        className="absolute -top-4 -right-4 text-brand/5 group-hover/card:text-brand/10 transition-colors duration-500 rotate-12 pointer-events-none"
        strokeWidth={1}
      />

      {/* Stars */}
      <div className="flex gap-1 mb-6 relative z-10">
        {Array.from({ length: t.rating }).map((_, j) => (
          <Star
            key={j}
            size={16}
            className="text-amber-500 fill-amber-500 drop-shadow-sm"
          />
        ))}
      </div>

      {/* Quote Text */}
      <p className="text-foreground/90 text-sm sm:text-base leading-relaxed mb-8 font-ui font-medium relative z-10 flex-1">
        "{t.quote}"
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-4 relative z-10 pt-6 border-t border-border/40">
        <img
          src={t.avatar}
          alt={t.author}
          className="w-12 h-12 object-cover rounded-full ring-2 ring-border/50 group-hover/card:ring-brand/30 transition-all duration-500"
        />
        <div>
          <p className="font-display font-bold text-foreground text-base tracking-tight group-hover/card:text-brand transition-colors">
            {t.author}
          </p>
          <p className="text-muted-foreground font-ui text-[10px] sm:text-xs font-semibold tracking-widest uppercase mt-0.5">
            {t.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsSection;
