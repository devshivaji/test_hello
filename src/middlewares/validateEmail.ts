import { NextFunction, Request, Response } from "express";
import validator from "validator";
const { isEmail } = validator;
export const validateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.email) {
    if (!isEmail(req.body.email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    } else {
      next();
    }
  } else {
    next();
  }
};
