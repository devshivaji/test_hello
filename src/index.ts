import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectToMongoDB } from "./configs/mongodb";
import companyRouter from "./routes/company";
import { userRouter } from "./routes/user";
import { teamRouter } from "./routes/team";
import { roleRouter } from "./routes/role";
import productRouter from "./routes/product";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     credentials: true,
//     maxAge: 28800,
//     origin: process.env.FRONT_END_ORIGIN,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
app.use(
  cors()
);

app.use("/company", companyRouter);
app.use("/user", userRouter);
app.use("/team", teamRouter);
app.use("/role", roleRouter);
app.use("/product", productRouter);

(async () => {
  await connectToMongoDB();
  app.listen(port, () =>
    console.log(`Server started at port  http://localhost:${port}`)
  );
})();
