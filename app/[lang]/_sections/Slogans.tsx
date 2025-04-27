"use client";
import React, { useEffect, useState } from "react";

const SLOGANS = [
  "Bạn cần tạo trang web cá nhân",
  "Tôi cần bản MVP cho startup",
  "Bạn đang muốn phát triển website",
  "Bạn đang tìm kiếm giải pháp công nghệ",
  "Bạn cần tạo trang web cá nhân",
  "Tôi cần bản MVP cho startup",
  "Bạn đang muốn phát triển website",
  "Bạn đang tìm kiếm giải pháp công nghệ",
  "Bạn cần tạo trang web cá nhân",
  "Tôi cần bản MVP cho startup",
];

type CarouselItem = { name: string; id: number; position: number };

export const Slogans: React.FC = () => {
  const [carouselDeg, setCarouselDeg] = useState(17);
  const [itemDeg, setItemDeg] = useState(-17);
  const [centerItem, setCenterItem] = useState(5);
  const [lastItem] = useState(SLOGANS.length - 1);
  const [nextItem, setNextItem] = useState(6);
  const [prevItem, setPrevItem] = useState(4);

  const carousel: CarouselItem[] = SLOGANS.map((slogan, index) => ({
    name: slogan,
    id: index,
    position: index + 1,
  }));

  const getIdItems = (side: boolean) => {
    const updateItems = (itemId: number) => {
      if (itemId === lastItem) {
        setNextItem(0);
        setPrevItem(lastItem - 1);
      } else if (itemId === 0) {
        setNextItem(1);
        setPrevItem(lastItem);
      } else {
        setNextItem(itemId + 1);
        setPrevItem(itemId - 1);
      }
    };

    if (side) {
      setCenterItem(() => {
        const newCenter = nextItem;
        updateItems(newCenter);
        return newCenter;
      });
    } else {
      setCenterItem(() => {
        const newCenter = prevItem;
        updateItems(newCenter);
        return newCenter;
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const next = () => {
    getIdItems(true);
    setCarouselDeg((prev) => prev - 36);
    setItemDeg((prev) => prev + 36);
  };

  //   const prev = () => {
  //     getIdItems(false);
  //     setCarouselDeg((prev) => prev + 36);
  //     setItemDeg((prev) => prev - 36);
  //   };

  const getCssClass = (id: number) => {
    if (id === centerItem) return "active";
    if (id === nextItem) return "next";
    if (id === prevItem) return "prev";
    return "";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 2000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="relative lg:absolute right-[-182px]">
      <div
        className="wrap-slogans"
        style={{ transform: `rotate(${carouselDeg}deg)` }}
      >
        {carousel.map((item, index) => (
          <div
            className={`item-carousel ${getCssClass(index)} `}
            key={item.id}
            id={String(item.id)}
            style={{ transform: `rotate(${itemDeg}deg)` }}
          >
            <div className="absolute right-0 font-bold text-lg slogan-text">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
