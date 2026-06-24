import { useEffect, useRef } from 'react';

/**
 * Applies a parallax scroll effect to the referenced element via CSS transform.
 *
 * @param speed - Fraction of scroll distance the element moves (0.2 = 20% of scroll).
 *                Positive → element moves in scroll direction (slower than page).
 *                Negative → element moves opposite to scroll (faster upward drift).
 * @param mode  - 'absolute' uses window.scrollY directly (best for hero bg at top of page).
 *                'viewport' uses position relative to viewport center (best for mid-page elements).
 */
export const useParallax = <T extends HTMLElement = HTMLElement>(
  speed = 0.25,
  mode: 'absolute' | 'viewport' = 'absolute',
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.style.willChange = 'transform';

    const update = () => {
      let translateY: number;

      if (mode === 'absolute') {
        translateY = window.scrollY * speed;
      } else {
        const rect = element.getBoundingClientRect();
        const distanceFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
        translateY = distanceFromCenter * speed;
      }

      element.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener('scroll', update, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', update);
      if (element) element.style.willChange = '';
    };
  }, [speed, mode]);

  return ref;
};
