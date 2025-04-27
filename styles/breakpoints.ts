class Dimension {
  private value: number;

  constructor(val: number) {
    this.value = val;
  }

  public get number() {
    return this.value;
  }

  public get string() {
    return `${this.value}px`;
  }
}

class Breakpoint {
  private val: number;

  constructor(val: number) {
    this.val = val;
  }

  public get min() {
    return new Dimension(this.val + 0.02);
  }

  public get max() {
    return new Dimension(this.val - 0.02);
  }

  public get value() {
    return new Dimension(this.val);
  }
}

export const breakpoints = {
  sm: new Breakpoint(640),
  md: new Breakpoint(768),
  lg: new Breakpoint(1024),
  xl: new Breakpoint(1280),
  "2xl": new Breakpoint(1536),
};
