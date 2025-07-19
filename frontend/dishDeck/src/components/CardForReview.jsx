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
import LocationInput from "./LocationInput";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup, signOut } from "../firebase.js";

function CardForReview({ user, onLogin }) {
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
  const [selectedRatings, setSelectedRatings] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const getReview = async () => {
    try {
      const review = await axios.get(
        `https://dishdeck-gtdd.onrender.com/card/getCard`
      );
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
    let imageUrl = "";
    let public_id = "";

    if (imageFile) {
      const uploaded = await uploadImageToCloudinary(imageFile);
      imageUrl = uploaded.imageUrl;
      public_id = uploaded.public_id;
    }
    const ratingValue = Number(ratings);
    if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
      alert("Please enter a valid rating between 1 and 5.");
      return;
    }
    // let token = localStorage.getItem("user", user);
    // console.log(token);
    // if (!token) {
    //   console.log("No token found");
    //   console.log("No token found");
    //   alert("Please sign in to post a review.");
    //   return; // Stop further execution
    // }
    // if (!user) {
    //   console.log("User not found");
    // }
    try {
      const res = await axios.post(
        `https://dishdeck-gtdd.onrender.com/card/postCard`,
        {
          food,
          location,
          review,
          ratings,
          restaurant,
          user: {
            uid: user.uid,
            name: user.displayName,
          },
          image: imageUrl,
          public_id,
        }
      );
      // await getReview();
      if (res.status === 200 || res.status === 201) {
        await getReview();
      } else {
        console.error("Failed to save review.");
      }
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLocationSelect = (place) => {
    const fullPlace = `${place.properties.name}, ${
      place.properties.city || ""
    }, ${place.properties.country || ""}`;
    setLocation(fullPlace);
  };

  const uploadImageToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return {
        imageUrl: data.secure_url,
        public_id: data.public_id, // Save this
      };
      return data.secure_url;
    } catch (err) {
      console.error("Upload failed:", err);
      return "";
    }
  };

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      localStorage.setItem("user", JSON.stringify(firebaseUser));
      onLogin(firebaseUser);
    } catch (error) {
      console.log("Error while logging in", error);
    }
  };
  return (
    <div className="min-h-screen bg-[#F9F9F6] font-display px-6 py-10">
      <h1 className="text-4xl font-bold text-center font-sec text-[#6B8E23] mb-8 tracking-wide">
        DishDeck , Your Food Diary
      </h1>

      <div className="bg-[#3333] p-4 rounded-md font-sec shadow-md mb-8 flex flex-wrap gap-4 justify-center">
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
          value={selectedRatings}
          onChange={(e) => setSelectedRatings(e.target.value)}
        >
          <option value="">All Ratings</option>
          {[...new Set(data.map((item) => item.ratings))].map(
            (ratings, idx) => (
              <option key={idx} value={ratings}>
                {ratings}
              </option>
            )
          )}
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
            onClick={async () => {
              if (!user) {
                console.log("user not found");
                login();
              }
              setOpenModal(true);
            }}
            className="!bg-[#E63946] text-white hover:!bg-[#f87575] px-6 py-2 rounded-md font-medium"
          >
            Add Review
          </Button>
        </div>
      </div>
      {user ? (
        <>
          <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <ModalHeader className="bg-[#6B8E23] rounded-t-md text-white px-6 py-3">
              <span className="text-lg font-semibold">
                Add Your Food Review
              </span>
            </ModalHeader>
            <ModalBody className="bg-[#F5F5DC] px-6 py-6 rounded-b-md">
              <div className="space-y-5">
                {[
                  { label: "Food Item", value: food, set: setFood },
                  { label: "Food Review", value: review, set: setReview },
                  { label: "Rating (1–5)", value: ratings, set: setRatings },
                  // { label: "Location", value: location, set: setLocation },
                  {
                    label: "Restaurant",
                    value: restaurant,
                    set: setRestaurant,
                  },
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
                      className="w-full px-4 py-2 border border-[#6B8E23] rounded-md shadow-sm placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]"
                    />
                  </div>
                ))}
                <label className="block text-sm font-medium text-[#333] mb-1">
                  Location
                </label>
                <LocationInput
                  className="w-full px-4 py-2 !bg-white border border-[#6B8E23] rounded-md shadow-sm"
                  onSelect={handleLocationSelect}
                ></LocationInput>
                <div>
                  <label className="block text-sm font-medium text-[#333] mb-1">
                    Upload Image (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full px-4 py-2 bg-white border border-[#6B8E23] rounded-md shadow-sm"
                  />
                </div>
                <Button
                  onClick={addReview}
                  className="w-full bg-[#FF7F3F] hover:bg-[#e76e2a] text-white font-semibold py-2 rounded-md transition duration-200"
                >
                  Submit Review
                </Button>
              </div>
            </ModalBody>
          </Modal>
        </>
      ) : (
        <div className="text-center text-gray-500 mb-6">
          <p className="text-[#6B8E23]">
            {" "}
            Please log in / sign in to add a review.
          </p>
        </div>
      )}

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
            const matchesRatings = selectedRatings
              ? String(item.ratings) === String(selectedRatings)
              : true;
            // console.log(matchesFood, matchesLocation, matchesRatings);
            return (
              matchesSearch && matchesLocation && matchesFood && matchesRatings
            );
          });
          return filtered.length > 0 ? (
            filtered.map((i) => (
              <Card
                key={i._id}
                className="!bg-[#A3BE8C] border font-display border-[#e6e6e6] rounded-xl 
    shadow-[0_4px_12px_#33333360] 
    hover:shadow-[0_8px_24px_#333333cc] 
    transition-shadow duration-300 ease-in-out opacity-0 translate-y-5 animate-fadeInUp"
                imgSrc={
                  i.image ||
                  "https://dummyimage.com/300x200/cccccc/000000&text=No+Image"
                }
                imgAlt={i.food}
              >
                <div className="p-3 space-y-1">
                  <h5 className="text-base font-semibold font-sec text-[#333] truncate">
                    {i.food}
                  </h5>

                  <p className="text-lg text-[#2c2c20] font-sec ">
                    "{i.review}"
                  </p>

                  <div className="flex font-sec items-center justify-between text-[11px] text-[#555]">
                    <span>📍 {i.location}</span>
                    <span>⭐ {i.ratings}/5</span>
                  </div>

                  <p className="text-right text-[14px] font-sec italic text-[#2d2d25] truncate">
                    {i.restaurant}
                  </p>

                  <p className="text-[10px] font-sec text-[#F5F5DC]">
                    🕒 {new Date(i.createdAt).toLocaleString()}
                  </p>
                  <p className="text-[12px] font-sec text-[#333] italic">
                    👤 Reviewed by {i.user?.name || "Anonymous"}
                  </p>
                </div>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-sm mt-10">
              ❌ No results found for your search.(404)
            </p>
          );
        })()}
      </div>
    </div>
  );
}

export default CardForReview;
