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
    <div className="min-h-screen px-6 py-10 bg-[#F9F9F6]">
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
              className="!bg-[#A3BE8C] border border-[#e6e6e6] rounded-xl 
                shadow-[0_4px_12px_#33333340] hover:shadow-[0_8px_24px_#33333370] 
                transition-shadow duration-300 ease-in-out overflow-hidden"
              imgSrc={
                i.image ||
                "https://dummyimage.com/300x200/cccccc/000000&text=No+Image"
              }
              imgAlt={i.food}
            >
              <div className="p-3 space-y-2">
                <h5 className="text-lg font-semibold text-[#2e2e2e] truncate">
                  {i.food}
                </h5>

                <p className="text-sm text-[#F5F5DC] italic line-clamp-2">
                  "{i.review}"
                </p>

                <div className="flex justify-between text-xs text-[#222]">
                  <span>📍 {i.location}</span>
                  <span>⭐ {i.ratings}/5</span>
                </div>

                <p className="text-xs text-right italic text-[#F5F5DC]">
                  🍽️ {i.restaurant}
                </p>

                <p className="text-[11px] text-[#fdfdfd]">
                  🕒 {new Date(i.createdAt).toLocaleString()}
                </p>

                <div className="text-[12px] text-[#333] italic">
                  👤 Reviewed by {i.user?.name || "Anonymous"}
                </div>
              </div>

              <Button
                onClick={() => deleteReview(i._id)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition-all"
              >
                🗑️ Delete
              </Button>
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
