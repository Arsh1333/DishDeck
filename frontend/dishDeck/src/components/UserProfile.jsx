import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "flowbite-react";
import LocationInput from "./LocationInput";

const UserProfile = ({ user }) => {
  const [myReviews, setMyReviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [location, setLocation] = useState("");
  const [food, setFood] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [wishList, setWishList] = useState([]);

  const fetchUserReview = async () => {
    try {
      const res = await axios.get(
        `https://dishdeck-gtdd.onrender.com/card/getCard`
      );
      const all = res.data;
      // console.log(all);
      const filteredReview = all.filter(
        (review) => review.user?.uid === user?.uid
      );
      // console.log(filteredReview);
      setMyReviews(filteredReview);
    } catch (error) {
      console.log("Error in Showing your reviews", error);
    }
  };
  useEffect(() => {
    if (user) {
      fetchUserReview();
      getWish();
    }
  }, [user]);

  const deleteReview = async (id) => {
    try {
      await axios.delete(
        `https://dishdeck-gtdd.onrender.com/card/deleteCard/${id}`
      );
      setMyReviews(myReviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  const deleteWish = async (id) => {
    try {
      console.log("delete wish");
      await axios.delete(
        `https://dishdeck-gtdd.onrender.com/wish/deleteWish/${id}`
      );
      setWishList(wishList.filter((wish) => wish._id !== id));
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  const addWishlist = () => {
    // console.log(res.data);
    setOpenModal(true);
  };
  const getWish = async () => {
    try {
      const res = await axios.get(
        "https://dishdeck-gtdd.onrender.com/wish/getWish"
      );
      let wish = res.data;
      // console.log(wish);
      const filteredWish = wish.filter((i) => i.user?.uid === user?.uid);
      // console.log(filteredReview);
      setWishList(filteredWish);
    } catch (error) {
      console.log(error);
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };
  const handleLocationSelect = (place) => {
    const fullPlace = `${place.properties.name}, ${
      place.properties.city || ""
    }, ${place.properties.country || ""}`;
    setLocation(fullPlace);
  };
  const handleSubmitWish = async () => {
    try {
      console.log("Clicked");
      const res = await axios.post(
        "https://dishdeck-gtdd.onrender.com/wish/postWish",
        {
          food,
          location,
          restaurant,
          user: {
            uid: user.uid,
            name: user.displayName,
          },
        }
      );
      if (res.status === 200 || res.status === 201) {
        // console.log(res);
        setFood("");
        setRestaurant("");
        setLocation("");
        setOpenModal(false);
        getWish();
      } else {
        console.error("Failed to save review.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen font-sans px-4 py-8 sm:px-6 lg:px-8 bg-gray-50">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL || "https://www.gravatar.com/avatar?d=mp"}
            alt="User Profile"
            className="w-20 h-20 rounded-full shadow-md border-4 border-white ring-2 ring-gray-200 object-cover"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">
              {user?.displayName}'s Reviews{" "}
            </h1>
            <p className="text-base text-gray-600 mt-1">
              You’ve posted {myReviews.length} review
              {myReviews.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
      {user ? (
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
          <ModalHeader className="!bg-gray-300 rounded-t-xl !text-[#3333]  px-6 py-4 border-b border-gray-200">
            <span className="text-lg text-[#333] font-semibold">
              Add to Wishlist
            </span>
          </ModalHeader>
          <ModalBody className="!bg-gray-100 px-6 py-6 rounded-b-xl">
            <div className="space-y-5">
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
                <Label
                  htmlFor="foodInput"
                  value="Food"
                  className="block text-sm font-medium text-gray-700 mb-1"
                />
                <input
                  placeholder="Enter Food"
                  value={food}
                  onChange={(e) => setFood(e.target.value)}
                  className="w-full !rounded-lg border p-2 mt-2 !border-gray-300 focus:!ring-2 focus:!ring-[#E63946] focus:!border-transparent text-gray-800 placeholder-gray-500"
                />
                <Label
                  htmlFor="restaurantInput"
                  value="Restaurant"
                  className="block text-sm font-medium text-gray-700 mb-1"
                />
                <input
                  placeholder="Enter Restaurant"
                  value={restaurant}
                  onChange={(e) => setRestaurant(e.target.value)}
                  className="w-full !rounded-lg border p-2 mt-2 !border-gray-300 focus:!ring-2 focus:!ring-[#E63946] focus:!border-transparent text-gray-800 placeholder-gray-500"
                />
              </div>
              <Button
                onClick={handleSubmitWish}
                className="w-full justify-center !bg-[#E63946] hover:!bg-[#D43440] focus:!ring-4 focus:!ring-[#E63946]/50 transition-colors duration-200 ease-in-out"
                size="xl"
                pill
              >
                Submit Wish
              </Button>
            </div>
          </ModalBody>
        </Modal>
      ) : (
        <div className="text-center text-gray-500 mb-6 p-4 rounded-lg bg-gray-100 shadow-sm">
          <p className="text-gray-700 font-medium">
            Please log in / sign in to add a review.
          </p>
        </div>
      )}
      {myReviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myReviews.map((i) => (
            <Card
              key={i._id}
              className="!bg-white rounded-xl border font-sec border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden"
            >
              <img
                src={
                  i.image ||
                  "https://placehold.co/600x400/E5E7EB/4B5563?text=No+Image"
                }
                alt={i.food}
                className="w-full h-48 object-cover rounded-t-xl"
              />

              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h5 className="text-xl font-bold text-gray-800">{i.food}</h5>
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

                <p className="text-sm text-gray-700 italic leading-relaxed line-clamp-3">
                  "{i.review}"
                </p>

                <div className="flex flex-wrap gap-2 text-xs text-gray-600 mt-2">
                  <span className="bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
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
                  <span className="bg-gray-100 px-2 py-1 rounded-full font-medium">
                    {i.restaurant}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100 mt-3">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {i.user?.name || "Anonymous"}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {new Date(i.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="pt-3">
                  <Button
                    onClick={() => deleteReview(i._id)}
                    className="w-full justify-center !bg-[#E63946] hover:!bg-[#D43440] focus:!ring-4 focus:!ring-[#E63946]/50 transition-colors duration-200 ease-in-out"
                    size="md"
                    pill
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Delete Review
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center mt-16 p-6 bg-gray-100 rounded-xl shadow-sm">
          <p className="text-lg text-gray-700 font-medium">
            😕 No reviews found.
          </p>
          <p className="text-base text-gray-500 mt-2">
            Start sharing your food experiences now!
          </p>
        </div>
      )}
      <br />
      <hr />
      <br />
      <div className="flex mt-2">
        <h1 className="font-sec text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">
          Your Wishlist
        </h1>
        <button
          onClick={addWishlist}
          className="bg-[#E63946] text-white p-2 ml-4 mb-1  rounded-4xl font-sec"
        >
          Add to wishlist
        </button>
      </div>

      {wishList.map((i) => (
        <div
          key={i._id}
          className="my-4 bg-white p-6 rounded-2xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.01]"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {i.location || "Unknown Location"}
          </h2>

          <div className="text-left space-y-1">
            <p className="text-base text-gray-700">
              <span className="font-medium">Food:</span> {i.food}
            </p>
            <p className="text-base text-gray-700">
              <span className="font-medium">Restaurant:</span> {i.restaurant}
            </p>
            <button onClick={() => deleteWish(i._id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
