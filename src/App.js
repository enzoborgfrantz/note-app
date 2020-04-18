import React, { useEffect } from "react";
import styled, { css, createGlobalStyle } from "styled-components";

import { Input } from "./components/Input";
import { Logo } from "./components/Logo";
import { Button } from "./components/Button";
import { Collection } from "./components/Collection";
import { primary } from "./shared/colors";
import { GoogleApiProvider } from "./shared/hooks/useGoogleApi";
import { Profile } from "./components/Profile";
import { GoogleAuthProvider } from "./shared/hooks/useGoogleAuth";
import { GoogleDriveProvider } from "./shared/hooks/useGoogleDrive";
import { ThemeProvider } from "./shared/styles/";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${primary};
  }

  body, html {
    margin:0;
    padding: 0;
  }
`;

const AppWrapper = styled.div(({ theme }) => [
  css`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    padding: 5vh 15vw 5vh;
    box-sizing: border-box;
    ${theme.mobile(css`
      padding: 15px;
    `)}
  `,
]);

const Header = styled.div(({ theme }) => [
  css`
    display: flex;
    align-items: flex-start;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
  `,
]);

function App() {
  return (
    <GoogleApiProvider>
      <GoogleAuthProvider>
        <GoogleDriveProvider>
          <GlobalStyle />
          <ThemeProvider>
            <AppWrapper>
              <Header>
                <Logo />
                <Profile />
              </Header>
              <br />
              <Collection />
            </AppWrapper>
          </ThemeProvider>
        </GoogleDriveProvider>
      </GoogleAuthProvider>
    </GoogleApiProvider>
  );
}

export default App;
