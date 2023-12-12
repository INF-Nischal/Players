import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlayerForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      await axios.post(
        "http://localhost:5000/players/register",
        formData
      );

      navigate("/players");
      toast.success("Data sent successfully");
    } catch (error) {
      if (error.response && error.response.status === 413) {
        toast.error("Payload too large. Please upload a smaller image.");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 flex flex-col items-center">
      <div className="flex flex-col mb-5 w-[450px]">
        <span className="mb-2">Profile</span>
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          onChange={handleImageChange}
        />
      </div>
      <div className="flex flex-col mb-5 w-[450px]">
        <span className="mb-2">Name</span>
        <input
          type="text"
          className="px-4 py-2 outline-none border-2"
          placeholder="E.g. John Doe"
          onChange={(e) =>
            setFormData((prevData) => ({ ...prevData, name: e.target.value }))
          }
        />
      </div>
      <div className="flex flex-col mb-5 w-[450px]">
        <span className="mb-2">Age</span>
        <input
          type="text"
          className="px-4 py-2 outline-none border-2"
          placeholder="E.g. 20"
          onChange={handleAgeChange}
        />
      </div>
      <div className="flex flex-col mb-5 w-[450px]">
        <span className="mb-2">Gender</span>
        <div className="flex justify-between w-1/3">
          <div className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="male"
              id="male"
              onChange={handleRadioChange}
            />
            <label htmlFor="male" className="ml-2">Male</label>
          </div>
          <div className="flex items-center ml-5">
            <input
              type="radio"
              name="gender"
              value="female"
              id="female"
              onChange={handleRadioChange}
            />
            <label htmlFor="female" className="ml-2">Female</label>
          </div>
        </div>
      </div>
      <div className="flex flex-col mb-5 w-[450px]">
        <span className="mb-2">Position</span>
        <input
          type="text"
          className="px-4 py-2 outline-none border-2"
          placeholder="E.g. Forward"
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              position: e.target.value,
            }))
          }
        />
      </div>
      <div className="flex flex-col mb-5 w-[450px]">
        <span className="mb-2">Description</span>
        <textarea
          className="px-4 py-2 outline-none border-2 h-[120px] text-justify"
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              description: e.target.value,
            }))
          }
        ></textarea>
      </div>

      <div className="w-[450px] flex justify-center items-center">
        <button
          className="w-[180px] bg-gray-300 px-4 py-2 rounded-md cursor-pointer font-bold disabled:cursor-no-drop"
          disabled={loading}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PlayerForm;
