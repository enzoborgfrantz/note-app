import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useGoogleApi } from "../../shared/hooks/useGoogleApi";
import { useOnClickOutside } from "../../shared/hooks/useOnClickOutside";
import { Button } from "../Button";
import { useGoogleAuth } from "../../shared/hooks";

const UserProfile = styled.div`
  background-color: white;
  padding: 4px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const FixedWidthButton = styled(Button)`
  width: 120px;
`;

const ProfilePicture = styled.img`
  border-radius: 8px;
  width: 32px;
  height: 32px;
`;

const UserName = styled.span`
  font-family: monospace;
  margin-left: 8px;
  margin-right: 4px;
`;

interface ProfileMenuProps {
  profilePhotoUrl: string;
  firstName: string;
  signOut: Function;
}

const Menu = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 4px;
  background-color: white;
  border-radius: 8px;
  padding: 5px;
  z-index: 1;
  box-shadow: 0px 2px 5px 2px rgba(222, 218, 222, 1);
`;

const topLogger = {
  name: "topLogger",
  enabled: true,
  phase: "main",
  fn({ state }) {
    console.log({ state });
    if (state.placement === "top") {
      console.log("Popper is on the top");
    }
  },
};

const ProfileMenu = ({ profilePhotoUrl, firstName, signOut }) => {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef() as React.MutableRefObject<HTMLElement>;
  useOnClickOutside(ref, () => setShowMenu(false));

  return (
    <>
      <UserProfile
        // @ts-ignore
        ref={ref}
        onClick={() => setShowMenu(true)}
      >
        <ProfilePicture src={profilePhotoUrl} />
        <UserName>{firstName}</UserName>
        {showMenu && (
          <Menu>
            <FixedWidthButton onClick={signOut}>Sign out</FixedWidthButton>
          </Menu>
        )}
      </UserProfile>
    </>
  );
};

export const Profile = () => {
  const { isGoogleApiReady } = useGoogleApi();
  const { isUserAuthenticated, userProfile, signIn, signOut } = useGoogleAuth();

  if (!isGoogleApiReady) {
    console.log({ isGoogleApiReady });
    return null;
  }

  return (
    <>
      {isUserAuthenticated ? (
        !userProfile ? null : (
          <ProfileMenu
            profilePhotoUrl={userProfile.profilePhotoUrl}
            firstName={userProfile.firstName}
            signOut={signOut}
          />
        )
      ) : (
        <FixedWidthButton onClick={signIn}>Sign in</FixedWidthButton>
      )}
    </>
  );
};
