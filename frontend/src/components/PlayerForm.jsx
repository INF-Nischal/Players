import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlayerForm = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    age: "",
    gender: "",
    position: "",
    description: "",
  });

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = () => {
      setFormData((prevData) => ({ ...prevData, image: reader.result }));
    };
  };

  const handleRadioChange = (e) => {
    setFormData((prevData) => ({ ...prevData, gender: e.target.value }));
  };

  const handleAgeChange = (e) => {
    const ageValue = parseInt(e.target.value);
    if (!isNaN(ageValue) && ageValue > 0) {
      setFormData((prevData) => ({ ...prevData, age: ageValue }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/players/register",
        formData
      );

      console.log("Data sent successfully" + response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <span>Profile</span>
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          onChange={handleImageChange}
        />
      </div>
      <div className="flex flex-col">
        <span>Name</span>
        <input
          type="text"
          className="border-2 outline-none"
          onChange={(e) =>
            setFormData((prevData) => ({ ...prevData, name: e.target.value }))
          }
        />
      </div>
      <div className="flex flex-col">
        <span>Age</span>
        <input
          type="text"
          className="border-2 outline-none"
          onChange={handleAgeChange}
        />
      </div>
      <div className="flex flex-col">
        <span>Gender</span>
        <div>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handleRadioChange}
          />
          <span>male</span>
        </div>
        <div>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handleRadioChange}
          />
          <span>female</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span>Position</span>
        <input
          type="text"
          className="border-2 outline-none"
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              position: e.target.value,
            }))
          }
        />
      </div>
      <div className="flex flex-col">
        <span>Description</span>
        <textarea
          className="border-2 outline-none"
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              description: e.target.value,
            }))
          }
        ></textarea>
      </div>

      <button className="border-2 px-4 py-2 rounded-md cursor-pointer disabled:cursor-no-drop" disabled={loading}>Submit</button>
    </form>
  );
};

export default PlayerForm;
