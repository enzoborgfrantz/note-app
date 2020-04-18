import React from "react";
import styled from "styled-components";
import { Transition } from "react-transition-group";

enum State {
  Entering = "entering",
  Entered = "entered",
  Exiting = "Exiting",
  Exited = "exited",
}

interface WrapperProps {
  state: State;
}

const animationDuration = 1500;

const Wrapper = styled.div<WrapperProps>`
  transition: opacity ${animationDuration}ms ease-in-out;
  opacity: ${({ state }: { state: State }) => {
    // console.log({ state });
    return state === "entered" ? 1 : 0;
  }};
`;

interface FadeProps {
  children: JSX.Element | Array<JSX.Element>;
  isVisible: boolean;
  key?: string;
}

export const Fade = ({ isVisible, children, ...props }: FadeProps) => (
  <Transition
    key={props.key}
    in={isVisible}
    appear={true}
    timeout={animationDuration}
    unmountOnExit
    mountOnEnter
  >
    {(state: State) => (
      // @ts-ignore
      <Wrapper state={state} {...props}>
        {children}
      </Wrapper>
    )}
  </Transition>
);
