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
    isVeg: {
      type: Boolean,
      default: false,
    },
    isNonVeg: {
      type: Boolean,
      default: false,
    },
    user: {
      uid: String,
      name: String,
    },
    image: String,
    public_id: String,
  },
  { timestamps: true }
);

export const Card = mongoose.model("Card", cardSchema);
