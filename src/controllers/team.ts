import { AuthPayload } from "../types/general";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import TeamDetails from "../models/team";

export const createTeam = async (req: Request, res: Response) => {
  try {
    const { database } = res.locals.authPayload as AuthPayload;
    const payload = req.body as TeamDetails;
    const isExisting = await TeamDetails.getModel(database).findOne({
      name: payload.name,
    });

    if (!isExisting) {
      const team = await TeamDetails.getModel(database).insertOne(payload, {});
      return res.status(200).json({
        success: true,
        message: "team created successfully",
        data: { team },
      });
    } else {
      return res.status(409).json({
        success: true,
        message: "Team already exist with provided name",
        data: {},
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error while creating team",
      error: error,
    });
  }
};

export const updateTeam = async (req: Request, res: Response) => {
  try {
    const { database } = res.locals.authPayload as AuthPayload;
    const payload = req.body as TeamDetails;
    const id = req.params.id;

    const team = await TeamDetails.getModel(database).updateOne(
      { _id: new ObjectId(id) },
      { $set: payload }
    );

    return res.status(200).json({
      success: true,
      message: "team updated successfully",
      data: { team },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error while updating team",
      error: error,
    });
  }
};

export const getTeam = async (req: Request, res: Response) => {
  try {
    const { database } = res.locals.authPayload as AuthPayload;
    const id = req.params.id;
    if (id) {
      const team = await TeamDetails.getModel(database).findOne({
        _id: new ObjectId(id),
      });
      return res.status(200).json({
        success: true,
        message: "Team fethed successfully ",
        data: { team },
      });
    }
    const team = await TeamDetails.getModel(database).find({}).toArray();

    return res.status(200).json({
      success: true,
      message: "team fethed successfully ",
      data: { team },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error while fetching teams",
      error: error,
    });
  }
};
