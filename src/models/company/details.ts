import { mongoClient } from "../../configs/mongodb";
import { MongoDBModel } from "../../utils/mongodb";

export default class CompanyDetails extends MongoDBModel {
  public createdAt: Date;
  public updatedAt: Date;
  constructor(
    public email: string,
    public phone?: string,
    public mobile?: string,
    public industry?: string,
    public description?: string,
    public domain?: string,
    public websiteUrl?: string,
    public currency?: string,
    public timezone?: string,
    public name?: string,
    public address?: {
      address?: string;
      city?: string;
      state?: string;
      country?: string;
      zipcode?: string;
    }
  ) {
    super();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static getModel(dbName: string) {
    return mongoClient.db(dbName).collection<CompanyDetails>("details");
  }
}
