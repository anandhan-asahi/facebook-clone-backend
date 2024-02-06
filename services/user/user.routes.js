const express = require("express");
const { getUser, createUser } = require("./user.controllers");

const userRouter = express.Router();

userRouter.post("/api/user", createUser);
userRouter.get("/api/user/:id", getUser);

module.exports = userRouter;
