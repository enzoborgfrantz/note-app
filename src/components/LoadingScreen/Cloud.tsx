import React from "react";
import styled, { css, keyframes } from "styled-components";

const floatRight = ({ left }: { left: number }) => keyframes`
    0% {
      left: ${left}px;
    }
    100% {
      left: 100%;
    }
`;

export enum CloudSizes {
  XS = 1,
  S = 2,
  M = 3,
  L = 4,
  XL = 5,
}

const CloudStyle = styled.div<{ size: CloudSizes; top: number }>(
  ({ size, top }) => [
    css`
      cursor: pointer;
      color: black;
      background: rgb(255, 255, 255);
      background: #ebebeb;
      background: linear-gradient(top, #fff 5%, #f1f1f1 100%);
      border-radius: 100px;
      box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      margin-top: ${12 * size}px;
      height: ${16 * size}px;
      width: ${50 * size}px;
      top: ${top}px;
      animation: ${floatRight({ left: -50 * size })} ${1 + Math.random() * 2}s
        ease-in infinite;

      &::after,
      &::before {
        background: inherit;
        content: "";
        position: absolute;
      }

      &::after {
        left: 15%;
        top: -50%;
        height: 50%;
        width: 35%;
        border-top-left-radius: 1000px;
        border-top-right-radius: 1000px;
      }

      &::before {
        right: 15%;
        top: -75%;
        height: 75%;
        width: 50%;
        border-top-left-radius: 1000px;
        border-top-right-radius: 1000px;
      }
    `,
  ]
);

interface CloudProps {
  size: CloudSizes;
  top: number;
}

export const Cloud = (props: CloudProps) => <CloudStyle {...props} />;
