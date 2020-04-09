import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Memory } from "../Memory";
import { memories as mockMemories } from "../../data";
import { Input } from "../Input";
import { ActionPanel } from "../ActionPanel";
import { LoadingScreen } from "../LoadingScreen";
import { MemoryType } from "../../shared/types";
import { useAsync } from "../../shared/hooks";

const Collection = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
`;

const Searchbar = styled.div`
  padding: 15px;
  background-color: #ebebeb;
`;

const Memories = styled.div`
  padding: 15px;
  > * {
    &:not(:first-child) {
      margin-top: 10px;
    }
  }
`;

const LoadingScreenWrapper = styled.div`
  margin: 15px 0;
`;

const fetchMemories = () =>
  new Promise((resolve) => setTimeout(() => resolve(mockMemories), 7000));

export default () => {
  const { execute, pending, value: memories } = useAsync(fetchMemories, true);

  return (
    <Collection>
      {pending ? (
        <LoadingScreenWrapper>
          <LoadingScreen />
        </LoadingScreenWrapper>
      ) : (
        <>
          <Searchbar>
            <Input whiteBackground placeholder="search" />
          </Searchbar>
          <ActionPanel refresh={execute} />
          <Memories>
            {memories &&
              // @ts-ignore
              memories.map((memory) => <Memory {...memory} />)}
          </Memories>
        </>
      )}
    </Collection>
  );
};
