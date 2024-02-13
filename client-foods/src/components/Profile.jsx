/* eslint-disable react/prop-types */
import { React, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";
import useCart from "../hooks/useCart";
import { MdAdminPanelSettings, MdPayments } from "react-icons/md";
import useAdmin from "../hooks/useAdmin";

const Profile = ({ user, orders }) => {

  const [isAdmin, isAdminLoading] = useAdmin()

  const [cart,refetch] = useCart()

  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";


  const handleLogout = () => {
    logout();
    console.log("Đăng xuất thành công");
    document.getElementById("drawer-end").close();
    navigate(from, { replace: true })
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className=" drawer-end col-start-2">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user.photoURL ? (
                <img src={user.photoURL} />
              ) : (
                <img src="https://cdn4.iconfinder.com/data/icons/job-resume-9/100/job_work_office-15-512.png" />
              )}
            </div>
          </div>
        </label>
      </div>
      <div className="drawer-side z-100">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-[80%] sm:w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}

          <li className="mx-auto flex justify-center items-center text-center">
            {user.photoURL ? (
              <img className="w-20 h-17 rounded-[100%]" src={user.photoURL} />
            ) : (
              <img
                className="w-20 h-17 rounded-[100%]"
                src="https://cdn4.iconfinder.com/data/icons/job-resume-9/100/job_work_office-15-512.png"
              />
            )}
            <li>
              {user.email ? (
                <p className="text-red">{user.displayName}</p>
              ) : (
                user.name
              )}
            </li>
          </li>
          <div className="flex items-center">
            <li>
              <Link to="/update-profile" user={user}>
                <FaUser />
                Tài khoản 
              </Link>
            </li>
          </div>
          <div className="flex items-center">
            <li>
              <Link to="/cart-pay">
                <FaShoppingCart />
                <a>Giỏ hàng</a>{
                  cart?.length ? (`(${cart?.length})`): ("đang load")
                 }
              </Link>
            </li>
          </div>
          <div className="flex items-center">
            <li>
              <Link to="/order">
                <MdPayments />
                <a>Đơn hàng đã mua</a>{ orders?.length ? (`(${orders?.length})`) : ("đang load") }
              </Link>
            </li>
          </div>
          <div className="flex items-center">
            
            <li>
              <Link>
              <IoSettings />
                <a>Cài đặt</a>
              </Link>
            </li>
          </div>
          {
            isAdmin ? (<div className="flex items-center">
         
            <li className="flex items-center">
              
              <Link to="/dashboard">    <MdAdminPanelSettings />Trang quản trị (admin)</Link>
            </li>
          </div>) : ("")
          }
          <div className="flex items-center">
         
            <li onClick={handleLogout} className="flex items-center">
              
              <a href="/">    <IoLogOutSharp />Đăng xuất</a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
