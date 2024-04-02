import React, { useEffect, useState } from "react";
import PageTitle from "../components/shared/PageTitle.tsx";
import { useGoogleDriveApi } from "../hooks/useGoogleDriveApi.ts";
import FilesTable from "../components/shared/FilesTable.tsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LeftArrowIcon from "../components/icons/LeftArrowIcon.tsx";

const Folder: React.FC = ({}) => {
  const [folderName, setFolderName] = useState("");
  const [files, setFiles] = useState<gapi.client.drive.File[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { ready, getFolder } = useGoogleDriveApi();

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
