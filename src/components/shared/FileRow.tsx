import React, { useState } from "react";
import Avatar from "./Avatar.tsx";
import {
  convertBytesToUnit,
  downloadFile,
  formatDate,
} from "../../lib/utils.ts";
import Button from "./Button.tsx";
import DownloadIcon from "../icons/DownloadIcon.tsx";
import DeleteIcon from "../icons/DeleteIcon.tsx";
import FilledFileIcon from "../icons/FilledFileIcon.tsx";
import DocxIcon from "../icons/DocxIcon.tsx";
import SlideIcon from "../icons/SlideIcon.tsx";
import ExcelIcon from "../icons/ExcelIcon.tsx";
import PdfIcon from "../icons/PdfIcon.tsx";
import { useGoogleDriveApi } from "../../hooks/useGoogleDriveApi.ts";
import FilledFolderIcon from "../icons/FilledFolderIcon.tsx";
import { Link } from "react-router-dom";

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
    case "application/vnd.google-apps.folder":
      return <FilledFolderIcon />;
    default:
      return <FilledFileIcon />;
  }
}

function isFolder(mimeType: string | undefined) {
  return mimeType === "application/vnd.google-apps.folder";
}

const FileRow: React.FC<Props> = ({ file, className, onFileDeleted }) => {
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { getFileToDownload, deleteFile } = useGoogleDriveApi();

  async function download() {
    if (!file.id || !file.mimeType) return;
    setDownloadLoading(true);
    const downloadLink = await getFileToDownload(file.id);
    setDownloadLoading(false);
    if (!downloadLink) return;
    downloadFile(file.name || "file", downloadLink);
  }

  async function remove() {
    if (!file.id) return;
    setDeleteLoading(true);
    await deleteFile(file.id);
    setDeleteLoading(false);
    onFileDeleted(file.id);
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-4 overflow-hidden">
        {getFileTypeIcon(file.mimeType)}
        {isFolder(file.mimeType) ? (
          <Link
            to={{ pathname: `/folder/${file.id}` }}
            className="flex-1 truncate font-bold"
          >
            {file.name}
          </Link>
        ) : (
          <p className="flex-1 truncate font-bold">{file.name}</p>
        )}
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
        {file.size ? convertBytesToUnit(parseInt(file.size)) : "-"}
      </p>
      <div className="flex items-center justify-end gap-2">
        <Button
          title="Download"
          Icon={DownloadIcon}
          variant="success"
          titleClassName="hidden"
          loading={downloadLoading}
          disabled={deleteLoading || downloadLoading}
          onClick={download}
        />
        <Button
          title="Delete"
          Icon={DeleteIcon}
          variant="danger"
          titleClassName="hidden"
          loading={deleteLoading}
          disabled={deleteLoading || downloadLoading}
          onClick={remove}
        />
      </div>
    </div>
  );
};

export default FileRow;
