"use client";

import { useEffect, useState } from "react";
import { Button } from "../button";
import { MoonSvg, SunSvg } from "@/assets/svgs";

enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export default function ThemeControl() {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  useEffect(() => {
    const storedTheme = (localStorage.getItem("theme") as Theme) || Theme.LIGHT;
    setTheme(storedTheme);
    document.documentElement.classList.toggle(
      Theme.DARK,
      storedTheme === Theme.DARK,
    );
  }, []);

  const switchTheme = (themeName: Theme) => {
    setTheme(themeName);
    localStorage.setItem("theme", themeName);
    document.documentElement.classList.toggle(
      Theme.DARK,
      themeName === Theme.DARK,
    );
  };

  return (
    <div className="flex gap-2 w-[50px] justify-end theme-control">
      {theme === Theme.LIGHT ? (
        <Button
          variant="default"
          className="!rounded-lg"
          onClick={() => switchTheme(Theme.DARK)}
        >
          <SunSvg />
        </Button>
      ) : (
        <Button
          variant="default"
          className="!rounded-lg"
          onClick={() => switchTheme(Theme.LIGHT)}
        >
          <MoonSvg />
        </Button>
      )}
    </div>
  );
}
