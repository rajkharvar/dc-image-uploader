import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

import ImagePH from "../assets/image-ph.png";
import Loader from "./Loader";
import Preview from "./Preview";

const ImageUpload = () => {
  const hiddenFileInput = useRef(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  const { acceptedFiles, getRootProps, getInputProps, fileRejections } =
    useDropzone({
      accept: "image/jpeg, image/png, image/jpg",
      maxFiles: 1,
      noClick: true,
    });

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    setImage(event.target.files[0]);
  };

  const fileRejectionItems = fileRejections.map(({ file, errors }) =>
    errors.map((e) => <p key={e.code}>{e.message}</p>)
  );

  useEffect(() => {
    if (acceptedFiles.length === 1) {
      setImage(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);

  const uploadImage = () => {
    setUploading(true);
    const data = new FormData();

    data.append("dc-image-uploader", image);

    fetch(import.meta.env.VITE_SERVER_URL, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((response) => {
        setUploading(false);
        setImageUrl(response.filePath);
      })
      .catch((err) => {
        setUploading(false);
      });
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 2000);
    }
  }, [copied]);

  return (
    <>
      <section className="container">
        {!imageUrl && !uploading && (
          <>
            <span>Upload your image</span>
            <p>File should be jpeg, jpg or png</p>
            <div
              {...getRootProps({ className: "dropzone" })}
              className="dropzone"
            >
              <img src={ImagePH} alt="Image placeholder" className="image-ph" />
              <input {...getInputProps()} />
              <p>Drag & Drop your image here</p>
            </div>
            <p>Or</p>
            <button type="button" onClick={handleClick}>
              Choose a file
            </button>
            <input
              type="file"
              style={{ display: "none" }}
              ref={hiddenFileInput}
              accept=".jpg,.jpeg,.png"
              onChange={handleChange}
            />
            {fileRejectionItems}
          </>
        )}
        {uploading && <Loader />}
        {imageUrl && !uploading && (
          <Preview imageUrl={imageUrl} setCopied={setCopied} copied={copied} />
        )}
      </section>
    </>
  );
};

export default ImageUpload;
