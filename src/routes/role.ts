import express from "express";
import { checkCompanyAuth } from "../middlewares/auth";
import { createRole, getRole, updateRole } from "../controllers/role";

export const roleRouter = express.Router();
roleRouter.post("/", checkCompanyAuth, createRole);
roleRouter.patch("/:id", checkCompanyAuth, updateRole);
roleRouter.get("/:id?", checkCompanyAuth, getRole);
