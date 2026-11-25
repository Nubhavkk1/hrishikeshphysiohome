import { createElement, useEffect, useRef, useState } from 'react';

export function ScrollReveal({
  as: Element = 'div',
  children,
  className = '',
  delay = 0,
  style,
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return undefined;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(element);
      }
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -24px 0px',
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return createElement(Element, {
    ref,
    ...props,
    className: `scroll-reveal${isVisible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`,
    style: { ...style, '--scroll-reveal-delay': `${delay}ms` },
  }, children
  );
}

export function AnimatedNumber({ value, suffix = '+', duration = 850 }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setCount(value);
      return undefined;
    }

    let frameId;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      observer.disconnect();
      const prefersReducedMotion = window.matchMedia
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        setCount(value);
        return;
      }

      const startTime = performance.now();
      const updateCount = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - ((1 - progress) ** 3);
        setCount(Math.floor(value * easedProgress));

        if (progress < 1) {
          frameId = requestAnimationFrame(updateCount);
        } else {
          setCount(value);
        }
      };

      frameId = requestAnimationFrame(updateCount);
    }, { threshold: 0.6 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [duration, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}
