import express from "express"
import Blog from "../models/Blog";

export const handleGetMyBlog = (req: express.Request, res: express.Response) => {
    let myBlog;
    Blog.find((err, resp) => {
        if (err) {
            throw err;
        }
        myBlog = resp;
        res.json(myBlog);
    });
}

export const handleGetAllMyBlog = (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    Blog.findById(id, (err:any, resp:any) => {
        if (err) {
            throw err;
        }
        res.json(resp);
    });
}