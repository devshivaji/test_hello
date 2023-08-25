import express from "express";
import { checkCompanyAuth } from "../middlewares/auth";

import { validateEmail } from "../middlewares/validateEmail";
import { createTeam, getTeam, updateTeam } from "../controllers/team";

export const teamRouter = express.Router();
teamRouter.post("/", checkCompanyAuth, createTeam);
teamRouter.patch("/:id", checkCompanyAuth, updateTeam);
teamRouter.get("/:id?", checkCompanyAuth, getTeam);
