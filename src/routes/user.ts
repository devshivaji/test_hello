import express from "express";
import { checkCompanyAuth } from "../middlewares/auth";
import { createUser, getUsers, updateUser } from "../controllers/user";
import { validateEmail } from "../middlewares/validateEmail";

export const userRouter = express.Router();

userRouter.post("/", checkCompanyAuth, validateEmail, createUser);
userRouter.patch("/:id", checkCompanyAuth, validateEmail, updateUser);
userRouter.get("/:id?", checkCompanyAuth, getUsers);
