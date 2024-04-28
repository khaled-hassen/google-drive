import React, { useEffect, useState } from "react";
import PageTitle from "../components/shared/PageTitle.tsx";
import { useGoogleDriveApi } from "../hooks/useGoogleDriveApi.ts";
import FilesTable from "../components/shared/FilesTable.tsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LeftArrowIcon from "../components/icons/LeftArrowIcon.tsx";

/**
 * A Folder component that displays the files in a specific Google Drive folder.
 *
 * This component uses the `useGoogleDriveApi` hook to interact with the Google Drive API and get the files in the specified folder. It also uses the `PageTitle` and `FilesTable` components to display the folder name and the files in the folder. The `useParams` hook from `react-router-dom` is used to get the folder id from the URL parameters.
 *
 * @example
 * import Folder from "./Folder";
 *
 * // In a React component
 * <Folder />
 */
const Folder: React.FC = ({}) => {
  const [folderName, setFolderName] = useState("");
  const [files, setFiles] = useState<gapi.client.drive.File[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { ready, getFolder } = useGoogleDriveApi();

  /**
   * This useEffect hook is used to fetch the folder details and files from Google Drive API.
   *
   * The hook checks if the API is ready and if the folder id is available. If not, it navigates to the 404 page. If the API is ready and the folder id is available, it resets the files and folder name states, and then calls the `getFolder` function from the `useGoogleDriveApi` hook with the folder id. The `getFolder` function returns a promise that resolves to an object with the folder name and files. The folder name and files are then set in the state. If an error occurs while fetching the folder, it navigates to the 404 page.
   *
   * The hook runs whenever the `ready` state or the `location` changes.
   */
  useEffect(() => {
    if (!ready) return;
    if (!id) return navigate("/404");
    setFiles([]);
    setFolderName("");
    getFolder(id)
      .then(({ name, files }) => {
        setFolderName(name);
        setFiles(files);
      })
      .catch(() => navigate("/404"));
  }, [ready, location]);

  return (
    <div className="flex flex-col gap-10">
      <PageTitle
        title={folderName}
        Icon={LeftArrowIcon}
        onTitleClick={() => navigate(-1)}
      />
      <FilesTable
        files={files}
        onFileDeleted={(id) =>
          setFiles((val) => val.filter((file) => file.id !== id))
        }
      />
    </div>
  );
};

export default Folder;
