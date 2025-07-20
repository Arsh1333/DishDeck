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
              {user?.displayName}'s Reviews
            </h1>

            <p className="text-base text-gray-600 mt-1">
              You’ve posted {myReviews.length} review
              {myReviews.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default UserProfile;
