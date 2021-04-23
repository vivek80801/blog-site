import express from "express"
import passport from "passport";
import User from "./services/user"
import { resquestBody } from "../../index"

export const handleUserRegister = (req: express.Request, res: express.Response) => {
    const { userName, email, password }: resquestBody = req.body;
    const newUser = new User(userName, email, password);
    const newErrors = newUser.validate();
    if (newErrors === "valid user") {
        newUser.saveUser(req, res)
    } else {
        newErrors.errors.forEach(err => {
            req.flash("error_msg", err)
        })
    }
}

export const handleGetLogIn = (req: express.Request, res: express.Response) => {
    res.render("login", { auth: req.isAuthenticated() });
}

export const handlePostLogIn = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true,
    })(req, res, next);
}

export const handleGetLogOut = (req: express.Request, res: express.Response) => {
	req.logOut();
	req.flash("sucess_message", "You are logged out");
	res.redirect("/users/login");
}