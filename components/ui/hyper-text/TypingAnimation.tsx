"use client";

import { motion, MotionProps } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TypingAnimationProps extends MotionProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  startOnView?: boolean;
}

export function TypingAnimation({
  children,
  className,
  duration = 150,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  ...props
}: TypingAnimationProps) {
  const MotionComponent = motion(Component, {
    forwardMotionProps: true,
  });

  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const typingAniRef = useRef<any>(null);

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setStarted(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  const runTypingAni = () => {
    if (!started) return;
    let i = 0;
    typingAniRef.current = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingAniRef.current);
        runTypingAni();
      }
    }, duration);
  };

  useEffect(() => {
    if (!started) return;
    runTypingAni();
    return () => {
      clearInterval(typingAniRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, duration, started]);

  return (
    <MotionComponent ref={elementRef} className={className} {...props}>
      {displayedText}
    </MotionComponent>
  );
}
