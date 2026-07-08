import { Link } from 'react-router-dom';
import { MessagesSquare, BirdIcon, FlameKindling, GitBranchIcon} from 'lucide-react';

const LINKS = {
  Product:  ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Company:  ['About', 'Blog', 'Careers', 'Press'],
  Support:  ['Documentation', 'Contact', 'Status', 'Community'],
  Legal:    ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

const SOCIALS = [
  { icon: BirdIcon,   href: '#', label: 'Twitter'  },
  { icon: MessagesSquare, href: '#', label: 'Instagram' },
  { icon: FlameKindling,  href: '#', label: 'LinkedIn'  },
  { icon: GitBranchIcon,    href: '#', label: 'GitHub'    },
];

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display font-black text-xl text-white tracking-tight">
              Scan <span className="text-primary">&amp;</span> Dine
            </Link>
            <p className="text-text-muted text-sm mt-3 leading-relaxed">
              The smartest QR restaurant platform. Scan, order, enjoy.
            </p>
            <div className="flex gap-3 mt-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-surface-border flex items-center justify-center text-text-muted hover:text-white hover:border-primary/40 transition-colors"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-text-muted text-sm hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-surface-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Scan &amp; Dine. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">
            Built with ❤️ for restaurateurs everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}