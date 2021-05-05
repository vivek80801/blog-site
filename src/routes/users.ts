import express from "express";
import { handleUserRegister, handleGetLogIn, handlePostLogIn, handleGetLogOut } from "../controller/user";

const userRouter = express.Router();

userRouter.get("/login", handleGetLogIn)
userRouter.post("/register", handleUserRegister);
userRouter.post("/login",handlePostLogIn);
userRouter.get("/logout", handleGetLogOut) 

export default userRouter;
