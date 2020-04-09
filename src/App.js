import React, { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";

import {
  signIn,
  isUserSignedIn,
  getUserProfile,
  getDriveInfo,
} from "./googleApi";
import { Input } from "./components/Input";
import { Logo } from "./components/Logo";
import { Button } from "./components/Button";
import { Collection } from "./components/Collection";
import { primary } from "./shared/colors";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${primary};
  }

  body, html {
    margin:0;
    padding: 0;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 15vh 15vw;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
  justify-content: space-between;
`;

const Profile = styled.div`
  max-width: 300px;
`;

function App() {
  useEffect(() => {}, []);

  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Header>
          <Logo />
          <Profile>
            <Button onClick={signIn}>Sign in with Google</Button>
          </Profile>
        </Header>
        <br />
        <br />
        <Collection />
        {/* <Button
          onClick={() => {
            isUserSignedIn().then(console.log);
            getUserProfile().then(console.log);
            getDriveInfo().then(console.log);
          }}
        >
          Do google
        </Button> */}
      </AppWrapper>
    </>
  );
}

export default App;
