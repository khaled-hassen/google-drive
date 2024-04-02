import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGoogleDriveApi } from "../../hooks/useGoogleDriveApi.ts";
import PageTitle from "./PageTitle.tsx";
import FilesTable from "./FilesTable.tsx";
import SearchIcon from "../icons/SearchIcon.tsx";
import toast from "react-hot-toast";

const Search: React.FC = ({}) => {
  const [files, setFiles] = useState<gapi.client.drive.File[]>([]);
  const [searchParams] = useSearchParams();

  const { ready, searchFiles } = useGoogleDriveApi();

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
