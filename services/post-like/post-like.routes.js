const express = require("express");
const { getUser, createUser } = require("./post-like.controllers");

const userRouter = express.Router();

userRouter.post("/api/user", createUser);

module.exports = userRouter;
