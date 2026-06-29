"use client";

import { useEffect } from "react";

/** Recalculates Lenis scroll height after client components render/animate */
export default function ScrollReset() {
  useEffect(() => {
    // Small delay lets Framer Motion complete initial animations
    // before Lenis recalculates total page height
    const t1 = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).lenis?.resize();
    }, 300);
    const t2 = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).lenis?.resize();
    }, 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return null;
}
