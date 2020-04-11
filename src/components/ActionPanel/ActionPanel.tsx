import React from "react";
import styled from "styled-components";
import { Button } from "../Button";

const ActionPanelWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  margin: 15px 15px 0;
  display: flex;
  > * {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`;

interface ActionPanelProps {
  refresh: () => void;
}

export const ActionPanel = ({ refresh }: ActionPanelProps) => (
  <ActionPanelWrapper>
    <Button>Add a memory</Button>
    <Button isSecondary onClick={refresh}>
      Refresh
    </Button>
    <Button isSecondary>Filter By</Button>
    <Button isSecondary>Sort By</Button>
  </ActionPanelWrapper>
);
