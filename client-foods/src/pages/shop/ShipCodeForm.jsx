/* eslint-disable react/prop-types */
import React from "react";
import { FaMoneyBill } from "react-icons/fa";

const ShipCodeForm = ({ cart, refetch, cartTotals, totalUSD }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* left */}
        <div className="">
          <p className="text-red mb-2">Tổng số lượng sản phẩm: {cart.length}</p>
          <div className="md:w-1/2 space-y-3 w-full text-[.9rem]">
            {/* <h3 className="text-green">Thông tin thanh toán</h3> */}
            <p className="bg-black px-2 py-4 rounded-sm">
              {cart.map((item, index) => (
                <p className="text-green flex  items-center " key={index}>
                  {item.name} (<p className="text-white">số lượng: </p> {" "}
                  {item.quantity} x {item.price})
                </p>
              ))}
            </p>
            <p>
              Tổng tiền:{" "}
              {cartTotals.toLocaleString("vi-VN", {
                minimumFractionDigits: 3,
              })}{" "}
              vnđ (Tương đương{" "}
              {totalUSD.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
              )
            </p>
          </div>
        </div>
        {/* right */}
        <div className=""> <button
              type="submit"
              // disabled={!stripe}
              className="btn text-center mt-4 text-white bg-green w-full"
            >
              <FaMoneyBill /> Thanh toán
            </button></div>
      </div>
    </div>
  );
};

export default ShipCodeForm;
