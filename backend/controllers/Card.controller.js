import mongoose from "mongoose";
import { Card } from "../models/Card.models.js";

const getCard = async (req, res) => {
  try {
    // res.send("Card from controllers");
    const card = await Card.find().sort({ createdAt: -1 });
    res.status(201).json(card);
  } catch (error) {
    console.log(error);
  }
};

const addCard = async (req, res) => {
  try {
    const { food, ratings, review, location, restaurant, user } = req.body;
    const newCard = await Card({
      food,
      ratings,
      review,
      location,
      restaurant,
      user,
    });
    newCard.save();
    console.log("New Card Added");
    res.status(201).json(newCard);
  } catch (error) {
    console.log("Error while adding a card", error);
  }
};

const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCard = await Card.findByIdAndDelete(id);
    if (!deleteCard) {
      res.status(404).json({ message: "can't find or card cant be deleted" });
      console.log("No card found or cant be deleted");
    }
    res.status(200).json({ message: "Card deleted successfully" }, deleteCard);
  } catch (error) {
    console.log("Error while deleting the card", error);
  }
};
export { getCard, addCard, deleteCard };
