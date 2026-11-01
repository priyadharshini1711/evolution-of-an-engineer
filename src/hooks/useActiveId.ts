import { useEffect, useState } from 'react';

/**
 * Returns the id of whichever observed element is currently in the band set by
 * `rootMargin` (by default, the middle of the viewport). Elements that mount
 * later, such as lazily loaded sections, are picked up as they appear.
 */
export function useActiveId(ids: string[], rootMargin = '-45% 0px -50% 0px'): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observed = new Set<Element>();
    const intersecting = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }
        // Several can intersect during fast jumps; prefer the last in document order.
        const current = [...ids].reverse().find((id) => intersecting.has(id));
        if (current) setActive(current);
      },
      { rootMargin },
    );

    const attach = () => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && !observed.has(el)) {
          observed.add(el);
          observer.observe(el);
        }
      }
      return observed.size === ids.length;
    };

    if (attach()) return () => observer.disconnect();

    const mutations = new MutationObserver(() => {
      if (attach()) mutations.disconnect();
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, [ids, rootMargin]);

  return active;
}
