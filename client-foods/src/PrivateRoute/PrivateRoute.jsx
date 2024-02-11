/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useLocation, Navigate } from "react-router-dom";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }
  if (user) {
    return children;
  }

  return <Navigate to="/signup" state={{from: location}} replace></Navigate>;
};

export default PrivateRoute;
