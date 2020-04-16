import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Transition, TransitionGroup } from "react-transition-group";

import { Button } from "../Button";
import { Memory } from "../Memory";
import { Input } from "../Input";
import { ActionPanel } from "../ActionPanel";
import { LoadingScreen } from "../LoadingScreen";
import { useGoogleAuth } from "../../shared/hooks/useGoogleAuth";
import { useGoogleApi } from "../../shared/hooks/useGoogleApi";
import { useStore } from "../../shared/hooks/useStore";
import { Fade } from "../Fade";
import { AddMemory } from "../AddMemory";

const Collection = styled.div(({ theme }) => [
  css`
    height: auto;
    max-height: 100%;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    transition: height 150ms ease-in;
    padding: 0;
  `,
]);

const Searchbar = styled.div`
  background-color: #ebebeb;
`;

const Memories = styled.div`
  padding: 10px 0;

  &:empty {
    padding: 10px 0 0;
  }

  > * {
    &:not(:first-child) {
      margin-top: 10px;
    }
  }
`;

const LoadingScreenWrapper = styled.div`
  margin: 15px 0;
  height: 100%;
`;

const Wrapper = styled(Fade)`
  padding: 15px;
  background-color: #ebebeb;
  /* min-height: 430px; */
`;

const Loading = () => (
  <LoadingScreenWrapper>
    <LoadingScreen />
  </LoadingScreenWrapper>
);

const AddMemorySection = styled.div`
  background-color: #ebebeb;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
`;

export default () => {
  const { add, remove, update, items: memories } = useStore();
  const { isGoogleApiReady } = useGoogleApi();
  const { isUserAuthenticated } = useGoogleAuth();
  const [showAddMemory, setShowAddMemory] = useState(false);
  // const { files: memories, isFetchingFiles, fetchFiles } = useGoogleDrive();

  if (!isGoogleApiReady) {
    return (
      <Collection>
        <Loading />
      </Collection>
    );
  }

  if (!isUserAuthenticated) {
    return (
      <Collection>
        <span>please log in</span>
      </Collection>
    );
  }

  const isLoading = false; // @TODO

  return (
    <Collection>
      {isLoading ? (
        <LoadingScreenWrapper>
          <LoadingScreen />
        </LoadingScreenWrapper>
      ) : (
        <Wrapper isVisible={!isLoading}>
          <Searchbar>
            <Input placeholder="search" />
          </Searchbar>
          <Memories>
            <TransitionGroup component={null}>
              {memories &&
                // @ts-ignore
                Object.entries(memories).map(([key, memory]) => (
                  // @ts-ignore
                  <Memory
                    {...memory}
                    id={key}
                    remove={remove}
                    update={update}
                  />
                ))}
            </TransitionGroup>
          </Memories>
          <AddMemory add={add} />
          {/* <AddMemorySection>
            <Button autoWidth onClick={() => setShowAddMemory(true)}>
              Add Memory
            </Button>
          </AddMemorySection> */}
        </Wrapper>
      )}
    </Collection>
  );
};
