"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

type CharacterSet = string[] | readonly string[];

interface HyperTextProps extends MotionProps {
  /** The text content to be animated */
  children: string | ReactNode;
  /** Optional className for styling */
  className?: string;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Delay before animation starts in milliseconds */
  delay?: number;
  aniTime?: number;
  /** Component to render as - defaults to div */
  as?: React.ElementType;
  /** Whether to start animation when element comes into view */
  startOnView?: boolean;
  /** Whether to trigger animation on hover */
  animateOnHover?: boolean;
  /** Custom character set for scramble effect. Defaults to uppercase alphabet */
  characterSet?: CharacterSet;
}

const DEFAULT_CHARACTER_SET = Object.freeze(
  String("ABCDEFGHIJKLMNOPQRSTUVWXYZ").toLocaleLowerCase().split(""),
) as readonly string[];

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

export function HyperText({
  children,
  className,
  duration = 300,
  // delay = 0,
  as: Component = "span",
  // startOnView = false,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
  ...props
}: HyperTextProps) {
  const MotionComponent = motion(Component, {
    forwardMotionProps: true,
  });

  const textRender = typeof children === "string" ? children : "unsupported;";

  const [displayText, setDisplayText] = useState<string[]>(() =>
    textRender.split(""),
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [mouted, setMounted] = useState(false);
  const iterationCount = useRef(0);
  const animationTime = useRef(0);
  const elementRef = useRef<HTMLElement>(null);
  // const refTimeout = useRef<NodeJS.Timeout>()

  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      iterationCount.current = 0;
      animationTime.current = 1;
      setIsAnimating(true);
    }
  };

  // Handle animation start based on view or delay
  // useEffect(() => {
  //   if (startOnView) {
  //     const startTimeout = setTimeout(() => {
  //       setIsAnimating(true)
  //     }, delay)
  //     return () => clearTimeout(startTimeout)
  //   }

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         setTimeout(() => {
  //           setIsAnimating(true)
  //         }, delay)
  //         observer.disconnect()
  //       }
  //     },
  //     { threshold: 0.1, rootMargin: '-30% 0px -30% 0px' }
  //   )

  //   if (elementRef.current) {
  //     observer.observe(elementRef.current)
  //   }

  //   return () => observer.disconnect()
  // }, [delay, startOnView])

  // Handle scramble animation

  useEffect(() => {
    if (isAnimating && mouted) {
      let animationFrame: number;
      const maxIterations = textRender.length;

      const runAnimation = () => {
        if (iterationCount.current < maxIterations) {
          setDisplayText((currentText) =>
            currentText.map((letter, index) =>
              letter === " "
                ? letter
                : index <= iterationCount.current
                  ? textRender[index]
                  : characterSet[getRandomInt(characterSet.length)],
            ),
          );
          iterationCount.current += 0.2;
          animationFrame = requestAnimationFrame(runAnimation);
        } else {
          setIsAnimating(false);
          cancelAnimationFrame(animationFrame);
        }
      };

      animationFrame = requestAnimationFrame(runAnimation);

      return () => cancelAnimationFrame(animationFrame);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, duration, isAnimating, characterSet, mouted]);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 1000);
  }, []);

  if (typeof children !== "string") {
    return children;
  }

  return (
    <MotionComponent
      ref={elementRef}
      className={clsx("overflow-hidden", className, {
        "pointer-events-none": isAnimating, // Block pointer during animation
        "pointer-events-auto": !isAnimating, // Enable pointer when done
      })}
      onMouseEnter={handleAnimationTrigger}
      onMouseLeave={() => {
        // animationTime.current = 0
      }}
      {...props}
    >
      <AnimatePresence>
        {displayText.map((letter, index) => (
          <motion.span
            key={`${displayText}-${letter}-${index}`}
            className={clsx("hyper-text-font", letter === " " ? "w-full" : "")}
          >
            {letter}
          </motion.span>
        ))}
      </AnimatePresence>
    </MotionComponent>
  );
}
