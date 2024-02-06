const express = require("express");
const cors = require("cors");
const database = require("./config/database");
const User = require("./services/user/user.model");
const userRouter = require("./services/user/user.routes");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
database();

app.use(userRouter);
app.use(taskRouter);
app.use(postRouter);
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
