import React from "react";
import styled from "styled-components";
import { Memory } from "../Memory";
import { Input } from "../Input";
import { ActionPanel } from "../ActionPanel";
import { LoadingScreen } from "../LoadingScreen";
import { FadeIn } from "../FadeIn";
import { useGoogleDrive } from "../../shared/hooks/useGoogleDrive";
import { useGoogleAuth } from "../../shared/hooks/useGoogleAuth";
import { useGoogleApi } from "../../shared/hooks/useGoogleApi";

const Collection = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  min-height: 400px;
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

const StyledFadeIn = styled(FadeIn)`
  min-height: 430px;
`;

const Loading = () => (
  <LoadingScreenWrapper>
    <LoadingScreen />
  </LoadingScreenWrapper>
);

export default () => {
  const { isGoogleApiReady } = useGoogleApi();
  const { isUserAuthenticated } = useGoogleAuth();
  const { files: memories, isFetchingFiles, fetchFiles } = useGoogleDrive();

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

  console.log({ isFetchingFiles, memories });

  const refresh = fetchFiles || (() => {});

  return (
    <Collection>
      {isFetchingFiles ? (
        <LoadingScreenWrapper>
          <LoadingScreen />
        </LoadingScreenWrapper>
      ) : (
        <StyledFadeIn>
          <Searchbar>
            <Input whiteBackground placeholder="search" />
          </Searchbar>
          <ActionPanel refresh={refresh} />
          <Memories>
            {memories &&
              // @ts-ignore
              memories.map(({ name, ...memory }) => (
                // @ts-ignore
                <Memory value={name} {...memory} />
              ))}
          </Memories>
        </StyledFadeIn>
      )}
    </Collection>
  );
};
