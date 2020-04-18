import React, { InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { secondary } from "../../shared/colors";

const Input = styled.input<InputProps & { ref?: any }>(
  ({ whiteBackground }) => [
    css`
      width: 100%;
      height: 40px;
      background-color: #f7f7f7;
      box-sizing: border-box;
      padding: 5px 15px;
      font-family: monospace;
      font-size: 13px;
      border-radius: 8px;
      transition: all 0.25s ease-in;
      border: 2px solid transparent;

      &:focus {
        outline: none;
        border: 2px solid ${secondary};
      }
    `,
    whiteBackground &&
      css`
        background-color: white;
        border: none;

        &:focus {
          border: none;
        }
      `,
  ]
);

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  whiteBackground?: boolean;
  placeholder?: string; // @TODO figure out why this is ncessary
  autoFocus?: boolean; // @TODO figure out why this is ncessary
  defaultValue?: string; // @TODO figure out why this is ncessary
  onBlur?: any;
  innerRef?: any;
}

export default ({ innerRef, ...props }: InputProps) => {
  return (
    <InputWrapper>
      <Input ref={innerRef} {...props} />
    </InputWrapper>
  );
};
