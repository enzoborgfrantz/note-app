import React, { useState } from "react";
import styled from "styled-components";
import { Pencil } from "@styled-icons/boxicons-solid/Pencil";
import { TrashAlt } from "@styled-icons/boxicons-solid/TrashAlt";
import { Copy } from "@styled-icons/boxicons-solid/Copy";

import { MemoryType } from "../../shared/types";
import { useHover } from "../../shared/hooks";
import { Input } from "../Input";

const MemoryWrapper = styled.div`
  position: relative;
  cursor: pointer;
  background-color: #f7f7f7;
  border-bottom: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-radius: 8px;
  font-family: monospace;
  transition: all 0.2s ease-in;
  box-sizing: border-box;
  &:hover {
    background-color: #ebebeb;
  }
`;

const IconWrapper = styled.div<{ isHovered: boolean }>`
  position: absolute;
  top: 8px;
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
`;

export default (props: MemoryType) => {
  const [hoverRef, isHovered] = useHover();
  const [isEditable, setIsEditable] = useState(false);

  return (
    // @ts-ignore
    <MemoryWrapper ref={hoverRef}>
      <IconWrapper isHovered={Boolean(isHovered)}>
        <Copy onClick={() => console.log("copy")} />
        <Pencil onClick={() => setIsEditable(true)} />
        <TrashAlt onClick={() => console.log("delete")} />
      </IconWrapper>
      {!isEditable ? (
        <ValueWrapper>{props.value}</ValueWrapper>
      ) : (
        <Input
          autoFocus
          defaultValue={props.value}
          onBlur={() => setIsEditable(false)}
        />
      )}
    </MemoryWrapper>
  );
};
