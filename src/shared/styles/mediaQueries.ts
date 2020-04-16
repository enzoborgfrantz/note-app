import { css } from "styled-components";

const screenWidths = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  mobile: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
};

export const mediaQueries = Object.keys(screenWidths).reduce((acc, label) => {
  // @ts-ignore
  acc[label] = (...args) => `
    @media (max-width: ${screenWidths[label]}px) {
      ${
        // @ts-ignore
        css(...args)
      };
    }
  `;
  return acc;
}, {});
