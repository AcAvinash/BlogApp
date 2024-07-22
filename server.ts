import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { DbUtils } from "./database/DbUtils";
import blog from "./routes/blog";
const app: Application = express();

dotenv.config({
  path: "./.env",
});
app.use(express.json());
const port: string | number = process.env.PORT || 3000;
const dbName: string | undefined = process.env.DATABASE_NAME;
const dbUrl: string | undefined = process.env.DATABASE_URL;

app.get("/", (request: Request, response: Response) => {
  response.send(`<h1 style="color:blue"> AAJ TOH COMPLETE HI KARNA HAI</h1>`);
});

app.listen(port, () => {
  console.log(`server is started on ${port}`);
});

if (dbUrl && dbName) {
  DbUtils.connectToDb(dbUrl, dbName)
    .then(() => {
      console.log("connected to database");
    })
    .catch((error: any) => {
      console.error("Database connection failed");
      process.exit(1);
    });
}

app.use("/api/v1", blog);
