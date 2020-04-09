import { useState, useEffect, useRef } from "react";

// source: https://usehooks.com/useHover/

export function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseEnter = () => setValue(true);
  const handleMouseLeave = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        // @ts-ignore
        node.addEventListener("mouseenter", handleMouseEnter);
        // @ts-ignore
        node.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          // @ts-ignore
          node.removeEventListener("mouseenter", handleMouseEnter);
          // @ts-ignore
          node.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );

  return [ref, value];
}
