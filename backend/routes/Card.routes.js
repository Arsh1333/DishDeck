import express from "express";
import {
  getCard,
  addCard,
  deleteCard,
} from "../controllers/Card.controller.js";

const cardRouter = express.Router();

cardRouter.get("/getCard", getCard);
cardRouter.post("/postCard", addCard);
cardRouter.delete("/deleteCard/:id", deleteCard);

export default cardRouter;
