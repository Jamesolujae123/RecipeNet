import React from "react";
import "./Profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Welcome, AppContext, UserL } from "../AppContext";
import config from "../../config";
import { Link } from "react-router-dom";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [imgAvailable, setImgAvailable] = useState(false);
  const token = localStorage.getItem("token");
  const userLastName = localStorage.getItem("user_lastName");

  const headers = { Authorization: `Bearer ${token}` };

  const getUserData = async () => {
    const userData = await axios.get(`${config.baseUrl}/user`, {
      headers,
    });

    if (userData.status === 200) {
      console.log(userData);
      setUserInfo(userData.data);
    } else {
      // console.log("An error occured");
      // localStorage.setItem("user_id", "");
    }

    console.log(userData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const usr = useContext(UserL);
  const welc = useContext(Welcome);
  const data = useContext(AppContext);

  if (token) {
    welc.setWelcome(true);
    data.setIsLoggedin(true);
    usr.setUserLN(userLastName);
  }

  return (
    <div className="profile-container">
      <div className="prof-top">
        <span className="profff">My profile details</span>
      </div>

      <div className="prof-cont">
        <div className="profile-details">
          <div>
            <img
              src={`${config.baseUrl}${userInfo?.image_url}`}
              alt=""
              className="user-prof"
            />
            <Link className="addi" to={"/Addimg"}>
              Add an image
            </Link>
          </div>

          <span>
            <span>{userInfo?.first_name}</span>
            <span> {userInfo?.last_name}</span>
          </span>
          <span>Email: {userInfo?.email}</span>
          {/* <span>Phone Number:</span> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
