import validator from "validator";
import CompanyDetails from "../models/company/details";
import Company from "../models/company";
import { NextFunction, Request, Response } from "express";

const { isEmail, isStrongPassword } = validator;

export const validateCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqBody = req.body as Company & CompanyDetails;
  const { email, password } = reqBody;

  const trimmedEmail = email.trim();

  if (!isEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email" });
  }

  const trimmedPassword = password.trim();

  if (!isStrongPassword(trimmedPassword)) {
    return res
      .status(400)
      .json({
        success: false,
        message:
          "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (!@#$%^&*)",
      });
  }

  res.locals.validated = {
    ...reqBody,
    email: trimmedEmail,
    password: trimmedPassword,
  };
  next();
};
