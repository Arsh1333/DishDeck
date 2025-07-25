import express from "express";
import cors from "cors";
import "dotenv/config";
import cardRouter from "./routes/Card.routes.js";
import wishRouter from "./routes/Wish.routes.js";
import connectDb from "./db/connectDb.js";
import { recommendRouter } from "./routes/Recommend.routes.js";

let app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use("/card", cardRouter);
app.use("/ask", recommendRouter);
app.use("/wish", wishRouter);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`app running on ${port}`);
    });
  })
  .catch((err) => console.log("Error while connecting", err));
