import { Star, MessageSquare, Quote } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

const testimonials = [
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

const TestimonialsSection = () => {
  return (
    <section className="py-32 bg-background relative overflow-hidden border-t border-border select-none">
      {/* Background Textures */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Perfectly Centered Header Block */}
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

        {/* Testimonials Grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          stagger={0.15}
        >
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <div className="group p-8 bg-card/60 backdrop-blur-md border border-border hover:border-brand/40 transition-colors duration-500 relative overflow-hidden h-full flex flex-col rounded-none-force shadow-sm hover:shadow-brand-sm cursor-default">
                {/* High-Performance CSS Hover Line */}
                <div className="absolute top-0 left-0 h-0 w-1 bg-brand transition-all duration-500 ease-out group-hover:h-full" />

                {/* Decorative Theme-Aware Quote Icon */}
                <Quote
                  size={80}
                  className="absolute top-4 right-4 text-brand/5 group-hover:text-brand/10 transition-colors duration-500 rotate-12 pointer-events-none"
                  strokeWidth={1}
                />

                {/* Star Rating */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className="text-amber-500 fill-amber-500"
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-foreground text-sm sm:text-base leading-relaxed mb-8 font-ui font-medium relative z-10 flex-1">
                  "{t.quote}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 relative z-10 pt-6 border-t border-border">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-12 h-12 object-cover border border-border rounded-none-force grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div>
                    <p className="font-display font-bold text-foreground text-base tracking-tight group-hover:text-brand transition-colors">
                      {t.author}
                    </p>
                    <p className="text-muted-foreground font-ui text-[10px] sm:text-xs font-semibold tracking-widest uppercase mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default TestimonialsSection;
