import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, UserL, Welcome } from "../AppContext";
import axios from "axios";
import { Toaster, toast } from "sonner";
import config from "../../config";
import "./AddImage.css";

const AddImage = () => {
  const [repValue, setRepValue] = useState({ image: "" });
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const { name, value } = e.target;
    setRepValue((prevVal) => ({ ...prevVal, [name]: value }));
    setImage(e.target.files[0]);
  };

  const navigateTo = useNavigate();

  const token = localStorage.getItem("token");

  const userLastName = localStorage.getItem("user_lastName");

  const welc = useContext(Welcome);
  const data = useContext(AppContext);
  const usr = useContext(UserL);

  if (token) {
    welc.setWelcome(true);
    data.setIsLoggedin(true);
    usr.setUserLN(userLastName);
  }

  const headers = { Authorization: `Bearer ${token} ` };

  const handleSub = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("image", image);
      console.log(formData);

      const response = await axios.post(`${config.baseUrl}/user`, formData, {
        headers,
      });

      console.log(response);

      if (response.status === 200) {
        setTimeout(() => {
          toast.success("Post sent successfully");
        }, 1000);
        navigateTo("/Me");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ad">
      <form className="adim-cont" onSubmit={handleSub}>
        <div className="food-im">
          <input
            className="ii"
            type="file"
            name="image"
            onChange={handleImage}
            accept="image/*"
            value={repValue.image}
          />
          <label htmlFor="">Add an image size: h= 420px by w=600px </label>
        </div>

        <button className="sb">Submit</button>
      </form>
    </div>
  );
};

export default AddImage;
