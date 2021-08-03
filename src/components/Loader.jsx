import React from "react";

import "./loader.scss";

const Loader = () => {
  return (
    <>
      <span className="uploading-header">Uploading</span>
      <div className="loader">
        <div className="loaderBar"></div>
      </div>
    </>
  );
};

export default Loader;
