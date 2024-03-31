import React from "react";
import Button from "../shared/Button.tsx";
import FileIcon from "../icons/FileIcon.tsx";
import FolderIcon from "../icons/FolderIcon.tsx";
import { NavLink } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon.tsx";
import { convertBytesToUnit, cn } from "../../lib/utils.ts";
import DriveIcon from "../icons/DriveIcon.tsx";
import StorageIcon from "../icons/StorageIcon.tsx";

type Props = {
  storageInfo: { total: number; used: number };
  isOpen: boolean;
};

function percentUsed(used: number, total: number) {
  if (total === 0) return 0;
  return (used * 100) / total;
}

const Sidebar: React.FC<Props> = ({ storageInfo, isOpen }) => {
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
            />
            <Button
              title="Upload new folder"
              Icon={FolderIcon}
              variant="secondary"
              className="overflow-hidden"
              titleClassName="whitespace-nowrap"
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
    </>
  );
};

export default Sidebar;
