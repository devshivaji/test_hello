import { ObjectId } from "mongodb";

type JsonType = {
  [key: string]: string;
};

export type AuthPayload = {
  _id: ObjectId;
  email: string;
  database: string;
};
