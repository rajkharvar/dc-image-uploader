import React from "react";
import { useDropzone } from "react-dropzone";

import ImagePH from "./assets/image-ph.png";
import "./App.scss";

function App() {
  const { acceptedFiles, getRootProps, getInputProps, fileRejections } =
    useDropzone({
      accept: "image/jpeg, image/png, image/jpg",
      maxFiles: 1,
      noClick: true,
    });

  return (
    <div className="App">
      <section className="container">
        <span>Upload your image</span>
        <p>File should be jpeg, jpg or png</p>
        <div {...getRootProps({ className: "dropzone" })} className="dropzone">
          <img src={ImagePH} alt="Image placeholder" className="image-ph" />
          <input {...getInputProps()} />
          <p>Drag & Drop your image here</p>
        </div>
        <p>Or</p>
        <button>Choose a file</button>
      </section>
    </div>
  );
}

export default App;
