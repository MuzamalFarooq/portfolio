import { MongoClient } from "mongodb";

const uri =
  process.env.MONGODB_URI 

const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export const DB_NAME =
  process.env.MONGODB_DB_NAME || "portfolio";

export const CONTACT_COLLECTION = "contact_messages";
