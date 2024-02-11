/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FaMoneyBill, FaPaypal } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckoutForm = ({ cart, cartTotals }) => {
  const [cartError, setCartError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [successPayment, setSuccessPayment] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Tỷ giá hối đoái từ VND sang USD (tính theo tỷ giá thực tế hoặc cung cấp bởi dịch vụ hối đoái)
  const exchangeRate = 0.041;

  // Quy đổi tổng tiền từ VND sang USD
  const totalUSD = cartTotals * exchangeRate;

  //dung stripe
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (typeof cartTotals !== "number" || cartTotals < 1) {
      alert("Số tiền phải có định dạng là Number");
      return;
    }
    axiosSecure
      .post("/create-payment-intent", {
        cartTotals,
      })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, [cartTotals, axiosSecure]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCartError(error);
    } else {
      setCartError("Thành công!!!");
    }

    if (paymentMethod) {
      setCartError("Thành công!!!");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || user?.name || "Ẩn danh",
            email: user?.email || "không xác định được email",
          },
        },
      });
    if (confirmError) {
      alert(confirmError);
    }
    setTimeout(() => {
      if (paymentIntent.status === "succeeded") {
        setSuccessPayment(
          "Mua hàng thành công rồi." + ` Mã giao dịch: ${paymentIntent.id}`
        );
        const paymentInfor = {
          idTransaction: paymentIntent.id,
          name: user?.displayName || user?.name || "Ẩn danh",
          email: user?.email || "không xác định được email",
          cartTotals,
          quantity: cart.length,
          status: "Đơn hàng đang chờ xử lý",
          itemName: cart.map((item, index) => item.name),
          cartItem: cart.map((item, index) => item._id),
          menuItems: cart.map((item, index) => item.menuItemId),
        };
        axiosSecure.post("/payments", paymentInfor).then((res) => {
          navigate("/order");
          console.log(res.data);
          alert("Thanh toán thành công!!!");
        });
      } else {
        setSuccessPayment("Thất bại");
      }
    }, 1000);
  };

  return (
    <div>
      <div className="text-center mb-7 ">
          <h2 className="md:text-5xl text-2xl font-bold md:leading-snug leading-snug">
            Thông tin<span className="text-green"> đơn hàng</span>
          </h2>
          <p className="text-[#4A4A4A] text-[1rem] md:text-xl">
            Hình thức thanh toán trả trước
          </p>
        </div>
      <div className="flex flex-col md:flex-row justify-between gap-6 items-start">
        
        {/* left */}
        <div className="md:w-1/2 space-y-3 w-full text-[.9rem]">
          {/* <h3 className="text-green">Thông tin thanh toán</h3> */}
          <p className="text-red mb-2">Tổng số lượng sản phẩm: {cart.length}</p>
          <p className="bg-black px-2 py-4 rounded-sm">

            {cart.map((item, index) => (
              <p className="text-green flex  items-center " key={index}>
                {item.name} (<p className="text-white">số lượng:</p>{" "}
                {item.quantity} x {item.price})
              </p>
            ))}{" "}
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
        {/* right */}
        <div className="md:w-1/3 w-full space-y-3 card rounded-sm shrink-0 max-w-sm border border-black px-4 py-8">
          <progress className="progress w-full "></progress>
          <h3 className="text-center py-4">Thông tin thanh toán</h3>
          <p className="text-center pb-4">
            Dùng mã: <span className="text-blue-500">4242424242424242</span> để
            test nhé.
          </p>

          {/* stripe */}
          <form onSubmit={handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#000",
                    "::placeholder": {
                      color: "#000",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <div className="my-3 text-center w-full">
              {cartError ? (
                <p className="text-red">{cartError.message}</p>
              ) : (
                <p>{cartError.status}</p>
              )}
            </div>
            <div className="text-center  bg-orange-500 p-2 rounded-md">
              <p className="text-white text-[.8rem]">{successPayment}</p>
            </div>
            <button
              type="submit"
              disabled={!stripe}
              className="btn text-center mt-4 text-white bg-green w-full"
            >
              <FaMoneyBill /> Thanh toán
            </button>
            <button
              type="submit"
              disabled={!stripe}
              className="btn text-center mt-4 text-white bg-blue-500 w-full"
            >
              <FaPaypal /> Thanh toán với Paypal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
