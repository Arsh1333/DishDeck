import { mongo, mongoose, Schema } from "mongoose";

const cardSchema = new Schema(
  {
    food: {
      type: String,
      reuired: true,
    },
    restaurant: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Card = mongoose.model("Card", cardSchema);
