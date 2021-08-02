import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

import ImagePH from "../assets/image-ph.png";

const ImageUpload = () => {
  console.log(import.meta.env);
  const hiddenFileInput = useRef(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

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

  useEffect(() => {
    if (acceptedFiles.length) {
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

    data.append("file", image);
    data.append("upload_preset", "dc-image-uploader");
    data.append("cloud_name", "dc-image-uploader");

    fetch(import.meta.env.VITE_CLOUDINARY_URL, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((response) => {
        setUploading(false);
        setImageUrl(response.secure_url);
      });
  };

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
          </>
        )}
        {uploading && <h1>Uploading ...</h1>}
        {imageUrl && (
          <>
            <img src={imageUrl} placeholder="Uploaded image" />
            <button>Copy to Clip</button>
          </>
        )}
      </section>
    </>
  );
};

export default ImageUpload;
