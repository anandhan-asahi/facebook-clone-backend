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

postRouter.post("/api/post", createPost);
postRouter.get("/api/post/:id", getPost);
postRouter.put("/api/post/:id", updatePost);
postRouter.delete("/api/post/:id", deletePost);
postRouter.post("/api/image-upload", upload.single("image"), uploadImage);

module.exports = postRouter;
