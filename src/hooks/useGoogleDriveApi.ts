import { useContext, useEffect, useRef } from "react";
import GoogleApiContext from "../context/GoogleApiContext.ts";

type OnReadyParams = {
  getStorageInfo(): Promise<{ total: number; used: number }>;
  getRecentFolders(): Promise<gapi.client.drive.File[]>;
  getRecentFiles(): Promise<gapi.client.drive.File[]>;
  getDriveFiles(): Promise<gapi.client.drive.File[]>;
};

type OnReady = (params: OnReadyParams) => void;

export function useGoogleDriveApi(onReady?: OnReady) {
  const { scriptsLoaded } = useContext(GoogleApiContext);
  const about = useRef<gapi.client.drive.AboutResource>();
  const files = useRef<gapi.client.drive.FilesResource>();

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

  async function getFileToDownload(fileId: string) {
    if (!files.current) return;
    const { result } = await files.current.get({
      fileId,
      fields: "webContentLink",
    });
    return result.webContentLink;
  }

  async function deleteFile(fileId: string) {
    if (files.current) await files.current.delete({ fileId });
  }

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

  async function getDriveFiles() {
    if (!files.current) return [];

    const { result } = await files.current.list({
      q: "'root' in parents",
      orderBy: "modifiedTime desc",
      fields: "files(id, name, owners, modifiedTime, size, mimeType)",
    });

    return result.files || [];
  }

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

    await Promise.all(promises);
  }

  async function uploadFolder(
    folderName: string,
    fileList: FileList,
    parentId?: string,
  ) {
    const folderId = await createFolder(folderName, parentId);
    await uploadFiles(fileList, folderId);
    return folderId;
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
  };
}
