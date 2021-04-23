import express from "express"
import Blog from "../models/Blog";
import fs from "fs"

export const handleGetSingleBlog = (req: express.Request, res: express.Response) => {
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

export const handleDeleteSingleBlog = (req: express.Request, res: express.Response) => {
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

export const handleGetAllBlog = (req: express.Request, res: express.Response) => {
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

export const handleGetCreateBlog = (req: express.Request, res: express.Response) => {
		res.render("createBlog", {auth: req.isAuthenticated()});
	}