import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useCart from "../../hooks/useCart";

//token
const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);

const ProcessCheckout = () => {
    const [cart, refetch] = useCart();

    const cartTotals = cart.reduce((acc, total) => {
        return acc + (total.price * total.quantity)
    }, 0)

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 pb-16 my-4 sm:my-10 px-4">
      <div className="py-24 ">
        <Elements stripe={stripePromise}>
          <CheckoutForm cart={cart} cartTotals={cartTotals}/>
        </Elements>
      </div>
    </div>
  );
};

export default ProcessCheckout;
