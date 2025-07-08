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
  const [restaurant, seteRestaurant] = useState("");

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

  function onCloseModal() {
    setOpenModal(false);
    setFood("");
    setLocation("");
    setReview("");
    setRatings("");
    seteRestaurant("");
  }

  const addReview = async () => {
    try {
      const newReview = await axios.post(
        "http://localhost:5000/card/postCard",
        {
          food: food,
          location: location,
          review: review,
          ratings: ratings,
          restaurant: restaurant,
        }
      );
      console.log(newReview);
      await getReview();
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C2A4A] to-[#FF7F3F] px-4 py-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-[#F2E9E4] mb-10 text-center drop-shadow-lg">
        🍽️ DishDeck
      </h1>
      <div className="flex justify-center mb-6">
        <Button color="red" onClick={() => setOpenModal(true)}>
          Add Review
        </Button>
      </div>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add review for the food you've had
            </h3>
            <div>
              <div className="mb-2 block">
                <Label>Food Item</Label>
              </div>
              <TextInput
                id="food"
                placeholder="Enter food you ate"
                value={food}
                onChange={(event) => setFood(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Food Review</Label>
              </div>
              <TextInput
                id="password"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Enter Review"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label>Ratings /5 *</Label>
              </div>
              <TextInput
                id="ratings"
                value={ratings}
                placeholder="Ratings out of 5"
                onChange={(e) => setRatings(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label>Location</Label>
              </div>
              <TextInput
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label>Restaurant</Label>
              </div>
              <TextInput
                id="restaurant"
                placeholder="Restaurant you had this food at"
                value={restaurant}
                onChange={(e) => seteRestaurant(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <Button onClick={addReview}>Add your review</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
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
