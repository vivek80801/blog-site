import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import passport from "passport";

const userRouter = express.Router();

interface resquestBody {
	userName: string;
	email: string;
	password: string;
}

userRouter.get("/", (req: express.Request, res: express.Response) => {
	res.send("users");
});

userRouter.get("/login", (req: express.Request, res: express.Response) => {
	res.render("login", {auth:req.isAuthenticated()});
});

userRouter.post("/register", (req: express.Request, res: express.Response) => {
	const { userName, email, password }: resquestBody = req.body;
	const errors: string[] = [];

	if (!userName || !email || !password) {
		errors.push("Plaese fill the form");
	}
	if (userName.length < 3) {
		errors.push("user name must be of greater then 3 charecters");
	}
	if (userName.length > 20) {
		errors.push("user name must be of less then 20 charecters");
	}
	if (password.length < 3) {
		errors.push("password must be greater then 3 charecters");
	}
	if (password.length > 20) {
		errors.push("password must be less then 20 charecters");
	}
	if (errors.length > 0) {
		errors.forEach(err => {
			req.flash("error_msg", err)
		})
		res.redirect("/")
	} else {
		User.findOne({ email: email }).then((user) => {
			if (user) {
				errors.forEach(err => {
					req.flash("error_msg", err)
				})
				res.redirect("/")
			} else {
				const newUser = new User({
					userName,
					email,
					password,
				});
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) {
							throw err;
						} else {
							newUser.password = hash;
							newUser
								.save()
								.then(() => {
									req.flash("success_msg", "you are now registered and you can log in");
									res.redirect("/users/login");
								})
								.catch((err) => console.log(err));
						}
					});
				});
			}
		});
	}
});

userRouter.post(
	"/login",
	(req: express.Request, res: express.Response, next: express.NextFunction) => {
		passport.authenticate("local", {
			successRedirect: "/dashboard",
			failureRedirect: "/users/login",
			failureFlash: true,
		})(req, res, next);
	}
);

userRouter.get("/logout", (req: express.Request, res: express.Response) => {
	req.logOut();
	req.flash("sucess_message", "You are logged out");
	res.redirect("/users/login");
});

export default userRouter;
