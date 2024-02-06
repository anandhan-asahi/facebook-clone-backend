const express = require("express");
const { createPost, uploadImage } = require("./post.controllers");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = require("../../middlewares/multer");

const postRouter = express.Router();

postRouter.post("/api/post", createPost);
postRouter.post("/api/image-upload", upload.single("image"), uploadImage);

module.exports = postRouter;
