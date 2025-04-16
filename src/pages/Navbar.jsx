import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../Assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Context";
const Navbar = () => {
  const { Logout, authuser } = useContext(AuthContext);
  const navigate = useNavigate();
  function tohome() {
    navigate("/");
  }
  function handellogout() {
    Logout();
  }
  return (
    <div className="fixed w-full  top-0  right-0 gradientbg zindex">
      <div className="    h-22  md:h-32  py-3  mx-auto flex justify-between  items-center  px-2 ">
        <div onClick={tohome}>
          <img
            onClick={tohome}
            src={logo}
            alt="logo"
            className=" cursor-pointer h-22 w-24  md:w-44 md:h-full"
          />
        </div>
        <div className="flex  gap-2">
          {authuser.role !== "admin" && (
            <div className="hidden sm:flex  justify-center items-center gap-1 md:gap-2 bgvanmobile   rounded-lg p-2  md:px-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4 md:size-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>

              <h1 className="md:font-semibold  md:text-md text-xs text-white ">
                +91 9865208989
              </h1>
            </div>
          )}
          {authuser.role === "admin" && (
            <div className="flex justify-center items-center gap-1 md:gap-2 bgvanmobile   rounded-lg p-2  md:px-8">
              <button
                className="md:font-semibold  md:text-lg text-xs text-white "
                onClick={() => navigate("/Admindashboard")}
              >
                Admin
              </button>
            </div>
          )}
          {authuser.user && (
            <div className="flex justify-center items-center gap-1 md:gap-2 px-5 bgvanmobile   rounded-lg p-2  md:px-8">
              <button
                className="md:font-semibold   text-white "
                onClick={handellogout}
              >
                <p className="sm:text-lg text-xs">logout</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
