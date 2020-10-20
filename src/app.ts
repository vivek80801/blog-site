import express from "express";
import router from "./routes/index";
import userRouter from './routes/users'
import expressLoyouts from "express-ejs-layouts"

const app: express.Express = express()
const port: string | number = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }))
app.use(expressLoyouts)
app.set("view engine", "ejs")
app.set("views", "src/views")
app.use(express.static("./src/public"))
app.use("/", router)
app.use("/users", userRouter)
app.use("/users", express.static("./src/public"))

app.listen(port, () => console.log(`server is runing on http://localhost:${port}`))