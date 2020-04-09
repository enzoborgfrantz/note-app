import styled, { css } from "styled-components";
import { secondary } from "../../shared/colors";

export const Button = styled.button<{ isSecondary?: boolean }>(
  ({ isSecondary }) => [
    css`
      appearance: none;
      border: none;
      background-color: ${secondary};
      padding: 15px 25px 20px;
      color: white;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: inset -6px -8px 0 #cc1a00;
      box-sizing: border-box;
      font-size: 16px;
      font-weight: 300;
      outline: none;
      transition: all 0.25s ease-in;
      width: 100%;
      font-weight: 400;
      font-family: monospace;
      &:active {
        box-shadow: none;
      }
    `,
    isSecondary &&
      css`
        border: 2px solid ${secondary};
        background-color: white;
        color: ${secondary};
        box-shadow: none;
      `,
  ]
);
