"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * PageTransition
 *
 * Wraps page content and triggers a CSS `page-enter` animation whenever
 * the Next.js pathname changes. Works with the App Router without any
 * additional animation library.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Remove class, force reflow, re-add to replay animation.
    el.classList.remove("page-enter");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    void el.offsetWidth;
    el.classList.add("page-enter");
  }, [pathname]);

  return (
    <div ref={ref} className="page-enter">
      {children}
    </div>
  );
}
