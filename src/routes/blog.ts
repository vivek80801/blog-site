import express from "express";
import ensureAunthenticated from "../config/auth";
import Blog from "../models/Blog";
import { upload } from "../controller/services/microservices/blog";
import { blogBody } from "../../index";
import { handleGetSingleBlog, handleDeleteSingleBlog, handleGetAllBlog, handleGetCreateBlog } from "../controller/blog"

const blogRouter = express.Router();

blogRouter.get("/blog/:id", ensureAunthenticated, handleGetSingleBlog);
blogRouter.delete("/blog/:id", ensureAunthenticated, handleDeleteSingleBlog);
blogRouter.get("/", ensureAunthenticated, handleGetAllBlog);
blogRouter.get("/createblog", ensureAunthenticated, handleGetCreateBlog);

blogRouter.post(
	"/createblog",
	ensureAunthenticated,
	(req: express.Request, res: express.Response) => {
		upload(req, res, (err: any) => {
			const { title, des, blogImage }: blogBody = req.body;
			const errors: string[] = [];
			if (!title || !des) {
				errors.push("Please fill the form");
			}
			if (errors.length > 0) {
				res.render("createBlog", { errors, title, des, blogImage, auth: req.isAuthenticated() });
			} else {
				Blog.findOne({ title: title }).then((blog) => {
					if (blog) {
						errors.push("Blog is already in database");
						res.render("createBlog", { errors, title, des, blogImage, auth: req.isAuthenticated() });
					} else {
						if (err) {
							errors.push(err);
						} else {
							if (req.file === undefined) {
								errors.push("Please only upload image");
							} else {
								const newBlog = new Blog({
									title,
									des,
									img: req.file.filename,
								});
								newBlog
									.save()
									.then(() => {
										req.flash("success_message", "Blog is created sucressfully");
										res.render("createBlog", {
											file: `upload/${req.file.filename}`,
											auth: req.isAuthenticated()
										});
									})
									.catch((err) => console.log(err));
							}
						}
					}
				});
			}
		});
	}
);

export default blogRouter;
