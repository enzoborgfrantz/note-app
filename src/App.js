import React, { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";

import { Input } from "./components/Input";
import { Logo } from "./components/Logo";
import { Button } from "./components/Button";
import { Collection } from "./components/Collection";
import { primary } from "./shared/colors";
import { GoogleApiProvider } from "./shared/hooks/useGoogleApi";
import { Profile } from "./components/Profile";
import { GoogleAuthProvider } from "./shared/hooks/useGoogleAuth";
import { GoogleDriveProvider } from "./shared/hooks/useGoogleDrive";

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

function App() {
  return (
    <GoogleApiProvider>
      <GoogleAuthProvider>
        <GoogleDriveProvider>
          <GlobalStyle />
          <AppWrapper>
            <Header>
              <Logo />
              <Profile />
            </Header>
            <br />
            <br />
            <Collection />
            {/* <Button
          onClick={() => {
            isUserAuthenticated().then(console.log);
            getUserProfile().then(console.log);
            getDriveInfo().then(console.log);
          }}
        >
          Do google
        </Button> */}
          </AppWrapper>
        </GoogleDriveProvider>
      </GoogleAuthProvider>
    </GoogleApiProvider>
  );
}

export default App;
