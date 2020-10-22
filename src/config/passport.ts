import { PassportStatic } from "passport"
import { Strategy } from "passport-local"
import bcrypt from "bcryptjs"
import User from "../models/User"

const passport = (passport: PassportStatic) => {
    passport.use(
        new Strategy({ usernameField: "email" }, (email, password, done) => {
            User.findOne({ email: email }).then((user) => {
                if (!user) {
                    return done(null, false, {
                        message: "That email is not registered",
                    });
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "password is incorrect" });
                    }
                });
            }).catch((err) => console.log(err));
        })
    )
    passport.serializeUser((user: any, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}

export default passport;