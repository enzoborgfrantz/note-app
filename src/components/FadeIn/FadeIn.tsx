import React from "react";
import styled from "styled-components";
import { Transition } from "react-transition-group";

export const Fade = styled.div<{ state: string }>`
  transition: 0.5s;
  opacity: ${({ state }) => (state === "entered" ? 1 : 0)};
`;

export const FadeIn = ({
  children,
  ...props
}: {
  children: JSX.Element | Array<JSX.Element>;
}) => (
  <Transition in={true} appear={true} timeout={500} unmountOnExit mountOnEnter>
    {(state: string) => (
      <Fade state={state} {...props}>
        {children}
      </Fade>
    )}
  </Transition>
);
