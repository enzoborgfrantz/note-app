import React from "react";
import styled from "styled-components";
import { Cloud, CloudSizes } from "./Cloud";

const LoadingScreenWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
`;

export const LoadingScreen = () => (
  <LoadingScreenWrapper>
    <Cloud size={CloudSizes.S} top={0} />
    <Cloud size={CloudSizes.XS} top={95} />
    <Cloud size={CloudSizes.M} top={155} />
    <Cloud size={CloudSizes.XS} top={270} />
    <Cloud size={CloudSizes.S} top={335} />
    <Cloud size={CloudSizes.M} top={420} />
    <Cloud size={CloudSizes.XS} top={535} />
  </LoadingScreenWrapper>
);
