export enum THEME {
  DEFAULT = "default",
  DARK = "dark",
}

export const ROUTERS = {
  HOME: "/",
  BLOG: "/blog",
  RESUME: "https://www.luanluan.tech/",
};

export const MENU = [
  { name: "Home", link: ROUTERS.HOME },
  { name: "Blog", link: ROUTERS.BLOG },
  { name: "My Resume", link: ROUTERS.RESUME },
];
