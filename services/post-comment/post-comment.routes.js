const express = require("express");
const { createPostComment } = require("./post-comment.controllers");

const postCommentRouter = express.Router();

postCommentRouter.post("/api/v1/post/comment/:id", createPostComment);

module.exports = postCommentRouter;
