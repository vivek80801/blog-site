import express from "express"
import bcrypt from "bcryptjs"
import User from "../models/User"
import passport from "passport"

const userRouter = express.Router()

interface resquestBody {
    userName: string,
    email: string,
    password: string,
}

userRouter.get("/", (req: express.Request, res: express.Response) => {
    res.send("users")
})

userRouter.get("/login", (req: express.Request, res: express.Response) => {
    res.render("login")
})

userRouter.post("/register", (req: express.Request, res: express.Response) => {
    const { userName, email, password }: resquestBody = req.body
    const errors: string[] = []

    if (!userName || !email || !password) {
        errors.push("plaese fill the form")
    } else if (userName.length < 3) {
        errors.push("user name must be of greater then 3 charecters")
    } else if (userName.length > 20) {
        errors.push("user name must be of less then 20 charecters")
    } else if (password.length < 3) {
        errors.push("password must be greater then 3 charecters")
    } else if (password.length > 20) {
        errors.push("password must be less then 20 charecters")
    }
    if (errors.length > 0) {
        res.redirect("/")
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push("User is already register")
                res.render("welcome", {
                    errors,
                    userName,
                    email,
                    password,
                });
            } else {
                const newUser = new User({
                    userName,
                    email,
                    password,
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            throw err
                        } else {
                            newUser.password = hash
                        }
                    })
                })
                console.log(newUser)
                res.redirect("/users/login")
            }
        })
    }
})

userRouter.post("/login", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true
    })(req, res, next)
})

userRouter.get("/logout", (req: express.Request, res: express.Response) => {
    req.logOut()
    req.flash("sucess_message", "You are logged out")
    res.redirect("/users/login")
})

export default userRouter;