import { mongoClient } from "../../configs/mongodb";
import { MongoDBModel } from "../../utils/mongodb";

export default class Users extends MongoDBModel {
  public createdAt: Date;
  public updatedAt: Date;
  constructor(
    public email: string,
    public password: string,
    public database: string
  ) {
    super();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static getModel() {
    return mongoClient.db("MAIN_DATABASE").collection<Users>("users");
  }
}
