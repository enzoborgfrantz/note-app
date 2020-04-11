import React, { useState, useEffect, useContext, createContext } from "react";

import { useGoogleApi } from "./useGoogleApi";
import { useGoogleAuth } from "./useGoogleAuth";

interface GoogleDriveFile {
  name: string;
  id: string;
}

interface GoogleDrive {
  fetchFiles?: () => void;
  files?: GoogleDriveFile[];
  isFetchingFiles: boolean;
}

const googleDriveContext = createContext<GoogleDrive>({
  isFetchingFiles: false,
});

export const useGoogleDriveProvider = () => {
  const { isGoogleApiReady } = useGoogleApi();
  const { isUserAuthenticated } = useGoogleAuth();
  const [isFetchingFiles, setIsFetchingFiles] = useState(false);
  const [files, setFiles] = useState<GoogleDriveFile[]>([]);

  const fetchFiles = () => {
    if (!isGoogleApiReady || !isUserAuthenticated) {
      return Promise.reject();
    }

    setIsFetchingFiles(true);
    window.gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name)",
      })
      .then(function (response: any) {
        setIsFetchingFiles(false);
        const files: Array<GoogleDriveFile> = response.result.files;
        setFiles(files);
      });
  };

  useEffect(() => {
    if (isGoogleApiReady && isUserAuthenticated) {
      fetchFiles();
    }
  }, [isGoogleApiReady, isUserAuthenticated]);

  const googleDrive: GoogleDrive = {
    fetchFiles,
    isFetchingFiles,
    files,
  };

  return googleDrive;
};

export function GoogleDriveProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const googleDrive = useGoogleDriveProvider();
  return (
    <googleDriveContext.Provider value={googleDrive}>
      {children}
    </googleDriveContext.Provider>
  );
}

export const useGoogleDrive = () => {
  return useContext<GoogleDrive>(googleDriveContext);
};
