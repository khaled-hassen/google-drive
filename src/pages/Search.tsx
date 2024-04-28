import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGoogleDriveApi } from "../hooks/useGoogleDriveApi.ts";
import PageTitle from "../components/shared/PageTitle.tsx";
import FilesTable from "../components/shared/FilesTable.tsx";
import SearchIcon from "../components/icons/SearchIcon.tsx";
import toast from "react-hot-toast";

/**
 * A Search component that displays the search results.
 *
 * This component uses the `useGoogleDriveApi` hook to interact with the Google Drive API and search for files. It also uses the `PageTitle` and `FilesTable` components to display the page title and the search results. The `useSearchParams` hook from `react-router-dom` is used to get the search query from the URL parameters.
 *
 * @example
 * import Search from "./Search";
 *
 * // In a React component
 * <Search />
 */
const Search: React.FC = ({}) => {
  const [files, setFiles] = useState<gapi.client.drive.File[]>([]);
  const [searchParams] = useSearchParams();

  const { ready, searchFiles } = useGoogleDriveApi();

  /**
   * This useEffect hook is used to search for files in Google Drive.
   *
   * The hook checks if the Google Drive API is ready. If not, it returns early. If the API is ready, it resets the files state and then calls the `searchFiles` function from the `useGoogleDriveApi` hook with the search query from the URL parameters. The `searchFiles` function returns a promise that resolves to an array of files. The files are then set in the state. If an error occurs while searching, a toast notification is displayed.
   *
   * The hook runs whenever the `ready` state or the `searchParams` change.
   */
  useEffect(() => {
    if (!ready) return;
    setFiles([]);
    searchFiles(searchParams.get("q") || "")
      .then((files) => setFiles(files))
      .catch(() => toast.error("An error occurred while searching"));
    setFiles(files);
  }, [ready, searchParams]);

  return (
    <div className="flex flex-col gap-10">
      <PageTitle title="Search results" Icon={SearchIcon} />
      <FilesTable
        files={files}
        onFileDeleted={(id) =>
          setFiles((val) => val.filter((file) => file.id !== id))
        }
      />
    </div>
  );
};

export default Search;
