import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/images/logo/logo.png";
import { IoCallOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import Profile from "./Profile";
import useCart from "../hooks/useCart";
import { GiHamburgerMenu } from "react-icons/gi";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
// import Modal from "./Modal";
// import { AuthContext } from "../contexts/AuthProvider";
// import Profile from "./Profile";

const Navbar = () => {
  const [cart, refetch] = useCart();
  const [isSticky, setSticky] = useState(false);
  const { user, login, logout } = useAuth();

  const token = localStorage.getItem("access-token");

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://be-vdev-foods-project.vercel.app/payments?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });


  // const {user} = useContext(AuthContext)
  // console.log(user);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <Link to="/" className="text-green">
          Trang chủ
        </Link>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Sản phẩm</summary>
          <ul className="p-2">
            <li>
              <Link to="/menu">Tất cả</Link>
            </li>
            {/* <li>
              <a>Đồ ăn vặt</a>
            </li>
            <li>
              <a>Đồ uống</a>
            </li> */}
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Dịch vụ</summary>
          <ul className="p-2">
            {/* <li>
              <a>Đặt hàng Online</a>
            </li>
            <li>
              <a>Đặt bàn</a>
            </li>
            <li>
              <a>Theo dõi đơn hàng</a>
            </li> */}
            <li>
              Sắp ra mắt...
            </li>
          </ul>
        </details>
      </li>
      {/* <li>
        <a>Ưu đãi</a>
      </li> */}
    </>
  );
  return (
    <header
      className={`max-w-screen-2xl bg-white container mx-auto fixed z-50 top-0 left-0 right-0 transition-all duration-300 ease-in-out`}
    >
      <div
        className={`navbar shadow-md  xl:px-24 px-4 ${
          isSticky
            ? "shadow-md bg-white transition-all duration-300 ease-in-out"
            : ""
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown justify-between">
            <label tabIndex={0} className="btn btn-ghost p-0 mr-8 lg:hidden">
              <GiHamburgerMenu className="text-[1.3rem]" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm  bg-white dropdown-content mt-3 z-10 p-2 shadow  rounded-box w-64 space-y-3"
            >
              {navItems}
            </ul>
          </div>
          <Link to="/">
            <img
              className="md:w-[40%]  w-[100px] ml-[-30px] sm:ml-0 text-center"
              src={logo}
              alt=""
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex z-10">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end ">
          <button className="btn btn-ghost btn-circle hidden lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle hidden lg:flex items-center justify-center mr-3"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cart.length}
              </span>
            </div>
          </label>

          {user ? (
            <Profile user={user} logout={logout}  orders={orders}/>
          ) : (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn bg-green px-6 text-white flex items-center gap-2"
            >
              <FaRegUser />
              Tài khoản
            </button>
          )}
          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
