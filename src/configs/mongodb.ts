import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();

const mongoURL = process.env.MONGO_URL;

export const mongoClient = new MongoClient(mongoURL!);

export const connectToMongoDB = async () => {
  await mongoClient.connect();
  console.log("connected to MongoDB");

  // mongoClient.on('close', async () => await mongoClient.connect());
};
