import React from "react";
import { useGoogleApi } from "../../shared/hooks/useGoogleApi";
import styled from "styled-components";
import { Button } from "../Button";
import { useGoogleAuth } from "../../shared/hooks";

const ProfileSection = styled.div`
  width: 300px;
  max-width: 300px;
  display: flex;
  justify-content: flex-end;
`;

const UserProfile = styled.div`
  background-color: white;
  padding: 4px;
  border-radius: 8px;
  display: flex;
  margin-right: 8px;
  align-items: center;
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

export const Profile = () => {
  const { isGoogleApiReady } = useGoogleApi();
  const { isUserAuthenticated, userProfile, signIn, signOut } = useGoogleAuth();

  if (!isGoogleApiReady) {
    console.log({ isGoogleApiReady });
    return null;
  }

  return (
    <ProfileSection>
      {isUserAuthenticated ? (
        !userProfile ? null : (
          <>
            <UserProfile>
              <ProfilePicture src={userProfile.profilePhotoUrl} />
              <UserName>{userProfile.firstName}</UserName>
            </UserProfile>
            <FixedWidthButton onClick={signOut}>Sign out</FixedWidthButton>
          </>
        )
      ) : (
        <FixedWidthButton onClick={signIn}>Sign in</FixedWidthButton>
      )}
    </ProfileSection>
  );
};
