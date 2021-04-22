import express from "express";
import ensureAunthenticated from "../config/auth";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
	res.render("welcome", {auth:req.isAuthenticated()});
});

router.get(
	"/dashboard",
	ensureAunthenticated,
	(req: express.Request, res: express.Response) => {
		res.render("dashboard", {auth:req.isAuthenticated(), user: req.user});
	}
);

export default router;
