require("dotenv").config();
const express = require("express");
require("express-async-errors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const { errorHandler, notFoundURLHandler } = require("./middleware/errors");

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* We need to read form-body (body parser/reader) (req.files) if you want upload file */
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
  })
);

app.use("/", router);

// This function is for 404 handle URL
app.use("*", notFoundURLHandler);

// This function is to handle error when API hit, it always be the last middleware
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
