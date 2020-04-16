import React from "react";
import { ThemeProvider } from "styled-components";
import { mediaQueries } from "./mediaQueries";

export default ({ children }) => {
  console.log({ mediaQueries });
  return <ThemeProvider theme={mediaQueries}>{children}</ThemeProvider>;
};
