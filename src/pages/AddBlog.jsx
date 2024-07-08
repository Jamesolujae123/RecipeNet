import React from "react";
import "./SubmitRecipe.css";
import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "@orrisroot/react-html-parser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import "./AddBlog.css";
import { useContext } from "react";
import { Welcome, AppContext, UserL } from "../AppContext";
import config from "../../config";

const AddBlog = () => {
  const [repValue, setRepValue] = useState({ image: "" });
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  const userLastName = localStorage.getItem("user_lastName");

  const baseUrl = "https://recp-backend.onrender.com";

  const welc = useContext(Welcome);
  const data = useContext(AppContext);
  const usr = useContext(UserL);

  const handleImage = (e) => {
    const { name, value } = e.target;
    setRepValue((prevVal) => ({ ...prevVal, [name]: value }));
    setImage(e.target.files[0]);
  };

  if (token) {
    welc.setWelcome(true);
    data.setIsLoggedin(true);
    usr.setUserLN(userLastName);
  }

  const navigateTo = useNavigate();

  const headers = { Authorization: `Bearer ${token} ` };

  const handleSub = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", `${blogValues.title}`);
      formData.append("description", `${blogValues.description}`);
      formData.append("image", image);
      console.log(formData);
      console.log(blogValues.title);
      console.log(blogValues.description);

      const response = await axios.post(`${config.baseUrl}/posts`, formData, {
        headers,
      });

      console.log(response);

      console.log(data);

      if (response) {
        setTimeout(() => {
          toast.success("Post sent successfully");
        }, 1000);
        navigateTo("/Blog");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setblogValues((prevVal) => ({ ...prevVal, [name]: value }));
    setImage(e.target.files[0]);
  };

  const [blogValues, setblogValues] = useState({
    title: "",
    description: "",
  });
  return (
    <div className="add-cont">
      <Toaster />
      <div className="intro-2">
        <div className="abt">
          <span className="acc-3">Make a blog post</span>
          <p className="tng">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
          </p>
        </div>
      </div>
      <form onSubmit={handleSub} className="fom">
        <div className="title">
          <div className="blog-t">
            <div className="blog-tt">
              <label className="tingss">Title</label>
              <input
                name="title"
                onChange={handleChange}
                className="bb-name"
                type="text"
                value={blogValues.title}
              />
            </div>
          </div>
          <div className="b-dd">
            <label className="tingss" htmlFor="">
              Content
            </label>
            <textarea
              cols="30"
              rows="5"
              onChange={handleChange}
              className="bb-d-name"
              name="description"
              type="text"
              value={blogValues.description}
            ></textarea>
          </div>
        </div>
        <div className="food-imgr">
          <input
            className=""
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

export default AddBlog;
