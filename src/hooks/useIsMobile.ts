"use client";

import { useEffect, useState } from "react";

export default function useIsMobile(query = "(max-width: 768px)") {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    setIsMobile(mql.matches);

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handler);
    } else {
      const legacyHandler = function (
        this: MediaQueryList,
        e: MediaQueryListEvent
      ) {
        setIsMobile(e.matches);
      };

      mql.addListener(legacyHandler);

      return () => {
        mql.removeListener(legacyHandler);
      };
    }

    return () => {
      if (typeof mql.removeEventListener === "function") {
        mql.removeEventListener("change", handler);
      }
    };
  }, [query]);

  return isMobile;
}
