import express from "express";
import expressLoyouts from "express-ejs-layouts"
import mongoose from "mongoose"
import passport from "passport"
import session from "express-session"
import flash from "connect-flash"
import router from "./routes/index";
import userRouter from './routes/users'
import blogRouter from "./routes/blog"
import { MONGO_URI } from "./config/key"
import myPassport from "./config/passport"

const app: express.Application = express()
const port: string | number = process.env.PORT || 5000

myPassport(passport)

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log(`mongodb is connected on ${MONGO_URI}`)).catch(err => console.log(err))

app.use(express.urlencoded({ extended: true }))
app.use(expressLoyouts)
app.set("view engine", "ejs")
app.set("views", "src/views")
app.use(session({
    secret: "mysecret",
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next()
})
app.use(express.static("./src/public"))
app.use("/", router)
app.use("/blog", blogRouter)
app.use("/users", userRouter)
app.use("/blog", express.static("./src/public"))
app.use("/users", express.static("./src/public"))

app.listen(port, () => console.log(`server is runing on http://localhost:${port}`));