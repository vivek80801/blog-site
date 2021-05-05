import { Request, Response } from "express";

export const handleIndexRoute = (req: Request, res: Response) => {
	res.render("welcome", { auth: req.isAuthenticated()});
}

export const handleDashboard = (req: Request, res: Response) => {
	res.render("dashboard", { auth: req.isAuthenticated(), user: req.user });
}