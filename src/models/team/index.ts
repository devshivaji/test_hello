import { ObjectId } from "mongodb";
import { mongoClient } from "../../configs/mongodb";
import { MongoDBModel } from "../../utils/mongodb";

export default class TeamDetails extends MongoDBModel {
  constructor(
    public name: string,
    public description?: string,
    public status?: Boolean,
    public members?: [{ name: String; _id: string }]
  ) {
    super();
  }

  static getModel(dbName: string) {
    return mongoClient.db(dbName).collection<TeamDetails>("team");
  }
}
