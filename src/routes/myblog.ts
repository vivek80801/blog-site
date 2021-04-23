import express from "express";
import Blog from "../models/Blog";
import cors from "cors";
import { handleGetMyBlog, handleGetAllMyBlog } from "../controller/myblog";

const myBlogRouter = express.Router();
const corsOptions = {
	origin: "http://localhost:3000",
	optionsSuccessStatus: 200,
};

myBlogRouter.get("/", cors(corsOptions), handleGetMyBlog);
myBlogRouter.get("/:id", cors(corsOptions), handleGetAllMyBlog);

export default myBlogRouter;
