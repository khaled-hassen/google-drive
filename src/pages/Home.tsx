import React, { useState } from "react";
import PageTitle from "../components/shared/PageTitle.tsx";
import HomeIcon from "../components/icons/HomeIcon.tsx";
import { useGoogleDriveApi } from "../hooks/useGoogleDriveApi.ts";
import Folder from "../components/shared/Folder.tsx";
import FilesTable from "../components/shared/FilesTable.tsx";

const Home: React.FC = ({}) => {
  const [recentFolders, setRecentFolders] = useState<gapi.client.drive.File[]>(
    [],
  );
  const [recentFiles, setRecentFiles] = useState<gapi.client.drive.File[]>([]);

  useGoogleDriveApi(async ({ getRecentFolders, getRecentFiles }) => {
    const [folders, files] = await Promise.all([
      getRecentFolders(),
      getRecentFiles(),
    ]);
    setRecentFolders(folders);
    setRecentFiles(files);
  });

  return (
    <div className="flex flex-col gap-10">
      <PageTitle title="Home" Icon={HomeIcon} />
      <div className="flex flex-col gap-6">
        <p className="text-3xl font-bold">Recent folders</p>
        <div className="h-full max-w-7xl">
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(17rem,_1fr))] gap-6">
            {recentFolders.map((folder) => (
              <div
                className="mx-auto max-w-xs min-[615px]:mx-0 min-[615px]:max-w-full"
                key={folder.id}
              >
                <Folder folder={folder} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-3xl font-bold">Recent files</p>
        <FilesTable
          files={recentFiles}
          onFileDeleted={(id) =>
            setRecentFiles((val) => val.filter((file) => file.id !== id))
          }
        />
      </div>
    </div>
  );
};

export default Home;
