import { mongoClient } from "../configs/mongodb";
import { MongoDBModel } from "../utils/mongodb";

export default class Product extends MongoDBModel {
    constructor(
        public product_id: string,
        public name: string,
        public price?: string,
        public gst?: string,
        public category?: string,
        public plan_duration_in_days?: string,
        public plan_duration_by_dates?: string,
        public desc?: string,
        public status?: boolean
    ) {
        super();
    }
}

export const productModel = (dbName: string) => mongoClient.db(dbName).collection<Product>('productDetails')