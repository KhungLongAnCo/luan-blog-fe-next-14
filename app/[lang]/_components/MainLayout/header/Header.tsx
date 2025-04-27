"use client";
import { logoPng } from "@/assets/pngs";
import { Button } from "@/components/ui/button";
import ThemeControl from "@/components/ui/theme-control/ThemeControl";
import { MENU, ROUTERS } from "@/defines";
import { useWindowSize } from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export const Navbar: React.FC = () => {
  const [menuMobileVisible, setMenuMobileVisible] = useState(false);
  const { width } = useWindowSize();
  const pathname = usePathname();

  useEffect(() => {
    if (width < 768) {
      setMenuMobileVisible(false);
    }
  }, [width]);

  const checkMenuActive = (link: string) => {
    if (pathname === "/en") {
      return link === ROUTERS.HOME;
    }
    return pathname?.includes(`/en${link}`) && link !== ROUTERS.HOME;
  };

  useEffect(() => {
    if (menuMobileVisible) {
      setMenuMobileVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <nav className="main-layout-nav-menu fixed w-full z-20 top-0 start-0 ">
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 md:pl-[80px] md:pr-[20px] py-4">
        <Link href="/" className="flex items-center space-x-3 w-[48px]">
          <Image
            src={logoPng}
            width={logoPng.width}
            height={logoPng.height}
            alt="logo"
            className="w-full"
          />
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 md:hidden">
          <Button
            type="button"
            className="inline-flex items-center p-2 w-8 h-8 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setMenuMobileVisible((prev) => !prev)}
          >
            {menuMobileVisible ? (
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l12 12M13 1L1 13"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            )}
          </Button>
        </div>
        <div
          className={`wrap-menu items-center justify-end w-full md:w-auto md:order-1 overflow-hidden hidden md:flex`}
        >
          <ul
            className={`flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 md:flex-row md:mt-0 md:border-0 overflow-hidden `}
          >
            {MENU?.map((i, index) => (
              <li
                key={`menu-item-${i.name}-${index}`}
                className={`menu-item ${
                  checkMenuActive(i.link) ? "menu-item-active text-primary" : ""
                }`}
              >
                <Link
                  href={i.link}
                  className="block py-2 px-3 rounded text-base font-bold"
                  aria-current="page"
                >
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeControl />
        </div>
      </div>
      <div
        className={`wrap-menu overflow-hidden transition-all ${
          menuMobileVisible ? "h-auto !block" : "!h-0 !p-0 !m-0"
        }`}
      >
        <ul
          className={`flex flex-col px-4 md:p-0 font-medium rounded-lg  md:space-x-8 md:flex-row md:mt-0 md:border-0 overflow-hidden `}
        >
          {MENU?.map((i, index) => (
            <li key={`menu-item-${i.name}-${index} border-b border-gray-100`}>
              <Link
                href={i.link}
                className="block py-2 px-3 rounded"
                aria-current="page"
              >
                {i.name}
              </Link>
            </li>
          ))}
        </ul>
        {menuMobileVisible ? (
          <div className="absolute right-4 bottom-[21px]">
            <ThemeControl />
          </div>
        ) : null}
      </div>
    </nav>
  );
};
