import React, { useContext } from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import herobg from "../Assets/images/herobg.png";
import Herogirl from "../Assets/images/Herogirl.png";
import Footer from "./Footer";
import { AuthContext } from "../Context/Context.js";

const Hero = () => {
  const { authuser } = useContext(AuthContext);
  //console.log(authuser);
  return (
    <>
      <div className="md:pt-32 pt-16 bg-green-300 ">
        <div className=" h-full  mx-auto ">
          <div
            style={{ backgroundImage: `url(${herobg})` }}
            className=" 
       pb-0  bg-gray-500
      w-full  bg-center md:bg-cover bg-contain md:flex-row flex lg:justify-normal 
         flex-col     md:gap-0 p-3  justify-between"
          >
            <div className="order-2 md:order-1 h-full">
              <img
                src={Herogirl}
                className="  md:w-full md:h-full   "
                alt="heroimg"
              />
            </div>
            <div
              className="  order-1 md:order-2 flex flex-col  md:h-auto  
              gap-8 justify-center  h-screen  pb-16"
            >
              <h1 className="text-center text-white md:text-6xl text-4xl font-extrabold">
                சேலம் ஜுவல்லரி
              </h1>
              <h4 className="text-center text-white md:text-3xl text-xl">
                நம்பிக்கையின் அடையாளம்
              </h4>
              <hr className="w-full border-1 border-yellow-500" />
              <h4 className="text-center text-white text-xl sm:text-xl  font-bold">
                CLICK HERE TO ENTER FOR MONTHLY PAY
              </h4>
              {Boolean(authuser.user) ? <Forms /> : <Loginsignup />}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Hero;

const Forms = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between  w-full  p-3  rounded-sm gap-5 ">
      <Link
        to="/Home/Goldform"
        className="bggoldbtn px-8 p-2 font-semibold text-black rounded-md text-center md:px-10"
      >
        GOLD COIN
      </Link>
      <Link
        to="/Home/Silverform"
        className="bgsilverbtn px-8 p-2 font-semibold text-black rounded-md text-center md:px-10"
      >
        SILVER
      </Link>
      <Link
        to="/Home/Chitform "
        className="bgchitbtn px-8 p-2 font-semibold text-white rounded-md text-center md:px-10"
      >
        CHIT FUND
      </Link>
    </div>
  );
};

const Loginsignup = () => {
  return (
    <div className="flex flex-col justify-between md:justify-evenly md:flex-row   w-full rounded-sm gap-5 ">
      <Link
        to="/SignUp"
        className=" w-full md:w-1/3 bggoldbtn p-2 font-semibold text-black rounded-md text-center md:px-10"
      >
        SignUp
      </Link>
      <Link
        to="/Login"
        className="w-full md:w-1/3 bgsilverbtn  p-2 font-semibold text-black rounded-md text-center md:px-10"
      >
        Login
      </Link>
    </div>
  );
};
