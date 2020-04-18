import React, { useState } from "react";
import styled from "styled-components";
import { Transition } from "react-transition-group";

import { Pencil } from "@styled-icons/boxicons-solid/Pencil";
import { TrashAlt } from "@styled-icons/boxicons-solid/TrashAlt";
import { Copy } from "@styled-icons/boxicons-solid/Copy";

import { MemoryType } from "../../shared/types";
import { Input } from "../Input";
import { RemoveItem, UpdateItem } from "../../shared/hooks/useStore";
import { Fade } from "../Fade";

enum State {
  Entering = "entering",
  Entered = "entered",
  Exiting = "Exiting",
  Exited = "exited",
}

const animationDuration = 250;

const MemoryWrapper = styled.div<{ state: State }>`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: white;
  border-bottom: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-radius: 8px;
  font-family: monospace;
  /* transition: all 0.2s ease-in; */
  box-sizing: border-box;
  &:hover {
    background-color: #f7f7f7;
  }
  min-height: 40px;
  overflow: hidden;

  /* transition: all ${animationDuration}ms ease-in; */
  /* opacity: ${({ state }: { state: State }) => {
    return state === "entered" ? 1 : 0;
  }};

  height: ${({ state }: { state: State }) => {
    return state === "entered" ? "45px" : "0px";
  }}; */
`;

const IconWrapper = styled.div<{ isHovered: boolean }>`
  position: absolute;
  top: 4px;
  right: 15px;
  > * {
    width: 30px;
    height: 30px;
    padding: 5px;
    box-sizing: border-box;
    margin-left: 2px;
    color: #adadad;
    opacity: ${({ isHovered }) => (isHovered ? 1 : 0)};
    transition: all 0.2s ease-in;
    &:hover {
      background-color: #d9d9d9;
      border-radius: 8px;
    }
  }
`;

const ValueWrapper = styled.div`
  padding: 15px 15px;
  word-break: break-all;
`;

interface MemoryProps extends MemoryType {
  remove: RemoveItem;
  update: UpdateItem;
}

export default ({ id, remove, update, value, ...rest }: MemoryProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [editValue, setEditValue] = useState(value);
  // console.log({ rest });

  const onKeyDown = ({ key }: { key: string }) => {
    if (key === "Enter") {
      update({ value: editValue }, id);
      setIsEditable(false);
    }
  };

  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <Transition
      appear={true}
      timeout={animationDuration}
      component={null}
      unmountOnExit
      mountOnEnter
      {...rest}
    >
      {(state: State) => (
        <MemoryWrapper
          state={state}
          // @ts-ignore
          onMouseEnter={onMouseEnter}
          // @ts-ignore
          onMouseLeave={onMouseLeave}
          // @ts-ignore
        >
          <IconWrapper isHovered={isHovered}>
            <Copy onClick={() => console.log("copy")} />
            <Pencil onClick={() => setIsEditable(true)} />
            <TrashAlt onClick={() => remove(id)} />
          </IconWrapper>
          {!isEditable ? (
            <ValueWrapper>{value}</ValueWrapper>
          ) : (
            <Input
              autoFocus
              value={editValue}
              onChange={({ target: { value } }) => setEditValue(value)}
              onBlur={() => setIsEditable(false)}
              onKeyDown={onKeyDown}
            />
          )}
        </MemoryWrapper>
      )}
    </Transition>
  );
};
