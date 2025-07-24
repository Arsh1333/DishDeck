import express from "express";
import { recommend } from "../controllers/Recommend.controller.js";
const recommendRouter = express.Router();

recommendRouter.post("/postResponse", recommend);

export { recommendRouter };
