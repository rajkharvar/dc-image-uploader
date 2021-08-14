import React from "react";
import "./App.scss";
import Footer from "./components/Footer";
import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <div className="App">
      <ImageUpload />
      <Footer />
    </div>
  );
}

export default App;
