import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

const FileUploader = () => {
  const [file, setFile] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      // console.log(acceptedFiles)
      // setFile(acceptedFiles[0].path)
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
      {file ? (
        <div>{file}</div>
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
