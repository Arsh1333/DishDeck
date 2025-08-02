import { mongo, mongoose, Schema } from "mongoose";

const cardSchema = new Schema(
  {
    food: {
      type: String,
      required: true,
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
    },
    isNonVeg: {
      type: Boolean,
    },
    tags: {
      type: [String],
      default: [],
    },
    user: {
      uid: String,
      name: String,
    },
    isAnonymous: {
      type: Boolean,
    },
    image: String,
    public_id: String,
  },
  { timestamps: true }
);

export const Card = mongoose.model("Card", cardSchema);
