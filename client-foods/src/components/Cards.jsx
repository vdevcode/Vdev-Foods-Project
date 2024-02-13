/* eslint-disable react/prop-types */

import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";
import { IoCartSharp } from "react-icons/io5";
import axios from "axios";
// eslint-disable-next-line react/prop-types
const Cards = ({ item }) => {
  const { name, _id, price, recipe, image } = item;
  const { user } = useContext(AuthContext);

  const [cart, refetch] = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddToCart = (item) => {
    // console.log(item);
    if (user && user.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };

      axios
        .post("https://be-vdev-foods-project.vercel.app/cart", cartItem)
        .then((response) => {
          if (response) {
            refetch(); // refetch cart
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Thêm sản phẩm thành công.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: "center",
            icon: "warning",
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      Swal.fire({
        title: "Bạn chưa đăng nhập nên không mua được",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đăng nhập ngay!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    // eslint-disable-next-line react/prop-types
    <div
      to={`/menu/${item._id}`}
      className="card rounded-sm shadow-xl relative md:mr-5 md:my-5"
    >
      <div
        className={`rating gap-1 absolute right-2 top-2 rounded p-2 heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt="Shoes"
            className="w-full  h-[150px] rounded-sm sm:h-[200px]  hover:scale-105 transition-all duration-300 "
          />
        </figure>
      </Link>
      <div className="  p-2 sm:p-4">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title text-[.9rem] md:text-[1.2rem] text1">
            {item.name}!
          </h2>
        </Link>
        <p className="text-[.8rem] md:text-[1rem] text h-[40px]">
          {item.recipe}
        </p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold text-[.8rem]">
            <span className="text-sm text-red text-[.9rem] md:text-[1.1rem]">
              ${" "}
            </span>{" "}
            {item.price.toLocaleString("vi-VN", { minimumFractionDigits: 3 })}{" "}
            VND
          </h5>
          <button
            className="btn bg-green text-white w-full flex items-center "
            onClick={() => handleAddToCart(item)}
          >
            <IoCartSharp /> <p>Mua </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
