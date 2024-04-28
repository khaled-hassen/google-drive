import React from "react";
import FileRow from "./FileRow.tsx";
import ListIcon from "../icons/ListIcon.tsx";

type Props = {
  files: gapi.client.drive.File[];
  onFileDeleted(id: string): void;
};

/**
 * A FilesTable component that displays a table of files.
 *
 * This component uses the `FileRow` component to display each row of file information. It also uses the `ListIcon` component to display an icon when there are no files.
 *
 * @property files - An array of files to display.
 * @property onFileDeleted - A callback function that is called when a file is deleted.
 *
 * @example
 * import FilesTable from "./FilesTable";
 *
 * // In a React component
 * <FilesTable
 *   files={files}
 *   onFileDeleted={(id) => handleFileDeleted(id)}
 * />
 */
const FilesTable: React.FC<Props> = ({ files, onFileDeleted }) => {
  return (
    <div className="overflow-auto">
      {files.length > 0 ? (
        <div className="min-w-[50rem]">
          <div className="grid grid-cols-[1.5fr_0.5fr_1fr_1fr_7rem] gap-6 font-bold text-lightGray">
            <p>Name</p>
            <p className="text-center">Owner</p>
            <p className="text-center">Last modified</p>
            <p className="text-center">File size</p>
          </div>
          {files.map((file) => (
            <FileRow
              key={file.id}
              file={file}
              className="grid grid-cols-[1.5fr_0.5fr_1fr_1fr_7rem] gap-6 border-b border-b-lightGray py-6"
              onFileDeleted={onFileDeleted}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-96 flex-col items-center justify-center gap-4 text-lightGray">
          <ListIcon />
          <p className="text-center text-4xl font-bold">No items in the list</p>
        </div>
      )}
    </div>
  );
};

export default FilesTable;
