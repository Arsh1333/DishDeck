import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "flowbite-react";

const UserProfile = ({ user }) => {
  const [myReviews, setMyReviews] = useState([]);
  const fetchUserReview = async () => {
    try {
      const res = await axios.get("http://localhost:5000/card/getCard");
      const all = res.data;
      console.log(all);
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
      await axios.delete(`http://localhost:5000/card/deleteCard/${id}`);
      setMyReviews(myReviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-[#F9F9F6]">
      <h1 className="text-3xl font-bold mb-6 text-[#6B8E23] text-center">
        👤 {user?.displayName}'s Reviews
      </h1>

      {myReviews ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myReviews.map((i) => (
            <Card
              key={i._id}
              className="!bg-[#A3BE8C] border border-[#e6e6e6] rounded-xl 
    shadow-[0_4px_12px_#33333360] 
    hover:shadow-[0_8px_24px_#333333cc] 
    transition-shadow duration-300 ease-in-out"
              imgSrc={
                i.image ||
                "https://dummyimage.com/300x200/cccccc/000000&text=No+Image"
              }
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
                <p className="text-[12px] text-[#333] italic">
                  👤 Reviewed by {i.user?.name || "Anonymous"}
                </p>
              </div>

              <Button
                onClick={() => deleteReview(i._id)}
                className="mt-2 text-sm text-red-600 hover:underline"
              >
                Delete
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">No reviews yet.</p>
      )}
    </div>
  );
};

export default UserProfile;
