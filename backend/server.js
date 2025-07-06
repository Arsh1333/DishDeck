import express from "express";
import "dotenv/config";
import cardRouter from "./routes/Card.routes.js";
import connectDb from "./db/connectDb.js";

let app = express();

const port = process.env.PORT;

app.use("/card", cardRouter);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`app running on ${port}`);
    });
  })
  .catch((err) => console.log("Error while connecting", err));
