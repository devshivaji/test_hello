import { AuthPayload } from "../types/general";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Role from "../models/role";

export const createRole = async (req: Request, res: Response) => {
  try {
    const { database } = res.locals.authPayload as AuthPayload;
    const payload = req.body as Role;
    const isExisting = await Role.getModel(database).findOne({
      roleName: payload.roleName,
    });
    if (!isExisting) {
      const role = await Role.getModel(database).insertOne(payload, {});
      return res.status(200).json({
        success: true,
        message: "role created successfully",
        data: { role },
      });
    } else {
      return res.status(409).json({
        success: true,
        message: "role already exist with provided name",
        data: {},
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error while creating role",
      error: error,
    });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { database } = res.locals.authPayload as AuthPayload;
    const payload = req.body as Role;
    const id = req.params.id;
    const role = await Role.getModel(database).updateOne(
      { _id: new ObjectId(id) },
      { $set: payload }
    );
    return res.status(200).json({
      success: true,
      message: "role updated successfully",
      data: { role },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error while updating role",
      error: error,
    });
  }
};

export const getRole = async (req: Request, res: Response) => {
  try {
    const { database } = res.locals.authPayload as AuthPayload;
    const id = req.params.id;
    if (id) {
      const role = await Role.getModel(database).findOne({
        _id: new ObjectId(id),
      });
      return res.status(200).json({
        success: true,
        message: "role fethed successfully ",
        data: { role },
      });
    } else {
      const role = await Role.getModel(database).find({}).toArray();
      return res.status(200).json({
        success: true,
        message: "role fethed successfully ",
        data: { role },
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error while fetching roles",
      error: error,
    });
  }
};
