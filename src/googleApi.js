/* eslint-disable no-undef */
let auth2;

/**
 * Client Id
 * 812428686450-iuhv7h62rq65k290vsqjfrq2n4p7j1v4.apps.googleusercontent.com
 * Client Secret
 * cuRMT-7I4KbbqZdRxulBycL1
 */

const loadGoogleAPI = (onLoad) => {
  if (!window.gapi) {
    return setTimeout(() => loadGoogleAPI(onLoad), 1000);
  }

  gapi.load("auth2", () => {
    auth2 = gapi.auth2
      .init({
        clientId:
          "812428686450-iuhv7h62rq65k290vsqjfrq2n4p7j1v4.apps.googleusercontent.com",
        scope:
          "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata",
      })
      .then(onLoad);
  });

  gapi.load("client", () => {
    gapi.client
      .init({
        clientId:
          "812428686450-iuhv7h62rq65k290vsqjfrq2n4p7j1v4.apps.googleusercontent.com",
        scope:
          "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
        ],
      })
      .then((r) => {
        gapi.client.drive.files
          .list({
            pageSize: 10,
            fields: "nextPageToken, files(id, name)",
          })
          .then(function (response) {
            console.log(response.result.files);
          });
      });
  });
};

const isGoogleApiLoaded = new Promise(loadGoogleAPI);

export const signIn = () =>
  isGoogleApiLoaded.then(() => gapi.auth2.getAuthInstance().signIn());

export const isUserSignedIn = () =>
  isGoogleApiLoaded.then(() => gapi.auth2.getAuthInstance().isSignedIn.get());

export const getUserProfile = () =>
  isGoogleApiLoaded.then(() => {
    const auth = gapi.auth2.getAuthInstance();
    const user = auth.currentUser.get();
    const profile = user.getBasicProfile();
    const scopes = user.getGrantedScopes();
    console.log(scopes);
    return {
      id: profile.getId(),
      name: profile.getName(),
      givenName: profile.getGivenName(),
      familyName: profile.getFamilyName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail(),
    };
  });

export const getDriveInfo = () =>
  isGoogleApiLoaded.then(() => {
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name)",
      })
      .then((response) => response);
  });

const appName = "note-app";

const createFolder = async (folderName) => {
  const folderId = await gapi.client.drive.files
    .create({
      resource: {
        name: appName,
        mimeType: "application/vnd.google-apps.folder",
      },
      fields: "id",
    })
    .execute((folder) => folder.id);
  return folderId;
};

const getFileList = async () => {
  const files = await gapi.client.drive.files
    .list()
    .then((response) => response.result.files);
  return files;
};

const createAppFolderIfNecessary = async () => {
  const files = await getFileList();
  if (files.includes(appName)) {
    return Promise.resolve(appName);
  }

  return createFolder(appName);
};

const createFile = (folderId) => {
  var fileMetadata = {
    name: "New Folder",
    mimeType: "application/vnd.google-apps.folder",
    parents: [folderId],
  };
  gapi.client.drive.files
    .create({
      resource: fileMetadata,
    })
    .then(function (response) {
      switch (response.status) {
        case 200:
          var file = response.result;
          console.log("Created Folder Id: ", file.id);
          break;
        default:
          console.log("Error creating the folder, " + response);
          break;
      }
    });
};

export const saveData = async (data) => {
  const folderId = await createAppFolderIfNecessary();
};
