const express = require("express");
const { createPostLike } = require("./post-like.controllers");

const postLikeRouter = express.Router();

postLikeRouter.post("/api/v1/post/like/:id", createPostLike);

module.exports = postLikeRouter;
