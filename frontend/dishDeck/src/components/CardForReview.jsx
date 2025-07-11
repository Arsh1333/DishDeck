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
  const [restaurant, setRestaurant] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedFood, setSelectedFood] = useState("");

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
    setRestaurant("");
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
    <div className="min-h-screen bg-[#F9F9F6] px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-[#6B8E23] mb-8 tracking-wide">
        🥑 DishDeck — Your Food Diary
      </h1>

      <div className="bg-[#3333] p-4 rounded-md shadow-md mb-8 flex flex-wrap gap-4 justify-center">
        <input
          type="text"
          placeholder="Search by dish, location, restaurant..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          className="w-full sm:w-64 px-4 py-2 bg-[#F5F5DC] text-[#333] placeholder-[#666] border border-[#6B8E23] focus:outline-none focus:ring-2 focus:ring-[#6B8E23] rounded-md shadow-sm"
        />

        <select
          className="p-2 rounded border bg-[#F5F5DC] border-[#6B8E23]"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {[...new Set(data.map((item) => item.location))].map((loc, idx) => (
            <option key={idx} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          className="p-2 rounded border bg-[#F5F5DC] border-[#6B8E23]"
          value={selectedFood}
          onChange={(e) => setSelectedFood(e.target.value)}
        >
          <option value="">All Foods</option>
          {[...new Set(data.map((item) => item.food))].map((food, idx) => (
            <option key={idx} value={food}>
              {food}
            </option>
          ))}
        </select>
        <div className="flex justify-center ml-2">
          <Button
            onClick={() => setOpenModal(true)}
            className="!bg-[#E63946] text-white hover:!bg-[#f87575] px-6 py-2 rounded-md font-medium"
          >
            Add Review
          </Button>
        </div>
      </div>

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader className="bg-[#6B8E23] rounded-t-md text-white px-6 py-3">
          <h2 className="text-lg font-semibold">🍽️ Add Your Food Review</h2>
        </ModalHeader>
        <ModalBody className="bg-[#F5F5DC] px-6 py-6 rounded-b-md">
          <div className="space-y-5">
            {[
              { label: "Food Item", value: food, set: setFood },
              { label: "Food Review", value: review, set: setReview },
              { label: "Rating (1–5)", value: ratings, set: setRatings },
              { label: "Location", value: location, set: setLocation },
              { label: "Restaurant", value: restaurant, set: setRestaurant },
            ].map(({ label, value, set }, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-[#333] mb-1">
                  {label}
                </label>
                <input
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  required
                  className="w-full px-4 py-2 bg-white border border-[#6B8E23] rounded-md shadow-sm placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]"
                />
              </div>
            ))}

            <Button
              onClick={addReview}
              className="w-full bg-[#FF7F3F] hover:bg-[#e76e2a] text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Submit Review
            </Button>
          </div>
        </ModalBody>
      </Modal>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {(() => {
          const filtered = data.filter((item) => {
            const matchesSearch =
              item.food.toLowerCase().includes(searchQuery) ||
              item.location.toLowerCase().includes(searchQuery) ||
              item.restaurant.toLowerCase().includes(searchQuery);

            const matchesLocation = selectedLocation
              ? item.location === selectedLocation
              : true;

            const matchesFood = selectedFood
              ? item.food === selectedFood
              : true;

            return matchesSearch && matchesLocation && matchesFood;
          });

          return filtered.length > 0 ? (
            filtered.map((i) => (
              <Card
                key={i._id}
                className="!bg-[#A3BE8C] border border-[#e6e6e6] rounded-xl 
        shadow-[0_4px_12px_#33333360] 
        hover:shadow-[0_8px_24px_#333333cc] 
        transition-shadow duration-300 ease-in-out"
                imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr11cR0tRSZyr17lRra7qPGMiRzqUlglQr2A&s"
                imgAlt={i.food}
              >
                <div className="p-3 space-y-1">
                  <h5 className="text-base font-semibold text-[#333] truncate">
                    {i.food}
                  </h5>

                  <p className="text-lg text-[#F5F5DC] italic line-clamp-2">
                    "{i.review}"
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-[#555]">
                    <span>📍 {i.location}</span>
                    <span>⭐ {i.ratings}/5</span>
                  </div>

                  <p className="text-right text-[14px] italic text-[#F5F5DC] truncate">
                    {i.restaurant}
                  </p>

                  <p className="text-[10px] text-[#F5F5DC]">
                    🕒 {new Date(i.createdAt).toLocaleString()}
                  </p>
                </div>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-sm mt-10">
              ❌ No results found for your search.
            </p>
          );
        })()}

        {/* {data.map((i) => (
          
        ))} */}
      </div>
    </div>
  );
}

export default CardForReview;
