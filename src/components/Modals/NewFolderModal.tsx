import React, { useState } from "react";
import Modal from "./Modal.tsx";
import FolderPlusIcon from "../icons/FolderPlusIcon.tsx";
import Button from "../shared/Button.tsx";
import CloseIcon from "../icons/CloseIcon.tsx";
import { useGoogleDriveApi } from "../../hooks/useGoogleDriveApi.ts";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose(): void;
  onFolderCreated(folderId: string): void;
};

/**
 * A NewFolderModal component that allows the user to create a new folder.
 *
 * This component uses the `useGoogleDriveApi` hook to create a new folder in Google Drive. It also uses the `useState` hook to manage the loading state, and the `useParams` hook from `react-router-dom` to get the current folder ID. It also uses the `toast` function from `react-hot-toast` to display notifications.
 *
 * @property isOpen - A boolean indicating whether the modal is open.
 * @property onClose - A function to close the modal.
 * @property onFolderCreated - A function to be called when a new folder is created. It receives the ID of the new folder as a parameter.
 *
 * @example
 * import NewFolderModal from "./NewFolderModal";
 *
 * // In a React component
 * <NewFolderModal
 *   isOpen={isNewFolderModalOpen}
 *   onClose={closeNewFolderModal}
 *   onFolderCreated={handleNewFolderCreated}
 * />
 */
const NewFolderModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onFolderCreated,
}) => {
  const { createFolder } = useGoogleDriveApi();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  /**
   * An asynchronous function that creates a new folder.
   *
   * This function prevents the default form submission, creates a new FormData object from the form event, and gets the name of the new folder from the form data. If the name is not provided, it displays an error notification and returns. It then sets the loading state to `true`, calls the `createFolder` function from the `useGoogleDriveApi` hook with the name and the current folder ID, and sets the loading state to `false`. If the `createFolder` function does not return a folder ID, it returns. Otherwise, it displays a success notification and calls the `onFolderCreated` function with the new folder ID. If an error occurs during the process, it displays an error notification and sets the loading state to `false`.
   *
   * @param event - The form event.
   */
  async function createNewFolder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name") as string;
      if (!name) return toast.error("Folder name is required");
      setLoading(true);
      const folderId = await createFolder(name, id);
      setLoading(false);
      if (!folderId) return;
      toast.success("New folder created successfully");
      onFolderCreated(folderId);
    } catch (e: any) {
      toast.error(e.message);
      setLoading(false);
    }
  }

  return (
    <Modal title="Create new folder" className="w-96" isOpen={isOpen}>
      <form className="flex flex-col gap-10" onSubmit={createNewFolder}>
        <label className="w-full max-w-xl rounded-full bg-darkerWhite px-4 py-2 transition-colors dark:bg-lightDark">
          <input
            autoFocus
            type="text"
            name="name"
            className="min-w-0 flex-1 bg-transparent focus:outline-none"
            placeholder="Search drive ..."
          />
        </label>
        <div className="flex items-center justify-center gap-8">
          <Button
            title="Close"
            type="reset"
            Icon={CloseIcon}
            variant="danger"
            disabled={loading}
            onClick={onClose}
          />
          <Button
            title="Create"
            Icon={FolderPlusIcon}
            variant="success"
            loading={loading}
          />
        </div>
      </form>
    </Modal>
  );
};

export default NewFolderModal;
