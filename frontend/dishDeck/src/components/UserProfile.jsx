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
              imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr11cR0tRSZyr17lRra7qPGMiRzqUlglQr2A&s"
            >
              <div className="p-4 space-y-2">
                <h5 className="text-xl font-bold text-[#333]">{i.food}</h5>
                <p className="text-sm italic text-[#F5F5DC]">"{i.review}"</p>
                <div className="flex justify-between text-sm text-[#555]">
                  <span>📍 {i.location}</span>
                  <span>⭐ {i.ratings}/5</span>
                </div>
                <p className="text-right text-xs italic text-[#F5F5DC]">
                  {i.restaurant}
                </p>
                <p className="text-xs text-[#F5F5DC]">
                  🕒 {new Date(i.createdAt).toLocaleString()}
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
