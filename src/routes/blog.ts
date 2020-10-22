import express from "express"
import ensureAunthenticated from "../config/auth"
import Blog from "../models/Blog"

const blogRouter = express.Router()

interface blogBody {
    title: string,
    des: string
}

blogRouter.get("/", ensureAunthenticated, (req: express.Request, res: express.Response) => {
    res.render("blogs")
})

blogRouter.get("/createblog", ensureAunthenticated, (req: express.Request, res: express.Response) => {
    res.render("createBlog")
})

blogRouter.post("/createblog", (req: express.Request, res: express.Response) => {
    const { title, des }: blogBody = req.body
    const errors: string[] = []
    if (!title || !des) {
        errors.push("Please fill the form")
    }
    if (errors.length > 0) {
        res.render("blogs", { errors, title, des })
    } else {
        Blog.findOne({ title: title }).then(blog => {
            if (blog) {
                errors.push("Blog is already in database")
                res.render("welcome", { errors, title, des })
            } else {
                const newBlog = new Blog({
                    title,
                    des,
                })
                newBlog.save().then(blog => {
                    req.flash("success_message", "Blog is created sucressfully")
                    res.redirect("/blog/createblog")
                }).catch(err => console.log(err))
            }
        })
    }
})

export default blogRouter;