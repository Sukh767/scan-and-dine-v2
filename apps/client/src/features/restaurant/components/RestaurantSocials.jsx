import {
  FaShareNodes,
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  FaLink,
} from "react-icons/fa6";

export default function RestaurantSocials({ restaurant }) {
  const socials = restaurant?.socialMedia || {};

  const platforms = [
    { name: "Instagram", icon: FaInstagram, url: socials.instagram },
    { name: "Facebook", icon: FaFacebook, url: socials.facebook },
    {
      name: "X (Twitter)",
      icon: FaXTwitter,
      url: socials.twitter || socials.x,
    },
  ].filter((p) => p.url);

  return (
    <div className="mb-12">
      <div className="bg-card p-8 md:p-12 rounded-md border border-border/40 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-brand/10 flex items-center justify-center rounded-md text-brand mb-4">
          <FaShareNodes size={20} />
        </div>

        <h2 className="font-display text-2xl font-bold text-foreground tracking-tight mb-2">
          Connect With Us
        </h2>
        <p className="text-muted-foreground font-ui text-sm mb-8 max-w-md">
          Follow us on social media for the latest updates, exclusive
          behind-the-scenes looks, and seasonal menu announcements.
        </p>

        {platforms.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3 bg-background rounded-md border border-border/40 hover:border-brand/40 hover:bg-brand/5 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  aria-label={platform.name}
                >
                  <Icon
                    size={18}
                    className="text-foreground/70 group-hover:text-brand transition-colors"
                  />
                  <span className="font-ui font-semibold text-sm text-foreground group-hover:text-brand transition-colors">
                    {platform.name}
                  </span>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-md border border-border/40">
            <FaLink size={12} className="text-muted-foreground" />
            <p className="text-muted-foreground font-ui text-xs font-medium uppercase tracking-widest">
              No linked profiles
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
