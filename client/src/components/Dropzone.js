import React from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ onDrop, accept }) => {
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept
  });

  return (
    <div className="dropzone-div" {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content" style={{color:'white'}}>Release to drop the file here</p>
        ) : (
          <p className="dropzone-content" style={{color:'white', cursor: 'pointer'}}>
            Drag 'n' drop files here, or click to select file
            <p>The file will not be uploaded</p>
          </p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;