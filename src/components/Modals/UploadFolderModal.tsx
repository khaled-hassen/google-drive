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

/**
 * An UploadFolderModal component that allows the user to upload a new folder.
 *
 * This component uses the `useGoogleDriveApi` hook to upload a new folder to Google Drive. It also uses the `useState` hook to manage the loading state, and the `useParams` hook from `react-router-dom` to get the current folder ID. It also uses the `toast` function from `react-hot-toast` to display notifications.
 *
 * @property isOpen - A boolean indicating whether the modal is open.
 * @property onClose - A function to close the modal.
 * @property onFolderUploaded - A function to be called when a new folder is uploaded. It receives the ID of the new folder as a parameter.
 *
 * @example
 * import UploadFolderModal from "./UploadFolderModal";
 *
 * // In a React component
 * <UploadFolderModal
 *   isOpen={isUploadFolderModalOpen}
 *   onClose={closeUploadFolderModal}
 *   onFolderUploaded={handleFolderUploaded}
 * />
 */
const UploadFolderModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onFolderUploaded,
}) => {
  const { uploadFolder } = useGoogleDriveApi();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  /**
   * An asynchronous function that uploads a new folder.
   *
   * This function checks if the files are provided. If not, it returns. It then extracts the relative path of the first file and uses it to determine the folder name. It then sets the loading state to `true`, calls the `uploadFolder` function from the `useGoogleDriveApi` hook with the folder name, the files, and the current folder ID, and sets the loading state to `false`. If the `uploadFolder` function returns a folder ID, it calls the `onFolderUploaded` function with the new folder ID, displays a success notification, and calls the `onClose` function. If an error occurs during the process, it displays an error notification and sets the loading state to `false`.
   *
   * @param files - The files to be uploaded.
   */
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
