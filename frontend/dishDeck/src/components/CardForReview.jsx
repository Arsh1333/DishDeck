import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "flowbite-react";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";

function CardForReview() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [food, setFood] = useState("");
  const [review, setReview] = useState("");
  const [location, setLocation] = useState("");
  const [ratings, setRatings] = useState("");
  const [restaurant, seteRestaurant] = useState("");

  const getReview = async () => {
    try {
      const review = await axios.get("http://localhost:5000/card/getCard");
      setData(review.data);
      console.log(review.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  const onCloseModal = () => {
    setOpenModal(false);
    setFood("");
    setLocation("");
    setReview("");
    setRatings("");
    seteRestaurant("");
  };

  const addReview = async () => {
    try {
      await axios.post("http://localhost:5000/card/postCard", {
        food,
        location,
        review,
        ratings,
        restaurant,
      });
      await getReview();
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] px-6 py-10">
      <h1 className="text-4xl font-semibold text-center text-[#333] mb-10">
        🍽️ DishDeck – Share Your Taste
      </h1>

      {/* Add Review Button */}
      <div className="flex justify-center mb-6">
        <Button
          onClick={() => setOpenModal(true)}
          className="bg-[#0F4C81] text-white hover:bg-[#133d6b] px-6 py-2 rounded-md font-medium"
        >
          + Add Review
        </Button>
      </div>

      {/* Modal */}
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <div className="space-y-5">
            <h3 className="text-xl font-semibold text-[#4499e2]">
              Add a Review
            </h3>

            {[
              { label: "Food Item", value: food, set: setFood },
              { label: "Food Review", value: review, set: setReview },
              { label: "Rating (1–5)", value: ratings, set: setRatings },
              { label: "Location", value: location, set: setLocation },
              { label: "Restaurant", value: restaurant, set: seteRestaurant },
            ].map(({ label, value, set }, idx) => (
              <div key={idx}>
                <Label>{label}</Label>
                <TextInput
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  required
                />
              </div>
            ))}

            <Button
              onClick={addReview}
              className="w-full bg-[#FF7F3F] hover:bg-[#e46d2d] text-white font-semibold"
            >
              Submit Review
            </Button>
          </div>
        </ModalBody>
      </Modal>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        {data.map((i) => (
          <Card
            key={i._id}
            className="!bg-[#d0dcf2] rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-200"
            imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr11cR0tRSZyr17lRra7qPGMiRzqUlglQr2A&s"
            imgAlt={i.food}
          >
            <div className="p-4 space-y-2">
              <h5 className="text-xl font-bold text-[#1a5990]">{i.food}</h5>

              <p className="text-black text-sm">"{i.review}"</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>📍 {i.location}</span>
                <span>⭐ {i.ratings}/5</span>
              </div>

              <p className="text-right text-xs italic text-gray-400 mt-2">
                {i.restaurant}
              </p>
              <p className="text-gray-600">
                {new Date(i.createdAt).toLocaleString()}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CardForReview;
