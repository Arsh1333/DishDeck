import express from "express";
import { getCard } from "../controllers/Card.controller.js";

const cardRouter = express.Router();

cardRouter.get("/", getCard);

export default cardRouter;
