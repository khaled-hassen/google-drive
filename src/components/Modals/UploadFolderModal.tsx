import React, { useState } from "react";
import Modal from "./Modal.tsx";
import Button from "../shared/Button.tsx";
import CloseIcon from "../icons/CloseIcon.tsx";
import { useGoogleDriveApi } from "../../hooks/useGoogleDriveApi.ts";
import { useParams } from "react-router-dom";
import FolderPlusIcon from "../icons/FolderPlusIcon.tsx";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onFolderUploaded(id: string): void;
  onClose(): void;
};

const UploadFolderModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onFolderUploaded,
}) => {
  const { uploadFolder } = useGoogleDriveApi();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  async function uploadNewFolder(files: FileList | null) {
    if (!files) return;
    const relativePath = files[0].webkitRelativePath;
    const folderName = relativePath.split("/")[0];

    try {
      setLoading(true);
      const folderId = await uploadFolder(folderName, files, id);
      setLoading(false);
      folderId && onFolderUploaded(folderId);
      toast.success("Folder uploaded successfully");
      onClose();
    } catch (e: any) {
      toast.error(e.message);
      setLoading(false);
    }
  }

  return (
    <Modal title="Upload new folder" isOpen={isOpen}>
      <form className="flex flex-col gap-10">
        <label className="grid h-96 w-[30rem] place-content-center rounded-2xl border border-dashed border-lightGray">
          <span className="flex flex-col items-center gap-6 text-lightGray">
            <FolderPlusIcon size={80} />
            {loading ? (
              <span className="animate-pulse">Uploading folder</span>
            ) : (
              <span>Click here to select folder</span>
            )}
          </span>
          <input
            type="file"
            hidden
            // @ts-ignore
            webkitdirectory=""
            directory=""
            mozdirectory=""
            msdirectory=""
            odirectory=""
            multiple
            onChange={(e) => uploadNewFolder(e.target.files)}
          />
        </label>
        <div className="flex items-center justify-center gap-8">
          <Button
            title="Close"
            type="reset"
            Icon={CloseIcon}
            variant="danger"
            loading={loading}
            onClick={onClose}
          />
        </div>
      </form>
    </Modal>
  );
};

export default UploadFolderModal;
