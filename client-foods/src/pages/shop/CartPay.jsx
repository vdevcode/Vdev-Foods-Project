/* eslint-disable no-undef */
import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const CartPay = () => {
  const [cart, refetch] = useCart();
  const [cartItems, setCartItems] = useState([]);

  const { user } = useContext(AuthContext);

  const handleDeleteCart = (cart) => {
    Swal.fire({
      title: "Hãy nghĩ kĩ đi?",
      text: "Bạn thật sự không muốn mua món này sao =((!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "không mua!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:6001/cart/${cart._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Xoá thành công",
                text: "Món hàng đã được loại khỏi giỏ hàng!",
                icon: "success",
              });
            }
          });
      }
    });
    refetch();
  };

  //calculatePrice
  const calculatePrice = (cart) => {
    return cart.price * cart.quantity;
  };

  //descrase
  const handleDescrease = (cart) => {
    if (cart.quantity > 1) {
      fetch(`http://localhost:6001/cart/${cart._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: cart.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCartItems = cartItems.map((cartItem) => {
            if (cartItem.id === cart.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            } else {
              return cartItem;
            }
          });

          refetch();
          setCartItems(updatedCartItems);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      refetch();
    } else {
      alert("phải lớn hơn hoăc bằng 1 nha");
    }
  };

  //increase
  const handleIncrease = (cart) => {
    if (cart.quantity < 10) {
      fetch(`http://localhost:6001/cart/${cart._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: cart.quantity + 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCartItems = cartItems.map((cartItem) => {
            if (cartItem.id === cart.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              };
            } else {
              return cartItem;
            }
          });

          refetch();
          setCartItems(updatedCartItems);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      refetch();
    } else {
      alert("Sản phẩm phải <= ... oke");
    }
  };

  const cartSubTitle = Array.isArray(cart)
    ? cart.reduce((total, cart) => {
        return total + calculatePrice(cart);
      }, 0)
    : 0;

  const orderTotal = cartSubTitle;

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 pb-16 px-4">
      <div className="py-24 flex flex-col  justify-center items-center gap-8">
        {/* banner  */}
        <div className="text-center">
          <h2 className="md:text-5xl text-2xl font-bold md:leading-snug leading-snug">
            Thanh toán<span className="text-green"> sản phẩm</span>
          </h2>
          <p className="text-[#4A4A4A] mt-[10px] text-[1rem] md:text-xl">
            Giỏ hàng của bạn phía dưới!
          </p>
          {/* <button className="bg-green font-primary btn mt-[8px] text-white px-6">
            Đặt món ăn tại đây
          </button> */}
        </div>
      </div>
      {/* table */}
      <div className="border-green border rounded-sm">
        <div className="overflow-x-auto ">
          <table className="table ">
            {/* head */}
            <thead className="bg-green text-white">
              <tr className="text-center">
                <th className="">
                  <label>Số thứ tự</label>
                </th>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {Array.isArray(cart) &&
                cart.map((cart, index) => (
                  <tr className="text-center" key={index}>
                    <th className="pl-0">
                      <label>{index + 1}</label>
                    </th>
                    <td>
                      <Link to={`/cart/${cart._id}`}>
                        <div className="flex items-center gap-3">
                          <div className="avatar cursor-pointer">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={cart.image} alt="ảnh lỗi" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td>{cart.name}</td>
                    <th className="flex items-center">
                      <button
                        onClick={() => handleDescrease(cart)}
                        className="btn"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="btn-xs w-[40px] mx-[1rem]"
                        value={cart.quantity}
                        // onChange={(e) => handleQuantityChange(cart, e.target.value)}
                      />
                      <button
                        onClick={() => handleIncrease(cart)}
                        className="btn"
                      >
                        +
                      </button>
                    </th>
                    <td>
                      {calculatePrice(cart).toLocaleString("vi-VN", {
                        minimumFractionDigits: 3,
                      })}{" "}
                      VND
                    </td>
                    <th className="flex items-center text-red">
                      <button
                        onClick={() => handleDeleteCart(cart)}
                        className="btn btn-ghost btn-xs text-red"
                      >
                        Xoá
                      </button>
                      <FaTrash />
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* total and username */}
      <div className="my-12 flex flex-col md:flex-row justify-between gap-6 items-start">
        <div className="md:w-1/2 space-y-3 text-[.9rem]">
          <h3 className="text-green">Thông tin người mua</h3>
          <p>Tên: {user?.displayName}</p>
          <p>Email: {user?.email}</p>
          <p>Uid: {user?.uid}</p>
        </div>
        <div className="md:w-1/2 space-y-3 text-[.9rem]">
          <h3 className="text-green">Thông tin thanh toán</h3>
          <p>Tổng sản phẩm: {cart.length}</p>
          <p>
            Tổng tiền:{" "}
            {orderTotal.toLocaleString("vi-VN", {
              minimumFractionDigits: 3,
            })}{" "}
            vnđ
          </p>
          <div className="flex items-center gap-4 flex-wrap ">
            <Link
              to="/process-checkout"
              className="w-full sm:w-[200px] btn bg-green text-white "
            >
              <button>Thanh toán qua thẻ</button>
            </Link>
            <p className="text-center w-full sm:w-[40px]">hoặc</p>
            <Link
              to="/"
              className="btn bg-black text-white w-full sm:w-[200px]"
            >
              <button>Thanh toán shipcode</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPay;
