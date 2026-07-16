import { cn } from "@/lib/utils";
import { useTheme } from "../providers/hooks";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeSwitcher({ compact = false }) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const options = [
    { value: "light", Icon: Sun, label: "Light" },
    { value: "dark", Icon: Moon, label: "Dark" },
    { value: "system", Icon: Monitor, label: "System" },
  ];

  if (compact) {
    const current =
      options.find((option) => option.value === theme) || options[2];

    const { Icon } = current;

    return (
      <button
        onClick={() => {
          const currentIndex = options.findIndex(
            (option) => option.value === theme,
          );

          setTheme(options[(currentIndex + 1) % options.length].value);
        }}
        className="
          p-2
          rounded-lg
          hover:bg-accent
          transition-colors
        "
        title={`Theme: ${current.label}`}
      >
        <Icon size={16} className="text-foreground/70" />
      </button>
    );
  }

  return (
    <div
      className="
        flex
        items-center
        gap-1
        p-1
        rounded-xl
        bg-card/80
        border
        border-border
        backdrop-blur-md
      "
    >
      {options.map(({ value, Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          title={label}
          className={cn(
            "relative p-2 rounded-lg transition-all duration-200",
            theme === value
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {theme === value && (
            <motion.span
              layoutId="theme-indicator"
              className="
                absolute
                inset-0
                bg-background
                rounded-lg
                shadow-sm
                pointer-events-none
              "
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 35,
              }}
            />
          )}

          <Icon size={14} className="relative z-10" />
        </button>
      ))}
    </div>
  );
}
