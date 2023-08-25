import { mongoClient } from "../../configs/mongodb";
import { MongoDBModel } from "../../utils/mongodb";

export default class UserDetails extends MongoDBModel {
  constructor(
    public salutation?: string,
    public status?: Boolean,
    public fullName?: string,
    public mobile?: string,
    public email?: string,
    public role?: string,
    public profile?: string,
    public reportingManager?: string,
    public address?: string,
    public city?: string,
    public state?: string,
    public country?: string,
    public zipCode?: string,
    public college?: string,
    public department?: string,
    public dateOfBirth?: string,
    public dateOfJoining?: string,
    public team?: string
  ) {
    super();
  }

  static getModel(dbName: string) {
    return mongoClient.db(dbName).collection<UserDetails>("user");
  }
}
