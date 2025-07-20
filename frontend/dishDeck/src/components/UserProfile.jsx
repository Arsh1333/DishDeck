import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "flowbite-react";

const UserProfile = ({ user }) => {
  const [myReviews, setMyReviews] = useState([]);
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
      console.log(filteredReview);
      setMyReviews(filteredReview);
    } catch (error) {
      console.log("Error in Showing your reviews", error);
    }
  };
  useEffect(() => {
    if (user) {
      fetchUserReview();
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

  return (
    <div className="min-h-screen font-sec px-6 py-10 bg-[#F9F9F6]">
      {/* User Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL || "https://www.gravatar.com/avatar?d=mp"}
            alt="User"
            className="w-16 h-16 rounded-full shadow-md border border-[#ccc]"
          />
          <div>
            <h1 className="text-2xl font-bold text-[#6B8E23]">
              {user?.displayName}'s Reviews
            </h1>
            <p className="text-sm text-gray-600">
              You’ve posted {myReviews.length} review
              {myReviews.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      {myReviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myReviews.map((i) => (
            <Card
              key={i._id}
              className="!bg-[#ddf0bb] border border-[#e0e0e0] rounded-xl 
    shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out 
    overflow-hidden"
            >
              <img
                src={
                  i.image ||
                  "https://dummyimage.com/600x400/cccccc/000000&text=No+Image"
                }
                alt={i.food}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 space-y-2">
                {/* Food & Rating */}
                <div className="flex justify-between items-start">
                  <h5 className="text-xl font-semibold text-[#2d2d2d]">
                    {i.food}
                  </h5>
                  <div className="text-sm text-yellow-600 font-bold bg-yellow-100 px-2 py-1 rounded">
                    ⭐ {i.ratings}/5
                  </div>
                </div>

                {/* Review Quote */}
                <p className="text-sm text-gray-600 italic line-clamp-3">
                  "{i.review}"
                </p>

                {/* Location and Restaurant */}
                <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    📍 {i.location}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    {i.restaurant}
                  </span>
                </div>

                {/* Reviewer and Time */}
                <div className="flex justify-between items-center text-xs text-gray-500 pt-2">
                  <span>👤 {i.user?.name || "Anonymous"}</span>
                  <span>🕒 {new Date(i.createdAt).toLocaleString()}</span>
                </div>

                {/* Delete Button */}
                <div className="pt-3">
                  <Button
                    onClick={() => deleteReview(i._id)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition-all"
                  >
                    🗑️ Delete Review
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center mt-16">
          <p className="text-lg text-gray-500">😕 No reviews found.</p>
          <p className="text-sm text-gray-400 mt-1">
            Start sharing your food experiences now!
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
