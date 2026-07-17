import { useRef, useState, useEffect } from "react";
import { useSpring, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedNumber({ value, suffix = "", className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Triggers animation once when scrolled into view
  const springVal = useSpring(0, { stiffness: 45, damping: 15 });
  const [display, setDisplay] = useState(0);

  // Set the target value when the component comes into view
  useEffect(() => {
    if (isInView) {
      springVal.set(value);
    }
  }, [isInView, value, springVal]);

  // Cleanly subscribe to Framer Motion's spring changes and update React state
  useEffect(() => {
    return springVal.on("change", (v) => setDisplay(Math.round(v)));
  }, [springVal]);

  return (
    <span ref={ref} className={cn("tabular-nums font-bold", className)}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
