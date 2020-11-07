import express from "express";
import Blog from "../models/Blog";
import cors from "cors";

const myBlogRouter = express.Router();
const corsOptions = {
	origin: "http://localhost:3000",
	optionsSuccessStatus: 200,
};

myBlogRouter.get(
	"/",
	cors(corsOptions),
	(req: express.Request, res: express.Response) => {
		let myBlog;
		Blog.find((err, resp) => {
			if (err) {
				throw err;
			}
			myBlog = resp;
			res.json(myBlog);
		});
	}
);

export default myBlogRouter;
