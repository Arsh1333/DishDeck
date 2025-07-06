import mongoose from "mongoose";

const getCard = async (req, res) => {
  try {
    res.send("Card from controllers");
  } catch (error) {
    console.log(error);
  }
};

export { getCard };
