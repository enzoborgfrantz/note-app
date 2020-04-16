import React from "react";
import styled, { keyframes } from "styled-components";
import { secondary } from "../../shared/colors";

const float = keyframes`
	0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(-10px);
	}
	100% {
		transform: translatey(0px);
	}
`;

const Cloud = styled.div`
  cursor: pointer;
  color: black;
  background: rgb(255, 255, 255);
  background: linear-gradient(top, #fff 5%, #f1f1f1 100%);
  border-radius: 100px;
  box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
  height: 40px;
  position: relative;
  width: 125px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  animation: ${float} 6s ease-in-out infinite;
  margin-top: 40px;

  &::after,
  &::before {
    background: inherit;
    content: "";
    position: absolute;
  }

  &::after {
    left: 15%;
    top: -45%;
    height: 50%;
    width: 35%;
    border-top-left-radius: 1000px;
    border-top-right-radius: 1000px;
  }

  &::before {
    right: 15%;
    top: -70%;
    height: 75%;
    width: 50%;
    border-top-left-radius: 1000px;
    border-top-right-radius: 1000px;
  }
`;

const LogoText = styled.div`
  color: ${secondary};
  font-size: 15px;
  align-self: flex-end;
  padding-bottom: 12.5px;
  font-weight: 600;
`;

export const Logo = () => (
  <Cloud>
    <LogoText>memorycloud</LogoText>
  </Cloud>
);
