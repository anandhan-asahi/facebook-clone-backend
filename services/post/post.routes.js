const express = require("express");
const {
	createPost,
	uploadImage,
	updatePost,
	getPost,
	deletePost,
} = require("./post.controllers");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = require("../../middlewares/multer");

const postRouter = express.Router();

postRouter.post("/api/v1/post", createPost);
postRouter.get("/api/v1/post/:id", getPost);
postRouter.put("/api/v1/post/:id", updatePost);
postRouter.delete("/api/v1/post/:id", deletePost);
postRouter.post("/api/v1/image-upload", upload.single("image"), uploadImage);

module.exports = postRouter;
