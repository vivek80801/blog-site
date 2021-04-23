import { Request, Response } from "express"

export const handleIndexRoute = (req: Request, res: Response) => {
	console.log(`auth: ${req.isAuthenticated()}`)
	res.render("welcome", { auth: req.isAuthenticated(), test: "vivek kumkar" });
}

export const handleDashboard = (req: Request, res: Response) => {
	res.render("dashboard", { auth: req.isAuthenticated(), user: req.user });
}