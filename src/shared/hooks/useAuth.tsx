import React, { useState, useEffect, useContext, createContext } from "react";
import { useScript } from "./useScript";

const gapiAttributes = {
  clientId:
    "812428686450-iuhv7h62rq65k290vsqjfrq2n4p7j1v4.apps.googleusercontent.com",
  scope:
    "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
};

const authContext = createContext({});

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [loaded, error] = useScript("https://apis.google.com/js/platform.js");
  console.log({ loaded, error });
  const [user, setUser] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = () => {
    if (loaded) {
      const { gapi } = window;
      gapi.auth2.getAuthInstance().signIn();
    }
    // return firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then((response) => {
    //     setUser(response.user);
    //     return response.user;
    //   });
  };

  const signout = () => {
    // return firebase
    //   .auth()
    //   .signOut()
    //   .then(() => {
    //     setUser(false);
    //   });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  useEffect(() => {
    if (loaded) {
      console.log("IT HAS LOADETH");

      const gapi = window.gapi;

      gapi.load("auth2", () => {
        gapi.auth2.init(gapiAttributes).then((v: any) => {
          console.log("authenticated", gapi.auth2);
        });
      });

      gapi.load("client", () => {
        gapi.client.init(gapiAttributes).then(() => {
          gapi.client.drive.files
            .list({
              pageSize: 10,
              fields: "nextPageToken, files(id, name)",
            })
            .then(function (response: any) {
              console.log(response.result.files);
            });
        });
      });
    }
    // const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     setUser(user);
    //   } else {
    //     setUser(false);
    //   }
    // });
    // Cleanup subscription on unmount
    // return () => unsubscribe();
  }, [loaded]);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signout,
  };
}
