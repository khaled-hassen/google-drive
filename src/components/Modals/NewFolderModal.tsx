import React, { useState } from "react";
import Modal from "./Modal.tsx";
import FolderPlusIcon from "../icons/FolderPlusIcon.tsx";
import Button from "../shared/Button.tsx";
import CloseIcon from "../icons/CloseIcon.tsx";
import { useGoogleDriveApi } from "../../hooks/useGoogleDriveApi.ts";
import { useParams } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose(): void;
  onFolderCreated(folderId: string): void;
};

const NewFolderModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onFolderCreated,
}) => {
  const { createFolder } = useGoogleDriveApi();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  async function createNewFolder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const folderId = await createFolder(name, id);
    setLoading(false);
    if (!folderId) return;
    onFolderCreated(folderId);
  }

  return (
    <Modal title="Create new folder" className="w-96" isOpen={isOpen}>
      <form className="flex flex-col gap-10" onSubmit={createNewFolder}>
        <label className="w-full max-w-xl rounded-full bg-darkerWhite px-4 py-2">
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
