import React, { useState } from "react";
import Button from "../shared/Button.tsx";
import FileIcon from "../icons/FileIcon.tsx";
import FolderIcon from "../icons/FolderIcon.tsx";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon.tsx";
import { cn, convertBytesToUnit } from "../../lib/utils.ts";
import DriveIcon from "../icons/DriveIcon.tsx";
import StorageIcon from "../icons/StorageIcon.tsx";
import FolderPlusIcon from "../icons/FolderPlusIcon.tsx";
import NewFolderModal from "../Modals/NewFolderModal.tsx";
import UploadFilesModal from "../Modals/UploadFilesModal.tsx";
import UploadFolderModal from "../Modals/UploadFolderModal.tsx";

type Props = {
  storageInfo: { total: number; used: number };
  isOpen: boolean;
};

/**
 * A function that calculates the percentage of used storage.
 *
 * This function takes the used storage and the total storage as parameters. If the total storage is 0, it returns 0 to avoid division by zero. Otherwise, it returns the percentage of the used storage.
 *
 * @param used - The used storage.
 * @param total - The total storage.
 * @returns The percentage of the used storage.
 *
 * @example
 * percentUsed(500000, 1000000); // Returns 50
 */
function percentUsed(used: number, total: number) {
  if (total === 0) return 0;
  return (used * 100) / total;
}

/**
 * A Sidebar component that contains various navigation and action buttons, and displays the user's storage usage.
 *
 * This component uses the `useNavigate` and `useLocation` hooks from `react-router-dom` to navigate to different pages and check the current location. It also uses the `useState` hook to manage the states of the modals and the sidebar.
 *
 * @property storageInfo - An object containing the total and used storage of the user.
 * @property isOpen - A boolean indicating whether the sidebar is open.
 *
 * @example
 * import Sidebar from "./Sidebar";
 *
 * // In a React component
 * <Sidebar
 *   storageInfo={{ total: 1000000, used: 500000 }}
 *   isOpen={isSidebarOpen}
 * />
 */
const Sidebar: React.FC<Props> = ({ storageInfo, isOpen }) => {
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [isUploadFilesModalOpen, setIsUploadFilesModalOpen] = useState(false);
  const [isUploadFolderModalOpen, setIsUploadFolderModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  function handleFilesUploaded() {
    if (location.pathname === "/home") navigate("/drive");
    else navigate(location.pathname);
  }

  function handleFolderUploaded(id: string) {
    navigate(`/folder/${id}`);
  }

  return (
    <>
      <div className="mr-0 transition-[margin] lg:mr-64" />
      <aside
        className={cn(
          "fixed bottom-0 top-[5.5rem] z-50 flex w-64 -translate-x-full flex-col justify-between gap-10 rounded-tr-[5rem] bg-main py-12 transition-transform lg:translate-x-0",
          { "translate-x-0": isOpen },
        )}
      >
        <div className="flex flex-col gap-10 px-6">
          <div className="flex flex-col gap-6">
            <Button
              title="Upload new file"
              Icon={FileIcon}
              className="overflow-hidden"
              titleClassName="whitespace-nowrap"
              onClick={() => setIsUploadFilesModalOpen(true)}
            />
            <Button
              title="Upload new folder"
              Icon={FolderIcon}
              variant="secondary"
              className="overflow-hidden"
              titleClassName="whitespace-nowrap"
              onClick={() => setIsUploadFolderModalOpen(true)}
            />
            <Button
              title="Create new folder"
              Icon={FolderPlusIcon}
              variant="secondary"
              className="overflow-hidden"
              titleClassName="whitespace-nowrap"
              onClick={() => setIsNewFolderModalOpen(true)}
            />
          </div>
          <div className="flex flex-col gap-6">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-4 py-2 text-white opacity-50 hover:font-bold hover:opacity-100",
                  { "font-bold opacity-100": isActive },
                )
              }
            >
              <HomeIcon />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/drive"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-4 py-2 text-white opacity-50 hover:font-bold hover:opacity-100",
                  { "font-bold opacity-100": isActive },
                )
              }
            >
              <DriveIcon />
              <span>My drive</span>
            </NavLink>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="h-0.5 bg-white/70" />
          <div className="flex flex-col gap-2 px-6">
            <div className="flex items-center gap-4 text-white">
              <StorageIcon />
              <p>Storage</p>
            </div>
            <div className="relative h-1 w-full rounded-full bg-white">
              <div
                className="h-full rounded-full bg-[#4F91F8]"
                style={{
                  width: `${percentUsed(storageInfo.used, storageInfo.total)}%`,
                }}
              />
            </div>
            <p className="text-sm font-bold text-white">
              {`${convertBytesToUnit(storageInfo.used)} of ${convertBytesToUnit(storageInfo.total)} used`}
            </p>
          </div>
        </div>
      </aside>

      <NewFolderModal
        isOpen={isNewFolderModalOpen}
        onFolderCreated={(id) => {
          setIsNewFolderModalOpen(false);
          navigate(`/folder/${id}`);
        }}
        onClose={() => setIsNewFolderModalOpen(false)}
      />

      <UploadFilesModal
        isOpen={isUploadFilesModalOpen}
        onFilesUploaded={handleFilesUploaded}
        onClose={() => setIsUploadFilesModalOpen(false)}
      />

      <UploadFolderModal
        isOpen={isUploadFolderModalOpen}
        onFolderUploaded={handleFolderUploaded}
        onClose={() => setIsUploadFolderModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;
