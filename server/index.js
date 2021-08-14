require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { uploadController, upload } = require("./controllers/upload");
const { fileController } = require("./controllers/file");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.get("/", (req, res) => res.send("Hello World!!!"));

app.post("/upload", uploadController);
app.get("/:fileName", fileController);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
