import React, { useState } from "react";
import herobg from "../Assets/images/herobg.png";
import "./Planform.css";
import { useNavigate } from "react-router-dom";
import { API } from "../axios";

const Signup = () => {
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [resmessage, setresmessage] = useState("");

  const [error, seterror] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function validate_data(name, value) {
    let error = "";
    switch (name) {
      case "name":
        if (value === "") {
          error = "Empty Name...";
        }
        break;
      case "email":
        if (value === "") {
          error = "Empty Email...";
        } else {
          const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (regex.test(value)) {
            error = "";
          } else {
            error = "Invalid Email...";
          }
        }
        break;
      case "password":
        const errors = [];
        const password = value;
        if (password.length < 8) {
          errors.push("Password must be at least 8 characters long.");
        }
        if (!/[A-Z]/.test(password)) {
          errors.push(
            "Password must contain at least one uppercase letter (A-Z)."
          );
        }
        if (!/[a-z]/.test(password)) {
          errors.push(
            "Password must contain at least one lowercase letter (a-z)."
          );
        }
        if (!/\d/.test(password)) {
          errors.push("Password must contain at least one number (0-9).");
        }
        if (!/[@$!%*?&]/.test(password)) {
          errors.push(
            "Password must contain at least one special character (@$!%*?&)."
          );
        }

        error = errors.length > 0 ? errors.join("\n") : "";
        break;
      // if (value === "") {
      //   error = "Empty Password...";
      // } else {
      //   const regex =
      //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      //   if (regex.test(value)) {
      //     error = "";
      //   } else {
      //     error = "Invalid Password...";
      //   }
      // }
      //break;
      default:
        break;
    }
    return error;
  }
  function handelsubmit(e) {
    e.preventDefault();
    var aller = "";
    for (let key in formData) {
      const err = validate_data(key, formData[key]);
      aller += err;
      seterror((preverr) => ({
        ...preverr,
        [key]: err,
      }));
    }
    if (aller === "") {
      //  navigate("/Admin");
      saveuser();
    }
  }
  const saveuser = async (e) => {
    try {
      setisloading(true);
      const response = await API.post(
        "/user/Signup",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "user",
        }),
        {
          headers: {
            "Content-Type": "application/json", // Send data as raw JSON
          },
        }
      );
      console.log(response);
      setisloading(false);
      if (response.data.success) {
        navigate("/Login");
      } else {
        console.log("res", response);
        setresmessage(response?.data?.message);
      }
    } catch (error) {
      setisloading(false);
      console.log("err", error?.response?.data?.message);
      setresmessage(error?.response?.data?.message);
    }
  };

  const handelchange = (e) => {
    const { name, value } = e.target;
    setFormData((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
    const err = validate_data(name, value);
    seterror((preverr) => ({
      ...preverr,
      [name]: err,
    }));
  };
  return (
    <div
      className="
         w-full  
                  flex  flex-col items-center justify-center
                   h-full   pt-16 sm:pt-22 md:pt-28"
    >
      <div
        style={{ backgroundImage: `url(${herobg})` }}
        className=" 
           bg-center md:bg-cover bg-contain 
                w-full py-auto h-screen
                px-2  py-10 flex  flex-col items-center justify-center
                "
      >
        {isloading ? (
          <div className="flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50">
            <div className="w-12 h-12 md:w-36 md:h-36  border-8 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <form
            onSubmit={handelsubmit}
            className=" shadow-md shadow-black bg-gray-200  p-10 rounded-lg  w-full md:w-[30%] "
          >
            <h1 className="text-center pb-5 font-bold sm:text-lg md:text-3xl">
              Sign In
            </h1>
            <div className="mb-3 ">
              <label
                htmlFor="fullname"
                className="text-black font-semibold block"
              >
                Name
              </label>
              <input
                autoComplete="off"
                className=" bg-transparent  rounded-sm p-2 w-full  outline-none focus:border-2 focus:border-black focus:rounded-md   border-b-2 border-black  "
                type="text"
                id="name"
                name="name"
                onChange={handelchange}
                value={formData.name}
              />
              {error.name && (
                <p className="text-red-600 block text-xs">{error.name}</p>
              )}
            </div>

            <div className="mb-3 ">
              <label htmlFor="email" className="text-black font-semibold block">
                Email
              </label>
              <input
                autoComplete="off"
                className=" bg-transparent  rounded-sm p-2 w-full  outline-none focus:border-2 focus:border-black focus:rounded-md   border-b-2 border-black  "
                type="email"
                id="email"
                name="email"
                onChange={handelchange}
                value={formData.email}
              />
              {error.email && (
                <p className="text-red-600 block text-xs">{error.email}</p>
              )}
            </div>

            <div className="mb-3 ">
              <label
                htmlFor="password"
                className="text-black font-semibold block"
              >
                Password
              </label>
              <input
                autoComplete="off"
                className=" p-2 w-full bg-transparent outline-none  focus:border-2 focus:border-black focus:rounded-md border-b-2 border-black   rounded-sm "
                type="password"
                id="password"
                name="password"
                onChange={handelchange}
                value={formData.password}
              />
              {error.password && (
                <p className="text-red-600 text-xs">{error.password}</p>
              )}
            </div>
            {resmessage && (
              <p className="text-red-600 text-xs text-center p-3">
                {resmessage}
              </p>
            )}

            <div className="flex flex-col">
              <button
                className={`cursor-pointer 
               mb-3 text-center  p-3  rounded text-white font-bold`}
                type="submit"
                onClick={handelsubmit}
                style={{
                  background:
                    "linear-gradient(90deg, #006537 0%, #01a056 50.5%, #006e39 100%)",
                }}
              >
                Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default Signup;
