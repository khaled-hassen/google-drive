import React from "react";
import Avatar from "./Avatar.tsx";
import { convertBytesToUnit, formatDate } from "../../lib/utils.ts";
import MoreIcon from "../icons/MoreIcon.tsx";

type Props = {
  files: gapi.client.drive.File[];
};

const FilesTable: React.FC<Props> = ({ files }) => {
  return (
    <div className="overflow-auto">
      <div className="min-w-[50rem]">
        <div className="grid grid-cols-[1.5fr_0.5fr_1fr_1fr_1.5rem] gap-6 font-bold text-lightGray">
          <p>Name</p>
          <p className="text-center">Owner</p>
          <p className="text-center">Last modified</p>
          <p className="text-center">File size</p>
        </div>
        {files.map((file) => (
          <div
            key={file.id}
            className="grid grid-cols-[1.5fr_0.5fr_1fr_1fr_1.5rem] gap-6 border-b border-b-lightGray py-6"
          >
            <p className="truncate font-bold">{file.name}</p>
            <div className="flex items-center justify-center gap-1">
              {file.owners?.map((owner, i) => (
                <Avatar
                  key={i}
                  id={`${owner.displayName?.replace(/\s/g, "-")}-${i}-${file.id}`}
                  imgUrl={owner.photoLink}
                  name={owner.displayName || ""}
                  className="size-5"
                />
              ))}
            </div>
            <p className="text-center">{formatDate(file.modifiedTime)}</p>
            <p className="text-center">
              {convertBytesToUnit(parseInt(file.size || "0"))}
            </p>
            <div className="flex justify-end">
              <button>
                <MoreIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesTable;
