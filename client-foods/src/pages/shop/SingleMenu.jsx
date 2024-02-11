import React, { useEffect, useState } from "react";
import { Navigate, useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { IoCartSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import axios from "axios";
import useCart from "../../hooks/useCart";

const SingleMenu = () => {
  const { _id, createAt, category, image, name, price, recipe } =
    useLoaderData();

    const [refetch] = useCart()

  const { user } = useAuth();

  const createdAtDate = new Date(createAt);

  // Tạo các biến để lấy giờ, phút, ngày, tháng, năm
  const hours = createdAtDate.getHours();
  const minutes = createdAtDate.getMinutes();
  const day = createdAtDate.getDate();
  const month = createdAtDate.getMonth() + 1; // Tháng bắt đầu từ 0
  const year = createdAtDate.getFullYear();

  const handleAddToCart = () => {
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
        .post("http://localhost:6001/cart", cartItem)
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
          Navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 pb-16 px-4">
      {/* banner  */}
      <div className="pt-24 pb-8 sm:py-24 flex flex-col  justify-center items-center gap-8">
        <div className="text-center">
          <h2 className="md:text-[.8rem] text-2xl font-bold md:leading-snug leading-snug">
            Chi tiết<span className="text-green"> sản phẩm</span>
          </h2>
          <p className="text-[#4A4A4A] mt-[10px] text-[1rem] md:text-xl">
            Bạn đang xem sản phẩm{" "}
            <div className="badge badge-secondary">{name}</div>
          </p>
        </div>
      </div>

      {/* product single */}
      <div className="grid grid-cols-1 md:grid-cols-2 justify-between ">
        {/* left */}
        <div className="">
          <div className="md:w-[400px] w-full relative rounded-sm">
            <img src={image} alt="" className="rounded-md" />
          </div>
        </div>
        {/* right */}

        <div className="">
          <div className="mt-3 ">
            <p className="font-medium">Sản phẩm: {name}</p>
            <p className="my-2 text-red">
              Giá: {price.toLocaleString("vi-VN", { minimumFractionDigits: 3 })}
              VND
            </p>
            <p className="font-light">Danh mục: {category}</p>
            <p className="my-2">
              Ngày đăng bán sản phẩm:{" "}
              {`lúc ${hours}:${minutes} vào ${day}/${month}/${year}`}
            </p>
            <p className="mt-4 border border-gray-400 p-2 rounded-md font-light">
              Mô tả: {recipe}
            </p>
            <button
              className="btn bg-green mt-4 text-white w-full flex items-center "
              onClick={() => handleAddToCart()}
            >
              <IoCartSharp /> <p>Thêm vào giỏ hàng</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMenu;
