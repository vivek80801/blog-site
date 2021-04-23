import express from "express";
import ensureAunthenticated from "../config/auth";
import Blog from "../models/Blog";
import multer from "multer";
import path from "path";
import fs from "fs";

const stroage = multer.diskStorage({
	destination: "./public/upload/",
	filename: (req, file, cb) => {
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({
	storage: stroage,
	limits: { fileSize: 100000 },
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	},
}).single("blogImage");

const checkFileType = (
	file: Express.Multer.File,
	cb: multer.FileFilterCallback
) => {
	const fileTypes = /jpeg|png|jpg/;
	const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
	const mimeType = fileTypes.test(file.mimetype);

	if (mimeType && extname) {
		return cb(null, true);
	} else {
		cb({ message: "file is not an image", name: "Error" });
	}
};

const blogRouter = express.Router();

interface blogBody {
	title: string;
	blogImage: string;
	des: string;
}

blogRouter.get(
	"/blog/:id",
	ensureAunthenticated,
	(req: express.Request, res: express.Response) => {
		const { id } = req.params;
		Blog.find((err, resp) => {
			if (err) {
				throw err;
			} else {
				res.render("singleBlog", {
					resp,
					id,
					auth: req.isAuthenticated()
				});
			}
		});
	}
);

blogRouter.delete(
	"/blog/:id",
	ensureAunthenticated,
	(req: express.Request, res: express.Response) => {
		const { id } = req.params;
		Blog.findById(id, (err, resp) => {
			if (resp !== null) {
				fs.unlink(`./public/upload/${resp.img}`, (err) => {
					if (err) {
						throw err;
					}
				});
			}
		});
		Blog.deleteOne({ _id: id }, (err) => {
			if (err) {
				throw err;
			}
		})
			.then(() => res.status(200))
			.catch((err) => console.log(err));
	}
);

blogRouter.get(
	"/",
	ensureAunthenticated,
	(req: express.Request, res: express.Response) => {
		Blog.find((err, resp) => {
			if (err) {
				throw err;
			} else {
				res.render("blogs", {
					resp,
					auth: req.isAuthenticated()
				});
			}
		});
	}
);

blogRouter.get(
	"/createblog",
	ensureAunthenticated,
	(req: express.Request, res: express.Response) => {
		res.render("createBlog", {auth: req.isAuthenticated()});
	}
);

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
