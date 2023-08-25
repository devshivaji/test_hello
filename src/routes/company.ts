import { Router } from "express";

import {
  getAll,
  getCompany,
  login,
  logout,
  remove,
  signUp,
  update,
} from "../controllers/company";
import { checkCompanyAuth } from "../middlewares/auth";
import { validateCredentials } from "../middlewares/validation";

const router = Router();

router.get("/all", getAll);
router.get("/", checkCompanyAuth, getCompany);
router.post("/signup", validateCredentials, signUp);
router.post("/login", validateCredentials, login);
router.post("/logout", checkCompanyAuth, logout);
router.put("/:id", checkCompanyAuth, update);
router.delete("/", checkCompanyAuth, remove);

export default router;
