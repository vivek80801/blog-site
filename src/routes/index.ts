import express from "express";

const router = express.Router()

router.get("/", (req: express.Request, res: express.Response) => {
    res.render("welcome")
})

router.get("/dashboard", (req:express.Request, res: express.Response)=> {
    res.render("dashboard")
})

export default router;