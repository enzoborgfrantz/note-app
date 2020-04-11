import React, { useState, useEffect, useContext, createContext } from "react";

import { useGoogleApi } from "./useGoogleApi";
import { useGoogleAuth } from "./useGoogleAuth";

interface GoogleDrive {
  fetchFiles?: () => void;
  files?: gapi.client.drive.File[];
  isFetchingFiles: boolean;
}

const googleDriveContext = createContext<GoogleDrive>({
  isFetchingFiles: false,
});

// const createFile = async (name: string) => {
//   const fileId = window.gapi.client.drive.files
//     .create({
//       resource: {
//         name,
//         parents: ["appDataFolder"],
//         mimeType: "application/json",
//         body: JSON.stringify({
//           // @TODO verify this works
//           hey: "you",
//           you: 123,
//         }),
//       },
//       fields: "id",

//     })
//     .then((response) => response.result.id);
//   return fileId;
// };

const createFile = async (name: string, data: Object) => {
  const boundary = "-------314159265358979323846";
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";

  const contentType = "application/json";

  const metadata = {
    name: name,
    mimeType: contentType,
    parents: ["appDataFolder"],
  };

  const multipartRequestBody =
    delimiter +
    "Content-Type: application/json\r\n\r\n" +
    JSON.stringify(metadata) +
    delimiter +
    "Content-Type: " +
    contentType +
    "\r\n\r\n" +
    JSON.stringify(data) +
    close_delim;

  return await gapi.client.request({
    path: "/upload/drive/v3/files",
    method: "POST",
    params: { uploadType: "multipart" },
    headers: {
      "Content-Type": 'multipart/related; boundary="' + boundary + '"',
    },
    body: multipartRequestBody,
  });
};

const getFiles = async () => {
  const files = await window.gapi.client.drive.files
    .list({ spaces: "appDataFolder" })
    .then((response) => response.result.files);
  return files;
};

const getFileIdByName = async (name: string) => {
  const files = await getFiles();

  if (!files) {
    return null;
  }

  const file = files.find((file) => file.name === name);

  if (!file) {
    return null;
  }

  return file.id;
};

const getFileContentByFileId = async (fileId: string) => {
  const fileContent = await window.gapi.client.drive.files
    .get({
      fileId,
      alt: "media",
    })
    .then((response) => response.result);
  return fileContent;
};

export const useGoogleDriveProvider = () => {
  const { isGoogleApiReady } = useGoogleApi();
  const { isUserAuthenticated } = useGoogleAuth();
  const [isFetchingFiles, setIsFetchingFiles] = useState(false);
  const [files, setFiles] = useState<gapi.client.drive.File[]>([]);

  const fetchFiles = async () => {
    if (!isGoogleApiReady || !isUserAuthenticated) {
      return Promise.reject();
    }

    setIsFetchingFiles(true);
    const files = (await getFiles()) || [];
    setIsFetchingFiles(false);
    setFiles(files);
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
