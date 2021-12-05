import React, { useCallback, useState } from "react";
import "./style.css";
import folder from "../assets/folder.png";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "./Loading";

function FileUpload() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState([]);
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const url = `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.REACT_APP_API_KEY}`;
  const onDrop = useCallback(async (acceptedFiles) => {
    setFileUploaded(true);
    setUploading(true);
    // Do something with the files
    let payload = new FormData();
    payload.append("image", acceptedFiles[0]);

    // Upload to imgbb API call
    await axios
      .post(url, payload)
      .then((response) => {
        setFileName(response.data.data.image.filename);
        if (response.data.status === 200) {
          setStatus("Success");
          setUploading(false);
        } else {
          setStatus("Error");
          setUploading(false);
          setError(true);
        }
      })
      .catch((error) => {
        setUploading(false);
        alert(error);
        setError(true);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="root">
      <div {...getRootProps()} className="upload-container">
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="upload-container-active">
            <div className="image-container">
              <img src={folder} alt="folder" width="100" height="100" />
            </div>
            <div className="text-container-1">
              <h3>Upload your files</h3>
            </div>
            <div className="text-container-2">
              <h5>Drag & drop here or browse</h5>
            </div>
          </div>
        ) : (
          <div>
            <div className="image-container">
              <img src={folder} alt="folder" width="100" height="100" />
            </div>
            <div className="text-container-1">
              <h3>Upload your files</h3>
            </div>
            <div className="text-container-2">
              <h5>Drag & drop here or browse</h5>
            </div>
          </div>
        )}
      </div>
      {fileUploaded ? (
        <motion.div
          animate={{ y: 20, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="progress-container"
        >
          <div className="filename">
            <h3>{fileName}</h3>
          </div>
          {uploading ? (
            <div className="filename">
              <Loading />
            </div>
          ) : null}

          <div className="status">
            {status === "Success" ? <h3 className="success">Success</h3> : null}
            {error ? <h3 className="error">Error uploading</h3> : null}
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}

export default FileUpload;
