import React, { useState } from "react";
import Modal from "./Modal.tsx";
import Button from "../shared/Button.tsx";
import CloseIcon from "../icons/CloseIcon.tsx";
import { useGoogleDriveApi } from "../../hooks/useGoogleDriveApi.ts";
import { useParams } from "react-router-dom";
import FilePlusIcon from "../icons/FilePlusIcon.tsx";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onFilesUploaded(): void;
  onClose(): void;
};

/**
 * An UploadFilesModal component that allows the user to upload new files.
 *
 * This component uses the `useGoogleDriveApi` hook to upload new files to Google Drive. It also uses the `useState` hook to manage the loading state, and the `useParams` hook from `react-router-dom` to get the current folder ID. It also uses the `toast` function from `react-hot-toast` to display notifications.
 *
 * @property isOpen - A boolean indicating whether the modal is open.
 * @property onClose - A function to close the modal.
 * @property onFilesUploaded - A function to be called when new files are uploaded.
 *
 * @example
 * import UploadFilesModal from "./UploadFilesModal";
 *
 * // In a React component
 * <UploadFilesModal
 *   isOpen={isUploadFilesModalOpen}
 *   onClose={closeUploadFilesModal}
 *   onFilesUploaded={handleFilesUploaded}
 * />
 */
const UploadFilesModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onFilesUploaded,
}) => {
  const { uploadFiles } = useGoogleDriveApi();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  /**
   * An asynchronous function that uploads new files.
   *
   * This function checks if the files are provided. If not, it returns. It then sets the loading state to `true`, calls the `uploadFiles` function from the `useGoogleDriveApi` hook with the files and the current folder ID, and sets the loading state to `false`. It then calls the `onFilesUploaded` function, displays a success notification, and calls the `onClose` function. If an error occurs during the process, it displays an error notification and sets the loading state to `false`.
   *
   * @param files - The files to be uploaded.
   */
  async function uploadNewFiles(files: FileList | null) {
    if (!files) return;
    try {
      setLoading(true);
      await uploadFiles(files, id);
      setLoading(false);
      onFilesUploaded();
      toast.success("Files uploaded successfully");
      onClose();
    } catch (e: any) {
      toast.error(e.message);
      setLoading(false);
    }
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
