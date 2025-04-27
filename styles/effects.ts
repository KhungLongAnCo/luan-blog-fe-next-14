import { AnimationProps, Variant, Variants } from "framer-motion";

type Animation = AnimationProps & {
  variants: Variants & {
    hide: Variant;
    visible: Variant;
  };
};

export const fade: Animation = {
  initial: {
    opacity: 0,
  },
  variants: {
    hide: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },
};

export const bounce: Animation = {
  initial: {
    scale: 0.4,
    opacity: 0,
  },
  variants: {
    hide: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
    },
  },
};

export const moveRight: Animation = {
  initial: {
    opacity: 0,
    x: 20,
  },
  variants: {
    hide: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  },
};

export const moveRightLinear: Animation = {
  initial: {
    opacity: 0,
    x: 20,
  },
  variants: {
    hide: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ease: "linear",
      },
    },
  },
};

export const moveLeft: Animation = {
  initial: {
    opacity: 0,
    x: -20,
  },
  variants: {
    hide: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  },
};

export const moveLeftLinear: Animation = {
  initial: {
    opacity: 0,
    x: -20,
  },
  variants: {
    hide: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ease: "linear",
      },
    },
  },
};

export const moveUp: Animation = {
  initial: {
    opacity: 0,
    y: 20,
  },
  variants: {
    hide: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
};

export const moveUpLinear: Animation = {
  initial: {
    opacity: 0,
    y: 20,
  },
  variants: {
    hide: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "linear",
      },
    },
  },
};

export const moveDown: Animation = {
  initial: {
    opacity: 0,
    y: -20,
  },
  variants: {
    hide: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
};

export const moveDownLinear: Animation = {
  initial: {
    opacity: 0,
    y: -20,
  },
  variants: {
    hide: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "linear",
      },
    },
  },
};
