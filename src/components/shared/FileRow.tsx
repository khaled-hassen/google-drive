import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar.tsx";
import {
  convertBytesToUnit,
  downloadFile,
  formatDate,
} from "../../lib/utils.ts";
import MoreIcon from "../icons/MoreIcon.tsx";
import Button from "./Button.tsx";
import DownloadIcon from "../icons/DownloadIcon.tsx";
import DeleteIcon from "../icons/DeleteIcon.tsx";
import FilledFileIcon from "../icons/FilledFileIcon.tsx";
import DocxIcon from "../icons/DocxIcon.tsx";
import SlideIcon from "../icons/SlideIcon.tsx";
import ExcelIcon from "../icons/ExcelIcon.tsx";
import PdfIcon from "../icons/PdfIcon.tsx";
import { useGoogleDriveApi } from "../../hooks/useGoogleDriveApi.ts";

type Props = {
  file: gapi.client.drive.File;
  className: string;
  onFileDeleted(id: string): void;
};

function getFileTypeIcon(mimeType: string | undefined) {
  switch (mimeType) {
    case "application/pdf":
      return <PdfIcon />;
    case "application/vnd.google-apps.document":
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.template":
      return <DocxIcon />;
    case "application/vnd.google-apps.presentation":
    case "application/vnd.ms-powerpoint":
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    case "application/vnd.openxmlformats-officedocument.presentationml.template":
    case "application/vnd.openxmlformats-officedocument.presentationml.slideshow":
      return <SlideIcon />;
    case "application/vnd.google-apps.spreadsheet":
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.template":
      return <ExcelIcon />;
    default:
      return <FilledFileIcon />;
  }
}

const FileRow: React.FC<Props> = ({ file, className, onFileDeleted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  const { getFileToDownload, deleteFile } = useGoogleDriveApi();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menu.current &&
        !menu.current.contains(event.target as any) &&
        container.current &&
        !container.current.contains(event.target as any)
      )
        setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function download() {
    setIsOpen(false);
    if (!file.id || !file.mimeType) return;
    const downloadLink = await getFileToDownload(file.id);
    if (!downloadLink) return;
    downloadFile(file.name || "file", downloadLink);
  }

  async function remove() {
    setIsOpen(false);
    if (!file.id) return;
    await deleteFile(file.id);
    onFileDeleted(file.id);
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-4 overflow-hidden">
        {getFileTypeIcon(file.mimeType)}
        <p className="flex-1 truncate font-bold">{file.name}</p>
      </div>
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
      <div ref={container} className="relative">
        <button onClick={() => setIsOpen((val) => !val)}>
          <MoreIcon />
        </button>

        {isOpen && (
          <div
            ref={menu}
            className="absolute right-4 top-full z-50 flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-[0_1px_20px_0_#00000040]"
          >
            <Button
              title="Download"
              Icon={DownloadIcon}
              className="bg-main/10"
              onClick={download}
            />
            <Button
              title="Delete"
              Icon={DeleteIcon}
              variant="danger"
              onClick={remove}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileRow;
