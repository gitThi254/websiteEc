import React, { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [search, setSearch] = useSearchParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search?.get("page")]);
  return null;
};

export default ScrollToTop;
