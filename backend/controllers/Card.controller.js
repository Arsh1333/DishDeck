import mongoose from "mongoose";
import { Card } from "../models/Card.models.js";
import cloudinary from "../utils/cloudinary.js";

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
    const {
      food,
      ratings,
      review,
      location,
      restaurant,
      user,
      image,
      public_id,
    } = req.body;
    const newCard = await Card({
      food,
      ratings,
      review,
      location,
      restaurant,
      user,
      image,
      public_id,
    });
    await newCard.save();
    console.log("New Card Added");
    console.log("Posted Review Response: ", res.data);
    res.status(201).json(newCard);
  } catch (error) {
    console.log("Error while adding a card", error);
  }
};

const deleteCard = async (req, res) => {
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
    const card = await Card.findById(req.params.id);

    if (!card) return res.status(404).json({ message: "Review not found" });

    // 1. Delete from Cloudinary if image exists
    if (card.public_id) {
      await cloudinary.uploader.destroy(card.public_id);
    }

    // 2. Delete from MongoDB
    await Card.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Review and image deleted successfully" });
  } catch (error) {
    console.error("Delete failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getCard, addCard, deleteCard };
