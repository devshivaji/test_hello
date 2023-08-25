import { AuthPayload } from "../types/general";
import { Request, Response } from "express";
import UserDetails from "../models/user";
import { ObjectId } from "mongodb";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { database } = res.locals.authPayload as AuthPayload;
    const payload = req.body as UserDetails;

    const isExisting = await UserDetails.getModel(database).findOne({
      email: payload.email,
    });

    if (!isExisting) {
      const user = await UserDetails.getModel(database).insertOne(payload);
      const insertedUserId = user.insertedId;
      const newUser = await UserDetails.getModel(database).findOne({
        _id: insertedUserId,
      });
      return res.status(200).json({
        success: true,
        message: "user created successfully",
        data: { user: newUser },
      });
    } else {
      return res.status(409).json({
        success: false,
        message: "user already exist",
        data: {},
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error while creating user",
      error: error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { database } = res.locals.authPayload as AuthPayload;
    const payload = req.body as UserDetails;
    const id = req.params.id;

    const user = await UserDetails.getModel(database).updateOne(
      { _id: new ObjectId(id) },
      { $set: payload }
    );

    return res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: { user },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error while updating user",
      error: error,
    });
  }
};
export const getUsers = async (req: Request, res: Response) => {
  try {
    const { database } = res.locals.authPayload as AuthPayload;
    const payload = req.body as UserDetails;

    const id = req.params.id;
    if (id) {
      const user = await UserDetails.getModel(database).findOne({
        _id: new ObjectId(id),
      });

      return res.status(200).json({
        success: true,
        message: "user fethed successfully ",
        data: { user },
      });
    }
    const users = await UserDetails.getModel(database).find({}).toArray();
    return res.status(200).json({
      success: true,
      message: "users fethed successfully ",
      data: { users },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error while fetching users",
      error: error,
    });
  }
};
