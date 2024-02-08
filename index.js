const express = require("express");
const cors = require("cors");
const database = require("./config/database");
require("dotenv").config({ path: "./config.env" });
const userRouter = require("./services/user/user.routes");
const postRouter = require("./services/post/post.routes");
const followRequestRouter = require("./services/follow-requests/follow-request.routes");
const friendRequestRouter = require("./services/friend-request/friend-request.routes");
const postLikeRouter = require("./services/post-like/post-like.routes");
const postCommentRouter = require("./services/post-comment/post-comment.routes");
const authenticateToken = require("./middlewares/auth");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
database();

app.use((req, res, next) => {
	if (req.path.includes("/auth/")) {
		return next();
	}
	authenticateToken(req, res, next);
});

app.use(userRouter);
app.use(postRouter);
app.use(followRequestRouter);
app.use(friendRequestRouter);
app.use(postLikeRouter);
app.use(postCommentRouter);

app.listen(port, () => {
	console.log(`Facebook clone app listening on port ${port}`);
});
