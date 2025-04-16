import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import herobg from "../Assets/images/herobg.png";
import { API } from "../axios";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Resetpassword = () => {
  const navigate = useNavigate();
  const [resetpass, setresetpass] = useState({
    pass: "",
    cpass: "",
  });
  const [error, seterror] = useState({
    pass: "",
    cpass: "",
  });
  const [message, setMessage] = useState("");
  const [isloading, setisloading] = useState(false);
  const query = useQuery();
  const token = query.get("token");
  useEffect(() => {
    if (!token) {
      setMessage("Invalid or missing token");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var aller = "";
    for (let key in resetpass) {
      const err = validatePassword(key, resetpass[key]);
      aller += err;
      seterror((preverr) => ({
        ...preverr,
        [key]: err,
      }));
    }
    if (aller === "" && token) {
      //  navigate("/Admin");
      saveresetpass();
    }
  };

  const saveresetpass = async () => {
    try {
      setisloading(true);
      const response = await API.post(
        "/user/reset-password",
        JSON.stringify({ newPassword: resetpass.pass }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Send data as raw JSON
          },
        }
      );

      setisloading(false);
      setMessage(response?.data?.message);

      if (response.status === 200) {
        setTimeout(() => {
          navigate("/Login");
        }, 4000);
      }
    } catch (error) {
      setisloading(false);
      setMessage(error.message);
    }
  };

  const handelchangepass = (e) => {
    const { name, value } = e.target;
    setresetpass((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
    const err = validatePassword(name, value);
    seterror((preverr) => ({
      ...preverr,
      [name]: err,
    }));
  };
  const validatePassword = (type, value) => {
    let error = "";
    if (type === "cpass") {
      if (value === "") {
        error = "Empty Confirm Password...";
      } else {
        if (value === resetpass.pass) {
          error = "";
        } else {
          error = "Confirm Password Missmatch...";
        }
      }
    } else if (type === "pass") {
      if (value === "") {
        error = "Empty Password...";
      } else {
        const regex =
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (regex.test(value)) {
          error = "";
        } else {
          error = "Invalid Password...";
        }
      }
    }
    return error;
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
              px-2  py-10 flex  flex-col items-center justify-center "
      >
        {isloading ? (
          <div className="flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50">
            <div className="w-12 h-12 md:w-36 md:h-36  border-8 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className=" shadow-md shadow-black bg-gray-200 p-10  rounded-lg md:w-[30%] w-full "
          >
            <h2 className="text-center pb-5 text-black font-semibold">
              Reset Password
            </h2>

            <div className="mb-1 ">
              <label htmlFor="NewPass" className=" block">
                New Password
              </label>
              <input
                autoComplete="off"
                className=" bg-transparent  rounded-sm p-2 w-full  outline-none focus:border-2 focus:border-black focus:rounded-md   border-b-2 border-black  "
                type="password"
                id="pass"
                name="pass"
                onChange={handelchangepass}
                value={resetpass.pass}
              />
            </div>
            {error.pass && (
              <p className="mb-3 text-red-600 text-left text-xs animate-pulse delay-75">
                {error.pass}
              </p>
            )}

            <div className=" mb-1">
              <label htmlFor="cpass" className=" block">
                Confirm Password
              </label>
              <input
                autoComplete="off"
                className=" bg-transparent  rounded-sm p-2 w-full  outline-none 
              focus:border-2 focus:border-black focus:rounded-md   
              border-b-2 border-black  "
                type="password"
                id="cpass"
                name="cpass"
                onChange={handelchangepass}
                value={resetpass.cpass}
              />
            </div>
            {error.cpass && (
              <p className="mb-3 text-red-600 text-left text-xs animate-pulse delay-75">
                {error.cpass}
              </p>
            )}
            <div className="flex flex-col">
              <button
                className="cursor-pointer
             mb-3 text-center  p-3  rounded text-white  font-bold"
                style={{
                  background:
                    "linear-gradient(90deg, #006537 0%, #01a056 50.5%, #006e39 100%)",
                }}
                type="submit"
                onClick={handleSubmit}
              >
                Reset
              </button>
            </div>

            {message ? (
              <p className="text-red-600 text-center animate-pulse delay-75">
                {message}
              </p>
            ) : null}
          </form>
        )}
      </div>
    </div>
  );
};
export default Resetpassword;
