import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../../models/User"
import myError from "../errors";

export const saveUserToDatabase = (email: string, req: Request, res: Response, userName: string, password: string) => {
    User.findOne({ email: email }).then((user) => {
        if (user) {
            const errors = new myError()
            errors.addError("This error already registed")
            errors.errors.forEach(err => {
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
