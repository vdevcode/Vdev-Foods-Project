import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthProvider";
import Loading from "../components/Loading";

const Main = () => {
  const { loading, user } = useContext(AuthContext);
  // console.log(loading);
  return (
    <div>
      {loading && user ? (
        <Loading />
      ) : (
        <div className="">
          <Navbar />
          <div className="min-h-screen">
            <Outlet />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Main;
