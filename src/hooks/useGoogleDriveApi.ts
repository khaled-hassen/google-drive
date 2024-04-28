import { useContext, useEffect, useRef } from "react";
import GoogleApiContext from "../context/GoogleApiContext.ts";

type OnReadyParams = {
  getStorageInfo(): Promise<{ total: number; used: number }>;
  getRecentFolders(): Promise<gapi.client.drive.File[]>;
  getRecentFiles(): Promise<gapi.client.drive.File[]>;
  getDriveFiles(): Promise<gapi.client.drive.File[]>;
};

type OnReady = (params: OnReadyParams) => void;

/**
 * A custom React hook that interacts with the Google Drive API.
 *
 * This hook provides several functions that can be used to interact with the Google Drive API, including getting storage info, getting recent folders and files, and uploading files and folders.
 *
 * @param onReady - A callback function that is called when the Google Drive API scripts are loaded.
 *
 * @returns An object with several functions that can be used to interact with the Google Drive API.
 */
export function useGoogleDriveApi(onReady?: OnReady) {
  const { scriptsLoaded } = useContext(GoogleApiContext);
  const about = useRef<gapi.client.drive.AboutResource>();
  const files = useRef<gapi.client.drive.FilesResource>();

  /**
   * An asynchronous function that gets storage information from Google Drive.
   *
   * This function checks if the `about` reference is defined. If not, it returns an object with `total` and `used` properties both set to 0. If the `about` reference is defined, it sends a request to the Google Drive API to get the storage quota. It then returns an object with `total` and `used` properties set to the `limit` and `usage` properties of the storage quota, respectively. If either `limit` or `usage` is not defined, it defaults to 0.
   *
   * @returns A promise that resolves to an object with `total` and `used` properties.
   *
   * @example
   * getStorageInfo(); // Returns a promise that resolves to an object with `total` and `used` properties
   */
  async function getStorageInfo() {
    if (!about.current) return { total: 0, used: 0 };

    const {
      result: { storageQuota },
    } = await about.current.get({ fields: "storageQuota" });
    return {
      total: parseInt(storageQuota?.limit || "0"),
      used: parseInt(storageQuota?.usage || "0"),
    };
  }

  /**
   * An asynchronous function that gets recent folders from Google Drive.
   *
   * This function checks if the `files` reference is defined. If not, it returns an empty array. If the `files` reference is defined, it sends a request to the Google Drive API to list the folders, ordered by modified time in descending order. It then returns the files from the response, or an empty array if no files are found.
   *
   * @returns A promise that resolves to an array of files.
   *
   * @example
   * getRecentFolders(); // Returns a promise that resolves to an array of files
   */
  async function getRecentFolders() {
    if (!files.current) return [];

    const { result } = await files.current.list({
      q: "mimeType='application/vnd.google-apps.folder'",
      orderBy: "modifiedTime desc",
      fields: "files(id, name, owners, modifiedTime)",
      pageSize: 4,
    });

    return result.files || [];
  }

  /**
   * An asynchronous function that gets recent files from Google Drive.
   *
   * This function checks if the `files` reference is defined. If not, it returns an empty array. If the `files` reference is defined, it sends a request to the Google Drive API to list the files that are not folders, ordered by modified time in descending order. It then returns the files from the response, or an empty array if no files are found.
   *
   * @returns A promise that resolves to an array of files.
   *
   * @example
   * getRecentFiles(); // Returns a promise that resolves to an array of files
   */
  async function getRecentFiles() {
    if (!files.current) return [];

    const { result } = await files.current.list({
      q: "mimeType != 'application/vnd.google-apps.folder'",
      orderBy: "modifiedTime desc",
      fields: "files(id, name, owners, modifiedTime, size, mimeType)",
      pageSize: 10,
    });

    return result.files || [];
  }

  /**
   * An asynchronous function that gets the download link of a file from Google Drive.
   *
   * This function checks if the `files` reference is defined. If not, it returns undefined. If the `files` reference is defined, it sends a request to the Google Drive API to get the file with the provided `fileId`. It then returns the `webContentLink` property from the response, which is the download link of the file.
   *
   * @param fileId - The ID of the file to get the download link of.
   *
   * @returns A promise that resolves to the download link of the file, or undefined if the `files` reference is not defined.
   *
   * @example
   * getFileToDownload("123"); // Returns a promise that resolves to the download link of the file
   */
  async function getFileToDownload(fileId: string) {
    if (!files.current) return;
    const { result } = await files.current.get({
      fileId,
      fields: "webContentLink",
    });
    return result.webContentLink;
  }

  /**
   * An asynchronous function that deletes a file from Google Drive.
   *
   * This function checks if the `files` reference is defined. If it is, it sends a request to the Google Drive API to delete the file with the provided `fileId`.
   *
   * @param fileId - The ID of the file to delete.
   *
   * @example
   * deleteFile("123"); // Deletes the file with the ID "123" from Google Drive
   */
  async function deleteFile(fileId: string) {
    if (files.current) await files.current.delete({ fileId });
  }

  /**
   * An asynchronous function that gets a specific folder and its files from Google Drive.
   *
   * This function checks if the `files` reference is defined. If not, it returns an object with `name` property set to an empty string and `files` property set to an empty array. If the `files` reference is defined, it sends a request to the Google Drive API to get the folder with the provided `folderId`. It then sends another request to list the files in the folder, ordered by modified time in descending order. It then returns an object with `name` property set to the name of the folder and `files` property set to the files in the folder. If no files are found in the response, it returns an empty array.
   *
   * @param folderId - The ID of the folder to get.
   *
   * @returns A promise that resolves to an object with `name` and `files` properties.
   *
   * @example
   * getFolder("123"); // Returns a promise that resolves to an object with `name` and `files` properties
   */
  async function getFolder(folderId: string) {
    if (!files.current) return { name: "", files: [] };

    const folder = await files.current.get({
      fileId: folderId,
      fields: "name",
    });

    const { result } = await files.current.list({
      q: `'${folderId}' in parents`,
      orderBy: "modifiedTime desc",
      fields: "files(id, name, owners, modifiedTime, size, mimeType)",
    });

    return { name: folder.result.name || "", files: result.files || [] };
  }

  /**
   * An asynchronous function that gets all files from the root of Google Drive.
   *
   * This function checks if the `files` reference is defined. If not, it returns an empty array. If the `files` reference is defined, it sends a request to the Google Drive API to list the files that are in the root directory, ordered by modified time in descending order. It then returns the files from the response, or an empty array if no files are found.
   *
   * @returns A promise that resolves to an array of files.
   *
   * @example
   * getDriveFiles(); // Returns a promise that resolves to an array of files
   */
  async function getDriveFiles() {
    if (!files.current) return [];

    const { result } = await files.current.list({
      q: "'root' in parents",
      orderBy: "modifiedTime desc",
      fields: "files(id, name, owners, modifiedTime, size, mimeType)",
    });

    return result.files || [];
  }

  /**
   * An asynchronous function that creates a new folder in Google Drive.
   *
   * This function checks if the `files` reference is defined. If not, it returns undefined. If the `files` reference is defined, it creates a `fileMetadata` object with `name` property set to the provided `folderName`, `mimeType` property set to "application/vnd.google-apps.folder", and `parents` property set to an array containing the provided `parentId` if it is defined, or an empty array if it is not. It then sends a request to the Google Drive API to create a new folder with the `fileMetadata`. It then returns the `id` property from the response, which is the ID of the newly created folder.
   *
   * @param folderName - The name of the new folder to create.
   * @param parentId - The ID of the parent folder of the new folder. If not provided, the new folder is created in the root of Google Drive.
   *
   * @returns A promise that resolves to the ID of the newly created folder, or undefined if the `files` reference is not defined.
   *
   * @example
   * createFolder("New Folder"); // Returns a promise that resolves to the ID of the newly created folder
   * createFolder("New Folder", "123"); // Returns a promise that resolves to the ID of the newly created folder in the folder with the ID "123"
   */
  async function createFolder(folderName: string, parentId?: string) {
    if (!files.current) return;

    const fileMetadata = {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: parentId ? [parentId] : [],
    };

    const { result } = await files.current.create({
      resource: fileMetadata,
      fields: "id",
    });
    return result.id;
  }

  /**
   * An asynchronous function that uploads files to Google Drive.
   *
   * This function checks if the `files` reference is defined. If not, it returns immediately. If the `files` reference is defined, it creates a new `FormData` object for each file in the provided `fileList`, appends the file metadata and the file itself to the `FormData` object, and sends a request to the Google Drive API to upload the file. The file is uploaded to the folder with the provided `parentId` if it is defined, or to the root of Google Drive if it is not. If any of the upload requests fail, it throws an error.
   *
   * @param fileList - A list of files to upload.
   * @param parentId - The ID of the parent folder of the new files. If not provided, the files are uploaded to the root of Google Drive.
   *
   * @example
   * uploadFiles(fileList); // Uploads the files in `fileList` to the root of Google Drive
   * uploadFiles(fileList, "123"); // Uploads the files in `fileList` to the folder with the ID "123"
   */
  async function uploadFiles(fileList: FileList, parentId?: string) {
    if (!files.current) return;

    const promises = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      if (!file) continue;

      const data = new FormData();
      const metaData = {
        name: file.name,
        mimeType: file.type,
        parents: parentId ? [parentId] : [],
      };
      data.append(
        "metadata",
        new Blob([JSON.stringify(metaData)], { type: "application/json" }),
      );
      data.append("file", file);
      promises.push(
        fetch(
          "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fileds=id",
          {
            method: "POST",
            headers: new Headers({
              Authorization: `Bearer ${gapi.auth.getToken().access_token}`,
            }),
            body: data,
          },
        ),
      );
    }

    const results = await Promise.allSettled(promises);
    if (
      results.some((result) => result.status === "rejected" || !result.value.ok)
    )
      throw new Error("Failed to upload files");
  }

  /**
   * An asynchronous function that uploads a folder to Google Drive.
   *
   * This function first creates a new folder in Google Drive with the provided `folderName` and `parentId` by calling the `createFolder` function. It then uploads all files in the provided `fileList` to the newly created folder by calling the `uploadFiles` function. It then returns the ID of the newly created folder.
   *
   * @param folderName - The name of the new folder to create.
   * @param fileList - A list of files to upload to the new folder.
   * @param parentId - The ID of the parent folder of the new folder. If not provided, the new folder is created in the root of Google Drive.
   *
   * @returns A promise that resolves to the ID of the newly created folder.
   *
   * @example
   * uploadFolder("New Folder", fileList); // Returns a promise that resolves to the ID of the newly created folder in the root of Google Drive
   * uploadFolder("New Folder", fileList, "123"); // Returns a promise that resolves to the ID of the newly created folder in the folder with the ID "123"
   */
  async function uploadFolder(
    folderName: string,
    fileList: FileList,
    parentId?: string,
  ) {
    const folderId = await createFolder(folderName, parentId);
    await uploadFiles(fileList, folderId);
    return folderId;
  }

  /**
   * An asynchronous function that searches for files in Google Drive.
   *
   * This function checks if the `files` reference is defined. If not, it returns an empty array. If the `files` reference is defined and a `query` is provided, it sends a request to the Google Drive API to list the files whose names contain the `query`, with file details including ID, name, owners, modified time, size, and mimeType. It then returns the files from the response, or an empty array if no files are found.
   *
   * @param query - The query string to search for in file names. If not provided, the function returns an empty array.
   *
   * @returns A promise that resolves to an array of files.
   *
   * @example
   * searchFiles("Project"); // Returns a promise that resolves to an array of files whose names contain "Project"
   */
  async function searchFiles(query: string | undefined) {
    if (!files.current) return [];
    const response = await files.current.list({
      q: `name contains '${query}'`,
      fields: "files(id, name, owners, modifiedTime, size, mimeType)",
    });
    return response.result.files || [];
  }

  useEffect(() => {
    if (scriptsLoaded) {
      about.current = gapi.client.drive.about;
      files.current = gapi.client.drive.files;
      onReady?.({
        getStorageInfo,
        getRecentFolders,
        getRecentFiles,
        getDriveFiles,
      });
    }
  }, [scriptsLoaded]);

  return {
    ready: scriptsLoaded,
    getFileToDownload,
    deleteFile,
    getFolder,
    createFolder,
    uploadFiles,
    uploadFolder,
    searchFiles,
  };
}
