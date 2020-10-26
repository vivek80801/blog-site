import express from "express";
import ensureAunthenticated from "../config/auth"

const router = express.Router()

router.get("/", (req: express.Request, res: express.Response) => {
	res.render("welcome")
})

router.get("/dashboard", ensureAunthenticated, (req: express.Request, res: express.Response) => {
	res.render("dashboard")
})

export default router;