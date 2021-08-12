import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";

import "./preview.scss";

const Preview = ({ imageUrl, setCopied, copied }) => {
  return (
    <div className="preview">
      <AiFillCheckCircle size={32} color="green" className="check-icon" />
      <span>Uploaded Successfully!</span>
      <img src={imageUrl} placeholder="Uploaded image" />
      <br />
      <div className="clipboard-container">
        <input type="text" placeholder={imageUrl} disabled />
        <CopyToClipboard text={imageUrl} onCopy={() => setCopied(true)}>
          <button className="button">Copy Link</button>
        </CopyToClipboard>
      </div>
      {copied && <span>Copied!!!</span>}
    </div>
  );
};

export default Preview;
