import { mongo, mongoose, Schema } from "mongoose";

const wishSchema = new Schema(
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
    user: {
      uid: String,
      name: String,
    },
  },
  { timestamps: true }
);

export const Wish = mongoose.model("Wish", wishSchema);
