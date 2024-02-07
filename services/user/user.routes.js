const express = require("express");
const { getUser, createUser, login } = require("./user.controllers");

const userRouter = express.Router();

userRouter.post("/api/v1/auth/user", createUser);
userRouter.get("/api/v1/user/:id", getUser);
userRouter.put("/api/v1/auth/login", login);

module.exports = userRouter;
