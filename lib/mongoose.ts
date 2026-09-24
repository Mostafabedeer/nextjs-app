import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

// we create a cached variable to store the connection and promise, so that we don't create multiple connections in development and also we use server action that doesn't remember the state of the connection, so we need to store it in a global variable
let cached = global.mongoose;

if (!cached) {
  // this is necessary to avoid creating multiple connections in development
  // this syntax means that if global.mongoose is not defined, we define it as an object with conn and promise properties set to null
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "devflow",
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};

export default dbConnect;
