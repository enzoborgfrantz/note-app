import React, { createContext, useContext, useState, useEffect } from "react";

import { debounce } from "../utils";

interface Dimensions {
  height: number | null;
  width: number | null;
}

interface Layout {
  dimensions: Dimensions;
  isSmallScreen: boolean;
}

const getIsSmallScreen = (dimensions: Dimensions) =>
  Boolean(dimensions.width && dimensions.width < 767);

const LayoutContext = createContext<Layout>({
  dimensions: { width: null, height: null },
  isSmallScreen: false,
});

export const LayoutProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 200);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isSmallScreen = getIsSmallScreen(dimensions);
  const layout = { dimensions, isSmallScreen };

  return (
    <LayoutContext.Provider value={layout}>{children}</LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
