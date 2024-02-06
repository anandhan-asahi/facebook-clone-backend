const express = require("express");
const cors = require("cors");
const database = require("./config/database");
require("dotenv").config();
const userRouter = require("./services/user/user.routes");
const postRouter = require("./services/post/post.routes");
const followRequestRouter = require("./services/follow-requests/follow-request.routes");
const friendRequestRouter = require("./services/friend-request/friend-request.routes");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
database();

app.use(userRouter);
app.use(postRouter);
app.use(followRequestRouter);
app.use(friendRequestRouter);

app.listen(port, () => {
	console.log(`Facebook clone app listening on port ${port}`);
});
