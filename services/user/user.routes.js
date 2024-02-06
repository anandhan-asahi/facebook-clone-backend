const express = require("express");
const { getUsers, createUser } = require("./user.controllers");

const userRouter = express.Router();

userRouter.post("/api/user", createUser);

module.exports = userRouter;
