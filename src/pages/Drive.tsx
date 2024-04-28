import React, { useState } from "react";
import PageTitle from "../components/shared/PageTitle.tsx";
import { useGoogleDriveApi } from "../hooks/useGoogleDriveApi.ts";
import FilesTable from "../components/shared/FilesTable.tsx";
import DriveIcon from "../components/icons/DriveIcon.tsx";

/**
 * A Drive component that displays the files in the user's Google Drive.
 *
 * This component uses the `useGoogleDriveApi` hook to interact with the Google Drive API and get the files in the user's Google Drive. It also uses the `PageTitle` and `FilesTable` components to display the files.
 *
 * @example
 * import Drive from "./Drive";
 *
 * // In a React component
 * <Drive />
 */
const Drive: React.FC = ({}) => {
  const [files, setFiles] = useState<gapi.client.drive.File[]>([]);

  useGoogleDriveApi(async ({ getDriveFiles }) => {
    const driveFiles = await getDriveFiles();
    setFiles(driveFiles);
  });

  return (
    <div className="flex flex-col gap-10">
      <PageTitle title="My Drive" Icon={DriveIcon} />
      <FilesTable
        files={files}
        onFileDeleted={(id) =>
          setFiles((val) => val.filter((file) => file.id !== id))
        }
      />
    </div>
  );
};

export default Drive;
