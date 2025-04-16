import { Navigate, Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../Context/Context";
const Protectroute = () => {
  const { authuser } = useContext(AuthContext);

  //if (isLoading) return <p>Loading...</p>;

  // ✅ If not logged in, redirect to login page
  return authuser.user ? <Outlet /> : <Navigate to="/login" />;
};

export default Protectroute;
