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
import { auth, provider, signInWithPopup, signOut } from "../firebase.js";
import { Link } from "react-router-dom";

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
  const [isVeg, setIsVeg] = useState(false);
  const [isNonVeg, setIsNonVeg] = useState(false);

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
          isVeg,
          isNonVeg,
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
        public_id: data.public_id,
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

  useEffect(() => {
    console.log("Updated isVeg:", isVeg);
  }, [isVeg]);

  return (
    <div className="min-h-screen bg-gray-50 font-sec px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white p-4 sm:p-6 rounded-xl font-sec shadow-lg mb-8 flex flex-wrap gap-4 justify-center items-center opacity-0 translate-y-5 animate-fadeInUp w-full">
        <input
          type="text"
          placeholder="Search by dish, location, restaurant..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          className="w-full p-3 sm:w-64 !rounded-lg border !border-gray-300 focus:!ring-2 focus:!ring-[#E63946] focus:!border-transparent text-gray-800 placeholder-gray-500"
        />

        <select
          className="p-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent shadow-sm"
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
          className="p-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent shadow-sm"
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
          className="p-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent shadow-sm"
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

        <div className="flex justify-center w-full sm:w-auto">
          <Button
            onClick={async () => {
              if (!user) {
                console.log("user not found");
                login();
              }
              setOpenModal(true);
            }}
            className="w-full justify-center !bg-[#E63946] hover:!bg-[#D43440] focus:!ring-4 focus:!ring-[#E63946]/50 transition-colors duration-200 ease-in-out"
            size="xl"
            pill
          >
            Add Review
          </Button>
        </div>
      </div>

      {user ? (
        <>
          <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <ModalHeader className="!bg-gray-300 rounded-t-xl !text-[#3333]  px-6 py-4 border-b border-gray-200">
              <span className="text-lg text-[#333] font-semibold">
                Add Your Food Review
              </span>
            </ModalHeader>
            <ModalBody className="!bg-gray-100 px-6 py-6 rounded-b-xl">
              <div className="space-y-5">
                {[
                  { label: "Food Item", value: food, set: setFood },
                  { label: "Food Review", value: review, set: setReview },
                  { label: "Rating (1–5)", value: ratings, set: setRatings },
                  {
                    label: "Restaurant",
                    value: restaurant,
                    set: setRestaurant,
                  },
                ].map(({ label, value, set }, idx) => (
                  <div key={idx}>
                    <Label
                      htmlFor={label.replace(/\s/g, "")}
                      value={label}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    />
                    <input
                      value={value}
                      onChange={(e) => set(e.target.value)}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      required
                      className="w-full p-3 !rounded-lg border !border-gray-300 focus:!ring-2 focus:!ring-[#E63946] focus:!border-transparent text-gray-800 placeholder-gray-500"
                    />
                  </div>
                ))}
                <div className="flex gap-4 items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="foodType"
                      checked={isVeg}
                      onChange={() => {
                        setIsVeg((prev) => {
                          console.log("Setting isVeg to true, was:", prev);
                          return true;
                        });
                        setIsNonVeg(false);
                      }}
                    />
                    Veg 🟩
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="foodType"
                      checked={isNonVeg}
                      onChange={() => {
                        setIsNonVeg(true);
                        setIsVeg(false);
                        // console.log(isVeg);
                      }}
                    />
                    Non-Veg 🟥
                  </label>
                </div>
                <div>
                  <Label
                    htmlFor="locationInput"
                    value="Location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  />
                  <LocationInput
                    className="w-full !rounded-lg !border-gray-300 focus:!ring-2 focus:!ring-[#E63946] focus:!border-transparent text-gray-800 placeholder-gray-500"
                    onSelect={handleLocationSelect}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="imageUpload"
                    value="Upload Image (Optional)"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  />
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                  />
                </div>
                <Button
                  onClick={addReview}
                  className="w-full justify-center !bg-[#E63946] hover:!bg-[#D43440] focus:!ring-4 focus:!ring-[#E63946]/50 transition-colors duration-200 ease-in-out"
                  size="xl"
                  pill
                >
                  Submit Review
                </Button>
              </div>
            </ModalBody>
          </Modal>
        </>
      ) : (
        <div className="text-center text-gray-500 mb-6 p-4 rounded-lg bg-gray-100 shadow-sm">
          <p className="text-gray-700 font-medium">
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
                className="!bg-white rounded-xl font-sec border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden"
              >
                <div>
                  <img
                    className="w-full h-48 object-cover rounded-lg transform hover:scale-[1.02] transition-transform duration-300 ease-in-out"
                    src={
                      i.image ||
                      "https://placehold.co/300x200/E5E7EB/4B5563?text=No+Image"
                    }
                    alt={i.food}
                  />
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800 truncate">
                      {i.food}
                    </h3>
                    <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                      </svg>
                      {i.ratings}/5
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                    "{i.review}"
                  </p>

                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {i.location}
                    </span>

                    <span className="italic font-medium text-gray-600">
                      {i.restaurant}
                    </span>

                    <Link
                      to="/map"
                      state={{
                        location: i.location,
                        restaurant: i.restaurant,
                        food: i.food,
                      }}
                      className="block"
                    >
                      <button className="p-1 rounded-full border border-red-700 hover:bg-gray-100 transition-colors duration-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4 text-red-400 hover:text-blue-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                          />
                        </svg>
                      </button>
                      <p className="text-red-500">map</p>
                    </Link>
                  </div>

                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      {new Date(i.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      - {i.user?.name || "Anonymous"}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-sm mt-10">
              No results found for your search.(404)
            </p>
          );
        })()}
      </div>
    </div>
  );
}

export default CardForReview;
