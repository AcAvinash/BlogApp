import mongoose from "mongoose";

export class DbUtils {
  public static async connectToDb(
    dbUrl: string,
    dbName: string
  ): Promise<string> {
    try {
      await mongoose.connect(dbUrl, { dbName });
      return `Connected to database ${dbName}`;
    } catch (error) {
      return `Error connecting to database: ${error}`;
    }
  }
}
