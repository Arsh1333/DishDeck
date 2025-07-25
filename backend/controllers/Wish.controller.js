import mongoose from "mongoose";
import { Wish } from "../models/Wish.models.js";

const getWish = async (req, res) => {
  try {
    const card = await Wish.find().sort({ createdAt: -1 });
    res.status(201).json(card);
  } catch (error) {
    console.log(error);
  }
};

const addWish = async (req, res) => {
  try {
    const { food, location, restaurant, user } = req.body;
    const newCard = await Wish({
      food,
      location,
      restaurant,
      user,
    });
    await newCard.save();
    console.log("New Wish Added");
    // console.log("Posted Wish Response: ", res.data);
    res.status(201).json(newCard);
  } catch (error) {
    console.log("Error while adding a wish card", error);
  }
};

const deleteWish = async (req, res) => {
  // try {
  //   const { id } = req.params;
  //   const deleteCard = await Card.findByIdAndDelete(id);
  //   if (!deleteCard) {
  //     res.status(404).json({ message: "can't find or card cant be deleted" });
  //     console.log("No card found or cant be deleted");
  //   }
  //   res.status(200).json({ message: "Card deleted successfully" }, deleteCard);
  // } catch (error) {
  //   console.log("Error while deleting the card", error);
  // }
  try {
    const card = await Wish.findById(req.params.id);

    if (!card) return res.status(404).json({ message: "Wish not found" });

    await Wish.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Wish deleted successfully" });
  } catch (error) {
    console.error("Delete failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getWish, addWish, deleteWish };
