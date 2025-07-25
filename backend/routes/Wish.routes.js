import express from "express";
import {
  getWish,
  addWish,
  deleteWish,
} from "../controllers/Wish.controller.js";

const wishRouter = express.Router();

wishRouter.get("/getWish", getWish);
wishRouter.post("/postWish", addWish);
wishRouter.delete("/deleteWish/:id", deleteWish);

export default wishRouter;
