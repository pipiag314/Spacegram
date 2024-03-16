import { useCallback, useEffect, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

type FileUploaderProps = {
  fieldChange: (Files: File[]) => void;
  mediaUrl: string;
}

const FileUploader = ({ fieldChange, mediaUrl}: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles)
      fieldChange(acceptedFiles)
      setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpeg", ".jpg", ".svg"] },
  });

  return (
    <div
      {...getRootProps()}
      className="bg-dark-4 rounded-lg flex-center cursor-pointer p-5">
      <input {...getInputProps()} />
      {fileUrl ? (
        <div className="flex flex-col justify-center items-center gap-5">
          <img src={fileUrl} alt="post image" className="h-80 lg:h-[480px] w-full rounded-[24px] object-cover object-top" />
          <p className="text-light-3">Drag or Click here for replace with other photo</p>
        </div>
      ) : (
        <div className="flex-center flex-col p-7 h-80">
          <img
            src="/assets/icons/file-upload.svg"
            width={100}
            alt="file upload icon"
          />
          <h2>Drag and Drop Photos or Click here</h2>
          <p className="text-light-3">SVG, PNG, JPG</p>
        </div>
      )}
    </div>
  );
};
export default FileUploader;
