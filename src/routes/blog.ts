import express from "express"

const blogRouter = express.Router()

blogRouter.get("/", (req:express.Request,res:express.Response)=>{
    res.send("hello from my blog")
})

export default blogRouter;