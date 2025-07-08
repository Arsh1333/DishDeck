import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "flowbite-react";

function CardForReview() {
  const [data, setData] = useState([]);
  const getReview = async () => {
    try {
      const review = await axios.get("http://localhost:5000/card/getCard");
      console.log(review);
      setData(review.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReview();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C2A4A] to-[#FF7F3F] px-4 py-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-[#F2E9E4] mb-10 text-center drop-shadow-lg">
        🍽️ DishDeck
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {data.map((i) => (
          <Card
            key={i._id}
            className="w-full max-w-[320px] sm:max-w-[360px] bg-[#F2E9E4] text-[#2C2A4A] rounded-xl shadow-lg transition-transform hover:scale-[1.03] hover:shadow-2xl"
            imgAlt="Delicious dish"
            imgSrc="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQZwK3V_MwMUDz4c8zoAj25IkH-XbCNp1nXp26Sz15nJDX2kkdlMa1WDkPI4V_23IX6utgAFlaxMYrAXXOuxpFxCo3y6j1f1chlMbBOLoc"
          >
            <div className="p-5 space-y-3">
              <h5 className="text-xl font-semibold">
                <span className="text-[#00C2A8]">{i.ratings}/5</span>
                <span className="text-[#FF7F3F] ml-4">{i.location}</span>
              </h5>

              <p className="text-sm text-white leading-relaxed">{i.review}</p>

              <p className="text-[#A2A2A2] italic text-sm text-right">
                Restaurant: {i.restaurant}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CardForReview;
