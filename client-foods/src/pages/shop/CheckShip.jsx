import React from "react";
import useCart from "../../hooks/useCart";
import ShipCodeForm from "./ShipCodeForm";

const CheckShip = () => {
  const [cart, refetch] = useCart();

  const cartTotals = cart.reduce((acc, totals) => {
    return acc + totals.price * totals.quantity;
  }, 0);

  const exchangeRate = 0.041;

  // Quy đổi tổng tiền từ VND sang USD
  const totalUSD = cartTotals * exchangeRate;

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 pb-16 px-4">
      {/* banner */}
      <div className="pt-24 pb-8 sm:py-24 flex flex-col  justify-center items-center gap-8">
        {/* banner  */}
        <div className="text-center">
          <h2 className="md:text-5xl text-2xl font-bold md:leading-snug leading-snug">
            Thanh toán<span className="text-green"> sản phẩm</span>
          </h2>
          <p className="text-[#4A4A4A] mt-[10px] text-[1rem] md:text-xl">
            Hình thức giao hàng - nhận tiền
          </p>
        </div>
      </div>

      {/* form */}
      <ShipCodeForm
        cart={cart}
        refetch={refetch}
        cartTotals={cartTotals}
        totalUSD={totalUSD}
      ></ShipCodeForm>
    </div>
  );
};

export default CheckShip;
