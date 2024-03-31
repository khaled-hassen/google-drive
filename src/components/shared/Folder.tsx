import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../lib/utils.ts";
import Avatar from "./Avatar.tsx";

type Props = {
  folder: gapi.client.drive.File;
};

const Folder: React.FC<Props> = ({ folder }) => {
  return (
    <Link
      to={`/folder/${folder.id}`}
      className="group relative text-darkerWhite transition-colors hover:text-main"
    >
      <svg
        viewBox="0 0 297 210"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <path
          d="M297 186.667C297 192.855 293.871 198.79 288.301 203.166C282.731 207.542 275.177 210 267.3 210H29.7C21.8231 210 14.2688 207.542 8.69893 203.166C3.1291 198.79 0 192.855 0 186.667V23.3333C0 17.1449 3.1291 11.21 8.69893 6.83417C14.2688 2.45833 21.8231 0 29.7 0H99.3206C102.257 0 105.045 1.29076 106.945 3.52984L130.655 31.4702C132.555 33.7092 135.343 35 138.279 35H267.3C275.177 35 282.731 37.4583 288.301 41.8342C293.871 46.21 297 52.145 297 58.3333V186.667Z"
          fillRule="evenodd"
        />
      </svg>
      <div className="absolute left-0 top-0 flex size-full flex-col justify-end gap-2 p-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm uppercase text-lightGray text-opacity-70 group-hover:text-white">
            folder
          </p>
          <p className="truncate font-bold capitalize text-main group-hover:text-white">
            {folder.name}
          </p>
        </div>
        {folder.owners && (
          <div className="flex flex-col gap-1">
            <p className="text-sm uppercase text-lightGray text-opacity-70 group-hover:text-white">
              owners
            </p>
            <div className="flex items-center gap-1">
              {folder.owners.map((owner, i) => (
                <Avatar
                  key={i}
                  id={`${owner.displayName?.replace(/\s/g, "-")}-${i}-${folder.id}`}
                  imgUrl={owner.photoLink}
                  name={owner.displayName || ""}
                  className="size-5"
                />
              ))}
            </div>
          </div>
        )}
        {folder.modifiedTime && (
          <div className="flex flex-col gap-1">
            <p className="text-sm uppercase text-lightGray text-opacity-70 group-hover:text-white">
              last modified
            </p>
            <p className="truncate font-bold capitalize text-lightGray group-hover:text-white">
              {formatDate(folder.modifiedTime)}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Folder;
