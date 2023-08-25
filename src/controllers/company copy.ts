// import { Request, Response } from "express";
// import { sign } from "jsonwebtoken";
// import { hash, compare, genSalt } from "bcrypt";

// import Company from "../models/company";
// import CompanyDetails from "../models/company/details";
// import { deleteDB } from "../utils/mongodb";
// import { ObjectId } from "mongodb";

// export const getAll = async (req: Request, res: Response) => {
//   const allData = await Company.getModel()
//     .find({}, { projection: { _id: false } })
//     .toArray();

//   res.status(200).json({ success: true, data: { allData } });
// };

// export const getCompany = async (_: Request, res: Response) => {
//   const { email, database } = res.locals.authPayload as Company;
//   const details = await CompanyDetails.getModel(database).findOne({ email });

//   return res.status(200).json({
//     success: true,
//     message: `Company details for ${email}`,
//     data: { details },
//   });
// };

// export const signUp = async (_: Request, res: Response) => {
//   const {
//     createdAt,
//     updatedAt,
//     email,
//     phone,
//     mobile,
//     industry,
//     description,
//     domain,
//     websiteUrl,
//     currency,
//     timezone,
//     name,
//     address,
//   } = res.locals.validated as CompanyDetails;

//   const { password } = res.locals.validated as Company;

//   const existingCompany = await Company.getModel().findOne({ email });

//   if (!!existingCompany) {
//     return res.status(400).json({
//       success: false,
//       message: "Email already exists",
//       error: { message: "Email already exists" },
//     });
//   }

//   const salt = await genSalt(10);
//   const hashedPassword = await hash(password, salt);
//   const database = Date.now().toString(16);

//   const company = new Company(email, hashedPassword, database);

//   const details = new CompanyDetails(
//     email,
//     phone,
//     mobile,
//     industry,
//     description,
//     domain,
//     websiteUrl,
//     currency,
//     timezone,
//     name,
//     address
//   );

//   await Company.getModel().insertOne(company.clearNulls());
//   await CompanyDetails.getModel(database).insertOne(details.clearNulls());

//   res.status(200).json({ success: true, message: "Signed up successfully" });
// };

// export const login = async (_: Request, res: Response) => {
//   const { email, password } = res.locals.validated as Company;
//   const existingCompany = await Company.getModel().findOne({ email });

//   if (!existingCompany) {
//     return res.status(400).json({
//       success: false,
//       message: "Email does not exist",
//       error: { message: "Email does not exist" },
//     });
//   }

//   const { database, password: hash, _id } = existingCompany;

//   const matched = await compare(password, hash);

//   if (!matched) {
//     return res.status(400).json({
//       success: false,
//       message: "Password did not match",
//       error: { message: "Password did not match" },
//     });
//   }

//   const details = await CompanyDetails.getModel(database).findOne({ email });

//   const companyPayload = { _id, email, database };
//   const token = sign(companyPayload, process.env.JWT_SECRET_KEY!, {
//     expiresIn: "1d",
//   });
//   res.cookie("token", token, {
//     httpOnly: true,
//   });
//   res.status(200).json({
//     success: true,
//     message: "Login successful",
//     data: { token, company: existingCompany, details },
//   });
// };

// export const logout = async (_: Request, res: Response) => {
//   res.clearCookie("token");
//   res.status(200).json({ success: true, message: "Logged out" });
// };

// export const update = async (req: Request, res: Response) => {
//   const { email, database } = res.locals.authPayload as Company;
//   const updatedDetails = req.body as CompanyDetails;

//   const newDetails = await CompanyDetails.getModel(database).updateOne(
//     { _id: new ObjectId(req.params.id) },
//     { $set: { ...updatedDetails, updatedAt: new Date() } }
//   );

//   res.status(200).json({
//     success: true,
//     message: "Update successful",
//     data: { newDetails },
//   });
// };

// export const remove = async (_: Request, res: Response) => {
//   const { email, database } = res.locals.authPayload as Company;
//   await deleteDB(database);
//   await Company.getModel().deleteOne({ email });

//   res.status(200).json({ success: true, data: { message: "Deleted company" } });
// };
