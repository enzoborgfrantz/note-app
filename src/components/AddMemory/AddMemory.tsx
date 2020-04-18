import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "../Button";
import { Input } from "../Input";
import { AddItem } from "../../shared/hooks/useStore";

const Wrapper = styled.div`
  background-color: #ebebeb;
  box-sizing: border-box;
`;

interface AddMemoryProps {
  add: AddItem;
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding-top: 10px;
  > * {
    &:first-child {
      margin-right: 10px;
    }
  }
`;

const AddMemory = ({ add }: AddMemoryProps) => {
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const addMemory = () => {
    add({ value });
    setValue("");
    inputRef.current.focus();
  };

  const cancelAddMemory = () => {
    setValue("");
    setShowInput(false);
  };

  const onKeyDown = ({ key }: { key: string }) => {
    if (key === "Enter") {
      addMemory();
    }
  };

  return (
    <Wrapper>
      {!showInput ? (
        <Button autoWidth onClick={() => setShowInput(true)}>
          Add Memory
        </Button>
      ) : (
        <InputWrapper>
          <Input
            innerRef={inputRef}
            autoFocus
            // @ts-ignore
            onKeyDown={onKeyDown}
            value={value}
            onChange={({ target: { value } }) => setValue(value)}
          />
          <ButtonWrapper>
            <Button autoWidth onClick={addMemory}>
              Add Memory
            </Button>
            <Button autoWidth isSecondary onClick={cancelAddMemory}>
              Cancel
            </Button>
          </ButtonWrapper>
        </InputWrapper>
      )}
    </Wrapper>
  );
};

export { AddMemory };
