import { Request, Response, NextFunction } from "express";

const ensureAunthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.flash("error_msg", "login first");
		res.redirect("/users/login");
	}
};

export default ensureAunthenticated;
