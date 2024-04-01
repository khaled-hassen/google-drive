import React, { useState } from "react";
import Modal from "./Modal.tsx";
import Button from "../shared/Button.tsx";
import CloseIcon from "../icons/CloseIcon.tsx";
import { useGoogleDriveApi } from "../../hooks/useGoogleDriveApi.ts";
import { useParams } from "react-router-dom";
import FilePlusIcon from "../icons/FilePlusIcon.tsx";

type Props = {
  isOpen: boolean;
  onClose(): void;
};

const UploadFilesModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { uploadFiles } = useGoogleDriveApi();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  async function uploadNewFiles(files: FileList | null) {
    if (!files) return;
    setLoading(true);
    await uploadFiles(files, id);
    setLoading(false);
    onClose();
  }

  return (
    <Modal title="Upload new files" isOpen={isOpen}>
      <form className="flex flex-col gap-10">
        <label
          className="grid h-96 w-[30rem] place-content-center rounded-2xl border border-dashed border-lightGray"
          onDragOver={(e) => e.preventDefault()}
          onDrop={async (e) => {
            e.preventDefault();
            await uploadNewFiles(e.dataTransfer.files);
          }}
        >
          <span className="flex flex-col items-center gap-6 text-lightGray">
            <FilePlusIcon />
            {loading ? (
              <span className="animate-pulse">Uploading files</span>
            ) : (
              <span className="flex flex-col items-center">
                <span>Click here to select files</span>
                <span>or</span>
                <span>Drag and drop your files here</span>
              </span>
            )}
          </span>
          <input
            type="file"
            hidden
            multiple
            onChange={(e) => uploadNewFiles(e.target.files)}
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

export default UploadFilesModal;
