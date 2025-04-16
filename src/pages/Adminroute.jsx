import { Navigate, Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../Context/Context";

const Adminroute = () => {
  const { authuser } = useContext(AuthContext);

  // ✅ Show a loading state while fetching user info
  //if (isLoading) return <p>Loading...</p>;

  // ✅ Redirect if user is NOT an admin
  return authuser?.role === "admin" ? <Outlet /> : <Navigate to="/Login" />;
};

export default Adminroute;
