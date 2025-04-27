import React from "react";

export function useWindowSize() {
  const [size, setSize] = React.useState({
    width: 0,
    height: 0,
  });

  React.useLayoutEffect(() => {
    const handleResize = () => {
      setSize({
        width: window?.innerWidth || 0,
        height: window?.innerHeight || 0,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}
