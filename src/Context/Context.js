import { createContext, useState, useEffect } from "react";
import { API } from "../axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginloading, setloginloading] = useState(false);
  const [authuser, setauthUser] = useState({
    user: "",
    role: "",
    userid: "",
    error: "",
  });
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await API.get("/auth/me", { withCredentials: true }); // Check login state
        setauthUser({
          user: result?.data?.user?.name,
          role: result?.data?.user?.role,
          userid: result?.data?.user?._id,
          error: "",
        });
        console.log(result);
      } catch (error) {
        console.log(error);
        setauthUser({
          user: null,
          role: null,
          userid: null,
          error: "",
        }); // Not logged in
        //navigate("/");
      }
    };

    checkAuth();
  }, []);

  const Login = async (email, password) => {
    //console.log(email, password);

    setloginloading(true);
    try {
      const result = await API.post(
        "/auth/Login",
        { email, password },
        { withCredentials: true }
      );
      console.log(result);
      setloginloading(false);
      if (result.data.success) {
        setauthUser({
          user: result?.data?.user?.email,
          role: result?.data?.user?.role,
          userid: result?.data?.user?._id,
          error: "",
        });
        //console.log(authuser);
        if (result?.data?.user?.role === "admin") {
          return "admin";
        } else {
          return "user";
        }
      } else {
        setauthUser({
          user: null,
          role: null,
          userid: null,
          error: result?.data?.message,
        });
      }
    } catch (error) {
      setloginloading(false);
      setauthUser({
        user: null,
        role: null,
        userid: null,
        error: error.message,
      });
      console.log(error);
    }
  };

  const Logout = async () => {
    setloginloading(true);

    const result = await API.post(
      "/auth/Logout",
      {},
      { withCredentials: true }
    );
    console.log(result);

    setloginloading(false);
    setauthUser({ user: null, role: null, userid: null, error: null });
  };

  return (
    <AuthContext.Provider value={{ authuser, Login, Logout, loginloading }}>
      {children}
    </AuthContext.Provider>
  );
};
